import { Password } from '@auth/controllers/password';
import { SignIn } from '@auth/controllers/signin';
import { SignOut } from '@auth/controllers/signout';
import { SignUp } from '@auth/controllers/signup';
import { sso } from '@auth/controllers/sso';
import { config } from '@root/config';
import express, { Router } from 'express';
import rateLimit from 'express-rate-limit';

const bypassForTestAccounts = (req: express.Request) =>
  !!config.TEST_CLEANUP_SECRET && req.headers['x-test-secret'] === config.TEST_CLEANUP_SECRET;

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many attempts, please try again after 15 minutes.' },
  skip: bypassForTestAccounts,
});

// forgot-password/reset-password/sso have no username-prefix gate downstream, so a full
// skip on the test header would give anyone who reads the (public) test secret unlimited
// requests against real accounts. Give the header a relaxed cap instead of no cap at all.
const relaxedTestLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many attempts, please try again after 15 minutes.' },
  skip: (req: express.Request) => !bypassForTestAccounts(req),
});

// Signup rate limit removed — this is a QA learning platform where students
// create pw_* test accounts frequently. The /test/cleanup endpoint handles data cleanup.

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
    router.post('/signin', authLimiter, this.signIn.read.bind(this.signIn));
    router.post('/forgot-password', authLimiter, relaxedTestLimiter, this.password.create.bind(this.password));
    router.post('/reset-password/:token', authLimiter, relaxedTestLimiter, this.password.update.bind(this.password));
    router.post('/signout', this.signOut.update.bind(this.signOut));
    router.post('/sso', authLimiter, relaxedTestLimiter, sso.login.bind(sso));

    return router;
  }
}

export const authRoutes: AuthRoutes = new AuthRoutes();
