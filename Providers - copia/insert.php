<?php
include 'includes/conn.php';
$title = 'Proveedores - Insertando';
include 'includes/header.php';
include 'includes/modal-index.html';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = $_POST['id'];
    // $nombre = $_POST['nombre'];
    // $email = $_POST['email'];
    // $edad = $_POST['edad'];

    // Obtener las keys dinámicamente
    $Keys = $collection->findOne();
    $data = [];

    // Construir el array dinámico
    foreach ($Keys as $key => $value) {
        if (isset($_POST[$key])) {
            $data[$key] = $_POST[$key];
        }
    }

    if ($id != null) {
        // try {
        //     // Actualizar datos
        //     $updateResult = $collection->updateOne(
        //         ['_id' => new MongoDB\BSON\ObjectId($id)],
        //         ['$set' => [
        //             'nombre' => $nombre,
        //             'email' => $email,
        //             'edad' => (int)$edad
        //         ]]
        //     );
        //     echo "<script>toast(0, 'Todo OK:', 'Usuario Actualizado con ID: $id');</script>";
        // } catch (Exception $e) {
        //     echo 'Error: ' . $e->getMessage(); // Muestra el error
        // }
            try {
                $updateResult = $collection->updateOne(
                    ['_id' => new MongoDB\BSON\ObjectId($id)],
                    ['$set' => $data]
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
            // $insertResult = $collection->insertOne([
            //     'nombre' => $nombre,
            //     'email' => $email,
            //     'edad' => (int)$edad
            // ]);
            $insertResult = $collection->insertOne($data);
            $result = $insertResult->getInsertedId();
            echo "<script>toast(0, 'Todo OK:', 'Usuario Insertado con ID: $result');</script>";
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage(); // Muestra el error
        }
    }
}

include 'includes/footer.html';