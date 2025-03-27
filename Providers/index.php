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
    // echo "<script>let collection = " . $cursor . "</script>";
    echo "<table><tr><th>Nombre</th><th>Email</th><th>Edad</th><th>Acciones</th></tr>";
    foreach ($cursor as $document) {
        echo "<tr><td>" . $document['nombre'] . "</td><td>" . $document['email'] . "</td><td>" . $document['edad'] . "</td><td><button onclick='details(\"" . $document['_id'] . "\");' class='btn btn-info'>Detalles</button>&nbsp;&nbsp;<button onclick='update(\"" . $document['_id'] . "\");' class='btn btn-primary'>Modificar</button>&nbsp;&nbsp;<button onclick='deletit(\"" . $document['_id'] . "\");' class='btn btn-danger'>Eliminar</button></td></tr>";
    }
    echo "</table><br><br><br>";
include 'includes/footer.html';