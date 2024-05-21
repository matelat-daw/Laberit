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
    $data = json_decode($_POST["data"]);
	$file = new PhpOffice\PhpSpreadsheet\Spreadsheet(); // Hay que usarlo así en Wordpress, también funciona en cualquier script de PHP.

	$active_sheet = $file->getActiveSheet();

	$active_sheet->setCellValue('A1', 'MAC');
	$active_sheet->setCellValue('B1', 'Marca');
	$active_sheet->setCellValue('C1', 'OUI');
	$active_sheet->setCellValue('D1', 'Fecha');
	$active_sheet->setCellValue('E1', 'ARP');
	$active_sheet->setCellValue('F1', 'ARP46');
    $active_sheet->setCellValue('G1', 'Broadcast');
    $active_sheet->setCellValue('H1', 'ICPM');
	$active_sheet->setCellValue('I1', 'ICPM6');
	$active_sheet->setCellValue('J1', 'IPV6');
    $active_sheet->setCellValue('K1', 'Multicast');
	$active_sheet->setCellValue('L1', 'Resto');
	$active_sheet->setCellValue('M1', 'Nº de Paquetes');
    $active_sheet->setCellValue('N1', 'Wrong IP');
    $active_sheet->setCellValue('O1', 'SSDP');
	$active_sheet->setCellValue('P1', 'TCP');
	$active_sheet->setCellValue('Q1', 'Tráfico');
    $active_sheet->setCellValue('R1', 'UDP');
	$active_sheet->setCellValue('S1', 'Unicast');

    for ($i = 65; $i < 84; $i++) // Bucle de la A a la S(ASCII).
    {
        $active_sheet->getStyle(chr($i) . 1)->getAlignment()->setHorizontal("center"); // Centra en Texto de Todos Los Títulos.
    }

	$count = 2;
	$total = 0;

    for ($i = 0; $i < count($data); $i++)
    {
        for ($j = 0; $j < count($data[$i]); $j++)
        {
            $active_sheet->setCellValue(chr(65 + $j) . $count, $data[$i][$j]);
            $active_sheet->getStyle(chr(65 + $j) . $count)->getAlignment()->setHorizontal("center");
        }
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
                            <input type="hidden" name="data" value="<?php echo htmlspecialchars(json_encode($data)); ?>">
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
                            <th>MAC</th>
                            <th>Marca</th>
                            <th>OUI</th>
                            <th>Fecha</th>
                            <th>Puerto Remoto</th>
                            <th>Protocolo</th>
                            <th>OUI</th>
                            <th>Tamaño del Paquete</th>
                            <th>Marca</th>
                            <th>Fecha</th>
                            <th>Marca</th>
                            <th>OUI</th>
                            <th>Fecha</th>
                            <th>Puerto Remoto</th>
                            <th>Protocolo</th>
                            <th>OUI</th>
                            <th>Tamaño del Paquete</th>
                            <th>Marca</th>
                            <th>Fecha</th>
                        </tr>
                    <?php
                    for ($i = 0; $i < count($data); $i++)
                    {
                        echo '<tr>';
                        for ($j = 0; $j < count($data[0]); $j++)
                        {
                            echo '<td style="text-align: center; width: 70px;">' . $data[$i][$j] . '</td>';
                        }
                        echo '</tr>';
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