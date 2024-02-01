import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function Editar_cliente({id}) {
  const [data, setData] = useState([]);
  const [editClien, setEditClien] = useState({
    id: null,
    nombre: '',
    apellido: '',
    direccion: '',
    dni: '',
    telefono: '',
    email: '',
  });

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

  const handleUpdateButtonClick = (id) => {
    const clienToEdit = data.find((clien) => clien.id === id);
    setEditClien({
      id: clienToEdit.id,
      nombre: clienToEdit.nombre,
      apellido: clienToEdit.apellido,
      direccion: clienToEdit.direccion,
      dni: clienToEdit.dni,
      telefono: clienToEdit.telefono,
      email: clienToEdit.email,
      // Agrega otras propiedades según tu modelo de datos
    });
  };

  const handleCancelUpdateButtonClick = () => {
    // Lógica para cancelar la edición
    setEditClien({
        id: null,
        nombre: '',
        apellido: '',
        direccion: '',
        dni: '',
        telefono: '',
        email: '',
    });
  };

  const handleEditInputChange = (e) => {
    
    setEditClien({ ...editClien, [e.target.name]: e.target.value });
  };

  const updateClien = async () => {
    try {
      await axios.put(`http://localhost:8081/clientes/${editClien.id}`, editClien);
      // Actualizar la lista después de editar
      fetchData();
      setEditClien({
        id: null,
        nombre: '',
        apellido: '',
        direccion: '',
        dni: '',
        telefono: '',
        email: '',
      });

      // Mostrar mensaje de éxito
      Swal.fire({
        icon: 'success',
        title: 'Guardado exitosamente',
        showConfirmButton: false,
        timer: 1500, // Auto-close the alert after 1.5 seconds
      });
    } catch (error) {
      console.error('Error updating car:', error);
      // Mostrar una alerta de error si es necesario
      Swal.fire({
        icon: 'error',
        title: 'Error al guardar',
        text: 'Hubo un error al guardar los cambios.',
      });
    }
  };

  // Resto del código...

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <td className="px-6 py-3  bg-sky-600">
              <div className="flex space-x-5">
                <button onClick={() =>handleUpdateButtonClick(id)}>Editar</button>
              </div>
              {editClien.id !== null && editClien.id === id &&  (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className=" inset-10 bg-gray-500 opacity-90">
                    <div className="bg-white w-96 p-6 rounded-md shadow-md"></div>
                      <h2 className=' text-zinc-50'>Editar Cliente</h2>
                      <form className="car-form bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                            Nombre:
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="nombre"
                            value={editClien.nombre || ''}
                            onChange={handleEditInputChange}
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
                            value={editClien.apellido || ''}
                            onChange={handleEditInputChange}
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
                            value={editClien.direccion || ''}
                            onChange={handleEditInputChange}
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
                            value={editClien.dni || ''}
                            onChange={handleEditInputChange}
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
                            value={editClien.telefono || ''}
                            onChange={handleEditInputChange}
                          />
                        </div>

                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Modelo:
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="email"
                            value={editClien.email || ''}
                            onChange={handleEditInputChange}
                          />
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={updateClien}>Guardar Cambios</button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={handleCancelUpdateButtonClick}>Cancelar</button>
                    </div>
                  </form>
                </div>
                </div>
              )}
            </td>
    </div>
  );
}

export default Editar_cliente;
