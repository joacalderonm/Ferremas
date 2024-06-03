import { createContext, useReducer, useContext, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const existingProduct = state.find(item => item.productoID === action.product.productoID);
            if (existingProduct) {
                return state.map(item =>
                    item.productoID === action.product.productoID
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...state, { ...action.product, quantity: 1 }];
        }
        case 'REMOVE_FROM_CART':
            return state.filter(item => item.productoID !== action.id);
        case 'UPDATE_QUANTITY':
            return state.map(item =>
                item.productoID === action.id
                    ? { ...item, quantity: action.quantity }
                    : item
            );
        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, [], () => {
        const localData = localStorage.getItem('cart');
        return localData ? JSON.parse(localData) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    return (
        <CartContext.Provider value={{ cart, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};
