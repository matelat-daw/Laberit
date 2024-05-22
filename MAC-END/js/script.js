function totNumPages() // Función para la paginación
{
    return Math.ceil(window.array_length / window.qtty); // Calcula la cantidad de páginas que habrá, divide la cantidad de datos por 5 resultados a mostrar por página.
}

function prev() // Función para ir a la página anterior.
{
    if (window.page > 1) // Si la página actual es mayor que la página 1.
    {
        window.page--; // Decrementa la variable page, página anterior.
        change(window.page, window.qtty); // Llama a la función change pasandole el número de página a mostrar y la cantidad de datos a mostrar que siempre es 5.
    }
}

function next() // La Función next muestra la página siguiente.
{   
    if (window.page < totNumPages()) // Si la página en la que estoy es menor que la última.
    {
        window.page++; // Incremento la página
        change(window.page, window.qtty); // Llamo a la función que muestra los resultados.
    }
}

function change(page, qtty) // Función que muestra los resultados de a 5 en la tabla, recibe la página page, la cantidad de resultados a mostrar qtty y true si viene de index y false si viene de profile.
{
    if (typeof array_value != "undefined" && array_value.length > 0)
    {
        window.page = page; // Asigno la variable page, a la variable global window.page.
        window.qtty = qtty; // Asigno la variable qtty, a la variable global window.qtty.
        window.array_length = array_value.length;
        const data_length = array_value[0].length;
        window.vlength = 18; // array_length; // Hago global la variable length.
        window.hlength = data_length;

        var html = "<table><tr class='text-center'><th>MAC</th><th>Marca</th><th>OUI</th><th>Fecha</th><th>ARP</th><th>ARP46</th><th>Bad IP</th><th>Broadcast</th><th>ICMP</th><th>ICPM6</th><th>IPV6</th><th>Multicast</th><th>Nº de Paquetes</th><th>Resto</th><th>Trafico</th><th>TCP</th><th>SSDP</th><th>UDP</th><th>Unicast</th></tr>";
        for (i = 0 + qtty * (page - 1); i < array_length && i < qtty * page; i++)
        {
            html += "<tr>";
            for (j = 0; j < data_length; j++)
            {
                html += "<td>" + array_value[i][j] + "</td>";
            }
            html += "</tr>";
        }
        html += "</tr></table>";
        table.innerHTML = html; // Muestro todo en pantalla.

        if (array_length > 8) // Si la cantidad de Artículos es mayor que 5.
        {
            pages.innerHTML = "Página: " + page; // Muestro el número de página.
            if (page == 1) // Si la página es la número 1
            {
                prev_btn.style.visibility = "hidden"; // Escondo el Botón con id prev que mostraría los resultados anteriores.
            }
            else // Si no, estoy en otra página.
            {
                prev_btn.style.visibility = "visible"; // Hago visible el botón para mostrar los resultados anteriores.
            }
            if (page == totNumPages()) // Si estoy en la última página.
            {
                next_btn.style.visibility = "hidden"; // Escondo el botón para mostrar los resultados siguientes.
            }
            else // Si no, estoy en una página intermedia o en la primera.
            {
                next_btn.style.visibility = "visible"; // Hago visible el botón para mostrar los resultados siguientes.
            }
        }
    }
}

function makeData(data)
{    
    window.array_value = data;
}

// function drawBars() // Gráfica de Barras.
// {
//     let values = [];
//     values = getValues(); // Llama a la función que obtiene los valores de InfluxDB.
//     let length = values.length;

//     if (values[0][0] != "No Data")
//     {
//         for(i = 1; i < length; i++) {
//             var date = values[i][0].substr(0, 19); // Corta los 19 Primeros Caracteres de la Cadena con Formato de Fecha ISO 8601 Date and Time.(2024-05-09T15:14:33Z).
            
