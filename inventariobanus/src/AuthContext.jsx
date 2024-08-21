import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [empleado, setEmpleado] = useState(null);

  const loginEmpleado = async (correo, contraseña) => {
    try {
      const response = await axios.post('http://localhost:3001/empleado/login', {
        Correo: correo,
        Contraseña: contraseña,
      });

      const { data } = response;

      if (data) {
        setEmpleado(data);
        localStorage.setItem('empleado', JSON.stringify(data));
      } else {
        throw new Error('Empleado no encontrado');
      }
    } catch (error) {
      console.error('Error al iniciar sesión como empleado:', error);
      throw error;
    }
  };

  const logout = () => {
    setEmpleado(null);
    localStorage.removeItem('empleado');
  };

  return (
    <AuthContext.Provider value={{ empleado, loginEmpleado, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
