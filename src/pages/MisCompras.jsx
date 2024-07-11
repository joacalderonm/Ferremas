import { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import { GetByHistory } from '../api/apiCliente'; // Asegúrate de tener esta función en tu API cliente

const MisCompras = () => {
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchCompras = async () => {
      try {
        const data = await GetByHistory(user.id); // Asumiendo que el user tiene un id
        setCompras(data);
      } catch (error) {
        console.error('Error al obtener las compras:', error);
        setError('Error al obtener las compras. Por favor, inténtalo de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchCompras();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Cargando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Mis Compras</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID Venta</th>
              <th className="py-3 px-6 text-left">Orden de Compra</th>
              <th className="py-3 px-6 text-left">Estado</th>
              <th className="py-3 px-6 text-left">Total</th>
              <th className="py-3 px-6 text-left">Fecha</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {compras.map((compra) => (
              <tr key={compra.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">{compra.venta}</td>
                <td className="py-3 px-6 text-left">{compra.buyOrder}</td>
                <td className="py-3 px-6 text-left">{compra.estado}</td>
                <td className="py-3 px-6 text-left">{compra.total}</td>
                <td className="py-3 px-6 text-left">{new Date(compra.fecha).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MisCompras;
