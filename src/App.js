import RouterConfig from './routes/RouterConfig';
import './App.css';

import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Productos from './components/pages/Productos';
import Carrito from './components/pages/Carrito';
import PerfilCliente from './components/pages/PerfilCliente';
import Login from './components/pages/Login';
import Registro from './components/pages/Registro';

function App() {
  return <RouterConfig/>;
  
}

export default App;
