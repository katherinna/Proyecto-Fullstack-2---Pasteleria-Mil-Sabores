import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "../components/organisms/Header";
import { Footer } from "../components/organisms/Footer";
import Home from "../components/pages/Home";
import PerfilCliente from "../components/pages/PerfilCliente";
import PerfilAdmin from "../components/pages/PerfilAdmin";
import Blogs from "../components/pages/Blogs";
import Contacto from "../components/pages/Contacto";
import Nosotros from "../components/pages/Nosotros";
import Carrito from "../components/pages/Carrito";
import Detalle_product from "../components/pages/Detalle_product";
import Inicio_sesion from "../components/pages/Inicio_sesion";
import Registro_usuario from "../components/pages/Registro_usuario";  
import Catalogo from "../components/pages/Productos";



const RouterConfig = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/perfil-cliente" element={<PerfilCliente />} />
        <Route path="/perfil-admin" element={<PerfilAdmin />} />
        <Route path="/registro-usuario" element={<Registro_usuario />} />
        <Route path="/inicio-sesion" element={<Inicio_sesion />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/detalle-producto" element={<Detalle_product />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/carrito" element={<Carrito />} />
       
      </Routes>
      <Footer />
    </Router>
  );
};

export default RouterConfig;