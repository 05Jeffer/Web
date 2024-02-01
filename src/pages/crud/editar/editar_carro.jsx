import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function Editar_carro({id}) {
  const [data, setData] = useState([]);
  const [editCar, setEditCar] = useState({
    id: null,
    anio: '',
    color: '',
    estado: '',
    imagen: '',
    marca: '',
    modelo: '',
    placa: '',
    stock: '',
  });

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

  const handleUpdateButtonClick = (id) => {
    const carToEdit = data.find((car) => car.id === id);
    setEditCar({
      id: carToEdit.id,
      anio: carToEdit.anio,
      color: carToEdit.color,
      estado: carToEdit.estado,
      imagen: carToEdit.imagen,
      marca: carToEdit.marca,
      modelo: carToEdit.modelo,
      placa: carToEdit.placa,
      stock: carToEdit.stock,
      // Agrega otras propiedades según tu modelo de datos
    });
  };

  const handleCancelUpdateButtonClick = () => {
    // Lógica para cancelar la edición
    setEditCar({
      id: null,
      anio: '',
      color: '',
      estado: '',
      imagen: '',
      marca: '',
      modelo: '',
      placa: '',
      stock: '',
    });
  };

  const handleEditInputChange = (e) => {
    // Actualiza todo el objeto editCar
    setEditCar({ ...editCar, [e.target.name]: e.target.value });
  };

  const updateCar = async () => {
    try {
      await axios.put(`http://localhost:8081/autos/${editCar.id}`, editCar);
      // Actualizar la lista después de editar
      fetchData();
      setEditCar({
        id: null,
        anio: '',
        color: '',
        estado: '',
        imagen: '',
        marca: '',
        modelo: '',
        placa: '',
        stock: '',
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
            <td className="px-6 py-3 bg-sky-600">
              <div className="flex space-x-5">
                <button onClick={() =>handleUpdateButtonClick(id)}>Editar</button>
              </div>
              {editCar.id !== null && editCar.id === id &&  (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className=" inset-10 bg-gray-500 opacity-90">
                    <div className="bg-white w-96 p-6 rounded-md shadow-md">
                      <h2 className=' text-zinc-50'>Editar Auto</h2>
                      <form className="car-form bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="año">
                            Año:
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="number"
                            name="anio"
                            value={editCar.anio || ''}
                            onChange={handleEditInputChange}
                          />
                        </div>

                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="color">
                            Color:
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="color"
                            value={editCar.color || ''}
                            onChange={handleEditInputChange}
                          />
                        </div>

                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="estado">
                            Estado:
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="estado"
                            value={editCar.estado || ''}
                            onChange={handleEditInputChange}
                          />
                        </div>

                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="estado">
                            Imagen:
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="imagen"
                            value={editCar.imagen || ''}
                            onChange={handleEditInputChange}
                          />
                        </div>

                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="estado">
                            Marca:
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="marca"
                            value={editCar.marca || ''}
                            onChange={handleEditInputChange}
                          />
                        </div>

                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="estado">
                            Modelo:
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="modelo"
                            value={editCar.modelo || ''}
                            onChange={handleEditInputChange}
                          />
                        </div>

                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="estado">
                            Placa:
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="placa"
                            value={editCar.placa || ''}
                            onChange={handleEditInputChange}
                          />
                        </div>

                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="estado">
                            Stock:
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="number"
                            name="stock"
                            value={editCar.stock || ''}
                            onChange={handleEditInputChange}
                          />
                        </div>

                        {/* Repite el mismo patrón para los demás campos */}

                        <div className="flex items-center justify-between mt-4">
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={updateCar}
                          >
                        Guardar Cambios
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={handleCancelUpdateButtonClick}
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                </div>
                </div>
                </div>
              )}
            </td>
    </div>
  );
}

export default Editar_carro;
