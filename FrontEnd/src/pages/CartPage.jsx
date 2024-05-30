import React, { useState } from 'react';
import { useCart } from '../CartContext';

const CartPage = () => {
  const { cart, dispatch } = useCart();
  const [deliveryOption, setDeliveryOption] = useState('retiro'); // Estado para la opción de entrega: 'retiro' o 'delivery'
  const [confirmPurchase, setConfirmPurchase] = useState(false); // Estado para confirmar la compra

  const handleRemoveFromCart = (productoID) => {
    dispatch({ type: 'REMOVE_FROM_CART', id: productoID });
  };

  const handleUpdateQuantity = (productoID, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', id: productoID, quantity });
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

  const handleConfirmPurchase = () => {
    // Aquí se puede implementar la lógica para confirmar la compra, como enviar la información del carrito al servidor, etc.
    setConfirmPurchase(true);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Carrito de Compras</h2>
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
      {cart.length > 0 ? (
        <div className="max-w-lg mx-auto">
          {cart.map((item) => (
            <div key={item.productoID} className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
              <div className="flex items-center p-4 border-b">
                <img src={item.imagen} alt={item.nombre} className="w-full sm:w-24 h-24 flex-shrink-0" />
                <div className="ml-0 sm:ml-4 flex-grow mt-4 sm:mt-0 text-center sm:text-left min-w-0">
                  <h4 className="text-lg font-semibold truncate">{item.nombre}</h4>
                  <p className="text-gray-700 truncate">{item.descripcion}</p>
                  <p className="text-blue-600 font-bold">Precio: ${item.precio}</p>
                  <p className="text-blue-600 font-bold">Total: ${calculateTotalPerProduct(item.precio, item.quantity)}</p>
                </div>
                <div className="ml-0 sm:ml-4 mt-4 sm:mt-0 flex items-center justify-end space-x-4 w-full sm:w-auto">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleUpdateQuantity(item.productoID, parseInt(e.target.value))}
                    className="border rounded w-16 text-center"
                  />
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                    onClick={() => handleRemoveFromCart(item.productoID)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="text-xl font-bold text-right mt-4">
            Subtotal: ${calculateSubtotal()} {/* Mostrar el subtotal sin tarifa de envío */}
          </div>
          <div className="text-xl font-bold text-right mt-2">
            Tarifa de Envío: ${deliveryOption === 'delivery' ? 10000 : 0}
          </div>
          <div className="text-xl font-bold text-right mt-2">
            Total: ${calculateTotalCart()}
          </div>
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
        <p className="text-center">No hay productos en el carrito.</p>
      )}
    </div>
  );
};

export default CartPage;
