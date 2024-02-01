import  { useState } from 'react';
import axios from 'axios';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import car4 from './images/car4.jpg';
import Swal from 'sweetalert2';

function Inicio() {
  const [formData, setFormData] = useState({
    id: null,
    nombre: '',
    apellido: '',
    dni: '',
    telefono: '',
    email: '',
    direccion: '',
  });
  
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (
      formData.nombre === '' ||
      formData.apellido === '' ||
      formData.dni === '' ||
      formData.telefono === '' ||
      formData.email === '' ||
      formData.direccion === ''
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Completa todos los campos antes de guardar.',
      });
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:8081/clientes', formData);
      console.log('Respuesta del servidor:', response.data);
  
      // Puedes realizar alguna acción adicional después de enviar los datos, como redireccionar o mostrar un mensaje de éxito.
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Los datos se guardaron correctamente.',
      });
  
      // Limpiar el formulario después de guardar exitosamente si es necesario.
      setFormData({
        id: null,
        nombre: '',
        apellido: '',
        dni: '',
        telefono: '',
        email: '',
        direccion: '',
      });
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hubo un error al intentar guardar los datos.',
      });
    }
  };
  
  return (
      <div>
        <div className="relative">
          <img src={car4} alt="carros" className="mx-30 h-30 w-45 object-cover" />
          <div className="absolute top-0 left-0 w-full text-black p-4">
            <h1 className="text-4xl font-bold tracking-wide">¡Encuentra el Auto de tus Sueños Aquí!</h1>
            
            <div className="fixed bottom-4 left-4 text-white bg-black w-full h-50 size-20 text-2xl">
              <div className="flex items-center ml-2 justify-center">
                <span>Contactanos:</span>
                <MdOutlineAlternateEmail />
                <span>ejemplo@ventaautos.com</span>
              </div>
              <div className="flex items-center ml-2 justify-center">
                <BsFillTelephoneFill className="flex items-center ml-2" />
                <span>+123 456 7890</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 mx-auto">
          <br />
          <div className="block uppercase tracking-wide text-grey-darker text-2xl font-extrabold mb-2">
            Complete sus datos
          </div>
  
          <div className="max-w-md mx-auto bg-grey-lighter border border-grey-lighter rounded p-6 mb-6">
            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-first-name">Nombre</label>
            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="nombre" type="text" placeholder="Nombres" name="nombre" value={formData.nombre} onChange={handleInputChange} />
  
            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-last-name">Apellido</label>
            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" id="apellido" type="text" placeholder="Apellidos" name="apellido" value={formData.apellido} onChange={handleInputChange} />
  
            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-password">DNI</label>
            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" id="dni" type="number" placeholder="Nro de DNI" name="dni" value={formData.dni} onChange={handleInputChange} />
  
            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-password">Telefono</label>
            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" id="telefono" type="number" placeholder="Nro de telefono" name="telefono" value={formData.telefono} onChange={handleInputChange} />
  
            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-password">Email</label>
            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" id="email" type="text" placeholder="Correo de E-mail" name="email" value={formData.email} onChange={handleInputChange} />
  
            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-email"></label>
            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-password">Direccion</label>
            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" id="direccion" type="text" placeholder="Direccion" name="direccion" value={formData.direccion} onChange={handleInputChange} />
          </div>
  
          <div className="mt-4">
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Guardar Datos</button>
          </div>
          <br />
        </div>
        <div className="bg-black p-8"></div>
        <div className="bg-black p-8"></div>
      </div>
    );
  }
    export default Inicio;