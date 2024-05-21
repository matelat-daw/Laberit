<?php
require "Influx/autoload.php";
include "includes/conn.php";
$title = "Detección de Intrusión";
include "includes/header.php";
include "includes/modal_index.html";

use InfluxDB2\Model\WritePrecision;

if (isset($_POST["sended"])) // Recibe la IP y los Demás Datos desde el script index.php por POST.
{
    $file = htmlspecialchars($_FILES["data"]["name"]);
    $tmp = htmlspecialchars($_FILES["data"]["tmp_name"]);

    if (!file_exists("Data"))
    {
        mkdir("Data", 0777, true);
    }
    $path = "Data/" . basename($file);
    move_uploaded_file($tmp, $path);

    $line = [];
    $data = [];
    $tmp = [];
    $i = 0;
    $datos = fopen($path, "r") or die("Unable to open file!");
    while(!feof($datos))
    {
        $line[$i] = fgets($datos);
        $line[$i] = trim($line[$i]);
        if ($i == 0)
        {
            $data[0] = explode(";", $line[$i]);
            $data[0][0] = implode(':', str_split($data[0][0], 2)); // Intercala los : Cada 2 Caracteres en la MAC.
        }
        else
        {
            $line[0] = "";
            $tmp[0] = explode(";", $line[$i]);
            for ($j = 1; $j < count($tmp[0]); $j++)
                $data[0][$j] += $tmp[0][$j];
        }
        $i++;
    }
    fclose($datos);

    $oui = get_device($conn, $data[0][0]); // Llama a la Función get_device($conn, $mac), Pasándole la conexión con la base de datos y la MAC.

    if ($oui != null)
    {
        $sql = "SELECT vendorName FROM mac WHERE macPrefix='$oui'"; // Obtenemos la Marca del Dispositivo de la Base de Datos MariaDB.
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        if ($stmt->rowCount() > 0)
        {
            $row = $stmt->fetch(PDO::FETCH_OBJ);
            $mark = $row->vendorName;
            $owner = preg_replace('/[^a-z0-9]/i', '_', $mark);
            $private = false;
        }
    }
    else
    {
        $mark = "Android,_IOS,_Virtual";
        $oui = $data[0][0];
        $private = true;
    }
    $writeApi = $client->createWriteApi();
    $save = 'aintrusa,mac=' . $data[0][0] . ',mark=' . $owner . ',oui=' . $oui . ' qtty=' . $data[0][1] . ',uni=' . $data[0][2] . ',multi=' . $data[0][3] . ',broad=' . $data[0][4] . ',arp=' . $data[0][5] . ',traffic=' . $data[0][6] . ',icmp=' . $data[0][7] . ',udp=' . $data[0][8] . ',tcp=' . $data[0][9] . ',resto=' . $data[0][10] . ',ipv6=' . $data[0][11] . ',arp46=' . $data[0][12] . ',badip=' . $data[0][13] . ',ssdp=' . $data[0][14] . ',icmp6=' . $data[0][15]; // Los Tags en Influx no pueden tener espacios.

    $writeApi->write($save, WritePrecision::MS, $bucket, $org);
    $client->close();

    echo "<script>toast(0, 'Datos Agregados', 'Se Han Agregado Datos a InfluxDB.');</script>";
}

function get_device($conn, $mac)
{
    $ma_s = substr($mac, 0, 13); // Parte la Cadena $mac y Obtiene la OUI de una MAC Pequeña.
    $ma_m = substr($mac, 0, 10); // Parte la Cadena $mac y Obtiene la OUI de una MAC Mediana.
    $ma_l = substr($mac, 0, 8); // Parte la Cadena $mac y Obtiene la OUI de una MAC Grande.
    
    $sql = "SELECT * FROM mac WHERE macPrefix='$ma_s' UNION SELECT * FROM mac WHERE macPrefix='$ma_m' UNION SELECT * FROM mac WHERE macPrefix='$ma_l' LIMIT 1;"; // Reemplazo el Query SQL por un Storage Procedure.
    $stmt = $conn->prepare($sql); // Se prepara la Consulta.
    $stmt->execute(); // Se Ejecuta.
    if ($stmt->rowCount() > 0) // Si se Obtienen Resultados.
    {
        $row = $stmt->fetch(PDO::FETCH_OBJ);
        $oui = $row->macPrefix;
        return $oui;
    }
    else
    {
        return null;
    }
}
?>