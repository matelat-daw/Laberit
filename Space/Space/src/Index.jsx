import React from 'react'
import { Link } from 'react-router-dom'

export default function Inicio() {
  return (
    <>
        <h1>Te Damos la Bienvenida a la Base de Datos de Usuarios de SpaceUsers</h1>
        <ul className='none'>
            <li><Link to="/Read">Muestra la Lista de Usuarios</Link></li>
            <li><Link to="/Create">Agrega un Usuario al Espacio</Link></li>
        </ul>
    </>
  )
}