<?php
session_start(); // Incluyo el session_start() ya que se usará en casi todos los scripts.
require 'vendor/autoload.php'; // Carga automática de Composer

use MongoDB\Client;

try {
    // Conexión con MongoDB
    // $client = new Client("mongodb://cesarmatelat:Anubis|68@providers-shard-00-00.popd7.mongodb.net:27017,providers-shard-00-01.popd7.mongodb.net:27017,providers-shard-00-02.popd7.mongodb.net:27017/?replicaSet=atlas-34sckz-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Providers"); // Conexión en la nube.
    $client = new Client("mongodb://localhost:27017"); // Conexión local.
    $database = $client->selectDatabase('Providers'); // Nombre de la base de datos
    $collection = $database->selectCollection('exampleCollection'); // Nombre de la colección

    // // Insertar datos
    // $insertResult = $collection->insertOne([
    //     'nombre' => 'César Matelat',
    //     'email' => 'cesarmatelat@gmail.com',
    //     'edad' => 56
    // ]);
    // echo "Documento insertado con ID: " . $insertResult->getInsertedId() . "<br>";

    // // Recuperar datos
    // $cursor = $collection->find(['edad' => ['$gte' => 18]]); // Buscar documentos con edad >= 18
    // foreach ($cursor as $document) {
    //     echo "Nombre: " . $document['nombre'] . ", Email: " . $document['email'] . ", Edad: " . $document['edad'] . "<br>";
    // }
} catch (Exception $e) {
    echo 'Error: ' . $e->getMessage(); // Muestra el error
}
?>