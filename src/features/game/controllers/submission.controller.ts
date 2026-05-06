import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import levelsData from '@root/data/levels.json';
import { ILevel, ISubmissionRequest, ISubmissionResult } from '@game/interfaces/game.interface';
import { validationService } from '@game/services/validation.service';
import { dockerService } from '@game/services/docker.service';
import { config } from '@root/config';

const levels: ILevel[] = levelsData as ILevel[];

export class SubmissionController {
  async submit(req: Request, res: Response): Promise<void> {
    const { levelId, code } = req.body as ISubmissionRequest;

    if (!levelId || !code || typeof levelId !== 'string' || typeof code !== 'string') {
      res.status(StatusCodes.BAD_REQUEST).json({ message: 'levelId and code are required and must be strings.' });
      return;
    }

    const level = levels.find((l) => l.id === levelId);
    if (!level) {
      res.status(StatusCodes.NOT_FOUND).json({ message: `Level '${levelId}' not found.` });
      return;
    }

    const validation = validationService.validate(code);
    if (!validation.valid) {
      const result: ISubmissionResult = {
        levelId,
        passed: false,
        stdout: '',
        stderr: validation.reason || 'Validation failed.',
        xpAwarded: 0,
        exitCode: 1,
        message: `Code validation failed: ${validation.reason}`,
      };
      res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(result);
      return;
    }

    const dockerResult =
      level.tool === 'jest'
        ? await dockerService.runJestCode(code)
        : level.tool === 'vitest'
          ? await dockerService.runVitestCode(code)
          : level.tool === 'cypress-component'
            ? await dockerService.runCypressComponentCode(code)
            : level.tool === 'cypress'
              ? await dockerService.runCypressCode(code)
              : await dockerService.runCode(code);

    if (dockerResult.timedOut) {
      const result: ISubmissionResult = {
        levelId,
        passed: false,
        stdout: dockerResult.stdout,
        stderr: this.cleanStderr(dockerResult.stderr),
        xpAwarded: 0,
        exitCode: 1,
        message: `Execution timed out after ${config.DOCKER_TIMEOUT / 1000} seconds.`,
      };
      res.status(StatusCodes.OK).json(result);
      return;
    }

    const passed = this.evaluateSuccess(level, dockerResult.stdout, dockerResult.exitCode);

    const result: ISubmissionResult = {
      levelId,
      passed,
      stdout: dockerResult.stdout,
      stderr: this.cleanStderr(dockerResult.stderr),
      xpAwarded: passed ? level.xpReward : 0,
      exitCode: dockerResult.exitCode,
      message: passed
        ? `Level complete! You earned ${level.xpReward} XP!`
        : 'Not quite right. Check your code and try again.',
    };

    res.status(StatusCodes.OK).json(result);
  }

  private cleanStderr(stderr: string): string {
    return stderr
      .split('\n')
      .filter((line) => {
        if (line.startsWith('DevTools listening on ws://')) return false;
        if (line.includes('tput: No value for $TERM')) return false;
        return true;
      })
      .join('\n')
      .trim();
  }

  private evaluateSuccess(level: ILevel, stdout: string, exitCode: number): boolean {
    const { type, value } = level.successCondition;

    switch (type) {
      case 'stdout_contains':
        return value ? stdout.includes(value) : exitCode === 0;
      case 'no_error':
        return exitCode === 0;
      case 'screenshot_exists':
        return stdout.includes('LEVEL_PASSED');
      default:
        return false;
    }
  }
}

export const submissionController = new SubmissionController();
