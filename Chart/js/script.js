var index = 0;
var dato = [];
var data = [];

dato = [{"year": "2021",
     "europe": 2.5,
     "namerica": 2.5,
     "asia": 2.1,
     "lamerica": 1,
     "meast": 0.8,
     "africa": 0.4,
     "latitude": 40.00
    }, {
        "year": "2022",
        "europe": 2.6,
        "namerica": 2.7,
        "asia": 2.2,
        "lamerica": 0.5,
        "meast": 0.4,
        "africa": 0.3,
        "latitude": 45.74
    }, {
          "year": "2023",
          "europe": 2.8,
          "namerica": 2.9,
          "asia": 2.3,
          "lamerica": 0.8,
          "meast": 0.6,
          "africa": 0.5,
          "latitude": 42.25
      }];

function getData(index)
{
    values = [];

    values[0] = {
      "year": dato[index].year,
      "europe": dato[index].europe,
      "namerica": dato[index].namerica,
      "asia": dato[index].asia,
      "lamerica": dato[index].lamerica,
      "meast": dato[index].meast,
      "africa": dato[index].africa,
      "latidud": dato[index].latitude
    }

    return values;
}

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
  if (index == dato.length - 1)
  {
      next.style.visibility = "hidden"; 
  }
  if (index < dato.length - 1)
  {
      next.style.visibility = "visible"; 
  }
  var root = am5.Root.new("chartdiv");
  
  // Set themes
  // https://www.amcharts.com/docs/v5/concepts/themes/
  root.setThemes([
    am5themes_Animated.new(root)
  ]);
  
  // Create chart
  // https://www.amcharts.com/docs/v5/charts/xy-chart/
  var chart = root.container.children.push(am5xy.XYChart.new(root, {
    panX: false,
    panY: false,
    wheelX: "panX",
    wheelY: "zoomX",
    layout: root.verticalLayout
  }));
  
  // Add legend
  // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
  var legend = chart.children.push(am5.Legend.new(root, {
    centerX: am5.p50,
    x: am5.p50
  }));
  
  // Create axes
  // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
  var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
    categoryField: "year",
    renderer: am5xy.AxisRendererX.new(root, {
      cellStartLocation: 0.1,
      cellEndLocation: 0.9
    }),
    tooltip: am5.Tooltip.new(root, {})
  }));
  
  var logarithmic = false;
  // var logarithmic = true;
  
  var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
    min: 0.01,
    logarithmic: logarithmic,
    renderer: am5xy.AxisRendererY.new(root, {})
  }));
  
  var latitudeAxisRenderer = am5xy.AxisRendererY.new(root, {opposite:true});

var latitudeAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  syncWithAxis: yAxis, // Synchronize axes to get a more readable grid
  renderer: latitudeAxisRenderer
}));

var latitudeSeries = chart.series.push(am5xy.LineSeries.new(root, {
  xAxis: xAxis,
  yAxis: latitudeAxis,
  valueYField: "latitude",
  categoryXField: "year", // Use categoryXField instead of valueXField
  tooltip:am5.Tooltip.new(root, {
    labelText:"latitude: {valueY}"
  })  
}));

latitudeSeries.strokes.template.setAll({ strokeWidth: 2 });

// Add circle bullet
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Bullets
latitudeSeries.bullets.push(function() {
  var graphics = am5.Circle.new(root, {
    strokeWidth: 2,
    radius: 5,
    stroke: latitudeSeries.get("stroke"),
    fill: root.interfaceColors.get("background"),
  });

  graphics.adapters.add("radius", function(radius, target) {
    return target.dataItem.dataContext.townSize;
  })

  return am5.Bullet.new(root, {
    sprite: graphics
  });
});
latitudeSeries.data.setAll(data);

  // Add series
  // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
  function makeSeries(name, fieldName) {
    var series = chart.series.push(am5xy.ColumnSeries.new(root, {
      stacked: stacked,
      name: name,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: fieldName,
      categoryXField: "year"
      // categoryXField: "lamerica"
    }));
  
    series.columns.template.setAll({
      tooltipText: "{name}, {categoryX}:{valueY}",
      width: am5.percent(90),
      tooltipY: am5.percent(10),
      // Set column and stroke transparency for more readability
      opacity: 0.75,
      stroke: "transparent"
    });
    data = getData(index);
    xAxis.data.setAll(data);
    series.data.setAll(data);
    
    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear();
  
    series.bullets.push(function () {
      // if (stacked)
      // {
      //   return am5.Bullet.new(root, {
      //     locationY: 0.5,
      //     sprite: am5.Label.new(root, {
      //       text: "{name}",
      //       fill: root.interfaceColors.get("alternativeText"),
      //       centerY: am5.percent(50),
      //       centerX: am5.percent(50),
      //       populateText: true
      //     })
      //   });
      // }
      // else
      // {
        return am5.Bullet.new(root, {
          locationY: 0.5,
          sprite: am5.Label.new(root, {
            text: "{valueY}",
            fill: root.interfaceColors.get("alternativeText"),
            centerY: am5.percent(50),
            centerX: am5.percent(50),
            populateText: true
          })
        });
      // }
    });
  
    legend.data.push(series);
  }

  // console.log(legend.data);
  
  makeSeries("Europe", "europe");
  makeSeries("North America", "namerica");
  makeSeries("Asia", "asia");
  makeSeries("Latin America", "lamerica");
  makeSeries("Middle East", "meast");
  makeSeries("Africa", "africa");

  // Make stuff animate on load
  // https://www.amcharts.com/docs/v5/concepts/animations/
  chart.appear(1000, 100);
}

function reset(where)
{
  const next = document.getElementById("buttons");
  const bodyElement = document. getElementById("body");
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