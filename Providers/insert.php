<?php
include 'includes/conn.php';
$title = 'Proveedores - Insertando';
include 'includes/header.php';
include 'includes/modal-index.html';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = $_POST['id'];
    $nombre = $_POST['nombre'];
    $email = $_POST['email'];
    $edad = $_POST['edad'];

    if ($id != null) {
        try {
            // Actualizar datos
            $updateResult = $collection->updateOne(
                ['_id' => new MongoDB\BSON\ObjectId($id)],
                ['$set' => [
                    'nombre' => $nombre,
                    'email' => $email,
                    'edad' => (int)$edad
                ]]
            );
            echo "<script>toast(0, 'Todo OK:', 'Usuario Actualizado con ID: $id');</script>";
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage(); // Muestra el error
        }
    }
    else
    {
        try {
            // Insertar datos
            $insertResult = $collection->insertOne([
                'nombre' => $nombre,
                'email' => $email,
                'edad' => (int)$edad
            ]);
            $result = $insertResult->getInsertedId();
            echo "<script>toast(0, 'Todo OK:', 'Usuario Insertado con ID: $result');</script>";
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage(); // Muestra el error
        }
    }
}

include 'includes/footer.html';