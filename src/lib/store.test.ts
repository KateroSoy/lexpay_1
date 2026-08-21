import { describe, it, expect, beforeEach } from 'vitest';
import { useCartStore, CartItem } from './store';

describe('useCartStore', () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
  });

  const mockItem: CartItem = {
    id: 'p1-black',
    productId: 'p1',
    type: 'product',
    name: 'Mechanical Keyboard Pro X',
    price: 799000,
    quantity: 1,
    image: '/a269c596-84de-46c4-9e8f-05a50e6c86e0.jfif',
    metadata: { variant: 'Black' }
  };

  it('should start with an empty cart', () => {
    expect(useCartStore.getState().items.length).toBe(0);
    expect(useCartStore.getState().getItemCount()).toBe(0);
    expect(useCartStore.getState().getTotal()).toBe(0);
  });

  it('should add an item to the cart', () => {
    useCartStore.getState().addItem(mockItem);
    expect(useCartStore.getState().items.length).toBe(1);
    expect(useCartStore.getState().items[0]).toEqual(mockItem);
  });

  it('should increase quantity if adding the same item again', () => {
    useCartStore.getState().addItem(mockItem);
    useCartStore.getState().addItem(mockItem);
    expect(useCartStore.getState().items.length).toBe(1);
    expect(useCartStore.getState().items[0].quantity).toBe(2);
  });

  it('should remove an item', () => {
    useCartStore.getState().addItem(mockItem);
    useCartStore.getState().removeItem(mockItem.id);
    expect(useCartStore.getState().items.length).toBe(0);
  });

  it('should update item quantity', () => {
    useCartStore.getState().addItem(mockItem);
    useCartStore.getState().updateQuantity(mockItem.id, 5);
    expect(useCartStore.getState().items[0].quantity).toBe(5);
  });

  it('should calculate total correctly', () => {
    useCartStore.getState().addItem(mockItem);
    useCartStore.getState().addItem({ ...mockItem, id: 's1', price: 75000 });
    
    // 799000 + 75000 = 874000
    expect(useCartStore.getState().getTotal()).toBe(874000);
  });

  it('should clear the cart', () => {
    useCartStore.getState().addItem(mockItem);
    useCartStore.getState().clearCart();
    expect(useCartStore.getState().items.length).toBe(0);
  });
});
