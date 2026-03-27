import { Password } from '@auth/controllers/password';
import { SignIn } from '@auth/controllers/signin';
import { SignOut } from '@auth/controllers/signout';
import { SignUp } from '@auth/controllers/signup';
import { sso } from '@auth/controllers/sso';
import express, { Router } from 'express';
import rateLimit from 'express-rate-limit';

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many attempts, please try again after 15 minutes.' }
});

const signupLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many accounts created from this IP, please try again after an hour.' }
});

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

    router.post('/signup', signupLimiter, this.signUp.create.bind(this.signUp));
    router.post('/signin', authLimiter, this.signIn.read.bind(this.signIn));
    router.post('/forgot-password', authLimiter, this.password.create.bind(this.password));
    router.post('/reset-password/:token', authLimiter, this.password.update.bind(this.password));
    router.post('/signout', this.signOut.update.bind(this.signOut));
    router.post('/sso', sso.login.bind(sso));

    return router;
  }
}

export const authRoutes: AuthRoutes = new AuthRoutes();
