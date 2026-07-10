import rateLimit from 'express-rate-limit';

const BYPASS_SECRET = 'chatty-test-cleanup-2026';

/**
 * Auth rate limiter — 5 requests per minute on /signin and /signup.
 * Requests with the correct x-test-secret header (vitest / pytest / pw_ accounts) are skipped.
 */
export const authRateLimit = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: { message: 'Too many attempts, please try again after 15 minutes.', status: 'error', statusCode: 429 },
  skip: (req) => req.headers['x-test-secret'] === BYPASS_SECRET,
  standardHeaders: true,
  legacyHeaders: false,
});