//             let each = date.split("-"); // Recuperamos los Meses.
//             let time = each[2].split("T"); // Partimos el Último Dato por la T.
//             each[2] = time[0]; // Es el Día, lo Asignamos a each[2].
//             time = time[1].split(":"); // Partimos la hora por los :.
//             each[1]--; // Reduce en 1 el Mes ya que los Meses en Javascript Van de 0 a 11.
//             let my_date = new Date(each[0], each[1], each[2], time[0], time[1], time[2]); // Reconstruimos la Fecha en Formato GMT.
        
//             values[i][0] = my_date; // Asignamos al Primer Valor de Tiempo del Array values la Fecha.
//         }
        

//         var options = {
//             title: 'Ataques Totales',
//             height: 480,
//             //colors:['#0000ff', '#808080', '#808080', '#808080', '#808080', '#808080', '#808080', '#808080', '#00ff00', '#808080', '#808080', '#ff0000', '#808080', '#800080', '#ff00ff', '#ffff00'],
//             bar: {
//                 groupWidth: "100%"
//             },
//             hAxis: {
//                 title: 'Ataques de Mayor a Menor, Por Cantidad, Tamaño de Paquete y por Fecha',
//                 format: 'd MMM YYYY HH:mm:ss', // Muestra la Fecha Anglo y la Hora Latin. 1 Jan 1970 13:00:00
//                 gridlines: {count: 40},
//                 viewWindow: {
//                     min: new Date(values[1][0] - 0.1*24 * 60 * 60 * 1000),
//                     max: new Date(values[1][0] - (- 0.3 * 24 * 60 * 60 * 1000))
//                 },
//             },
//             vAxis: {
//                 scaleType: 'log',
//                 title: 'Rating (Escala 1:1)'
//             },
//             tooltip: {isHtml: true}
//         };

//         var data = google.visualization.arrayToDataTable(values);
//         // var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
//         var chart = new google.visualization.ColumnChart(chart_div);
//         chart.draw(data, options);
//     }
//     else
//     {
//         chart_div.innerHTML = "<h3>No Hay Datos Aun.</h3>";
//     }
// }

// function getValues()
// {
//     let values = [];

//     if (typeof array_value != "undefined" && array_value.length > 0)
//     {
//         values.push(['Fecha', 'ARP', 'ARP46', 'Bad IP', 'Broadcast', 'ICPM', 'ICPM6', 'IPV6', 'Multicast', 'Nº Paquetes', 'Resto', 'SSDP', 'TCP', 'Trafico', 'UDP', 'Unicast', "MAC - Owner - Time", {role: "tooltip", 'p': {'html': true}}]);

//         for (i = 0; i < array_value.length; i++)
//         {
//             values.push([array_value[i][3], array_value[i][4], array_value[i][5], array_value[i][6], array_value[i][7], array_value[i][8], array_value[i][9], array_value[i][10], array_value[i][11], array_value[i][12], array_value[i][13], array_value[i][14], array_value[i][15], array_value[i][16], array_value[i][17], array_value[i][18], array_value[i][18], "<div class='toolbox'><strong>MAC: </strong>" + array_value[i][0] + "<br><strong>Marca: </strong>" + array_value[i][1] + "<br><strong>Fecha: </strong>" + array_value[i][3] + "</div>"]);
//         }
//     }
//     else
//     {
//         values.push(['No Data', 'No Hay Datos']); // , 'Cantidad de Ataques']);

//         values[1] = ["0", 0];
//     }

//     // if (typeof array_value != "undefined" && array_value.length > 0)
//     // {
//     //     for (i = 0; i < array_value.length; i++)
//     //     {
//     //         values[i] = [];
//     //         for (j = 3; j < array_value[0].length; j+=19)
//     //         {
//     //             values[i] = {Fecha: array_value[i][j] + "\n" + array_value[i][j - 3], arp: array_value[i][j + 1], arp46: array_value[i][j + 2], boradcat: array_value[i][j +  3]};
//     //         }
//     //     }
//     // }

//     return values;
// }

