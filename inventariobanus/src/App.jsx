import './App.css';
import { AuthProvider } from './AuthContext';
import Rutes from './Rutas/RutasPublic-Privad/Rutes';

function App() {
  return (
    <div className="app-container">
      <AuthProvider>
        <Rutes />
      </AuthProvider>
    </div>
  );
}

export default App;
