import { useState, useEffect } from 'react';
import { useCart } from '../components/CartContext';
import { fetchCarrito, fetchCreate } from '../api/apiWebpayPlus';
import "../css/Styles.css";

const CartPage = () => {
    const { cart, dispatch, getStock } = useCart();
    const [deliveryOption, setDeliveryOption] = useState('retiro');
    const [confirmPurchase, setConfirmPurchase] = useState(false);
    const [transaccion, setTransaccion] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [stock, setStock] = useState({});

    useEffect(() => {
        const fetchStock = async () => {
            try {
                const stocks = await Promise.all(cart.map(item => getStock(item.productoID)));
                const stockData = cart.reduce((acc, item, index) => {
                    acc[item.productoID] = stocks[index];
                    return acc;
                }, {});
                setStock(stockData);
            } catch (error) {
                console.error('Error al obtener el stock de productos:', error);
            }
        };

        fetchStock();
    }, [cart, getStock]);

    const handleRemoveFromCart = (productoID) => {
        dispatch({ type: 'REMOVE_FROM_CART', id: productoID });
    };

    const handleUpdateQuantity = (productoID, quantity) => {
        if (quantity >= 0 && quantity <= (stock[productoID] || 0)) {
            dispatch({ type: 'UPDATE_QUANTITY', id: productoID, quantity, product: { productoID, stock: stock[productoID] } });
        } else {
            alert('No hay suficiente stock disponible');
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
        if (isProcessing) return; // Evitar múltiples clics
        setIsProcessing(true);

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

            const dataCreate = await fetchCreate(dataOrder);
            setTransaccion(dataCreate);

            localStorage.setItem('webpayToken', dataCreate.viewData.token);

            const form = document.createElement('form');
            form.action = dataCreate.viewData.url;
            form.method = 'POST';

            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = 'token_ws';
            input.value = dataCreate.viewData.token;
            form.appendChild(input);

            document.body.appendChild(form);
            form.submit();
        } catch (error) {
            console.error('Error al confirmar la compra:', error);
        } finally {
            setIsProcessing(false);
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
                        className={`px-4 py-2 mr-2 rounded ${deliveryOption === 'retiro' ? 'bg-gray-600 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400 transition-colors'}`}
                        onClick={() => setDeliveryOption('retiro')}
                    >
                        Retiro
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${deliveryOption === 'delivery' ? 'bg-gray-600 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400 transition-colors'}`}
                        onClick={() => setDeliveryOption('delivery')}
                    >
                        Delivery
                    </button>
                </div>
            )}
            {cart.length > 0 ? (
                <div className="max-w-3xl mx-auto">
                    {cart.map((item) => (
                        <div key={item.productoID} className="bg-white rounded-lg shadow-md overflow-hidden mb-6 p-6 flex flex-col md:flex-row items-center md:items-start transition-shadow hover:shadow-lg">
                            <div className="flex-shrink-0 mx-auto md:mx-0">
                                <img src={item.imagen} alt={item.nombre} className="w-32 h-32 object-contain" />
                            </div>
                            <div className="flex flex-col justify-between ml-0 md:ml-6 mt-4 md:mt-0 flex-grow text-center md:text-left">
                                <div>
                                    <h4 className="text-xl font-semibold">{item.nombre}</h4>
                                    <p className="text-gray-600 mt-2">{item.descripcion}</p>
                                </div>
                                <div className="mt-4">
                                    <p className="text-black-600 font-bold">Total: ${calculateTotalPerProduct(item.precio, item.quantity)}</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center md:items-end mt-4 md:mt-0">
                                <div className="flex items-center mb-4">
                                    <button
                                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-l transition-colors"
                                        onClick={() => handleUpdateQuantity(item.productoID, item.quantity - 1)}
                                    >
                                        -
                                    </button>
                                    <span className="px-4">{item.quantity}</span>
                                    <button
                                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-r transition-colors"
                                        onClick={() => handleUpdateQuantity(item.productoID, item.quantity + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition-colors"
                                    onClick={() => handleRemoveFromCart(item.productoID)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="flex flex-col justify-between ml-0 md:ml-6 mt-4 md:mt-0 flex-grow text-center md:text-left">
                        Subtotal: ${calculateSubtotal()}
                    </div>
                    <div className="flex flex-col justify-between ml-0 md:ml-6 mt-2 md:mt-0 flex-grow text-center md:text-left">
                        Tarifa de Envío: ${deliveryOption === 'delivery' ? 10000 : 0}
                    </div>
                    <div className="flex flex-col justify-between ml-0 md:ml-6 mt-2 md:mt-0 flex-grow text-center md:text-left">
                        Total: ${calculateTotalCart()}
                    </div>
                    {transaccion && (
                        <div className="mt-4">
                            <form id="webpay-form" action={transaccion.viewData.url} method="POST">
                                <input type="hidden" name="token_ws" value={transaccion.viewData.token} />
                            </form>
                        </div>
                    )}
                    <div className="flex justify-center mt-6">
                        <button
                            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded transition-colors"
                            onClick={handleConfirmPurchase}
                            disabled={confirmPurchase || isProcessing}
                        >
                            {isProcessing ? 'Procesando...' : 'Confirmar Compra'}
                        </button>
                    </div>
                </div>
            ) : (
                <div className="mt-8 text-center">
                    <p className="text-lg font-semibold mb-4">Tu carrito está vacío.</p>
                    <button
                        className="bg-blue-500 text-white font-semibold py-2 px-6 rounded hover:bg-blue-600 transition-colors"
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
