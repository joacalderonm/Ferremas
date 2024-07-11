import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { useCart } from '../components/CartContext';
import { fetchCarrito, fetchCreate } from '../api/apiWebpayPlus';
import "../css/Styles.css";


const CartPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
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

    const formatPriceCLP = (price) => {
        return price.toLocaleString('es-CL');
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
        if (!user) {
            navigate('/login'); // Redirige al usuario a la página de inicio de sesión si no está autenticado
            return;
        }
        
        if (isProcessing) return; // Evitar múltiples clics
        setIsProcessing(true);

        const carritoData = {
            clienteID: user.id,
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
        <div className="max-w-1xl mx-auto py-8 px-10">
            {cart.length > 0 ? (
                <div className="flex flex-col md:flex-row gap-10">
                    <div className="w-full md:w-2/3">
                        {cart.map((item) => (
                            <div key={item.productoID} className="bg-white rounded-lg shadow-md overflow-hidden mb-6 p-6 flex flex-col md:flex-row items-center md:items-start">
                                <img src={item.imagen} alt={item.nombre} className="w-32 h-32 object-contain mx-auto md:mx-0" />
                                <div className="ml-0 md:ml-6 mt-4 md:mt-0 flex-grow text-center md:text-left">
                                    <h4 className="text-xl font-semibold">{item.nombre}</h4>
                                    <p className="text-gray-600 mt-2">{item.descripcion}</p>
                                    <p className="text-xl font-semibold">${formatPriceCLP(calculateTotalPerProduct(item.precio, item.quantity))}</p>
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
                    </div>
                    <div className="w-full md:w-1/4 md:ml-1">
                        <div className="bg-white rounded-lg shadow-md p-6">
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
                            <div className="text-left mb-4">
                                <p className="text-xl font-semibold">Resumen de compra</p>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm">Productos ({cart.length})</span>
                                <span className="text-sm">$ {formatPriceCLP(calculateSubtotal())}</span>
                            </div>
                            <div className="flex justify-between mt-2">
                                <span className="text-sm">Envío</span>
                                <span className="text-sm">{deliveryOption === 'delivery' ? `$${formatPriceCLP(10000)}` : 'Retiro'}</span>
                            </div>
                            <div className="flex justify-between mt-2">
                                <span className="text-sm">Total</span>
                                <span className="text-sm">$ {formatPriceCLP(calculateTotalCart())}</span>
                            </div>
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
                        {transaccion && (
                            <form id="webpay-form" action={transaccion.viewData.url} method="POST" className="mt-4">
                                <input type="hidden" name="token_ws" value={transaccion.viewData.token} />
                            </form>
                        )}
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
