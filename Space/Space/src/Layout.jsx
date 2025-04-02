import React from "react";
import {Link, Outlet} from 'react-router-dom';

export default function Layout()
{
    return (
        <main>
            <nav>
                <Link to="/">Inicio |</Link>
                <Link to="/Read">Lista de Usuarios |</Link>
                <Link to="/Create">Agrega un Usuario</Link>
            </nav>
            <div>
                <Outlet />
            </div>
        </main>
    )
}