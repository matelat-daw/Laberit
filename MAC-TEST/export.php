<?php
require "Influx/autoload.php";
include 'includes/conn.php';
require 'Excel/autoload.php';

if (isset($_POST["data"]) && isset($_POST["index"])) // Viene de index.php
{
    $data = json_decode($_POST["data"]);
}
	
if(isset($_POST["export"])) // Viene del Mismo Script.
{
    $data = $_POST["data"];
	$file = new PhpOffice\PhpSpreadsheet\Spreadsheet(); // Hay que usarlo así en Wordpress, también funciona en cualquier script de PHP.

	$active_sheet = $file->getActiveSheet();

	$active_sheet->setCellValue('A1', 'IP');
	$active_sheet->setCellValue('B1', 'MAC');
	$active_sheet->setCellValue('C1', 'Host');
	$active_sheet->setCellValue('D1', 'Puerto Local');
	$active_sheet->setCellValue('E1', 'Puerto Remoto');
	$active_sheet->setCellValue('F1', 'Protocolo');
    $active_sheet->setCellValue('G1', 'OUI');
    $active_sheet->setCellValue('H1', 'Tamaño de Paquete');
	$active_sheet->setCellValue('I1', 'Marca');
	$active_sheet->setCellValue('J1', 'Fecha');

    for ($i = 65; $i < 75; $i++) // Bucle de la A a la J(ASCII).
    {
        $active_sheet->getStyle(chr($i) . 1)->getAlignment()->setHorizontal("center"); // Centra en Texto de Todos Los Títulos.
    }

	$count = 2;
	$total = 0;

    for ($i = 0; $i < count($data); $i+=10)
    {
        $active_sheet->setCellValue('A' . $count, $data[$i]);
        $active_sheet->getStyle('A' . $count)->getAlignment()->setHorizontal("center");
        $active_sheet->setCellValue('B' . $count, $data[$i + 1]);
        $active_sheet->getStyle('B' . $count)->getAlignment()->setHorizontal("center");
        $active_sheet->setCellValue('C' . $count, $data[$i + 2]);
        $active_sheet->getStyle('C' . $count)->getAlignment()->setHorizontal("left"); // Alineación del texto con la cadena 'left', Alinea a la Izquierda.
        $active_sheet->setCellValue('D' . $count, $data[$i + 3]);
        $active_sheet->getStyle('D' . $count)->getAlignment()->setHorizontal("right"); // Alineación del texto con la cadena 'right', Alinea a la Derecha.
        $active_sheet->setCellValue('E' . $count, $data[$i + 4]);
        $active_sheet->getStyle('E' . $count)->getAlignment()->setHorizontal("right");
        $active_sheet->setCellValue('F' . $count, $data[$i + 5]);
        $active_sheet->getStyle('F' . $count)->getAlignment()->setHorizontal("center"); // Alineación del texto con la cadena 'center', Alinea al Centro.
        $active_sheet->setCellValue('G' . $count, $data[$i + 6]);
        $active_sheet->getStyle('G' . $count)->getAlignment()->setHorizontal("center");
        $active_sheet->setCellValue('H' . $count, $data[$i + 8]);
        $active_sheet->getStyle('H' . $count)->getAlignment()->setHorizontal("right");
        $active_sheet->setCellValue('I' . $count, "\t" . $data[$i + 9]);
        $active_sheet->getStyle('I' . $count)->getAlignment()->setHorizontal("left");
        $active_sheet->setCellValue('J' . $count, $data[$i + 7]);
        $active_sheet->getStyle('J' . $count)->getAlignment()->setHorizontal("center");

        $count++;
    }
    $active_sheet->setCellValue('G' . ($count + 2), "Total Tamaño de Todos los Paquetes:");
    $active_sheet->setCellValue('H' . ($count + 2), "=SUM(H2:H" . ($count - 1) . ")");
    $active_sheet->getStyle('H' . ($count + 2))->getNumberFormat()->setFormatCode('#,0. KB');
    $active_sheet->setCellValue('A' . ($count + 4), "Incidencias en la RED de Lãberit");

    $active_sheet->getRowDimension(1)->setRowHeight(20); // Cambia el tamaño Vertical de las filas usadas en la planilla.
    $active_sheet->getColumnDimension(chr(65))->setWidth(15);
    $active_sheet->getColumnDimension(chr(66))->setWidth(20); // Si es la Letra B le da el tamaño horizontal 20.
    $active_sheet->getColumnDimension(chr(67))->setWidth(10); // Si es la Letra C le da el tamaño horizontal 10.
    for ($i = 68; $i < 75; $i++)
    {
        if ($i < 71)
        {
            $active_sheet->getColumnDimension(chr($i))->setWidth(15); // Si es la Letra E le da el tamaño horizontal 15.
        }
        else
        {
            $active_sheet->getColumnDimension(chr($i))->setWidth(35); // Si es la Letra E le da el tamaño horizontal 15.
        }
    }
    $active_sheet->getColumnDimension(chr(75))->setWidth(20);

    $active_sheet->getRowDimension($count + 2)->setRowHeight(40); // Cambia el tamaño Vertical de las filas usadas en la planilla.
    $active_sheet->getRowDimension($count + 4)->setRowHeight(40); // Cambia el tamaño Vertical de las filas usadas en la planilla.
        
    $writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($file, $_POST["file_type"]);

    $file_name = "Inidencias." . $_POST["file_type"];

    $writer->save($file_name);

    header('Content-Type: application/x-www-form-urlencoded');

    header('Content-Transfer-Encoding: Binary');

    header("Content-disposition: attachment; filename=\"".$file_name."\"");

    readfile($file_name);

    unlink($file_name);

    exit;
}

