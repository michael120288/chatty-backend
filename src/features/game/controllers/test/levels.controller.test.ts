import { Request, Response } from 'express';
import { levelsController } from '@game/controllers/levels.controller';
import levelsData from '@root/data/levels.json';

const mockReq = (params: Record<string, string> = {}): Request =>
  ({ params } as unknown as Request);

const mockRes = (): Response => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('LevelsController', () => {
  describe('getLevels', () => {
    it('returns 200 with the full levels array', () => {
      const req = mockReq();
      const res = mockRes();
      levelsController.getLevels(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ levels: levelsData });
    });

    it('returns all levels without modification', () => {
      const req = mockReq();
      const res = mockRes();
      levelsController.getLevels(req, res);
      const body = (res.json as jest.Mock).mock.calls[0][0];
      expect(body.levels).toHaveLength(levelsData.length);
      expect(body.levels[0]).toHaveProperty('id');
      expect(body.levels[0]).toHaveProperty('title');
      expect(body.levels[0]).toHaveProperty('xpReward');
    });
  });

  describe('getLevel', () => {
    it('returns 200 with the matching level', () => {
      const first = levelsData[0];
      const req = mockReq({ id: first.id });
      const res = mockRes();
      levelsController.getLevel(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ level: first });
    });

    it('returns any level by id', () => {
      const target = levelsData[Math.floor(levelsData.length / 2)];
      const req = mockReq({ id: target.id });
      const res = mockRes();
      levelsController.getLevel(req, res);
      const body = (res.json as jest.Mock).mock.calls[0][0];
      expect(body.level.id).toBe(target.id);
      expect(body.level.title).toBe(target.title);
    });

    it('returns 404 for an unknown id', () => {
      const req = mockReq({ id: 'does-not-exist-999' });
      const res = mockRes();
      levelsController.getLevel(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Level 'does-not-exist-999' not found.",
      });
    });

    it('returns 404 for an empty string id', () => {
      const req = mockReq({ id: '' });
      const res = mockRes();
      levelsController.getLevel(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });
  });
});
