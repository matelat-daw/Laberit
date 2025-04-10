import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteUser } from '../Service/Service';

const Delete = () => {
    const { id } = useParams();
    const navigate = useNavigate();

  const handleDelete = async () => {
    await deleteUser(id);
    navigate('/read');
  };

  return (
    <div>
      <h2>Eliminar el Usuario con ID: {id}</h2>
      <p>¿Estás Seguro que Quieres Eliminar ese Usuario?</p>
      <button onClick={handleDelete}>Eliminar</button>&nbsp;&nbsp;
      <button onClick={() => navigate('/read')}>Cancel</button>
    </div>
  );
};

export default Delete;