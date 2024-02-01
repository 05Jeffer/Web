import { useState, useEffect } from 'react';
import axios from 'axios';
import Editar_carro from './crud/editar/editar_carro';
import Agregar_carros from './crud/agregar/agregar_carro';
import Borrar_auto from './crud/borrar/borrar_auto';

function Carros() {
  const [data, setData] = useState([]);
  

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/autos');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="pb-4 bg-white dark:bg-gray-900">
        <label htmlFor="table-search" className="sr-only">
          Buscar
        </label>
        <div className="relative mt-1">
          {/* Resto del código de búsqueda */}
        </div>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              {/* Checkbox de selección de todos los elementos */}
            </th>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              AÑO
            </th>
            <th scope="col" className="px-6 py-3">
              COLOR
            </th>
            <th scope="col" className="px-6 py-3">
              ESTADO
            </th>
            <th scope="col" className="px-6 py-3">
              IMAGEN
            </th>
            <th scope="col" className="px-6 py-3">
              MARCA
            </th>
            <th scope="col" className="px-6 py-3">
              MODELO
            </th>
            <th scope="col" className="px-6 py-3">
              PLACA
            </th>
            <th scope="col" className="px-6 py-3">
              STOCK
            </th>
            <th scope="col" className="sticky px-5 py-4 bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <Agregar_carros></Agregar_carros>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="w-4 p-4">
                {/* Checkbox de selección de elemento individual */}
              </td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {item.id}
              </th>
              <td className="px-6 py-4">{item.anio}</td>
              <td className="px-6 py-4">{item.color}</td>
              <td className="px-6 py-4">{item.estado}</td>
              <td className="px-6 py-4">{item.imagen}</td>
              <td className="px-6 py-4">{item.marca}</td>
              <td className="px-6 py-4">{item.modelo}</td>
              <td className="px-6 py-4">{item.placa}</td>
              <td className="px-6 py-4">{item.stock}</td>
              <td className="flex space-x-5 px-6 py-1">
              <Editar_carro id={item.id}/>
                </td>
              <td className="flex space-x-5 px-6 py-1">
                <Borrar_auto id={item.id} setData={setData}/>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Carros;
