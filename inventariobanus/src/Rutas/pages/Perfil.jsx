import React from 'react';
import { useAuth } from '../../AuthContext';
import '../pages/Diseños/perfil.css';

const Perfil = () => {
  const { empleado } = useAuth();

  return (
    <div className="perfil-container">
      <h1>Perfil</h1>
      {empleado ? (
        <table className="perfil-table">
          <tbody>
            <tr>
              <td>Nombres</td>
              <td>{empleado.Nombres}</td>
            </tr>
            <tr>
              <td>Apellidos</td>
              <td>{empleado.Apellidos}</td>
            </tr>
            <tr>
              <td>Correo</td>
              <td>{empleado.Correo}</td>
            </tr>
            <tr>
              <td>RFC</td>
              <td>{empleado.RFC}</td>
            </tr>
            <tr>
              <td>CURP</td>
              <td>{empleado.CURP}</td>
            </tr>
            <tr>
              <td>Teléfono</td>
              <td>{empleado.Telefono}</td>
            </tr>
            <tr>
              <td>Dirección</td>
              <td>{empleado.Direccion}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>No hay datos de empleado disponibles.</p>
      )}
    </div>
  );
};

export default Perfil;