function toast(warn, ttl, msg) // Función para mostrar el Diálogo con los mensajes de alerta, recibe, Código, Título y Mensaje.
{
    if (warn == 1) // Si el código es 1, es una alerta.
    {
        title.style.backgroundColor = "#000000"; // Pongo los atributos, color de fondo negro.
        title.style.color = "yellow"; // Y color del texto amarillo.
    }
    else if (warn == 0) // Si no, si el código es 0 es un mensaje satisfactorio.
    {
        title.style.backgroundColor = "#FFFFFF"; // Pongo los atributos, color de fondo blanco.
        title.style.color = "blue"; // Y el color del texto azul.
    }
    else // Si no, viene un 2, es una alerta de error.
    {
        title.style.backgroundColor = "#000000"; // Pongo los atributos, color de fondo negro.
        title.style.color = "red"; // Y color del texto rojo.
    }
    title.innerHTML = ttl; // Muestro el Título del dialogo.
    message.innerHTML = msg; // Muestro los mensajes en el diálogo.
    alerta.click(); // Lo hago aparecer pulsando el botón con ID alerta.
}

function screenSize() // Función para dar el tamaño máximo de la pantalla a las vistas.
{
    let height = window.innerHeight; // window.innerHeight es el tamaño vertical de la pantalla.

    if (view1.offsetHeight < height) // Si el tamaño vertical de la vista es menor que el tamaño vertical de la pantalla.
    {
        view1.style.height = height + "px"; // Asigna a la vista el tamaño vertical de la pantalla.
    }

    if (view2 != null) // Si existe el div view2
    {
        if (view2.offsetHeight < height)
        {
            view2.style.height = height + "px";
        }
        if (view3 != null)
        {
            if (view3.offsetHeight < height)
            {
                view3.style.height = height + "px";
            }
            if (view4 != null)
            {
                if (view4.offsetHeight < height)
                {
                    view4.style.height = height + "px";
                }
            }
            
        }
    }
}

function verify() // Función para validar las contraseñas de registro de alumnos y las de modificación.
{
    if (pass1.value != pass2.value) // Verifico si los valores en los input pass y pass2 no coinciden.
    {
        toast(1, "Hay un Error", "Las contraseñas no coinciden, has escrito: " + pass1.value + " y " + pass2.value); // Si no coinciden muestro error.
        return false; // Devuelvo false, el formulario no se envía.
    }
    else // Si son iguales.
    {
        return true; // Devuelvo true, envía el formulario.
    }
}

function showEye(which) // Función para mostrar el ojo de los input de las contraseñas, recibe el número del elemento que contiene el ojo.
{
    let eye = document.getElementById("togglePassword" + which); // Asigno a eye la id del elemento que contiene el ojo.
    eye.style.visibility = "visible"; // Hago visible el elemento, el ojo.
}

function spy(which) // Función para el ojito de las Contraseñas al hacer click en el ojito, recibe el número de la ID del input de la password.
{
    const togglePassword = document.querySelector('#togglePassword' + which); // Asigno a la constante togglePassword el input con ID togglePassword + which.
    const password = document.querySelector('#pass' + which); // Asigno a password la ID del input con ID pass + which.
    
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password'; // Asigno a type el resultado de un operador ternario, si presiono el ojito y el tipo del input es password
    // lo cambia a text, si es text lo cambia a password.
    password.setAttribute('type', type); // Le asigno el atributo al input password.
    togglePassword.classList.toggle('fa-eye-slash'); // Cambia el aspecto del ojito, al cambiar el input a tipo texto, el ojo aparece con una raya.
}

function showImg(src) // Not in Use but a Good One
{
    var alertaImg = document.getElementById("alertaImg"); // La ID del botón del dialogo.
    var img = document.getElementById("show_pic"); // Asigno a la variable title el h4 con id title.
        
    img.src = src; // Muestro los mensajes en el diálogo.
    alertaImg.click(); // Lo hago aparecer pulsando el botón con ID alerta.
}

