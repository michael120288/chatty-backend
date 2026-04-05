import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import { BadRequestError } from '@global/helpers/error-handler';

/**
 * Returns an Express middleware that validates one or more URL params are valid MongoDB ObjectIds.
 * Usage: router.get('/post/:postId', validateObjectId('postId'), handler)
 */
export function validateObjectId(...paramNames: string[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    for (const param of paramNames) {
      const value = req.params[param];
      if (value && !Types.ObjectId.isValid(value)) {
        throw new BadRequestError(`Invalid ${param}: "${value}" is not a valid ID`);
      }
    }
    next();
  };
}
