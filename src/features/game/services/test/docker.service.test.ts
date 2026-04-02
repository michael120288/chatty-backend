import { EventEmitter } from 'events';
import { DockerService } from '@game/services/docker.service';

jest.mock('child_process', () => ({
  spawn: jest.fn(),
}));

jest.mock('uuid', () => ({
  v4: () => 'test-uuid',
}));

jest.mock('fs', () => ({
  promises: {
    writeFile: jest.fn().mockResolvedValue(undefined),
    unlink: jest.fn().mockResolvedValue(undefined),
  },
}));

jest.mock('@root/config', () => ({
  config: {
    SANDBOX_IMAGE: 'test-sandbox:latest',
    DOCKER_TIMEOUT: 100,
  },
}));

import { spawn } from 'child_process';
import { promises as fs } from 'fs';

const mockSpawn = spawn as jest.Mock;

function makeProcess(options: {
  exitCode?: number | null;
  stdout?: string;
  stderr?: string;
  errorCode?: string;
  delay?: number;
}): EventEmitter {
  const proc = new EventEmitter() as EventEmitter & {
    stdout: EventEmitter;
    stderr: EventEmitter;
    kill: jest.Mock;
  };
  proc.stdout = new EventEmitter();
  proc.stderr = new EventEmitter();
  proc.kill = jest.fn();

  setTimeout(() => {
    if (options.errorCode) {
      const err = new Error('spawn error') as NodeJS.ErrnoException;
      err.code = options.errorCode;
      proc.emit('error', err);
      return;
    }
    if (options.stdout) proc.stdout.emit('data', Buffer.from(options.stdout));
    if (options.stderr) proc.stderr.emit('data', Buffer.from(options.stderr));
    proc.emit('close', 'exitCode' in options ? options.exitCode : 0);
  }, options.delay ?? 0);

  return proc;
}

