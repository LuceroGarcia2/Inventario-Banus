import React, { useEffect, useState } from 'react';
import './Diseños/listaproductos.css';

const ListaProductos = () => {
  const [productos, setProductos] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch('http://localhost:3001/productos'); 
        if (!response.ok) {
          throw new Error('Error al obtener los productos');
        }
        const data = await response.json();
        setProductos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); 
      }
    };

    fetchProductos(); 
  }, []); 

  const handleUpdateStock = async (id, stock) => {
    try {
      const productoActual = productos.find((producto) => producto.Id === id);
      
      if (productoActual.Stock < stock) {
        alert('No hay suficiente stock disponible');
        return;
      }

      const response = await fetch(`http://localhost:3001/productos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cantidad: stock }), 
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al actualizar el stock');
      }

      setProductos((prevProductos) =>
        prevProductos.map((producto) =>
          producto.Id === id ? { ...producto, Stock: producto.Stock - stock } : producto
        )
      );
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDeleteProduct = async (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3001/productos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al eliminar el producto');
      }

      setProductos((prevProductos) => prevProductos.filter((producto) => producto.Id !== id));
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (productos.length === 0) {
    return <p>No hay productos disponibles.</p>;
  }

  return (
    <table className="productos-table">
      <thead>
        <tr>
          <th>Nombre Producto</th>
          <th>Categoría</th>
          <th>Fecha de Registro</th>
          <th>Stock</th>
          <th>Precio</th>
          <th>Fecha de Caducidad</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {productos.map((producto) => (
          <tr key={producto.Id}>
            <td>{producto.NombreProducto}</td>
            <td>{producto.Categoria}</td>
            <td>{new Date(producto.FechaRegistro).toLocaleDateString()}</td>
            <td>{producto.Stock}</td>
            <td>{producto.Precio !== null && producto.Precio !== undefined ? `$${producto.Precio}` : 'N/A'}</td>
            <td>{new Date(producto.FechaCaducidad).toLocaleDateString()}</td>
            <td>
              <input
                type="number"
                min="1"
                placeholder="Stock"
                id={`stock-${producto.Id}`} 
              />
              <button 
                className="producto-button actualizar-button"
                onClick={() => {
                  const stockInput = document.getElementById(`stock-${producto.Id}`);
                  const stock = parseInt(stockInput.value, 10);
                  
                  if (isNaN(stock) || stock <= 0 || stock > producto.Stock) {
                    alert('Ingrese una cantidad válida.');
                    return;
                  }
                  handleUpdateStock(producto.Id, stock);
                  stockInput.value = ''; 
                }}>
                Actualizar
              </button>
              <button 
                className="producto-button eliminar-button"
                onClick={() => handleDeleteProduct(producto.Id)}>
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListaProductos;
