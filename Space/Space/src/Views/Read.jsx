import React, { useEffect, useState } from 'react';
import { getUsers, getImages } from '../Service/Service';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/spinner.gif';

const Read = () => {
    const navegar = useNavigate();
    const [users, setUsers] = useState([]);
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
    setIsLoading(true);
    const fetchItems = async () => {
      const users = await getUsers();
      const images = await getImages(users);
      setIsLoading(false);
      setUsers(users);
      setImages(images);
    };
    fetchItems();
  }, []);

  if (isLoading) {
    return <div><h2>Cargando...</h2><img src={logo} alt='Rueda Cargando'></img></div>;
  }

  return (
    <div>
      <h2>Lista de users con Imágenes</h2>
      <br />
      <button onClick={ (e) => navegar('/create')} className='btn btn-success left'>Añadir Receta</button>
      <br /><br />
      <table>
        <thead>
            <tr><th>ID</th><th>Nombre</th><th>E-mail</th><th>Imagen</th><th>Acciones</th></tr>
        </thead>
        <tbody>
                {users.map((user, i) => (
                    <tr key={user.id}><td>{user.id}</td><td>{user.name}</td><td>{user.email}</td><td><a href={user.image} target='_blank'><img src={images[i].image} width={120} /></a></td><td><button onClick={ (e) => navegar(`/details/${receta.id}`)} className='btn btn-primary'>Detalles</button>&nbsp;&nbsp;<button onClick={ (e) => navegar(`/create/${user.id}`)} className='btn btn-info'>Actualizar</button>&nbsp;&nbsp;<button onClick={(e)=> navegar(`/delete/${user.id}`)} className='btn btn-danger'>Eliminar</button></td></tr>
                ))}
        </tbody>
      </table>
    </div>
  );
};

export default Read;