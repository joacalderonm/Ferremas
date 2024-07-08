import { createContext, useReducer, useContext, useEffect } from 'react';
import { fetchProductoById } from '../api/apiProducto';

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const existingProduct = state.find(item => item.productoID === action.product.productoID);
            if (existingProduct) {
                if (existingProduct.quantity + 1 > action.product.stock) {
                    alert('No hay suficiente stock disponible');
                    return state;
                }
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
        case 'UPDATE_QUANTITY': {
            if (action.quantity > action.product.stock) {
                alert('No hay suficiente stock disponible');
                return state;
            }
            return action.quantity === 0
                ? state.filter(item => item.productoID !== action.id)
                : state.map(item =>
                    item.productoID === action.id
                        ? { ...item, quantity: action.quantity }
                        : item
                );
        }
        case 'CLEAR_CART':
            return [];
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

    const getStock = async (productoID) => {
        try {
            const producto = await fetchProductoById(productoID);
            return producto.stock;
        } catch (error) {
            console.error('Error al obtener el stock del producto:', error);
            return 0;
        }
    };

    return (
        <CartContext.Provider value={{ cart, dispatch, getStock }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};
