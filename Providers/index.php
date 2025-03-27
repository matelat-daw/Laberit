<?php
include 'includes/conn.php';
$title = 'Proveedores - Principal';
include 'includes/header.php';
echo "<h1>Proveedores</h1>";

echo "<h2>Formulario de Proveedores</h2>
    <h3>Insertar Proveedor</h3>
    <br>
    <form action='insert.php' method='post'>
        <input type='text' name='nombre' id='nombre' required>
        <label for='nombre'>Nombre</label><br><br>
        <input type='email' name='email' id='email' required>
        <label for='email'>Email</label><br><br>
        <input type='number' name='edad' id='edad' required>
        <label for='edad'>Edad</label><br><br>
        <input type='submit' value='Insertar'>
    </form><br><br>";
    
    // Recuperar datos
    $cursor = $collection->find(['edad' => ['$gte' => 18]]); // Buscar documentos con edad >= 18
    foreach ($cursor as $document) {
        echo "Nombre: " . $document['nombre'] . ", Email: " . $document['email'] . ", Edad: " . $document['edad'] . "<br>";
    }
include 'includes/footer.html';