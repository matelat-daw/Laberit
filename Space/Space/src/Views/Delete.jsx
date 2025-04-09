import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteUser } from '../Service/Service';

const Delete = () => {
    const { id } = useParams();
    const navigate = useNavigate();

  const handleDelete = async () => {
    await deleteUser(parseInt(id));
    navigate('/read');
  };

  return (
    <div>
      <h2>Eliminar la Receta con ID: {id}</h2>
      <p>¿Estás Seguro que Quieres Eliminar esa Receta?</p>
      <button onClick={handleDelete}>Eliminar</button>&nbsp;&nbsp;
      <button onClick={() => navigate('/read')}>Cancel</button>
    </div>
  );
};

export default Delete;