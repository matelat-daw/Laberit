<?php
include 'includes/conn.php';
$title = 'Proveedores - Principal';
include 'includes/header.php';
$id = null;
$name = "";
$email = "";
$age = "";
if (isset($_GET["id"])) {
    $id = $_GET["id"];
    $user = $collection->find(['_id' => new MongoDB\BSON\ObjectId($id)]);
    foreach ($user as $item) {
        $name = $item["nombre"];
        $email = $item["email"];
        $age = $item["edad"];
    }
}
echo "<h1>Proveedores</h1>";

echo "<h2>Formulario de Proveedores</h2>
    <h3>Insertar Proveedor</h3>
    <br>
    <form action='insert.php' method='post'>
        <input type='hidden' name='id' value='$id'>
        <input type='text' name='nombre' id='nombre' value='$name' required>
        <label for='nombre'>Nombre</label><br><br>
        <input type='email' name='email' id='email' value='$email' required>
        <label for='email'>Email</label><br><br>
        <input type='number' name='edad' id='edad' value='$age' required>
        <label for='edad'>Edad</label><br><br>
        <input type='submit' value='Insertar'>
    </form><br><br>";
    
    // Recuperar datos
    // $cursor = $collection->find(['edad' => ['$gte' => 18]]); // Buscar documentos con edad >= 18
    $filter  = []; // Filtro Vacío.
    $options = ['sort' => ['email' => -1]]; // Ordena por Edad Ascendente.
    $cursor = $collection->find($filter, $options); // Buscar todos los documentos, y Ordena por $options sin filtrar.
    echo "<table><tr><th>Nombre</th><th>Email</th><th>Edad</th><th>Acciones</th></tr>";
    foreach ($cursor as $document) {
        echo "<tr><td>" . $document['nombre'] . "</td><td><a href='mailto:" . $document['email'] . "'>" . $document['email'] . "</a></td><td>" . $document['edad'] . "</td><td><button onclick='update(\"" . $document['_id'] . "\");' class='btn btn-primary'>Modificar</button>&nbsp;&nbsp;<button onclick='deletit(\"" . $document['_id'] . "\");' class='btn btn-danger'>Eliminar</button></td></tr>";
    }
    echo "</table><br><br><br>";
include 'includes/footer.html';