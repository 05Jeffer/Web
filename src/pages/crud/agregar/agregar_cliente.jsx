import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function Agregar_cliente() {
  const [data, setData] = useState([]);
  const [newClient, setNewClient] = useState({
    nombre: '',
    apellido: '',
    direccion: '',
    dni: '',
    telefono: '',
    email: '',
  });
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/clientes');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addClient = async () => {
    try {
      await axios.post('http://localhost:8081/clientes', newClient);
      // Actualizar la lista después de agregar un nuevo auto
      fetchData();
      // Limpiar el formulario después de agregar
      setNewClient({
        nombre: '',
        apellido: '',
        direccion: '',
        dni: '',
        telefono: '',
        email: '',
      });
      // Ocultar el formulario después de agregar
      setShowAddForm(false);
      // Mostrar un mensaje de éxito
      Swal.fire({
        icon: 'success',
        title: 'Auto agregado exitosamente',
        showConfirmButton: false,
        timer: 1500, // Auto-cerrar el mensaje después de 1.5 segundos
      });
    } catch (error) {
      console.error('Error adding car:', error);
      // Mostrar un mensaje de error si es necesario
      Swal.fire({
        icon: 'error',
        title: 'Error al agregar auto',
        text: 'Hubo un error al agregar un nuevo auto.',
      });
    }
  };

  const handleAddInputChange = (e) => {
    // Actualizar el objeto newCar con los valores del formulario
    setNewClient({ ...newClient, [e.target.name]: e.target.value });
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={() => setShowAddForm(true)}
        >
          Agregar
        </button>
      </div>
      {showAddForm && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
  <div className=" inset-10 bg-gray-500 opacity-90">
  <div className="bg-white w-96 p-6 rounded-md shadow-md">
    <h2 className="text-zinc-50">Agregar Nuevo Cliente</h2>
    <form className="car-form bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
          Nombre:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="nombre"
          value={newClient.nombre}
          onChange={handleAddInputChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">
          Apellido:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="apellido"
          value={newClient.apellido}
          onChange={handleAddInputChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="direccion">
          Direccion:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="direccion"
          value={newClient.direccion}
          onChange={handleAddInputChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dni">
          DNI:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          name="dni"
          value={newClient.dni}
          onChange={handleAddInputChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefono">
          Telefono:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          name="telefono"
          value={newClient.telefono}
          onChange={handleAddInputChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          E-MAIL:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="email"
          value={newClient.email}
          onChange={handleAddInputChange}
        />
      </div>

      <div className="flex items-center justify-between mt-4">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={addClient}
        >
          Agregar Auto
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={() => setShowAddForm(false)}
        >
          Cancelar
        </button>
      </div>
    </form>
    </div>
    </div>
  </div>
)}
    </div>
  );
}

export default Agregar_cliente;
