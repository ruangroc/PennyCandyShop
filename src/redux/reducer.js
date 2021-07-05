import { combineReducers } from 'redux';

import {
    INVENTORY_ADD,
    INVENTORY_INCREMENT,
    INVENTORY_DECREMENT,
    CART_ADD,
    CART_REMOVE
} from './actions';

// What will my redux store look like?
// Will store as objects in order to access items using product id
/*
 * state = {
 *   inventory: { product_id: {name, price, inStock, photoUrl}, ... },
 *   cart: { product_id: {name, price, amount}, ... }
 * }
 */


function inventoryReducer(state = {}, action) {
    var id = action.productId;
    switch (action.type) {
        case INVENTORY_ADD:
            return {
                ...state,
                [id]: action.product
            };
        case INVENTORY_INCREMENT:
            return {
                ...state,
                [id]: {
                    ...state[id],
                    inStock: state[id].inStock + action.amount
                }
            };
        case INVENTORY_DECREMENT:
            return {
                ...state,
                [id]: {
                    ...state[id],
                    inStock: state[id].inStock - action.amount
                }
            };
        default:
            return state;
    }
}

function cartReducer(state = {}, action) {
    switch (action.type) {
        case CART_ADD:
            if (state[action.productId]) {
                return {
                    ...state,
                    [action.productId]: state[action.productId] + action.amount
                };
            }
            return {
                ...state,
                [action.productId]: action.amount
            };
        case CART_REMOVE:
            var newState = {};
            for (var i in state) {
                if (i != action.productId) {
                    newState[i] = state[i];
                }
            }
            return newState;
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    inventory: inventoryReducer,
    cart: cartReducer
});
export default rootReducer;