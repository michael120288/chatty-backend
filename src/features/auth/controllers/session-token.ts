import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';

export class SessionToken {
  public read(req: Request, res: Response): void {
    const token = req.session?.jwt ?? null;
    res.status(HTTP_STATUS.OK).json({ token });
  }
}

export const sessionToken = new SessionToken();
