var index = 0;
var data = [];

function show()
{

	let stack = document.getElementById("stack").checked;

	if (stack)
	{
		var stacked = true;
	}
	else
	{
		var stacked = false;
	}
	let previ = document.getElementById("previ");
	let next = document.getElementById("next");
	if (index > 0)
	{
		previ.style.visibility = "visible";
	}
	else
	{
		previ.style.visibility = "hidden";
		index = 0;
	}
	if (index == array_value.length - 1)
	{
		next.style.visibility = "hidden"; 
	}
	if (index < array_value.length - 1)
	{
		next.style.visibility = "visible"; 
	}
	// Create root element
	// https://www.amcharts.com/docs/v5/getting-started/#Root_element
	var root = am5.Root.new("chartdiv");


	// Set themes
	// https://www.amcharts.com/docs/v5/concepts/themes/
	root.setThemes([
		am5themes_Animated.new(root),
		am5themes_Material.new(root)
	]);


	// Create chart
	// https://www.amcharts.com/docs/v5/charts/xy-chart/
	var chart = root.container.children.push(am5xy.XYChart.new(root, {
	panX: false,
	panY: false,
	wheelX: "panX",
	wheelY: "zoomX",
	paddingLeft: 0,
	layout: root.verticalLayout
	}));

	// Add scrollbar
	// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
	chart.set("scrollbarX", am5.Scrollbar.new(root, {
	orientation: "horizontal"
	}));

	// var data = [{
	// "year": "2021",
	// "europe": 2.5,
	// "namerica": 2.5,
	// "asia": 2.1,
	// "lamerica": 1,
	// "meast": 0.8,
	// "africa": 0.4
	// }, {
	// "year": "2022",
	// "europe": 2.6,
	// "namerica": 2.7,
	// "asia": 2.2,
	// "lamerica": 0.5,
	// "meast": 0.4,
	// "africa": 0.3
	// }, {
	// "year": "2023",
	// "europe": 2.8,
	// "namerica": 2.9,
	// "asia": 2.4,
	// "lamerica": 0.3,
	// "meast": 0.9,
	// "africa": 0.5
	// }]

	// Create axes
	// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
	var xRenderer = am5xy.AxisRendererX.new(root, {
		// minorGridEnabled: true
	});
	var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
	categoryField: "fecha",
	renderer: xRenderer,
	// maxDeviation: 10,
	tooltip: am5.Tooltip.new(root, {})
	}));

	xRenderer.grid.template.setAll({
	location: 1
	})

	data = getData(index);

	xAxis.data.setAll(data);

	var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
	min: 0,
	// logarithmic: true,
	//baseValue: 1000,
	renderer: am5xy.AxisRendererY.new(root, {
		strokeOpacity: 0.1
	})
	}));

	// Add legend
	// https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
	var legend = chart.children.push(am5.Legend.new(root, {
	centerX: am5.p50,
	x: am5.p50
	}));


	// Add series
	// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
	function makeSeries(name, fieldName) {
	var series = chart.series.push(am5xy.ColumnSeries.new(root, {
		name: name,
		stacked: stacked,
		xAxis: xAxis,
		yAxis: yAxis,
		valueYField: fieldName,
		categoryXField: "fecha"
	}));

	series.columns.template.setAll({
		width: am5.percent(80),
		// width: 60,
		tooltipText: "{name}, {categoryX}: [bold]{valueY}",
		tooltipY: am5.percent(10)
	});

	series.data.setAll(data);

	// Make stuff animate on load
	// https://www.amcharts.com/docs/v5/concepts/animations/
	series.appear();

	series.bullets.push(function () {
		return am5.Bullet.new(root, {
		sprite: am5.Label.new(root, {
			text: "[bold]{name}: {valueY}",
			// text: "[#000][bold]{name}",
			fill: root.interfaceColors.get("alternativeText"),
			centerY: am5.p50,
			centerX: am5.p50,
			// rotation: -90,
			populateText: true
		})
		});
	});

	legend.data.push(series);
	}

	makeSeries("Nº Paquetes", "nPaquete");
	makeSeries("Unicast", "unicast");
	makeSeries("Multicast", "multicast");
	makeSeries("Broadcast", "broadcast");
	makeSeries("ARP", "arp");
	makeSeries("Aaaa", "aaaa");
	makeSeries("ICMP", "icmp");
	makeSeries("UDP", "udp");
	makeSeries("TCP", "tcp");
	makeSeries("Otros", "otros");
	makeSeries("IPV6", "ipv6");
	makeSeries("Bbbb", "bbbb");
	makeSeries("Cccck", "cccck");
	makeSeries("SSPM", "sspm");
	makeSeries("ICPMV6", "icpmv6");


	// Make stuff animate on load
	// https://www.amcharts.com/docs/v5/concepts/animations/
	chart.appear(1000, 100);
}


function getData(index)
{
    let value = [];

    for (i = 0; i < array_value.length; i++)
    {
        for (j = 4; j < array_value[0].length; j++)
        {
            if (array_value[i][j] == 0)
            {
                array_value[i][j] = null;
            }
        } 
    }

    if (typeof array_value != "undefined" && array_value.length > 0)
    {
		let obj = {
			fecha:      array_value[index][3] + "\n" + array_value[index][0],
			unicast:    array_value[index][18],
			nPaquete:   array_value[index][12],
			multicast:  array_value[index][11],
			broadcast:  array_value[index][7],
			arp:        array_value[index][4],
			aaaa:       array_value[index][5],
			icmp:       array_value[index][8],
			udp:        array_value[index][17],
			tcp:        array_value[index][15],
			otros:      array_value[index][16],
			ipv6:       array_value[index][10],
			bbbb:       array_value[index][13],
			cccck:      array_value[index][6],
			ssdp:       array_value[index][14],
			icmpv6:     array_value[index][9]
        }
		value[0] = obj;
    }
	else
	{
		let obj = {
			fecha:      new Date(),
			nPaquete:   "No Hay Datos Aun."
		}
		value[0] = obj;
	}
    return value;
}

function reset(where)
{
  const next = document.getElementById("buttons");
  const bodyElement = document.getElementById("view3");
  const div = document. getElementById("chartdiv");
  bodyElement. removeChild(div);

  const container = document.createElement("div");
  container.id = "chartdiv";
  next.before(container);

  if (where != null)
  {
      if (!where)
      {
          index--;
      }
      else
      {
          index++;
      }
  }
  show();
}