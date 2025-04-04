<?php
require "Influx/autoload.php";
include "includes/conn.php";
$title = "Verificador de Direcciones MAC Intrusas.";
include "includes/header.php";
include "includes/modal.html";
include "includes/nav_index.html";
?>
<section class="container-fluid pt-3">
    <div class="row" id="pc">
        <div class="col-md-1" id="mobile"></div>
            <div class="col-md-10">
                <div id="view1">
                    <!-- Formulario para cargar el fichero con las muestras (Formato CSV). -->
                    <h1>Verificador de MACS</h1>
                    <br><br>
                    <h3>Agrega el Fichero de Datos al Formulario y Haz Click en el Botón Enviar para Almacenarlos en la Base de Datos</h3>
                    <br><br>
                    <form action="review.php" method="post" enctype="multipart/form-data">
                        <label><input id="file" type="file" name="data"> Carga el Fichero CSV</label>
                        <input type="submit" name="sended" value="Enviar" class="btn btn-primary btn-lg">
                    </form>
                </div>
                <div id="view2">
                    <!-- Tabla con los datos de las muestras, paginada de a 8 resultados. -->
                    <h3>Lista de datos en InfluxDB:</h3>
                    <br><br>
                    <?php
                    $query = "from(bucket: \"$bucket\") |> range(start: -10d) |> filter(fn: (r) => r._measurement == \"aintrusa\")"; // Consulta a InfluxDB, hasta 10 días antes.
                    $tables = $client->createQueryApi()->query($query, $org); // Ejecuta la Consulta Asignado el Resutlado a la Variable $tables.
                    $records = []; // $records Contendrá todos los Resultados de la Tabla intruder de la Base de Datos MACDB.
                    $i = 0;
                    foreach ($tables as $table) // Obtiene cada Tabla de las Tablas de la Variable $tables(Solo Obtiene la Tabla intruder).
                    {
                        foreach ($table->records as $record) // De la Tabla intruder Obtiene cada Campo Almacenado en la Varaible $record.
                        {
                            $tag = ["mac" => $record->getRecordValue("mac"), "mark" => $record->getRecordValue("mark"), "oui" => $record->getRecordValue("oui"), "time" => $record->getTime()];
                            $row = key_exists($record->getTime(), $records) ? $records[$record->getTime()] : []; // Este operador ternario asigna a $row los datos en InfluxDB.
                            $records[$record->getTime()] = array_merge($row, $tag, [$record->getField() => $record->getValue()]); // Hacemos un array_merge con los datos de toda la Tupla y los Tags.
                        }
                    }

                    if (count($records) > 0) // Si hay Datos.
                    {
                        $data = [];
                        $time = array_column($records, 'time'); // Obtengo la KEY time del Array $records.

                        array_multisort($time, SORT_DESC, $records); // Ordena el Array $records por la Columna time, en Orden Descendiente.

                        $i = 0; // Índice de Todos los Datos de Todas las Tuplas.
                        $pos = 0;

                        foreach($records as $key) // Bucle para Obtener las Keys.
                        {
                            $i = 0;
                            $data[$pos] = [];
                            foreach ($key as $value) // Bucle para Obtener los Valores de cada Clave.
                            {
                                $data[$pos][$i] = $value;
                                next($key); // Siguiente Clave.
                                $i++; // Siguiente Índice.
                            }
                            $pos++;
                        }

                        echo "<script>let array_value = " . json_encode($data) . ";
                                    makeData(array_value);</script>";
                    }   
                    else // Si No Hay Datos.
                    {
                        echo "<script>toast(0, 'Sin Datos Aun', 'No Hay Datos de la Última Hora.');</script>"; // Mensaje No Hay Datos.
                    }
                    ?>
                    <div id="table"></div>
                    <br>
                    <span id="pages"></span>&nbsp;&nbsp;&nbsp;&nbsp;
                    <button onclick="prev()" id="prev_btn" class="btn btn-danger" style="visibility: hidden;">Anteriores Resultados</button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <button onclick="next()" id="next_btn" class="btn btn-primary" style="visibility: hidden;">Siguientes Resultados</button><br>
                    <script>change(1, 8);</script>
                    <br><br><br><br>
                </div>
                <div id="view3">
                    <!-- Gráfica de AMCharts V5. -->
                    <h3>Gráfica de Nivel de Ataque de las Conexiones Intrusas.</h3>
                    <div id="chartdiv"></div>
                    <div id="buttons">
                        <button id="previ" onclick="reset(false)" style="visibility: hidden;" class="btn btn-info btn-lg">Anterior</button>&#9;&nbsp;&#9;&nbsp;&#9;<button id="next" onclick="reset(true)" class="btn btn-primary btn-lg">Siguiente</button>&#9;&nbsp;&#9;&nbsp;&#9;<label id="stackit"><input id="stack" type="checkbox" onchange="reset(null)"> Muestra los Datos Apilados</label>
                    </div>
                    <script>show()</script>

                </div>
                <div id="view4">
                    <!-- Formulario para Exportar los datos a CSV o XLSX. -->
                    <?php
                        if (isset($data))
                        {
                            echo '<h3>Exportando los Datos a Excel o CSV</h3>
                            <br>
                            <div class="col-md-5">
                            <h4>Haz Click en Ver Informe.</h4>
                            <br>
                            <form action="export.php" method="post" target="_blank">
                                <input type="hidden" name="data" value="' . htmlspecialchars(json_encode($data)) . '">
                                <input type="submit" name="index" value="Ver Informe" class="btn btn-info btn-lg">
                            </form>';
                        }
                    ?>
                    <br><br>
                    </div>
                </div>
            </div>
        <div class="col-md-1"></div>
    </div>
</section>



<?php
include "includes/footer.html";
?>