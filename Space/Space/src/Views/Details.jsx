import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUsers } from '../Service/Service';

const Details = () => {
    const { id } = useParams();
    const [users, setUsers] = useState([]);
    const [user, setName] = useState([]);
    const obj = [];

    useEffect(() => {
        if (id)
        {
            const fetchUsers = async () => {
                const users = await getUsers();
                const userId = users.find((user) => user.id === id);
                obj[0] = userId; // Para poder usar map hay que meter el JSON en un array.
                setName(userId.name);
                if (users)
                {
                    setUsers(obj);
                }
                else
                {
                    console.error('Usuario no Encontrado.');
                }
            };
            fetchUsers();
        }
    }, [id]);

    return (
        <div>
            <h1>Usuario de: {user}</h1>
            <ul className='none'>
                {users.map((user, index) => (
                    <li key={index}>{user.name} {user.surname1} {user.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default Details;