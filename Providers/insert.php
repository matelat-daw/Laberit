<?php
include 'includes/conn.php';
$title = 'Proveedores - Insertando';
include 'includes/header.php';
include 'includes/modal-index.html';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = $_POST['id'];

    // Obtener las keys dinámicamente
    $Keys = $collection->findOne(); // Lee el Primer Dato de la Colección Para Obtener las Keys de la Colección.
    $keyMap = []; // Mapa de claves genéricas a reales.

    // Construir el mapa dinámico (genérico -> real).
    foreach ($Keys as $dbKey => $value) {
        // Define aquí cómo mapear las claves genéricas a las reales.
        // Por ejemplo, convertir a minúsculas o usar un prefijo.
        $genericKey = strtolower($dbKey); // Ejemplo: convertir a minúsculas.
        $keyMap[$genericKey] = $dbKey; // Almacena las claves reales en el array con las claves genéricas.
    }

    $data = []; // Contendrá los datos a insertar o actualizar, clave real, valor.

    // Construir el array dinámico usando el mapa.
    foreach ($_POST as $formKey => $formValue) {
        if (isset($keyMap[$formKey])) {
            $dbKey = $keyMap[$formKey];
            $data[$dbKey] = $formValue; // Usa la clave real en el array de datos a la que se le asigna el valor que llega por POST.
        }
    }

    if ($id != null) // Si ID no es Nula, Entonces se Actualiza.
    {
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
    else // Si ID es Nula, Entonces se Inserta.
    {
        try {
            $insertResult = $collection->insertOne($data);
            $result = $insertResult->getInsertedId();
            echo "<script>toast(0, 'Todo OK:', 'Usuario Insertado con ID: $result');</script>";
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage(); // Muestra el error
        }
    }
}

include 'includes/footer.html';