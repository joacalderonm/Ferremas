import { useState } from 'react';
import { useCart } from '../components/CartContext';
import { fetchCarrito, fetchCreate } from '../api/apiWebpayPlus';
import "../css/Styles.css";


const CartPage = () => {
    const { cart, dispatch } = useCart();
    const [deliveryOption, setDeliveryOption] = useState('retiro');
    const [confirmPurchase, setConfirmPurchase] = useState(false);
    const [transaccion, setTransaccion] = useState(null);

    const handleRemoveFromCart = (productoID) => {
        dispatch({ type: 'REMOVE_FROM_CART', id: productoID });
    };

    const handleUpdateQuantity = (productoID, quantity) => {
        if (quantity >= 1) {
            dispatch({ type: 'UPDATE_QUANTITY', id: productoID, quantity });
        }
    };

    const calculateTotalPerProduct = (price, quantity) => {
        return price * quantity;
    };

    const calculateSubtotal = () => {
        return cart.reduce((total, item) => {
            return total + (item.precio * item.quantity);
        }, 0);
    };

    const calculateTotalCart = () => {
        const subtotal = calculateSubtotal();
        const envio = deliveryOption === 'delivery' ? 10000 : 0;
        return subtotal + envio;
    };

    const handleConfirmPurchase = async () => {
        const carritoData = {
            clienteID: 1,
            productos: cart.map(item => ({
                productoID: item.productoID,
                cantidad: item.quantity,
                precio: item.precio
            })),
            total: calculateTotalCart()
        };

        try {
            const response = await fetchCarrito(carritoData);
            console.log('Compra confirmada:', response);
            setConfirmPurchase(true);

            const dataOrder = {
                buyOrder: response.buyOrder,
                sessionId: response.sessionId,
                amount: carritoData.total
            };

            console.log(dataOrder);

            const dataCreate = await fetchCreate(dataOrder);
            setTransaccion(dataCreate);

            localStorage.setItem('webpayToken', dataCreate.token);

            const form = document.createElement('form');
            form.action = dataCreate.url;
            form.method = 'POST';

            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = 'token_ws';
            input.value = dataCreate.token;
            form.appendChild(input);

            document.body.appendChild(form);
            form.submit();
        } catch (error) {
            console.error('Error al confirmar la compra:', error);
        }
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Carrito de Compras</h2>
            <div className="text-center mb-4">
                <p className="text-lg font-semibold">
                    Tienes {cart.length} {cart.length === 1 ? 'producto' : 'productos'} en tu carrito.
                </p>
            </div>
            {cart.length > 0 && (
                <div className="flex justify-center mb-4">
                    <button
                        className={`px-4 py-2 mr-2 rounded ${deliveryOption === 'retiro' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                        onClick={() => setDeliveryOption('retiro')}
                    >
                        Retiro
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${deliveryOption === 'delivery' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                        onClick={() => setDeliveryOption('delivery')}
                    >
                        Delivery
                    </button>
                </div>
            )}
            {cart.length > 0 ? (
                <div className="max-w-lg mx-auto">
                    {cart.map((item) => (
                        <div key={item.productoID} className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
                            <div className="flex items-center p-4 border-b">
                                <div className="w-24 h-24 flex-shrink-0">
                                    <img src={item.imagen} alt={item.nombre} className="w-full h-full object-contain" />
                                </div>
                                <div className="ml-4 flex-grow text-left min-w-0">
                                    <h4 className="text-lg font-semibold truncate">{item.nombre}</h4>
                                    <p className="text-gray-700 truncate">{item.descripcion}</p>
                                    <p className="text-blue-600 font-bold">Precio: ${item.precio}</p>
                                    <p className="text-blue-600 font-bold">Total: ${calculateTotalPerProduct(item.precio, item.quantity)}</p>
                                </div>
                                <div className="ml-4 flex items-center justify-end space-x-4 w-full sm:w-auto">
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => handleUpdateQuantity(item.productoID, parseInt(e.target.value))}
                                        className="border rounded w-16 text-center"
                                    />
                                    <button
                                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-l"
                                        onClick={() => handleUpdateQuantity(item.productoID, item.quantity - 1)}
                                    >
                                        -
                                    </button>
                                    <span className="px-4">{item.quantity}</span>
                                    <button
                                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-r"
                                        onClick={() => handleUpdateQuantity(item.productoID, item.quantity + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                                    onClick={() => handleRemoveFromCart(item.productoID)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="text-xl font-bold text-right mt-4">
                        Subtotal: ${calculateSubtotal()}
                    </div>
                    <div className="text-xl font-bold text-right mt-2">
                        Tarifa de Envío: ${deliveryOption === 'delivery' ? 10000 : 0}
                    </div>
                    <div className="text-xl font-bold text-right mt-2">
                        Total: ${calculateTotalCart()}
                    </div>
                    {transaccion && (
                        <div className="mt-4">
                            <form id="webpay-form" action={transaccion.url} method='POST'>
                                <input type="hidden" name='token_ws' value={transaccion.token} />
                            </form>
                        </div>
                    )}
                    <div className="flex justify-center mt-4">
                        <button
                            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
                            onClick={handleConfirmPurchase}
                            disabled={confirmPurchase}
                        >
                            Confirmar Compra
                        </button>
                    </div>
                </div>
            ) : (
                <div className="mt-4 text-center">
                    <button
                        className="mt-4 bg-blue-500 text-white font-semibold py-2 px-6 rounded hover:bg-blue-600 transition-colors"
                        onClick={() => window.location.href = '/categoria'}
                    >
                        Añadir Productos
                    </button>
                </div>
            )}
        </div>
    );
};

export default CartPage;
