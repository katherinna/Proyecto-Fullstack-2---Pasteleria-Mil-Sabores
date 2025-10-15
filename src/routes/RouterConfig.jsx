import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../components/pages/Home";
import PerfilCliente from "../components/pages/PerfilCliente";
import PerfilAdmin from "../components/pages/PerfilAdmin";

const RouterConfig = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/perfil-cliente" element={<PerfilCliente />} />
        <Route path="/perfil-admin" element={<PerfilAdmin />} />
      </Routes>
    </Router>
  );
};

export default RouterConfig;