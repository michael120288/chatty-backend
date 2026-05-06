# Real-World: FINAL BOSS — Complete application test suite

**Level:** 255
**ID:** `vitest-255`
**XP:** 500
**Tags:** `integration`, `patterns`

## Objective

Complete the starter code using Real-World: FINAL BOSS so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Real-World: FINAL BOSS to implement the missing assertions and make everything pass.

## Hints
1. Section 16: Real-World Patterns

## Solution

```javascript
import { describe, test, expect, vi, beforeEach } from 'vitest';

interface Product { id: number; name: string; price: number; stock: number; }
interface CartItem { product: Product; qty: number; }

class ProductRepository {
  constructor(private db: Map<number, Product>) {}
  find(id: number): Product | undefined { return this.db.get(id); }
  update(id: number, changes: Partial<Product>): Product {
    const p = this.find(id);
    if (!p) throw new Error(\`Product \${id} not found\`);
    const updated = { ...p, ...changes };
    this.db.set(id, updated);
    return updated;
  }
}

class CartService {
  private items: CartItem[] = [];
  constructor(private repo: ProductRepository, private bus: { emit: (e: string, d: any) => void }) {}

  add(productId: number, qty: number): CartItem {
    const product = this.repo.find(productId);
    if (!product) throw new Error('Product not found');
    if (product.stock < qty) throw new Error('Insufficient stock');
    const existing = this.items.find(i => i.product.id === productId);
    if (existing) { existing.qty += qty; return existing; }
    const item: CartItem = { product, qty };
    this.items.push(item);
    this.bus.emit('cart:item-added', { productId, qty });
    return item;
  }

  remove(productId: number): boolean {
    const idx = this.items.findIndex(i => i.product.id === productId);
    if (idx === -1) return false;
    this.items.splice(idx, 1);
    return true;
  }

  total(): number {
    return this.items.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  }

  checkout(): { items: CartItem[]; total: number; orderId: string } {
    if (!this.items.length) throw new Error('Cart is empty');
    this.items.forEach(item => {
      this.repo.update(item.product.id, { stock: item.product.stock - item.qty });
    });
    const order = { items: [...this.items], total: this.total(), orderId: 'order-' + Date.now() };
    this.bus.emit('order:created', order);
    this.items = [];
    return order;
  }

  getItems(): CartItem[] { return [...this.items]; }
}

describe('CartService', () => {
  let db: Map<number, Product>;
  let repo: ProductRepository;
  let bus: { emit: ReturnType<typeof vi.fn> };
  let cart: CartService;

  beforeEach(() => {
    db = new Map([
      [1, { id: 1, name: 'Widget', price: 9.99, stock: 10 }],
      [2, { id: 2, name: 'Gadget', price: 24.99, stock: 5 }],
    ]);
    repo = new ProductRepository(db);
    bus = { emit: vi.fn() };
    cart = new CartService(repo, bus);
  });

  test('add item to cart', () => {
    const item = cart.add(1, 2);
    expect(item.product.name).toBe('Widget');
    expect(item.qty).toBe(2);
    expect(bus.emit).toHaveBeenCalledWith('cart:item-added', { productId: 1, qty: 2 });
  });

  test('add more of existing item', () => {
    cart.add(1, 2);
    cart.add(1, 3);
    expect(cart.getItems()[0].qty).toBe(5);
    expect(cart.getItems()).toHaveLength(1);
  });

  test('throws on insufficient stock', () => {
    expect(() => cart.add(2, 10)).toThrow('Insufficient stock');
  });

  test('total calculation', () => {
    cart.add(1, 2);
    cart.add(2, 1);
    expect(cart.total()).toBeCloseTo(9.99 * 2 + 24.99, 1);
  });

  test('checkout creates order and reduces stock', () => {
    cart.add(1, 3);
    const order = cart.checkout();
    expect(order.orderId).toMatch(/^order-/);
    expect(order.items).toHaveLength(1);
    expect(db.get(1)!.stock).toBe(7);
    expect(bus.emit).toHaveBeenCalledWith('order:created', expect.objectContaining({ total: expect.any(Number) }));
    expect(cart.getItems()).toHaveLength(0);
  });

  test('checkout throws on empty cart', () => {
    expect(() => cart.checkout()).toThrow('Cart is empty');
  });

  test('remove item from cart', () => {
    cart.add(1, 1);
    cart.add(2, 1);
    expect(cart.remove(1)).toBe(true);
    expect(cart.getItems()).toHaveLength(1);
    expect(cart.remove(99)).toBe(false);
  });
});
```

