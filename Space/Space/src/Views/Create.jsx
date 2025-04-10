import React, { useEffect, useState } from 'react';
import { createUser, getUsers, } from '../Service/Service';
import { useParams, useNavigate } from 'react-router-dom';

const Create = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', surname: '', email: '' });
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
        const users = await getUsers();
        const user = users.find((user) => user.id === id);
            if (user)
            {
                setFormData(user);
            }
            else
            {
                console.error('Usuario no Encontrado.');
            }
        };
        fetchItem();
    }
}, [id]);

  return (
    <div>
      <h2>Añadir/Modificar Usuario</h2>
      <form onSubmit={handleSubmit} enctype="multipart/form-data">
        <label htmlFor='name' className='left'>Nombre:</label>
        <br />
        <input id='name' type="text" name="name" className='left' value={formData.name} onChange={handleChange} placeholder="Nombre" required />
        <br /><br />
        <label htmlFor='surname1' className='left'>Apellido:</label>
        <br />
        <input id='surname1' type="text" name="surname1" className='left' value={formData.surname1} onChange={handleChange} placeholder="Apellido" required />
        <br /><br />
        <label htmlFor='email' className='left'>E-mail:</label>
        <br />
        <input id='email' type="text" name="email" className='left' value={formData.email} onChange={handleChange} placeholder="E-mail" required />
        <br /><br />
        <label htmlFor='img' className='left'>Imagen</label>
        <br />
        <input id='img' type="file" name="profileImage" className='left' onChange={handleChange} placeholder="Imagen" required />
        <br /><br />
        {
          !id ? <button type="submit" className='btn btn-success'>Agregar Usuario</button> : <button type="submit" className='btn btn-info'>Modificar Usuario</button>
        }
      </form>
    </div>
  );
};

export default Create;