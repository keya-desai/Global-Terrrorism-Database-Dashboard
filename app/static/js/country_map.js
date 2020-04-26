countryList = ["USA", "India", "Iraq", "Iran"]

function updatePlots(country){
  var data, label;
  if(country == "USA"){
    label = am4geodata_usaLow
    data = 
    [
    {
      id: "US-AL",
      value: 16
    },
    {
      id: "US-AK",
      value: 1
    },
    {
      id: "US-AZ",
      value: 34
    },
    {
      id: "US-AR",
      value: 5
    },
    {
      id: "US-CA",
      value: 595
    },
    {
      id: "US-CO",
      value: 45
    },
    {
      id: "US-CT",
      value: 17
    },
    {
      id: "US-DE",
      value: 3
    },
    {
      id: "US-FL",
      value: 158
    },
    {
      id: "US-GA",
      value: 29
    },
    {
      id: "US-HI",
      value: 4
    },
    {
      id: "US-ID",
      value: 14
    },
    {
      id: "US-IL",
      value: 112
    },
    {
      id: "US-IN",
      value: 22
    },
    {
      id: "US-IA",
      value: 24
    },
    {
      id: "US-KS",
      value: 14
    },
    {
      id: "US-KY",
      value: 4
    },
    {
      id: "US-LA",
      value: 22
    },
    {
      id: "US-ME",
      value: 4
    },
    {
      id: "US-MD",
      value: 118
    },
    {
      id: "US-MA",
      value: 57
    },
    {
      id: "US-MI",
      value: 45
    },
    {
      id: "US-MN",
      value: 25
    },
    {
      id: "US-MS",
      value: 11
    },
    {
      id: "US-MO",
      value: 39
    },
    {
      id: "US-MT",
      value: 6
    },
    {
      id: "US-NE",
      value: 24
    },
    {
      id: "US-NV",
      value: 18
    },
    {
      id: "US-NH",
      value: 10
    },
    {
      id: "US-NJ",
      value: 47
    },
    {
      id: "US-NM",
      value: 24
    },
    {
      id: "US-NY",
      value: 515
    },
    {
      id: "US-NC",
      value: 34
    },
    {
      id: "US-ND",
      value: 6
    },
    {
      id: "US-OH",
      value: 51
    },
    {
      id: "US-OK",
      value: 15
    },
    {
      id: "US-OR",
      value: 67
    },
    {
      id: "US-PA",
      value: 33
    },
    {
      id: "US-RI",
      value: 2
    },
    {
      id: "US-SC",
      value: 5
    },
    {
      id: "US-SD",
      value: 9
    },
    {
      id: "US-TN",
      value: 24
    },
    {
      id: "US-TX",
      value: 63
    },
    {
      id: "US-UT",
      value: 20
    },
    {
      id: "US-VT",
      value: 5
    },
    {
      id: "US-VA",
      value: 42
    },
    {
      id: "US-WA",
      value: 101
    },
    {
      id: "US-WV",
      value: 2
      },
    {
      id: "US-WI",
      value: 37
    },
    {
      id: "US-WY",
      value: 2
    }
  ];
  }

  if(country == "India"){
    label = am4geodata_indiaLow
    data =  [
    {
      id: "IN-AP",
      value: 292
    },
    {
      id: "IN-AR",
      value: 24
    },
    {
      id: "IN-AS",
      value: 1151
    },
    {
      id: "IN-BR",
      value: 688
    },
    {
      id: "IN-CH",
      value: 47
    },
    {
      id: "IN-CT",
      value: 979
    },
    {
      id: "IN-DL",
      value: 208
    },
    {
      id: "IN-GA",
      value: 5
    },
    {
      id: "IN-GJ",
      value: 85
    },
    {
      id: "IN-HR",
      value: 50
    },
    {
      id: "IN-HP",
      value: 24
    },
    {
      id: "IN-JK",
      value: 2454
    },
    {
      id: "IN-JH",
      value: 887
    },
    {
      id: "IN-KA",
      value: 71
    },
    {
      id: "IN-KL",
      value: 98
    },
    {
      id: "IN-MP",
      value: 75
    },
    {
      id: "IN-MN",
      value: 1100
    },
      {
      id: "IN-MH",
      value: 302
    },
    {
      id: "IN-ML",
      value: 294
    },
    {
      id: "IN-MZ",
      value: 27
    },
    {
      id: "IN-NL",
      value: 115
    },
    {
      id: "IN-OR",
      value: 649
    },
    {
      id: "IN-PY",
      value: 2
    },
    {
      id: "IN-PB",
      value: 949
    },
    {
      id: "IN-RJ",
      value: 43
    },
    {
      id: "IN-SK",
      value: 4
    },
    {
      id: "IN-TN",
      value: 164
    },
    {
      id: "IN-TG",
      value: 24
    },
    {
      id: "IN-TR",
      value: 117
    },
    {
      id: "IN-UP",
      value: 201
    },
    {
      id: "IN-UT",
      value: 24
    },
    {
      id: "IN-WB",
      value: 650
    }
  ];
  }
  map(country, data, label);
  top_cities(country);
}


