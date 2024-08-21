import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { useAuth } from '../AuthContext';
import './navbar.css';

const Navbar = () => {
    const { logout } = useAuth(); 
    const navigate = useNavigate(); 

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src="/src/components/images/logo.png" alt="Logo" className="navbar-image" />
            </div>
            <h2>Inventario Banus</h2>
            <ul>
                <li>
                    <Link to="/Perfil">Perfil</Link>
                </li>
                <li>
                    <Link to="/Productos">Lista de Productos</Link>
                </li>
                <li>
                    <Link to="/AgregarProducto">Agregar Productos</Link>
                </li>
                <li>
                    <Link to="/Grafica">Gráficas</Link>
                </li>
                <li>
                    <button onClick={handleLogout} className="logout-button">
                        Cerrar Sesión
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
