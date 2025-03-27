<?php
include 'includes/conn.php';
$title = "Providers - Delete User";
include 'includes/header.php';
include 'includes/modal-index.html';

if (isset($_POST["id"]))
{
    $id = $_POST["id"];
    $collection->deleteOne(['_id' => new MongoDB\BSON\ObjectId($id)]);
    echo "<script>toast(0, 'Usuario Eliminado:', 'Se ha Eliminado el Usuario con ID: " . $id . "');</script>";
}