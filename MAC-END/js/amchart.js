/**
 * ---------------------------------------
 * This demo was created using amCharts 5.
 * 
 * For more information visit:
 * https://www.amcharts.com/
 * 
 * Documentation is available at:
 * https://www.amcharts.com/docs/v5/
 * ---------------------------------------
 */


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

var data = [{
  "year": "2021",
  "europe": 2.5,
  "namerica": 2.5,
  "asia": 2.1,
  "lamerica": 1,
  "meast": 0.8,
  "africa": 0.4
}, {
  "year": "2022",
  "europe": 2.6,
  "namerica": 2.7,
  "asia": 2.2,
  "lamerica": 0.5,
  "meast": 0.4,
  "africa": 0.3
}, {
  "year": "2023",
  "europe": 2.8,
  "namerica": 2.9,
  "asia": 2.4,
  "lamerica": 0.3,
  "meast": 0.9,
  "africa": 0.5
}]

var data = getData();

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xRenderer = am5xy.AxisRendererX.new(root, {
  minorGridEnabled: true
});
var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "fecha",
  renderer: xRenderer,
  tooltip: am5.Tooltip.new(root, {})
}));

xRenderer.grid.template.setAll({
  location: 1
})

xAxis.data.setAll(data);

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  min: 0.1,
  logarithmic: true,
  treatZeroAs: 0.01,
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
    stacked: false,
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: fieldName,
    categoryXField: "fecha"
  }));

  series.columns.template.setAll({
    tooltipText: "{name}, {categoryX}: {valueY}",
    tooltipY: am5.percent(10)
  });
  series.data.setAll(data);

  // Make stuff animate on load
  // https://www.amcharts.com/docs/v5/concepts/animations/
  series.appear();

  series.bullets.push(function () {
    return am5.Bullet.new(root, {
      sprite: am5.Label.new(root, {
        text: "{valueY}",
        fill: root.interfaceColors.get("alternativeText"),
        centerY: am5.p50,
        centerX: am5.p50,
        populateText: true
      })
    });
  });

  legend.data.push(series);
}

makeSeries("Nº de Paquetes", "nPaquete");
makeSeries("Unicast", "unicast");
makeSeries("Multicast", "multicast");
makeSeries("Braodcast", "broadcast");
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


function getData()
{
    let data = [];

    if (typeof array_value != "undefined" && array_value.length > 0)
    {
        for (i = 0; i < array_value.length; i++)
        {
            let obj = {
                fecha:      array_value[i][3] + "\n" + array_value[i][0],
                nPaquete:   array_value[i][12],
                unicast:    array_value[i][18],
                multicast:  array_value[i][11],
                broadcast:  array_value[i][7],
                arp:        array_value[i][4],
                aaaa:       array_value[i][5],
                icmp:       array_value[i][8],
                udp:        array_value[i][17],
                tcp:        array_value[i][15],
                otros:      array_value[i][16],
                ipv6:       array_value[i][10],
                bbbb:       array_value[i][13],
                cccck:      array_value[i][6],
                ssdp:       array_value[i][14],
                icmpv6:     array_value[i][9]

            }
            data[i] = obj;
        }
    }
    console.log(data);
    return data;
}