import { CurrentUser } from '@auth/controllers/current-user';
import { sessionToken } from '@auth/controllers/session-token';
import express, { Router } from 'express';
import { authMiddleware } from '@global/helpers/auth-middleware';

class CurrentUserRoutes {
  private router: Router;
  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get(
      '/currentuser',
      authMiddleware.checkAuthentication,
      CurrentUser.prototype.read,
    );
    this.router.get(
      '/session-token',
      authMiddleware.checkAuthentication,
      sessionToken.read.bind(sessionToken),
    );

    return this.router;
  }
}
export const currentUserRoutes: CurrentUserRoutes = new CurrentUserRoutes();
