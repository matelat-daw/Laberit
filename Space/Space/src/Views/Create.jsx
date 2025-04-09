import React, { useEffect, useState } from 'react';
import { createUser, getUsers, } from '../Service/Service';
import { useParams, useNavigate } from 'react-router-dom';

const Create = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '' });
    const { id } = useParams();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUser(formData);
    navigate("/read");
  };

useEffect(() => {
    if (id)
    {
        const fetchItem = async () => {
        const recetas = await getUsers();
        const receta = recetas.find((receta) => receta.id === parseInt(id));
            if (receta)
            {
                setFormData(receta);
            }
            else
            {
                console.error('Receta no Encontrada.');
            }
        };
        fetchItem();
    }
}, [id]);

  return (
    <div>
      <h2>Añadir/Modificar Receta</h2>
      <form onSubmit={handleSubmit} enctype="multipart/form-data">
        <label htmlFor='name' className='left'>Nombre:</label>
        <br />
        <input id='name' type="text" name="name" className='left' value={formData.name} onChange={handleChange} placeholder="Nombre" required />
        <br /><br />
        <label htmlFor='kind' className='left'>Tipo de Cocina:</label>
        <br />
        <input id='kind' type="text" name="cuisine" className='left' value={formData.cuisine} onChange={handleChange} placeholder="Tipo de Cocina" required />
        <br /><br />
        <label htmlFor='img' className='left'>Imagen</label>
        <br />
        <input id='img' type="file" name="image" className='left' onChange={handleChange} placeholder="Imagen" required />
        <br /><br />
        <button type="submit" className='btn btn-success'>Agregar Receta</button>
      </form>
    </div>
  );
};

export default Create;