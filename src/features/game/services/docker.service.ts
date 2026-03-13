import { spawn } from 'child_process';
import { promises as fs } from 'fs';
import os from 'os';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { config } from '@root/config';
import { IDockerRunResult } from '@game/interfaces/game.interface';

export class DockerService {
  async runCode(code: string): Promise<IDockerRunResult> {
    const tmpDir = os.tmpdir();
    const submissionId = uuidv4();
    const tmpFile = path.join(tmpDir, `submission-${submissionId}.js`);

    // Rewrite localhost:5000 to host.docker.internal:5000 so the sandbox
    // container can connect back to the backend serving target pages.
    const rewritten = code
      .replace(/localhost:4000/g, 'host.docker.internal:5000')
      .replace(/localhost/g, 'host.docker.internal');

    // Export the async IIFE so runner.js can await it and properly catch errors.
    const exportable = rewritten.replace(/\(async\s*\(\)\s*=>\s*\{/, 'module.exports = (async () => {');

    try {
      await fs.writeFile(tmpFile, exportable, 'utf-8');
      const result = await this.execDocker(tmpFile);
      return result;
    } finally {
      try {
        await fs.unlink(tmpFile);
      } catch {
        // ignore cleanup errors
      }
    }
  }

  private execDocker(tmpFile: string): Promise<IDockerRunResult> {
    return new Promise((resolve) => {
      const args = [
        'run',
        '--rm',
        '--network', 'host',
        '--memory', '512m',
        '--cpus', '1.0',
        '--security-opt', 'no-new-privileges',
        '--read-only',
        '--tmpfs', '/tmp',
        '-e', 'NODE_PATH=/app/node_modules',
        '-v', `${tmpFile}:/sandbox/submission.js:ro`,
        config.SANDBOX_IMAGE,
      ];

      const docker = spawn('docker', args, { timeout: config.DOCKER_TIMEOUT + 5000 });

      let stdout = '';
      let stderr = '';
      let timedOut = false;

      const killTimer = setTimeout(() => {
        timedOut = true;
        docker.kill('SIGKILL');
      }, config.DOCKER_TIMEOUT);

      docker.stdout.on('data', (data: Buffer) => {
        stdout += data.toString();
      });

      docker.stderr.on('data', (data: Buffer) => {
        stderr += data.toString();
      });

      docker.on('close', (exitCode: number | null) => {
        clearTimeout(killTimer);
        resolve({
          stdout: stdout.trim(),
          stderr: stderr.trim(),
          exitCode: exitCode ?? 1,
          timedOut,
        });
      });

      docker.on('error', (err: Error) => {
        clearTimeout(killTimer);
        resolve({
          stdout: stdout.trim(),
          stderr: `Docker execution error: ${err.message}`,
          exitCode: 1,
          timedOut: false,
        });
      });
    });
  }
}

export const dockerService = new DockerService();
