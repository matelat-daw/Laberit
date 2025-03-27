<?php
include 'includes/conn.php';
$title = 'Proveedores - Insertando';
include 'includes/header.php';
include 'includes/modal-index.html';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nombre = $_POST['nombre'];
    $email = $_POST['email'];
    $edad = $_POST['edad'];

    try {
        // Insertar datos
        $insertResult = $collection->insertOne([
            'nombre' => $nombre,
            'email' => $email,
            'edad' => (int)$edad
        ]);
        $result = $insertResult->getInsertedId();
        echo "<script>toast(0, 'Todo OK:', 'Documento Insertado con ID: $result');</script>";
    } catch (Exception $e) {
        echo 'Error: ' . $e->getMessage(); // Muestra el error
    }
}

include 'includes/footer.html';