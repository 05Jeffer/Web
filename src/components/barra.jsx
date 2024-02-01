import React,{ useState } from 'react';
import { IoCarSportOutline } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';

function Barra() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
      };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-black p-7">
          <div className="flex items-center flex-shrink-0 text-slate-300 mr-6">
            <IoCarSportOutline size={50} />
            <span className="font-semibold text-xl tracking-tight">Venta de Autos</span>
          </div>
          <div className="block lg:hidden">
            <button
              onClick={toggleMenu}
              className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
            >
              <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
          <div className={`w-full lg:flex lg:items-center lg:w-auto ${isMenuOpen ? 'block' : 'hidden'}`}>
            <div className="text-sm lg:flex-grow">
            <NavLink className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-6 cursor-pointer" to="/">Inicio</NavLink>
            <NavLink  className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-6 cursor-pointer" to="/cliente">Registro</NavLink>
            <NavLink className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-6 cursor-pointer" to="/carros">Modelos</NavLink>
            <NavLink className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0" to="/renta">
                Renta tu auto!!</NavLink>
            </div>
            
          </div>
        </nav>
  )
}

export default Barra;