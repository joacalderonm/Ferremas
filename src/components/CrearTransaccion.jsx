import { useState } from 'react';
import { fetchCreate } from '../api/apiWebpayPlus';

const CreateTransaction = () => {
  const [transaction, setTransaction] = useState(null);

  const handleCreate = async () => {
    try {
      const data = await fetchCreate();
      setTransaction(data);
      localStorage.setItem('webpayToken', data.token);
    } catch (error) {
      console.error('Error al crear la transacción:', error);
    }
  };

  return (
    <div>
      <button onClick={handleCreate}>Crear Transacción</button>
      {transaction && (
        <div>
          <p>Orden de compra: {transaction.buyOrder}</p>
          <p>ID de sesión: {transaction.sessionId}</p>
          <p>Monto: {transaction.amount}</p>
          <p>URL de retorno: {transaction.returnUrl}</p>
          <form action={transaction.url} method="POST">
            <input type="hidden" name="token_ws" value={transaction.token} />
            <button type="submit">Pagar</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateTransaction;
