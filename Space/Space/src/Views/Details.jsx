import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUsers } from '../Service/Service';

const Details = () => {
    const { id } = useParams();
    const [users, setUsers] = useState([]);
    const [user, setName] = useState([]);
    const obj2 = [];

    useEffect(() => {
        if (id)
        {
            const fetchUsers = async () => {
                const users2 = await getUsers();
                obj2[0] = users2;
                const userId = obj2.find((user) => user.id === id);
                setName(userId.name);
                if (users)
                {
                    setUsers(obj2);
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