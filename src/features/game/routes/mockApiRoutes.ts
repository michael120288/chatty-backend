import { Router, Request, Response } from 'express';

/**
 * Mock API routes consumed by the target pages served at /pages/*.
 * These endpoints must be unauthenticated — the pages are loaded in iframes
 * and don't carry session cookies.
 *
 * They return default data when no Playwright route interception is active
 * (i.e. when the iframe preview loads the page directly).
 */

class MockApiRoutes {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  public routes(): Router {
    // ── /api/items — used by level-08 (The Interceptor) ──────────────────────
    this.router.get('/items', (_req: Request, res: Response) => {
      res.status(200).json([
        { id: 1, name: 'Iron Sword', rarity: 'common' },
        { id: 2, name: 'Silver Shield', rarity: 'uncommon' },
        { id: 3, name: 'Golden Bow', rarity: 'rare' },
      ]);
    });

    // ── /api/heroes — used by level-21, level-69 ─────────────────────────────
    this.router.get('/heroes', (_req: Request, res: Response) => {
      res.status(200).json({
        heroes: [
          { name: 'Elara', class: 'Ranger', level: 12 },
          { name: 'Dorin', class: 'Warrior', level: 8 },
          { name: 'Sylas', class: 'Mage', level: 15 },
        ]
      });
    });

    // ── /api/quests — used by level-21 (Twin API Master) ─────────────────────
    this.router.get('/quests', (_req: Request, res: Response) => {
      res.status(200).json({
        quests: [
          { title: 'Clear the Dungeon', difficulty: 'Easy', reward: 100 },
          { title: 'Defeat the Troll', difficulty: 'Medium', reward: 250 },
          { title: 'Retrieve the Amulet', difficulty: 'Hard', reward: 500 },
        ]
      });
    });

    // ── /api/arcane-feed — used by level-25 (Archmage's Gauntlet) ────────────
    this.router.get('/arcane-feed', (_req: Request, res: Response) => {
      res.status(200).json({
        spells: [
          { name: 'Magic Missile', power: 42 },
          { name: 'Fireball', power: 78 },
          { name: 'Frostbolt', power: 55 },
        ]
      });
    });

    // ── /api/coupon — used by level-24 (Grand Emporium) ──────────────────────
    this.router.get('/coupon', (req: Request, res: Response) => {
      const code = req.query.code as string;
      if (code === 'ARCANE100') {
        res.status(200).json({ code: 'ARCANE100', discount: 100, valid: true });
      } else {
        res.status(200).json({ code, discount: 0, valid: false });
      }
    });

    return this.router;
  }
}

export const mockApiRoutes: MockApiRoutes = new MockApiRoutes();