dropdownChange = function(){
  country = document.getElementById("countryButton").value;
  updatePlots(country)
}

var dropdown = d3.select("#countryButton")
                .on("change", dropdownChange);


dropdown.selectAll('myOptions')
      .data(countryList)
      .enter()
      .append('option')
      .text(function (d) { return d; }) 
      .attr("value", function (d) { return d; });
      // .property("selected", function(k){ return k == "USA"; }); 

updatePlots("USA");

function map(country, data_, label){

  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end

  // Create map instance
  var chart = am4core.create("mapdiv", am4maps.MapChart);

  // Set map definition
  chart.geodata = label;  
  // Set projection
  if(country == "USA"){
    chart.projection = new am4maps.projections.AlbersUsa();
  }
  
  // Create map polygon series
  var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

  // Configure series tooltip
  var polygonTemplate = polygonSeries.mapPolygons.template;
  polygonTemplate.tooltipText = "{name}: {value}";
  //Set min/max fill color for each area
  polygonSeries.heatRules.push({
    property: "fill",
    target: polygonSeries.mapPolygons.template,
  min: chart.colors.getIndex(1).brighten(1),
    max: chart.colors.getIndex(1).brighten(-0.7)
  /*   min: am4core.color("#F5DBCB"),
      max: am4core.color("#ED7B84") */
  });

  // Make map load polygon data (state shapes and names) from GeoJSON
  polygonSeries.useGeodata = true;

  
  // Set heatmap values for each state
  polygonSeries.data = data_;
 

  // Set up heat legend
  var heatLegend = chart.createChild(am4maps.HeatLegend);
  heatLegend.series = polygonSeries;
  heatLegend.align = "center";
  heatLegend.valign = "bottom";
  heatLegend.width = am4core.percent(80);
  heatLegend.minValue = 0;
  heatLegend.maxValue = 600; 
  heatLegend.padding(20, 20, 20, 20);
  heatLegend.valueAxis.renderer.labels.template.fontSize = 10;
  heatLegend.valueAxis.renderer.minGridDistance = 40;
  // heatLegend.valueAxis.title.text = "Number of attacks";
  // heatLegend.valueAxis.title.contentAlign = "top";
  // heatLegend.valueAxis.title.fontSize = 5;
  /* heatLegend.orientation = "vertical"; */


  polygonSeries.mapPolygons.template.events.on("over", event => {
    handleHover(event.target);
  });

  polygonSeries.mapPolygons.template.events.on("hit", event => {
    handleHover(event.target);
  });

  function handleHover(mapPolygon) {
    if (!isNaN(mapPolygon.dataItem.value)) {
      heatLegend.valueAxis.showTooltipAt(mapPolygon.dataItem.value);
    } else {
      heatLegend.valueAxis.hideTooltip();
    }
  }

  polygonSeries.mapPolygons.template.strokeOpacity = 0.4;
  polygonSeries.mapPolygons.template.events.on("out", event => {
    heatLegend.valueAxis.hideTooltip();
  });

  chart.zoomControl = new am4maps.ZoomControl();
  chart.zoomControl.valign = "top";

}

function top_cities(country){
    if(country == "USA"){
      country = "United States"
    }

    am4core.ready(function(){


    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

     // Create chart instance
    var chart = am4core.create("chartdiv", am4charts.XYChart);

    
    d3.json('/get_data_top_cities/' + country, function(error, json_data){

          console.log(json_data)
          chart.data = json_data
      });


    // Create axes
    var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "city";
    categoryAxis.numberFormatter.numberFormat = "#";
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.cellStartLocation = 0.1;
    categoryAxis.renderer.cellEndLocation = 0.9;

    var  valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.opposite = true;

    // Create series
    function createSeries(field, name) {
      var series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueX = field;
      series.dataFields.categoryY = "city";
      series.name = name;
      series.columns.template.tooltipText = "{name}: [bold]{valueX}[/]";
      series.columns.template.height = am4core.percent(50);
      series.sequencedInterpolation = true;

      var valueLabel = series.bullets.push(new am4charts.LabelBullet());
      valueLabel.label.text = "{valueX}";
      valueLabel.label.horizontalCenter = "left";
      valueLabel.label.dx = 5;
      valueLabel.label.hideOversized = false;
      valueLabel.label.truncate = false;

      var categoryLabel = series.bullets.push(new am4charts.LabelBullet());
      categoryLabel.label.text = "{name}";
      categoryLabel.label.horizontalCenter = "right";
      categoryLabel.label.dx = -10;
      categoryLabel.label.fill = am4core.color("#fff");
      categoryLabel.label.hideOversized = false;
      categoryLabel.label.truncate = false;
    }

    createSeries("num_attacks", "Attacks");
    createSeries("kills", "Deaths");
  });

}