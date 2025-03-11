import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../NavBar/NavBar';

const Layout: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Outlet /> {/* Renderiza las rutas hijas */}
    </div>
  );
};

export default Layout;
