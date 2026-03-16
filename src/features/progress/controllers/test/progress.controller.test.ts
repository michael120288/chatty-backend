import { Request, Response } from 'express';
import { progressController } from '@progress/controllers/progress.controller';
import { ProgressModel } from '@progress/models/progress.model';
import { authMockRequest, authMockResponse, authUserPayload } from '@root/mocks/auth.mock';

jest.mock('@progress/models/progress.model');

const mockNext = jest.fn();

describe('ProgressController', () => {
  let res: Response;

  beforeEach(() => {
    jest.clearAllMocks();
    res = authMockResponse();
  });

  // ── getProgress ──────────────────────────────────────────────────────────

  describe('getProgress', () => {
    it('returns empty progress when no record found', async () => {
      (ProgressModel.findOne as jest.Mock).mockResolvedValueOnce(null);
      const req = authMockRequest({}, {}, authUserPayload) as unknown as Request;

      await progressController.getProgress(req, res);

      expect(ProgressModel.findOne).toHaveBeenCalledWith({ userId: authUserPayload.userId });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ completedLevels: [], xp: 0 });
    });

    it('returns stored progress when record exists', async () => {
      const stored = { completedLevels: ['cy-01', 'cy-02'], xp: 300 };
      (ProgressModel.findOne as jest.Mock).mockResolvedValueOnce(stored);
      const req = authMockRequest({}, {}, authUserPayload) as unknown as Request;

      await progressController.getProgress(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ completedLevels: stored.completedLevels, xp: stored.xp });
    });
  });

  // ── saveProgress ─────────────────────────────────────────────────────────

  describe('saveProgress', () => {
    it('upserts the progress document and responds with 200', async () => {
      (ProgressModel.findOneAndUpdate as jest.Mock).mockResolvedValueOnce({});
      const req = authMockRequest(
        {},
        { completedLevels: ['cy-01'], xp: 150 } as any,
        authUserPayload
      ) as unknown as Request;

      await progressController.saveProgress(req, res);

      expect(ProgressModel.findOneAndUpdate).toHaveBeenCalledWith(
        { userId: authUserPayload.userId },
        expect.objectContaining({ completedLevels: ['cy-01'], xp: 150 }),
        { upsert: true, new: true }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Progress saved' });
    });

    it('passes an updatedAt timestamp to the update', async () => {
      (ProgressModel.findOneAndUpdate as jest.Mock).mockResolvedValueOnce({});
      const req = authMockRequest({}, { completedLevels: [], xp: 0 } as any, authUserPayload) as unknown as Request;

      await progressController.saveProgress(req, res);

      const updateArg = (ProgressModel.findOneAndUpdate as jest.Mock).mock.calls[0][1];
      expect(updateArg.updatedAt).toBeInstanceOf(Date);
    });
  });
});
