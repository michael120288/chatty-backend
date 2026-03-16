import { Request, Response } from 'express';
import { IDockerRunResult } from '@game/interfaces/game.interface';
import levelsData from '@root/data/levels.json';

// Mock docker.service before importing the controller so uuid (ESM) is never loaded
jest.mock('@game/services/docker.service', () => ({
  dockerService: {
    runCode: jest.fn(),
    runCypressCode: jest.fn(),
    runCypressComponentCode: jest.fn(),
  },
}));

import { submissionController } from '@game/controllers/submission.controller';
import { validationService } from '@game/services/validation.service';
import { dockerService } from '@game/services/docker.service';

const mockReq = (body: Record<string, unknown> = {}): Request =>
  ({ body } as unknown as Request);

const mockRes = (): Response => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const dockerOk = (overrides: Partial<IDockerRunResult> = {}): IDockerRunResult => ({
  stdout: '',
  stderr: '',
  exitCode: 0,
  timedOut: false,
  ...overrides,
});

// Pick real levels to drive the tests
const cypressLevel = levelsData.find((l) => l.tool === 'cypress' && l.successCondition.type === 'no_error')!;
const nodeLevel = levelsData.find((l) => !l.tool || l.tool === 'playwright')!;
const componentLevel = levelsData.find((l) => l.tool === 'cypress-component');
const stdoutLevel = levelsData.find(
  (l) => l.successCondition.type === 'stdout_contains' && l.successCondition.value
);
const screenshotLevel = levelsData.find((l) => l.successCondition.type === 'screenshot_exists');

const VALID_CODE = `describe('t', () => { it('p', () => { cy.wrap(1).should('eq', 1); }); });`;

