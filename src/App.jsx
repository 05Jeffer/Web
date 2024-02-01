import React from 'react';
import Barra from './components/barra.jsx';
import Inicio from './pages/inicio.jsx';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Cliente from './pages/cliente.jsx';
import Carros from './pages/carros.jsx';
import Renta from './pages/renta.jsx';


function App() {
  

  return (
    <>
    <div>
      <Barra />
    </div>
    <Routes>
      <Route path='/' element={<Inicio></Inicio>} ></Route>
      <Route path='/cliente' element={<Cliente></Cliente>} ></Route>
      <Route path='/carros' element={<Carros></Carros>} ></Route>
      <Route path='/renta' element={<Renta></Renta>} ></Route>
    </Routes>
    </>
  );
}

export default App;