## Explanation

`Real` The ultimate Vitest challenge: test a complete mini-application with all concepts.

## Starter Code

```javascript
import { describe, test, expect, vi, beforeEach } from 'vitest';

// ---- Domain ----
interface Product { id: number; name: string; price: number; stock: number; }
interface CartItem { product: Product; qty: number; }

// ---- Repositories ----
class ProductRepository {
  constructor(private db: Map<number, Product>) {}
  find(id: number): Product | undefined { return this.db.get(id); }
  update(id: number, changes: Partial<Product>): Product {
    const p = this.find(id);
    if (!p) throw new Error(\`Product \${id} not found\`);
    const updated = { ...p, ...changes };
    this.db.set(id, updated);
    return updated;
  }
}

// ---- Services ----
class CartService {
  private items: CartItem[] = [];
  constructor(private repo: ProductRepository, private bus: { emit: (e: string, d: any) => void }) {}

  add(productId: number, qty: number): CartItem {
    const product = this.repo.find(productId);
    if (!product) throw new Error('Product not found');
    if (product.stock < qty) throw new Error('Insufficient stock');
    const existing = this.items.find(i => i.product.id === productId);
    if (existing) { existing.qty += qty; return existing; }
    const item: CartItem = { product, qty };
    this.items.push(item);
    this.bus.emit('cart:item-added', { productId, qty });
    return item;
  }

  remove(productId: number): boolean {
    const idx = this.items.findIndex(i => i.product.id === productId);
    if (idx === -1) return false;
    this.items.splice(idx, 1);
    return true;
  }

  total(): number {
    return this.items.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  }

  checkout(): { items: CartItem[]; total: number; orderId: string } {
    if (!this.items.length) throw new Error('Cart is empty');
    this.items.forEach(item => {
      this.repo.update(item.product.id, { stock: item.product.stock - item.qty });
    });
    const order = { items: [...this.items], total: this.total(), orderId: 'order-' + Date.now() };
    this.bus.emit('order:created', order);
    this.items = [];
    return order;
  }

  getItems(): CartItem[] { return [...this.items]; }
}

// ---- Tests ----
describe('CartService', () => {
  let db: Map<number, Product>;
  let repo: ProductRepository;
  let bus: { emit: ReturnType<typeof vi.fn> };
  let cart: CartService;

  beforeEach(() => {
    db = new Map([
      [1, { id: 1, name: 'Widget', price: 9.99, stock: 10 }],
      [2, { id: 2, name: 'Gadget', price: 24.99, stock: 5 }],
    ]);
    repo = new ProductRepository(db);
    bus = { emit: vi.fn() };
    cart = new CartService(repo, bus);
  });

  test('add item to cart', () => {
    const item = cart.add(1, 2);
    // TODO: add assertion using Real-World: FINAL BOSS
    // TODO: add assertion using Real-World: FINAL BOSS
    // TODO: add assertion using Real-World: FINAL BOSS
  });

  test('add more of existing item', () => {
    cart.add(1, 2);
    cart.add(1, 3);
    // TODO: add assertion using Real-World: FINAL BOSS
    // TODO: add assertion using Real-World: FINAL BOSS
  });

  test('throws on insufficient stock', () => {
    // TODO: add assertion using Real-World: FINAL BOSS
  });

  test('total calculation', () => {
    cart.add(1, 2);
    cart.add(2, 1);
    // TODO: add assertion using Real-World: FINAL BOSS
  });

  test('checkout creates order and reduces stock', () => {
    cart.add(1, 3);
    const order = cart.checkout();
    // TODO: add assertion using Real-World: FINAL BOSS
    // TODO: add assertion using Real-World: FINAL BOSS
    // TODO: add assertion using Real-World: FINAL BOSS
    // TODO: add assertion using Real-World: FINAL BOSS
    // TODO: add assertion using Real-World: FINAL BOSS
  });

  test('checkout throws on empty cart', () => {
    // TODO: add assertion using Real-World: FINAL BOSS
  });

  test('remove item from cart', () => {
    cart.add(1, 1);
    cart.add(2, 1);
    // TODO: add assertion using Real-World: FINAL BOSS
    // TODO: add assertion using Real-World: FINAL BOSS
    // TODO: add assertion using Real-World: FINAL BOSS
  });
});
```