describe('SubmissionController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(validationService, 'validate').mockReturnValue({ valid: true });
  });

  // ── Request validation ────────────────────────────────────────────────────

  describe('missing fields', () => {
    it('returns 400 when levelId is missing', async () => {
      const res = mockRes();
      await submissionController.submit(mockReq({ code: VALID_CODE }), res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'levelId and code are required.' });
    });

    it('returns 400 when code is missing', async () => {
      const res = mockRes();
      await submissionController.submit(mockReq({ levelId: cypressLevel.id }), res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'levelId and code are required.' });
    });

    it('returns 400 when both fields are missing', async () => {
      const res = mockRes();
      await submissionController.submit(mockReq({}), res);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  // ── Level lookup ──────────────────────────────────────────────────────────

  describe('level not found', () => {
    it('returns 404 for an unknown levelId', async () => {
      const res = mockRes();
      await submissionController.submit(mockReq({ levelId: 'ghost-999', code: VALID_CODE }), res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Level 'ghost-999' not found." });
    });
  });

  // ── Code validation ───────────────────────────────────────────────────────

  describe('code validation', () => {
    it('returns 422 when validation fails', async () => {
      jest.spyOn(validationService, 'validate').mockReturnValue({
        valid: false,
        reason: 'Forbidden pattern detected',
      });
      const res = mockRes();
      await submissionController.submit(
        mockReq({ levelId: cypressLevel.id, code: 'eval("bad")' }),
        res
      );
      expect(res.status).toHaveBeenCalledWith(422);
      const body = (res.json as jest.Mock).mock.calls[0][0];
      expect(body.passed).toBe(false);
      expect(body.xpAwarded).toBe(0);
      expect(body.stderr).toBe('Forbidden pattern detected');
      expect(body.message).toMatch(/Code validation failed/);
    });

    it('calls validationService.validate with the submitted code', async () => {
      (dockerService.runCypressCode as jest.Mock).mockResolvedValue(dockerOk());
      const res = mockRes();
      await submissionController.submit(
        mockReq({ levelId: cypressLevel.id, code: VALID_CODE }),
        res
      );
      expect(validationService.validate).toHaveBeenCalledWith(VALID_CODE);
    });
  });

  // ── Docker routing ────────────────────────────────────────────────────────

  describe('docker service routing', () => {
    it('calls runCypressCode for cypress tool levels', async () => {
      (dockerService.runCypressCode as jest.Mock).mockResolvedValue(dockerOk());
      const res = mockRes();
      await submissionController.submit(
        mockReq({ levelId: cypressLevel.id, code: VALID_CODE }),
        res
      );
      expect(dockerService.runCypressCode).toHaveBeenCalledWith(VALID_CODE);
    });

    if (componentLevel) {
      it('calls runCypressComponentCode for cypress-component levels', async () => {
        (dockerService.runCypressComponentCode as jest.Mock).mockResolvedValue(dockerOk());
        const res = mockRes();
        await submissionController.submit(
          mockReq({ levelId: componentLevel.id, code: VALID_CODE }),
          res
        );
        expect(dockerService.runCypressComponentCode).toHaveBeenCalledWith(VALID_CODE);
      });
    }

    it('calls runCode for non-cypress levels', async () => {
      (dockerService.runCode as jest.Mock).mockResolvedValue(dockerOk());
      const res = mockRes();
      await submissionController.submit(
        mockReq({ levelId: nodeLevel.id, code: VALID_CODE }),
        res
      );
      expect(dockerService.runCode).toHaveBeenCalledWith(VALID_CODE);
    });
  });

  // ── Timeout handling ──────────────────────────────────────────────────────

  describe('timeout', () => {
    it('returns passed=false with timeout message when docker times out', async () => {
      (dockerService.runCypressCode as jest.Mock).mockResolvedValue(
        dockerOk({ timedOut: true, exitCode: 1 })
      );
      const res = mockRes();
      await submissionController.submit(
        mockReq({ levelId: cypressLevel.id, code: VALID_CODE }),
        res
      );
      expect(res.status).toHaveBeenCalledWith(200);
      const body = (res.json as jest.Mock).mock.calls[0][0];
      expect(body.passed).toBe(false);
      expect(body.xpAwarded).toBe(0);
      expect(body.message).toMatch(/timed out/);
    });
  });

  // ── Success evaluation ────────────────────────────────────────────────────

  describe('success evaluation — no_error', () => {
    it('passes when exit code is 0', async () => {
      (dockerService.runCypressCode as jest.Mock).mockResolvedValue(
        dockerOk({ stdout: 'All specs passed!', exitCode: 0 })
      );
      const res = mockRes();
      await submissionController.submit(
        mockReq({ levelId: cypressLevel.id, code: VALID_CODE }),
        res
      );
      const body = (res.json as jest.Mock).mock.calls[0][0];
      expect(body.passed).toBe(true);
      expect(body.xpAwarded).toBe(cypressLevel.xpReward);
      expect(body.message).toMatch(/Level complete/);
      expect(body.message).toContain(String(cypressLevel.xpReward));
    });

    it('fails when exit code is non-zero', async () => {
      (dockerService.runCypressCode as jest.Mock).mockResolvedValue(
        dockerOk({ stdout: '1 failing', exitCode: 1 })
      );
      const res = mockRes();
      await submissionController.submit(
        mockReq({ levelId: cypressLevel.id, code: VALID_CODE }),
        res
      );
      const body = (res.json as jest.Mock).mock.calls[0][0];
      expect(body.passed).toBe(false);
      expect(body.xpAwarded).toBe(0);
      expect(body.message).toMatch(/Not quite right/);
    });
  });

  if (stdoutLevel) {
    describe('success evaluation — stdout_contains', () => {
      it('passes when stdout contains the expected value', async () => {
        (dockerService.runCode as jest.Mock).mockResolvedValue(
          dockerOk({ stdout: stdoutLevel.successCondition.value!, exitCode: 0 })
        );
        const res = mockRes();
        await submissionController.submit(
          mockReq({ levelId: stdoutLevel.id, code: VALID_CODE }),
          res
        );
        const body = (res.json as jest.Mock).mock.calls[0][0];
        expect(body.passed).toBe(true);
      });

      it('fails when stdout does not contain the expected value', async () => {
        (dockerService.runCode as jest.Mock).mockResolvedValue(
          dockerOk({ stdout: 'wrong output', exitCode: 0 })
        );
        const res = mockRes();
        await submissionController.submit(
          mockReq({ levelId: stdoutLevel.id, code: VALID_CODE }),
          res
        );
        const body = (res.json as jest.Mock).mock.calls[0][0];
        expect(body.passed).toBe(false);
      });
    });
  }

  if (screenshotLevel) {
    describe('success evaluation — screenshot_exists', () => {
      it('passes when stdout contains LEVEL_PASSED', async () => {
        (dockerService.runCypressCode as jest.Mock).mockResolvedValue(
          dockerOk({ stdout: 'LEVEL_PASSED', exitCode: 0 })
        );
        const res = mockRes();
        await submissionController.submit(
          mockReq({ levelId: screenshotLevel.id, code: VALID_CODE }),
          res
        );
        const body = (res.json as jest.Mock).mock.calls[0][0];
        expect(body.passed).toBe(true);
      });
    });
  }

  // ── stderr cleaning ───────────────────────────────────────────────────────

  describe('stderr cleaning', () => {
    it('strips DevTools listening lines', async () => {
      (dockerService.runCypressCode as jest.Mock).mockResolvedValue(
        dockerOk({
          stderr: 'DevTools listening on ws://127.0.0.1:1234\nActual error here',
          exitCode: 1,
        })
      );
      const res = mockRes();
      await submissionController.submit(
        mockReq({ levelId: cypressLevel.id, code: VALID_CODE }),
        res
      );
      const { stderr } = (res.json as jest.Mock).mock.calls[0][0];
      expect(stderr).toBe('Actual error here');
      expect(stderr).not.toMatch(/DevTools/);
    });

    it('strips tput TERM lines', async () => {
      (dockerService.runCypressCode as jest.Mock).mockResolvedValue(
        dockerOk({
          stderr: 'tput: No value for $TERM and no -T specified\nReal error',
          exitCode: 1,
        })
      );
      const res = mockRes();
      await submissionController.submit(
        mockReq({ levelId: cypressLevel.id, code: VALID_CODE }),
        res
      );
      const { stderr } = (res.json as jest.Mock).mock.calls[0][0];
      expect(stderr).toBe('Real error');
      expect(stderr).not.toMatch(/tput/);
    });

    it('strips both noise lines together, keeping real errors', async () => {
      (dockerService.runCypressCode as jest.Mock).mockResolvedValue(
        dockerOk({
          stderr: [
            'DevTools listening on ws://127.0.0.1:9222',
            'tput: No value for $TERM and no -T specified',
            'AssertionError: expected false to equal true',
          ].join('\n'),
          exitCode: 1,
        })
      );
      const res = mockRes();
      await submissionController.submit(
        mockReq({ levelId: cypressLevel.id, code: VALID_CODE }),
        res
      );
      const { stderr } = (res.json as jest.Mock).mock.calls[0][0];
      expect(stderr).toBe('AssertionError: expected false to equal true');
    });

    it('returns empty string when stderr is all noise', async () => {
      (dockerService.runCypressCode as jest.Mock).mockResolvedValue(
        dockerOk({
          stderr: 'DevTools listening on ws://127.0.0.1:9222\ntput: No value for $TERM',
          exitCode: 0,
        })
      );
      const res = mockRes();
      await submissionController.submit(
        mockReq({ levelId: cypressLevel.id, code: VALID_CODE }),
        res
      );
      const { stderr } = (res.json as jest.Mock).mock.calls[0][0];
      expect(stderr).toBe('');
    });
  });

  // ── Response shape ────────────────────────────────────────────────────────

  describe('response shape', () => {
    it('always includes all required fields', async () => {
      (dockerService.runCypressCode as jest.Mock).mockResolvedValue(dockerOk({ exitCode: 0 }));
      const res = mockRes();
      await submissionController.submit(
        mockReq({ levelId: cypressLevel.id, code: VALID_CODE }),
        res
      );
      const body = (res.json as jest.Mock).mock.calls[0][0];
      expect(body).toHaveProperty('levelId', cypressLevel.id);
      expect(body).toHaveProperty('passed');
      expect(body).toHaveProperty('stdout');
      expect(body).toHaveProperty('stderr');
      expect(body).toHaveProperty('xpAwarded');
      expect(body).toHaveProperty('exitCode');
      expect(body).toHaveProperty('message');
    });
  });
});
