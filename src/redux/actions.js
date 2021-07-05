export const CART_ADD = 'CART_ADD';
export const CART_REMOVE = 'CART_REMOVE';
export const INVENTORY_ADD = 'INVENTORY_ADD';
export const INVENTORY_INCREMENT = 'INVENTORY_INCREMENT';
export const INVENTORY_DECREMENT = 'INVENTORY_DECREMENT';

export function cartAdd(product, amount) {
    return { type: CART_ADD, productId: product.id, amount, product };
}

export function cartRemove(productId) {
    return { type: CART_REMOVE, productId };
}

export function inventoryAdd(product) {
    return { type: INVENTORY_ADD, productId: product.id, product };
}

export function inventoryIncrement(product, amount) {
    return { type: INVENTORY_INCREMENT, productId: product.id, amount, product };
}

export function inventoryDecrement(product, amount) {
    return { type: INVENTORY_DECREMENT, productId: product.id, amount, product };
}