function changeit() // Función para la página de contacto.
{
    // var changes = document.getElementById("changes"); // En la variable button obtengo la ID del input type submit change.

    if (contact.value != "") // Si el valor en el selector ha cambiado.
    {
        switch (contact.value) // Hago un switch al valor en el selector.
        {
            case "Teléfono":
                email.style.visibility = "hidden";
                phone.style.visibility = "visible";
                em.required = false;
                ph.required = true;
                changes.value = "Llamame!";
                break;
            case "Whatsapp":
                email.style.visibility = "hidden";
                phone.style.visibility = "visible";
                em.required = false;
                ph.required = true;
                changes.value = "Mandame un Guasap";
                break;
            default:
                email.style.visibility = "visible";
                phone.style.visibility = "hidden";
                ph.required = false;
                ph.value = 1;
                em.required = true;
                changes.value = "Espero tu E-mail";
                break;
        }
    }
}

function connect(how)
{
    let mssg = document.getElementById('mssg').value;
    let num = 664774821;
    var win = window.open('https://wa.me/' + num + '?text=Por Favor contactame por: ' + how + ' al: ' + mssg + ' Mi nombre es: ', '_blank');
}

function screen() // Esta función comprueba si el ancho de la pantalla es de Ordenador o de Teléfono.
{
    let width = innerWidth;
    if (width < 965) // Si el ancho es inferior a 965.
    {
        pc.style.visibility = "hidden"; // Oculta el menú de Ordenador
        mobile.style.visibility = "visible"; // Muestra el menú de Teléfono.
    }
    else // Si es mayor o igual a 965;
    {
        pc.style.visibility = "visible"; // Muestra el menú para Ordenador
        mobile.style.visibility = "hidden"; // Oculta el menú para Teléfono.
    }
}

function goThere() // Cuando cambia el selector del menú para Teléfono.
{
    var change = document.getElementById("change").value; // Change obtiene el valor en el selector.
    switch(change)
    {
        case "contact":
            window.open("contact.php", "_blank");
        break;
        case "request":
            window.open("request.php", "_self");
        break;
        case "profile" :
            window.open("profile.php", "_self");
        break;
        case "view3" :
            window.open("index.php#view3", "_self");
        break;
        case "view2" :
            window.open("index.php#view2", "_self");
        break;
        default :
            window.open("index.php#view1", "_self");
        break;
    }
}

function printIt(number)
{
    if (number != -1) // Si el numero que llega es distinto de -1.
    {
        var img = document.getElementById("img" + number); // Asigno a la variable img la ID del elemento img + numero de factura.
    }
    else // Si llega -1.
    {
        var img = document.getElementById("img0"); // Estoy viedo la última factura, es la imagen 0, Asigno a la variable img la ID del elemento img0.
    }
    const src = img.src; // Asigno a la constante src la imagen.
    const win = window.open(''); // Asigno a la constante win una nueva ventana abierta.
    win.document.write('<img src="' + src + '" onload="window.print(); window.close();">'); // Escribo en la ventana abierta un elemento img con la imagen a imprimir y la envía a la impresora y al terminar cierra la ventana.
}

function capture(number)
{
    const print = document.getElementById("printable" + number); // Asigna a print el Div con ID printable + number
    const image = document.getElementById("image" + number); // Asigna a image el Div con ID image + number, contendrá el elemento img con la factura.

    html2canvas(print).then((canvas) => {
        const base64image = canvas.toDataURL('image/png'); // genera la imagen base64image a partir del contenido de print, el div que contiene la factura.
        image.setAttribute("href", base64image);
        const img = document.createElement("img");
        img.id = "img" + number;
        img.src = base64image;
        img.alt = "Factura: " + number;
        print.remove();
        image.appendChild(img);
    });
}

function pdfDown(number)
{
    const image = document.getElementById("img" + number); // Div con ID printable0, contiene la factura.

    var doc = new jsPDF();
    doc.addImage(image, 'png', 10, 10, 240, 60, '', 'FAST');
    doc.save();
}

function givemeData(oui)
{
    alert("los datos de esta MAC son: " + oui);
}