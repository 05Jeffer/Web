import React, { useState, useEffect } from 'react'
import axios from 'axios';
import auto from "./images/auto.jpeg";

function Renta() {
    const [formData, setFormData] = useState({
        id: null,
        cliente_id: '',
        auto_id: '',
        tarifa_diaria: '',
        fecha_inicio: '',
        fecha_fin: '',
        total_paga: '',
      });

      const [clientes, setClientes] = useState([]);
  const [autos, setAutos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/clientes')
      .then(response => setClientes(response.data))
      .catch(error => console.error('Error obteniendo clientes:', error));

    axios.get('http://localhost:8081/autos')
      .then(response => setAutos(response.data))
      .catch(error => console.error('Error obteniendo autos:', error));
  }, []);

      const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async () => {
        console.log('FormData:', formData);
      
        if (
          formData.cliente_id === '' ||
          formData.auto_id === '' ||
          formData.tarifa_diaria === '' ||
          formData.fecha_inicio === '' ||
          formData.fecha_fin === '' ||
          formData.total_paga === ''
        ) {
          alert('Completa todos los campos antes de guardar.');
          return;
        }
      
        try {
          // Suponiendo que cliente_id y auto_id son claves foráneas relacionadas con los clientes y autos seleccionados
          const selectedAuto = autos.find((auto) => auto.id === parseInt(formData.auto_id, 10));
          const selectedCliente = clientes.find((cliente) => cliente.id === parseInt(formData.cliente_id, 10));
      
          if (!selectedAuto || !selectedCliente) {
            console.error('Cliente o auto seleccionado no encontrado.');
            return;
          }
      
          const response = await axios.post('http://localhost:8081/rentas', {
            ...formData,
            auto_id: selectedAuto.id, // Usa el ID real del auto seleccionado
            cliente_id: selectedCliente.id, // Usa el ID real del cliente seleccionado
          });
      
          console.log('Respuesta del servidor:', response.data);
      
          // Puedes realizar alguna acción adicional después de enviar los datos, como redireccionar o mostrar un mensaje de éxito.
        } catch (error) {
          console.error('Error al enviar los datos:', error);
      
          if (error.response) {
            // Error de respuesta del servidor
            console.error('Respuesta del servidor:', error.response.data);
          } else if (error.request) {
            // La solicitud fue hecha pero no se recibió respuesta
            console.error('No se recibió respuesta del servidor.');
          } else {
            // Otro tipo de error
            console.error('Error durante la solicitud:', error.message);
          }
        }
      };
      
  return (
    <div className="flex items-center justify-center h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${auto})`}}>
    
        <div className="w-full max-w-md mx-auto mt-16 overflow-hidden bg-white dark:bg-gray-800 shadow-md sm:rounded-lg">
            <form className="flex flex-col items-center px-10 py-11">
            <div className="relative z-0 w-full mb-5 group">
            <select
  name="cliente_id"
  id="cliente_id"
  value={formData.cliente_id}
  onChange={handleInputChange}
  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
  required
>
  <option value="" disabled>Select a client</option>
  {clientes.map(cliente => (
    <option key={cliente.id} value={cliente.id}>{cliente.nombre}</option>
  ))}
</select>
      <label htmlFor="floating_email" className="sm:rounded-lg text-center peer-focus:font-medium  text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10">Cliente</label>
  </div>
  <div className="relative z-0 w-full mb-5 group">
  <select
  name="auto_id"
  id="auto_id"
  value={formData.auto_id}
  onChange={handleInputChange}
  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
  required
>
  <option value="" disabled>Select a car</option>
  {autos.map(auto => (
    <option key={auto.id} value={auto.id}>{auto.marca}</option>
  ))}
</select>
      <label htmlFor="floating_password" className="peer-focus:font-medium  text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Auto</label>
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input type="number" name="tarifa_diaria" id="tarifa_diaria" value={formData.tarifa_diaria} onChange={handleInputChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="floating_repeat_password" className="peer-focus:font-medium  text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tarifa</label>
  </div>
  <div className="grid md:grid-cols-2 md:gap-6">
    <div className="relative z-0 w-full mb-5 group">
        <input type="date" name="fecha_inicio" id="fecha_inicio" value={formData.fecha_inicio} onChange={handleInputChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label htmlFor="floating_first_name" className="peer-focus:font-medium  text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Fecha Inicio</label>
    </div>
    <div className="relative z-0 w-full mb-5 group">
        <input type="date" name="fecha_fin" id="fecha_fin" value={formData.fecha_fin} onChange={handleInputChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label htmlFor="floating_last_name" className="peer-focus:font-medium  text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Fecha Final</label>
    </div>
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input type="number" name="total_paga" id="total_paga" value={formData.total_paga} onChange={handleInputChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="floating_repeat_password" className="text-center peer-focus:font-medium  text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Total a pagar</label>
  </div>
  <button type="submit" onClick={handleSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>
</div>
</div>
  )
}

export default Renta;