import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import carr5 from "./images/carr5.jpg";
import Agregar_cliente from './crud/agregar/agregar_cliente';
import Editar_cliente from './crud/editar/editar_cliente';
import Borrar_cliente from './crud/borrar/borrar_cliente';

function Cliente() {
  const [showForm, setShowForm] = useState(true);
  const [showTable, setShowTable] = useState(false);
  const [data, setData] = useState([]);
  

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/clientes');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSignIn = () => {
    const passwordInput = document.getElementById('password');
    const enteredPassword = passwordInput.value;

    if (enteredPassword === '1578') {
      // Contraseña correcta, puedes continuar con el proceso de inicio de sesión
      Swal.fire({
        icon: 'success',
        title: 'Inicio de sesion correcto',
        showConfirmButton: false,
        timer: 1500, // Auto-close the alert after 1.5 seconds
      });
      setShowForm(false);
      setShowTable(true);
      // Aquí puedes agregar más lógica si es necesario
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Contraseña Incorrecta',
        
      });
      setShowForm(false);
    }
  };

  
  useEffect(() => {
    fetchData();
  
      }, []);
  return (
    <div className="relative">
    <img src={carr5} alt="carros" className="absolute inset-0 w-full h-full object-cover z-0"/>
    <div className="flex items-center justify-center h-screen relative z-10">
      {showForm && (
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Usuario
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Usuario"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
            />
            <p className="text-red-500 text-xs italic">Pon tu contraseña</p>
          </div>
          <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleSignIn}
              >
                Ingrese
              </button>
            </div>
        </form>
      )}
      {showTable && (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="max-h-screen overflow-y-auto mt-4">
            <table className="w-full text-sm text-left rtl:text-right text-gray-600 dark:text-gray-400 border-2 border-gray-200 dark:border-gray-700 table-fixed">
              <thead className="text-sm text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" className="sticky top-0 px-6 py-3 bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                          ID
                      </th>
                      <th scope="col" className="sticky top-0 px-6 py-3 bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                          NOMBRE
                      </th>
                      <th scope="col" className="sticky top-0 px-6 py-3 bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                          APELLIDO
                      </th>
                      <th scope="col" className="sticky top-0 px-6 py-3 bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                          DIRECCION
                      </th>
                      <th scope="col" className="sticky top-0 px-6 py-3 bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                          DNI
                      </th>
                      <th scope="col" className="sticky top-0 px-6 py-3 bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                          TELEFONO
                      </th>
                      <th scope="col" className="sticky top-0 px-6 py-3 bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                          E-MAIL
                      </th>
                      <th scope="col" className="sticky top-0 px-8 py-3 bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                          <Agregar_cliente/>
                      </th>
                  </tr>
              </thead>
              <tbody>
              {data.map((item) => (
                  <tr  key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="px-8 py-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {item.id}
                      </th>
                      <td className="px-8 py-6">{item.nombre}</td>
                      <td className="px-8 py-6">{item.apellido}</td>
                      <td className="px-8 py-6">{item.direccion}</td>
                      <td className="px-8 py-6">{item.dni}</td>
                      <td className="px-8 py-6">{item.telefono}</td>
                      <td className="px-8 py-6">{item.email}</td>
                      <td className="flex space-x-2 px-8 py-1"><Editar_cliente id={item.id}/></td>
                      <td className="flex space-x-2 px-8 py-1"><Borrar_cliente id={item.id} setData={setData} /></td>
                  </tr>
                  ))}
              </tbody>
          </table>
      </div>
      </div>
        )}
      </div>
      </div>
    
  );
}

export default Cliente;