$title = "Exportando Facturas";
include "includes/header.php";
?>
    <section class="container-fluid pt-3">
    <div id="pc"></div>
    <div id="mobile"></div>
        <br>
        <h3 style="text-align: center;">Exporta las Facturas a Excel o CSV</h3>
        <br>
        <div class="row">
            <div class="col-md-1" style="width:3%;"></div>
                <div class="col-md-10">
                    <div class="row">
                        <div class="col-md-7">
                            Incidencias Almacenadas en InfluxDB.
                        </div>
                        <div class="col-md-2">
                        <form method="post">
                            <?php foreach ($data as $val) : ?>
                            <input type="hidden" name="data[]" value="<?= $val ?>">
                            <?php endforeach ?>
                            <select name="file_type" class="form-control input-sm">
                                <option value="Xlsx">Xlsx</option>
                                <option value="Csv">Csv</option>
                            </select>
                        </div>
                        <div class="col-md-3">
                            <input type="submit" name="export" class="btn btn-primary btn-lg" value="Descarga el Informe" />
                        </div>
                    </div>
                    </form>
                    <br><br>
                    <table>
                        <tr class='text-center'>
                            <th>IP</th>
                            <th>MAC</th>
                            <th>Host</th>
                            <th>Puerto Local</th>
                            <th>Puerto Remoto</th>
                            <th>Protocolo</th>
                            <th>OUI</th>
                            <th>Tamaño del Paquete</th>
                            <th>Marca</th>
                            <th>Fecha</th>
                        </tr>
                    <?php
                    for ($i = 0; $i < count($data); $i+=10)
                    {
                        echo '<tr><td style="text-align: center; width: 70px;">' . $data[$i] . '</td>
                        <td style="text-align: center; width: 100px;">' . $data[$i + 1] . '</td>
                        <td style="width: 180px;">' . $data[$i + 2] . '</td>
                        <td style="text-align: right; width: 40px;">' . $data[$i + 3] . '</td>
                        <td style="text-align: right; width: 40px;">' . $data[$i + 4] . '</td>
                        <td style="text-align: center; width: 80px;">' . $data[$i + 5] . '</td>
                        <td style="text-align: center; width: 80px;">' . $data[$i + 6] . '</td>
                        <td style="text-align: right; width: 100px;">' . $data[$i + 8] . '</td>
                        <td style="text-align: left; width: 100px;">' . $data[$i + 9] . '</td>
                        <td style="text-align: center; width: 100px;">' . $data[$i + 7] . '</td>
                        </tr>';
                    }
                    ?>
                    </table>
                    <br><br><br>
                <button class="btn btn-danger btn-lg" onclick="window.close()">Cierra Esta Ventana</button>
                <br><br><br><br><br><br>
                </div>
            <div class="col-md-1" style="width:3%;"></div>
        </div>
    </section>
<?php
include "includes/footer.html";
?>