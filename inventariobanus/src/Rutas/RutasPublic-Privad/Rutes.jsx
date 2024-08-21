import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../../NavBar/Navbar';
import Perfil from '../pages/Perfil';
import Login from '../../components/login/Login';
import AgregarProducto from '../pages/AgregarProducto';
import ListaProductos from '../pages/ListaProductos';
import Grafica from '../pages/Grafica';
import ProtectedRoute from '../RutasPublic-Privad/PrivateRutes'

const Rutas = () => {
  return (
    <div className="app-container">
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/Perfil' element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
          <Route path='/AgregarProducto' element={<ProtectedRoute><AgregarProducto /></ProtectedRoute>} />
          <Route path='/Productos' element={<ProtectedRoute><ListaProductos /></ProtectedRoute>} />
          <Route path='/Grafica' element={<ProtectedRoute><Grafica /></ProtectedRoute>} />
        </Routes>
      </div>
    </div>
  );
}

export default Rutas;
