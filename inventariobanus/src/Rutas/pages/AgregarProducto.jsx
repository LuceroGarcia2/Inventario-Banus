import React, { useState } from 'react';
import '../pages/Diseños/agregarproductos.css';

const AgregarProducto = () => {
  const [product, setProduct] = useState({
    nombreProducto: '',
    categoria: '',
    fechaRegistro: new Date().toISOString().split('T')[0],
    stock: '',
    precio: '',
    fechaCaducidad: ''
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      ...product,
      // id: Date.now()
    };

    try {
      const response = await fetch('http://localhost:3001/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al agregar el producto');
      }

      // Resetea el formulario
      setProduct({
        nombreProducto: '',
        categoria: '',
        fechaRegistro: new Date().toISOString().split('T')[0],
        stock: '',
        precio: '',
        fechaCaducidad: ''
      });
      alert('Producto agregado exitosamente');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <label htmlFor="nombreProducto">Nombre Producto</label>
      <input
        type="text"
        id="nombreProducto"
        name="nombreProducto"
        value={product.nombreProducto}
        onChange={handleChange}
        required
      />
      
      <label htmlFor="categoria">Categoría</label>
      <input
        type="text"
        id="categoria"
        name="categoria"
        value={product.categoria}
        onChange={handleChange}
        required
      />
      
      <label htmlFor="fechaRegistro">Fecha Registro</label>
      <input
        type="text"
        id="fechaRegistro"
        name="fechaRegistro"
        value={product.fechaRegistro}
        readOnly
      />
      
      <label htmlFor="stock">Stock</label>
      <input
        type="number"
        id="stock"
        name="stock"
        value={product.stock}
        onChange={handleChange}
        required
      />
      
      <label htmlFor="precio">Precio</label>
      <input
        type="number"
        id="precio"
        name="precio"
        value={product.precio}
        onChange={handleChange}
        required
      />
      
      <label htmlFor="fechaCaducidad">Fecha Caducidad</label>
      <input
        type="date"
        id="fechaCaducidad"
        name="fechaCaducidad"
        value={product.fechaCaducidad}
        onChange={handleChange}
        required
      />
      
      <button type="submit">Agregar Producto</button>
    </form>
  );
};

export default AgregarProducto;
