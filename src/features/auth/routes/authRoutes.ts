import { Password } from '@auth/controllers/password';
import { SignIn } from '@auth/controllers/signin';
import { SignOut } from '@auth/controllers/signout';
import { SignUp } from '@auth/controllers/signup';
import { sso } from '@auth/controllers/sso';
import { sessionToken } from '@auth/controllers/session-token';
import express, { Router } from 'express';

class AuthRoutes {
  private signUp: SignUp;
  private signIn: SignIn;
  private password: Password;
  private signOut: SignOut;

  constructor() {
    this.signUp = new SignUp();
    this.signIn = new SignIn();
    this.password = new Password();
    this.signOut = new SignOut();
  }

  public routes(): Router {
    const router: Router = express.Router();

    router.post('/signup', this.signUp.create.bind(this.signUp));
    router.post('/signin', this.signIn.read.bind(this.signIn));
    router.post('/forgot-password', this.password.create.bind(this.password));
    router.post('/reset-password/:token', this.password.update.bind(this.password));
    router.get('/signout', this.signOut.update.bind(this.signOut));
    router.post('/sso', sso.login.bind(sso));
    router.get('/session-token', sessionToken.read.bind(sessionToken));

    return router;
  }
}

export const authRoutes: AuthRoutes = new AuthRoutes();