describe('DockerService', () => {
  let service: DockerService;

  beforeEach(() => {
    service = new DockerService();
    jest.clearAllMocks();
  });

  describe('runCode', () => {
    it('rewrites localhost to host.docker.internal', async () => {
      mockSpawn.mockReturnValue(makeProcess({ exitCode: 0 }));
      await service.runCode('fetch("http://localhost:4000/api")');
      const args: string[] = mockSpawn.mock.calls[0][1];
      const mountArg = args[args.indexOf('-v') + 1];
      const tmpFile = mountArg.split(':')[0];
      const written: string = (fs.writeFile as jest.Mock).mock.calls[0][1];
      expect(written).toContain('host.docker.internal:5000');
      expect(written).not.toContain('localhost');
    });

    it('rewrites plain localhost references', async () => {
      mockSpawn.mockReturnValue(makeProcess({ exitCode: 0 }));
      await service.runCode('fetch("http://localhost/health")');
      const written: string = (fs.writeFile as jest.Mock).mock.calls[0][1];
      expect(written).toContain('host.docker.internal');
    });

    it('converts IIFE to module.exports form', async () => {
      mockSpawn.mockReturnValue(makeProcess({ exitCode: 0 }));
      await service.runCode('(async () => { console.log("hi"); })()');
      const written: string = (fs.writeFile as jest.Mock).mock.calls[0][1];
      expect(written).toContain('module.exports = (async () => {');
    });

    it('mounts with read-only flag', async () => {
      mockSpawn.mockReturnValue(makeProcess({ exitCode: 0 }));
      await service.runCode('code');
      const args: string[] = mockSpawn.mock.calls[0][1];
      expect(args).toContain('--read-only');
    });

    it('returns stdout and exitCode from Docker', async () => {
      mockSpawn.mockReturnValue(makeProcess({ exitCode: 0, stdout: 'LEVEL_PASSED' }));
      const result = await service.runCode('code');
      expect(result.stdout).toBe('LEVEL_PASSED');
      expect(result.exitCode).toBe(0);
      expect(result.timedOut).toBe(false);
    });

    it('cleans up temp file after execution', async () => {
      mockSpawn.mockReturnValue(makeProcess({ exitCode: 0 }));
      await service.runCode('code');
      expect(fs.unlink).toHaveBeenCalledTimes(1);
    });

    it('cleans up temp file even if Docker fails', async () => {
      mockSpawn.mockReturnValue(makeProcess({ exitCode: 1, stderr: 'fail' }));
      await service.runCode('code');
      expect(fs.unlink).toHaveBeenCalledTimes(1);
    });
  });

  describe('runJestCode', () => {
    it('mounts to /sandbox/submission.test.js', async () => {
      mockSpawn.mockReturnValue(makeProcess({ exitCode: 0 }));
      await service.runJestCode('test code');
      const args: string[] = mockSpawn.mock.calls[0][1];
      const mountArg = args[args.indexOf('-v') + 1];
      expect(mountArg).toContain('/sandbox/submission.test.js');
    });

    it('does not use read-only flag', async () => {
      mockSpawn.mockReturnValue(makeProcess({ exitCode: 0 }));
      await service.runJestCode('test code');
      const args: string[] = mockSpawn.mock.calls[0][1];
      expect(args).not.toContain('--read-only');
    });

    it('passes jest run command', async () => {
      mockSpawn.mockReturnValue(makeProcess({ exitCode: 0 }));
      await service.runJestCode('test code');
      const args: string[] = mockSpawn.mock.calls[0][1];
      const cmd = args.slice(args.indexOf(args.find((a) => a.includes('jest'))!));
      expect(args.join(' ')).toContain('jest');
    });
  });

  describe('runCypressCode', () => {
    it('rewrites localhost URLs in cypress code', async () => {
      mockSpawn.mockReturnValue(makeProcess({ exitCode: 0 }));
      await service.runCypressCode('cy.visit("http://localhost:4000/")');
      const written: string = (fs.writeFile as jest.Mock).mock.calls[0][1];
      expect(written).toContain('host.docker.internal:5000');
    });

    it('mounts to /sandbox/cypress/e2e/submission.cy.js', async () => {
      mockSpawn.mockReturnValue(makeProcess({ exitCode: 0 }));
      await service.runCypressCode('code');
      const args: string[] = mockSpawn.mock.calls[0][1];
      const mountArg = args[args.indexOf('-v') + 1];
      expect(mountArg).toContain('/sandbox/cypress/e2e/submission.cy.js');
    });
  });

  describe('runCypressComponentCode', () => {
    it('mounts to /sandbox/cypress/component/submission.cy.jsx', async () => {
      mockSpawn.mockReturnValue(makeProcess({ exitCode: 0 }));
      await service.runCypressComponentCode('code');
      const args: string[] = mockSpawn.mock.calls[0][1];
      const mountArg = args[args.indexOf('-v') + 1];
      expect(mountArg).toContain('/sandbox/cypress/component/submission.cy.jsx');
    });
  });

  describe('execDocker — ENOENT (Docker not installed)', () => {
    it('returns descriptive stderr when Docker binary is missing', async () => {
      mockSpawn.mockReturnValue(makeProcess({ errorCode: 'ENOENT' }));
      const result = await service.runCode('code');
      expect(result.stderr).toContain('sandbox requires Docker');
      expect(result.exitCode).toBe(1);
      expect(result.timedOut).toBe(false);
    });
  });

  describe('execDocker — generic spawn error', () => {
    it('returns generic error message for non-ENOENT errors', async () => {
      mockSpawn.mockReturnValue(makeProcess({ errorCode: 'EACCES' }));
      const result = await service.runCode('code');
      expect(result.stderr).toContain('Execution error:');
      expect(result.exitCode).toBe(1);
    });
  });

  describe('execDocker — timeout', () => {
    afterEach(() => jest.useRealTimers());

    it('sets timedOut=true and kills process when DOCKER_TIMEOUT exceeded', async () => {
      jest.useFakeTimers();

      const proc = new EventEmitter();
      (proc as any).stdout = new EventEmitter();
      (proc as any).stderr = new EventEmitter();
      const killMock = jest.fn(() => { proc.emit('close', null); });
      (proc as any).kill = killMock;
      mockSpawn.mockReturnValue(proc);

      const resultPromise = service.runCode('code');
      await jest.advanceTimersByTimeAsync(200);
      const result = await resultPromise;

      expect(result.timedOut).toBe(true);
      expect(killMock).toHaveBeenCalledWith('SIGKILL');
    });
  });

  describe('execDocker — null exitCode', () => {
    it('defaults exitCode to 1 when process exits with null', async () => {
      mockSpawn.mockReturnValue(makeProcess({ exitCode: null }));
      const result = await service.runCode('code');
      expect(result.exitCode).toBe(1);
    });
  });

  describe('execDocker — Docker args', () => {
    it('always includes memory and cpu limits', async () => {
      mockSpawn.mockReturnValue(makeProcess({ exitCode: 0 }));
      await service.runCode('code');
      const args: string[] = mockSpawn.mock.calls[0][1];
      expect(args).toContain('--memory');
      expect(args).toContain('512m');
      expect(args).toContain('--cpus');
      expect(args).toContain('1.0');
    });

    it('uses SANDBOX_IMAGE from config', async () => {
      mockSpawn.mockReturnValue(makeProcess({ exitCode: 0 }));
      await service.runCode('code');
      const args: string[] = mockSpawn.mock.calls[0][1];
      expect(args).toContain('test-sandbox:latest');
    });

    it('includes --add-host for host.docker.internal', async () => {
      mockSpawn.mockReturnValue(makeProcess({ exitCode: 0 }));
      await service.runCode('code');
      const args: string[] = mockSpawn.mock.calls[0][1];
      expect(args).toContain('host.docker.internal:host-gateway');
    });
  });
});
