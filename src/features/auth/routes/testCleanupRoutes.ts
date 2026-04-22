import express, { Router } from 'express';
import { testCleanup } from '@auth/controllers/test-cleanup';

class TestCleanupRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
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
