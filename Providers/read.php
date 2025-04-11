<?php
include 'includes/conn.php';
include 'xls/autoload.php';
use PhpOffice\PhpSpreadsheet\IOFactory;
$title = 'Proveedores - Leer Fichero';
include 'includes/header.php';

if (isset($_FILES['file'])) {
    $file = $_FILES['file']['tmp_name'];
    $spreadsheet = IOFactory::load($file);
    $sheetData = $spreadsheet->getActiveSheet()->toArray(null, true, true, true);
    
    // Aquí puedes procesar los datos del archivo
    foreach ($sheetData as $row) {
        // Por ejemplo, insertar cada fila en la base de datos
        $nombre = $row['A']; // Suponiendo que el nombre está en la columna A
        $email = $row['B'];  // Suponiendo que el email está en la columna B
        $edad = $row['C'];   // Suponiendo que la edad está en la columna C

        echo "$nombre, $email, $edad<br>";
        
        // Aquí puedes insertar los datos en tu base de datos
        $collection->insertOne(['nombre' => $nombre, 'email' => $email, 'edad' => $edad]);
    }
    
    echo "Datos leídos e insertados correctamente.";
} else {
    echo "No se ha subido ningún archivo.";
}
echo "<button onclick='window.location.href=\"index.php\";' class='btn btn-primary'>Volver</button>";
echo "<br><br><br>";
include 'includes/footer.html';
?>