import express, { Router } from 'express';
import { testCleanup } from '@auth/controllers/test-cleanup';
import { SignIn } from '@auth/controllers/signin';
import { SignUp } from '@auth/controllers/signup';

const signIn: SignIn = new SignIn();
const signUp: SignUp = new SignUp();

class TestCleanupRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    // POST /api/v1/test/signin — rate-limit-free signin for vitest accounts
    // Required header: x-test-secret: chatty-test-cleanup-2026
    // Safety: only works for usernames starting with "vitest"
    this.router.post('/test/signin', signIn.read.bind(signIn));

    // POST /api/v1/test/signup — rate-limit-free signup for vitest accounts
    // Required header: x-test-secret: chatty-test-cleanup-2026
    // Safety: only works for usernames starting with "vitest"
    this.router.post('/test/signup', signUp.create.bind(signUp));

    // DELETE /api/v1/test/cleanup/user/:authId
    // Required header: x-test-secret: chatty-test-cleanup-2026
    // Safety: only deletes users whose username starts with "vitest"
    this.router.delete(
      '/test/cleanup/user/:authId',
      testCleanup.deleteUser.bind(testCleanup)
    );

    return this.router;
  }
}

export const testCleanupRoutes: TestCleanupRoutes = new TestCleanupRoutes();
