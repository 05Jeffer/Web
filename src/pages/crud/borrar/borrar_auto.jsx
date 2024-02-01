import React from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

function Borrar_auto({id, setData}) {
    const handleDelete = async () => {
        // Mostrar una alerta de confirmación antes de eliminar
        const result = await Swal.fire({
          title: '¿Estás seguro?',
          text: '¡No podrás revertir esto!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, eliminarlo',
          cancelButtonText: 'Cancelar'
        });
      
        if (result.isConfirmed) {
          try {
            await axios.delete(`http://localhost:8081/autos/${id}`);
            setData((prevData) => prevData.filter((cliente) => cliente.id !== id));
            Swal.fire('Eliminado', 'El cliente ha sido eliminado', 'success');
          } catch (error) {
            console.error('Error al eliminar el cliente:', error);
            Swal.fire('Error', 'Hubo un problema al eliminar el cliente', 'error');
          }
        }
      };
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <td className="px-6 py-3  bg-red-700">
              <div className="flex space-x-5">
                <button onClick={handleDelete}>Borrar</button>
              </div>
            </td>
    </div>
  )
}

export default Borrar_auto;