import { spawn } from 'child_process';
import { promises as fs } from 'fs';
import os from 'os';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { config } from '@root/config';
import { IDockerRunResult } from '@game/interfaces/game.interface';

export class DockerService {
  async runCode(code: string): Promise<IDockerRunResult> {
    const rewritten = code
      .replace(/localhost:4000/g, 'host.docker.internal:5000')
      .replace(/localhost/g, 'host.docker.internal');

    const exportable = rewritten.replace(/\(async\s*\(\)\s*=>\s*\{/, 'module.exports = (async () => {');

    const tmpFile = await this.writeTemp(exportable, '.js');
    try {
      return await this.execDocker(tmpFile, '/sandbox/submission.js', [], true);
    } finally {
      await fs.unlink(tmpFile).catch(() => {});
    }
  }

  async runJestCode(code: string): Promise<IDockerRunResult> {
    const tmpFile = await this.writeTemp(code, '.test.js');
    try {
      return await this.execDocker(
        tmpFile,
        '/sandbox/submission.test.js',
        ['bash', '-c', 'echo \'{"testEnvironment":"node"}\' > /sandbox/jest.config.json && node /app/node_modules/.bin/jest /sandbox/submission.test.js --no-coverage --forceExit 2>&1'],
        false
      );
    } finally {
      await fs.unlink(tmpFile).catch(() => {});
    }
  }

  async runVitestCode(code: string): Promise<IDockerRunResult> {
    const tmpFile = await this.writeTemp(code, '.test.ts');
    try {
      return await this.execDocker(
        tmpFile,
        '/sandbox/submission.test.ts',
        ['bash', '-c', '/app/node_modules/.bin/vitest run /sandbox/submission.test.ts --reporter=verbose --no-coverage 2>&1'],
        false
      );
    } finally {
      await fs.unlink(tmpFile).catch(() => {});
    }
  }

  async runCypressComponentCode(code: string): Promise<IDockerRunResult> {
    const tmpFile = await this.writeTemp(code, '.cy.jsx');
    try {
      return await this.execDocker(
        tmpFile,
        '/sandbox/cypress/component/submission.cy.jsx',
        ['bash', '-c', 'Xvfb :99 -screen 0 1280x1024x24 -nolisten tcp & sleep 2 && DISPLAY=:99 /app/node_modules/.bin/cypress run --component --spec cypress/component/submission.cy.jsx'],
        false
      );
    } finally {
      await fs.unlink(tmpFile).catch(() => {});
    }
  }

  async runCypressCode(code: string): Promise<IDockerRunResult> {
    const rewritten = code
      .replace(/localhost:4000/g, 'host.docker.internal:5000')
      .replace(/localhost/g, 'host.docker.internal');

    const tmpFile = await this.writeTemp(rewritten, '.cy.js');
    try {
      return await this.execDocker(
        tmpFile,
        '/sandbox/cypress/e2e/submission.cy.js',
        ['bash', '-c', 'Xvfb :99 -screen 0 1280x1024x24 -nolisten tcp & sleep 2 && DISPLAY=:99 /app/node_modules/.bin/cypress run --spec cypress/e2e/submission.cy.js'],
        false
      );
    } finally {
      await fs.unlink(tmpFile).catch(() => {});
    }
  }

  private async writeTemp(content: string, ext: string): Promise<string> {
    const tmpFile = path.join(os.tmpdir(), `submission-${uuidv4()}${ext}`);
    await fs.writeFile(tmpFile, content, 'utf-8');
    return tmpFile;
  }

  private execDocker(
    tmpFile: string,
    mountTarget: string,
    cmd: string[],
    readOnly: boolean
  ): Promise<IDockerRunResult> {
    return new Promise((resolve) => {
      const args = [
        'run',
        '--rm',
        '--add-host', 'host.docker.internal:host-gateway',
        '--memory', '512m',
        '--cpus', '1.0',
        '--security-opt', 'no-new-privileges',
        '--tmpfs', '/tmp',
        ...(readOnly ? ['--read-only'] : []),
        '-e', 'NODE_PATH=/app/node_modules',
        '-v', `${tmpFile}:${mountTarget}:ro`,
        config.SANDBOX_IMAGE,
        ...cmd,
      ];

      const docker = spawn('docker', args, { timeout: config.DOCKER_TIMEOUT + 5000 });

      let stdout = '';
      let stderr = '';
      let timedOut = false;

      const killTimer = setTimeout(() => {
        timedOut = true;
        docker.kill('SIGKILL');
      }, config.DOCKER_TIMEOUT);

      docker.stdout.on('data', (data: Buffer) => { stdout += data.toString(); });
      docker.stderr.on('data', (data: Buffer) => { stderr += data.toString(); });

      docker.on('close', (exitCode: number | null) => {
        clearTimeout(killTimer);
        resolve({ stdout: stdout.trim(), stderr: stderr.trim(), exitCode: exitCode ?? 1, timedOut });
      });

      docker.on('error', (err: Error) => {
        clearTimeout(killTimer);
        const isDockerMissing = (err as NodeJS.ErrnoException).code === 'ENOENT';
        const stderr = isDockerMissing
          ? 'Code execution is not available on this server. The sandbox requires Docker.'
          : `Execution error: ${err.message}`;
        resolve({ stdout: stdout.trim(), stderr, exitCode: 1, timedOut: false });
      });
    });
  }
}

export const dockerService = new DockerService();
