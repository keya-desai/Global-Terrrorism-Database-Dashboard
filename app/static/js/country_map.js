// countryList = ["USA", "India", "Pakistan", "Iraq", "Iran"]
countryList = ["USA", "India", "Pakistan", "Iraq", "Iran", "Afghanistan", "Angola", "Albania", "United Arab Emirates", "Argentina", "Armenia", "Antarctica", "French Southern and Antarctic Lands", "Australia", "Austria", "Azerbaijan", "Burundi", "Belgium", "Benin", "Burkina Faso", "Bangladesh", "Bulgaria", "The Bahamas", "Bosnia and Herzegovina", "Belarus", "Belize", "Bolivia", "Brazil", "Brunei", "Bhutan", "Botswana", "Central African Republic", "Canada", "Switzerland", "Chile", "China", "Ivory Coast", "Cameroon", "Democratic Republic of the Congo", "Republic of the Congo", "Colombia", "Costa Rica", "Cuba", "Northern Cyprus", "Cyprus", "Czech Republic", "Germany", "Djibouti", "Denmark", "Dominican Republic", "Algeria", "Ecuador", "Egypt", "Eritrea", "Spain", "Estonia", "Ethiopia", "Finland", "Fiji", "Falkland Islands", "France", "Gabon", "England", "Georgia", "Ghana", "Guinea", "Gambia", "Guinea Bissau", "Equatorial Guinea", "Greece", "Greenland", "Guatemala", "Guyana", "Honduras", "Croatia", "Haiti", "Hungary", "Indonesia", "Ireland", "Iceland", "Israel", "Italy", "Jamaica", "Jordan", "Japan", "Kazakhstan", "Kenya", "Kyrgyzstan", "Cambodia", "South Korea", "Kosovo", "Kuwait", "Laos", "Lebanon", "Liberia", "Libya", "Sri Lanka", "Lesotho", "Lithuania", "Luxembourg", "Latvia", "Morocco", "Moldova", "Madagascar", "Mexico", "Macedonia", "Mali", "Myanmar", "Montenegro", "Mongolia", "Mozambique", "Mauritania", "Malawi", "Malaysia", "Namibia", "New Caledonia", "Niger", "Nigeria", "Nicaragua", "Netherlands", "Norway", "Nepal", "New Zealand", "Oman", "Pakistan", "Panama", "Peru", "Philippines", "Papua New Guinea", "Poland", "Puerto Rico", "North Korea", "Portugal", "Paraguay", "Qatar", "Romania", "Russia", "Rwanda", "Western Sahara", "Saudi Arabia", "Sudan", "South Sudan", "Senegal", "Solomon Islands", "Sierra Leone", "El Salvador", "Somaliland", "Somalia", "Republic of Serbia", "Suriname", "Slovakia", "Slovenia", "Sweden", "Swaziland", "Syria", "Chad", "Togo", "Thailand", "Tajikistan", "Turkmenistan", "East Timor", "Trinidad and Tobago", "Tunisia", "Turkey", "Taiwan", "United Republic of Tanzania", "Uganda", "Ukraine", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Vanuatu", "West Bank", "Yemen", "South Africa", "Zambia", "Zimbabwe"]

optionsList = ["Attack Type", "Weapon Type", "Target Type"]

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
  if(country == "Pakistan"){
  label = am4geodata_pakistanLow
    data = [
  {
    id: "PK-IS",
    value: 154
  },
  {
    id: "PK-BA",
    value: 3710
  },
  {
    id: "PK-JK",
    value: 30
  },
  {
    id: "PK-GB",
    value: 47
  },
  {
    id: "PK-PB",
    value: 829
  },
  {
    id: "PK-SD",
    value: 3207
  },
  {
    id: "PK-KP",
    value: 6342
  }
];
  }
  map(country, data, label);
  top_cities(country);
  terroristBubble(country);
  // updateterroristBubble(country);
}

var updateAttackDonut = function(country){
    data_list_attack = []
    d3.csv('/get_csv_attack_donutchart/' + country, function(error, attackdata){

      attackdata.forEach(function(d){
        data_list_attack.push({"type" : d.attacktype1_txt, "count" : d.count});
      })
    amcharts_attack(data_list_attack, country);
  });
}

var updateTargetDonut = function(country){
    // console.log(country)
    data_list_target = []
    d3.csv('/get_csv_target_donutchart/' + country, function(error, targetdata){

      targetdata.forEach(function(d){
        data_list_target.push({"type" : d.targtype1_txt, "count" : d.count});
      })
    // console.log(data);
    amcharts_target(data_list_target, country);
  });
}

var updateWeaponDonut = function(country){
    // console.log(country)
    data_list_weapon = []
    d3.csv('/get_csv_weapon_donutchart/' + country, function(error, weapondata){

      weapondata.forEach(function(d){
        data_list_weapon.push({"type" : d.weaptype1_txt, "count" : d.count});
      })
    // console.log(data);
    amcharts_weapon(data_list_weapon, country);
  });
}

function updatePie(country){
  pie = document.getElementById("chartButton").value;
  if(country == "USA"){
    country = "United States"
  }
  if(pie == optionsList[2]){
    updateTargetDonut(country)
  }

  if(pie == optionsList[1]){
    updateWeaponDonut(country)
  }

  if(pie == optionsList[0]){
    updateAttackDonut(country)
  }
}

function updateText(country){
    textContainer1.selectAll("text").exit().remove();
    textContainer2.selectAll("text").exit().remove();
    textContainer3.selectAll("text").exit().remove();
    textContainer4.selectAll("text").exit().remove();
    textContainer5.selectAll("text").exit().remove();
    textContainer6.selectAll("text").exit().remove();

    addText(country)
}
dropdownChange = function(){
  country = document.getElementById("countryButton").value;
  updatePlots(country)
  updatePie(country)
  updateText(country)
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

dropdownChangePie = function(){
  country = document.getElementById("countryButton").value;
  
  updatePie(country)
}


var dropdown_pie = d3.select("#chartButton")
                .on("change", dropdownChangePie);

dropdown_pie.selectAll('option')
      .data(optionsList)
      .enter()
      .append('option')
      .text(function (d) { return d; }) 
      .attr("value", function (d) { return d; });

updatePlots("USA");
updatePie("United States");
addText("USA");
var count = 0;

var width_text = d3.select('#text1').node().getBoundingClientRect().width,
    height_text = d3.select('#text1').node().getBoundingClientRect().height;
    textContainer1 = d3.select("#text1")
                        .append("svg")
                        .attr("width", width_text)
                        .attr("height", height_text);

var width_text = d3.select('#text2').node().getBoundingClientRect().width,
    height_text = d3.select('#text2').node().getBoundingClientRect().height;
    textContainer2 = d3.select("#text2")
                        .append("svg")
                        .attr("width", width_text)
                        .attr("height", height_text);

var width_text = d3.select('#text3').node().getBoundingClientRect().width,
    height_text = d3.select('#text3').node().getBoundingClientRect().height;
    textContainer3 = d3.select("#text3")
                        .append("svg")
                        .attr("width", width_text)
                        .attr("height", height_text);

var width_text = d3.select('#text4').node().getBoundingClientRect().width,
    height_text = d3.select('#text4').node().getBoundingClientRect().height;
    textContainer4 = d3.select("#text4")
                        .append("svg")
                        .attr("width", width_text)
                        .attr("height", height_text);

var width_text = d3.select('#text5').node().getBoundingClientRect().width,
    height_text = d3.select('#text5').node().getBoundingClientRect().height;
    textContainer5 = d3.select("#text5")
                        .append("svg")
                        .attr("width", width_text)
                        .attr("height", height_text);

var width_text = d3.select('#text6').node().getBoundingClientRect().width,
    height_text = d3.select('#text6').node().getBoundingClientRect().height;
    textContainer6 = d3.select("#text6")
                        .append("svg")
                        .attr("width", width_text)
                        .attr("height", height_text);


function addText(country){

  if(country == "USA"){
    country = "United States"
  }
    console.log("in add text")
    
    d3.json('get_data_aggregate/'+country, function(error, json_data){
      console.log(json_data)
    
      var text = textContainer1.selectAll("text")
                                  .data(json_data)   
      text.enter()
          .append("text")
          .merge(text)
          .attr("x", function(d) { return 60; })
          .attr("y", function(d) { return 30; })
          .html( function (d) { 
              return d.attacks   })
          .attr("font-family", "sans-serif")
          .attr("font-size", "25px")
          .attr("fill", "white");  

      var text = textContainer2.selectAll("text")
                                  .data(json_data)   
      text.enter()
          .append("text")
          .merge(text)
          .attr("x", function(d) { return 60; })
          .attr("y", function(d) { return 30; })
          .html( function (d) { 
              return d.deaths   })
          .attr("font-family", "sans-serif")
          .attr("font-size", "25px")
          .attr("fill", "white");  

      var text = textContainer3.selectAll("text")
                                  .data(json_data)   
      text.enter()
          .append("text")
          .merge(text)
          .attr("x", function(d) { return 60; })
          .attr("y", function(d) { return 30; })
          .html( function (d) { 
              return d.wounds   })
          .attr("font-family", "sans-serif")
          .attr("font-size", "25px")
          .attr("fill", "white");  


      var text = textContainer4.selectAll("text")
                                  .data(json_data)   
      text.enter()
          .append("text")
          .merge(text)
          .attr("x", function(d) { return 60; })
          .attr("y", function(d) { return 30; })
          .html( function (d) { 
              return d.successful_attacks   })
          .attr("font-family", "sans-serif")
          .attr("font-size", "25px")
          .attr("fill", "white");  


      var text = textContainer5.selectAll("text")
                                  .data(json_data)   
      text.enter()
          .append("text")
          .merge(text)
          .attr("x", function(d) { return 60; })
          .attr("y", function(d) { return 30; })
          .html( function (d) { 
              return ((d.attacks/181691)*100).toFixed(3)   })
          .attr("font-family", "sans-serif")
          .attr("font-size", "25px")
          .attr("fill", "white");  

      var text = textContainer6.selectAll("text")
                                  .data(json_data)   
      text.enter()
          .append("text")
          .merge(text)
          .attr("x", function(d) { return 20; })
          .attr("y", function(d) { return 30; })
          .html( function (d) { 
                var x = d3.select(this).attr("x");//get the x position of the text
                var t = "<tspan x="+x+" dx="+(+x+30)+">"+" ( " + d.max_deaths+ " )"+"</tspan>";
                return d.iyear + t  })
          // .html( function (d) { 
          //     return d.iyear   })
          .attr("font-family", "sans-serif")
          .attr("font-size", "25px")
          .attr("fill", "white"); 

  }); 
}

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
  var title = chart.titles.create();
  title.text = "State-wise Attack Distribution";
  title.fontSize = 20;
  title.marginBottom = 10;
  title.align = "left";
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
  heatLegend.padding(40, 60, 40, 40);
  heatLegend.valueAxis.renderer.labels.template.fontSize = 10;
  heatLegend.valueAxis.renderer.minGridDistance = 40;
  // heatLegend.valueAxis.title.text = "Number of attacks";
  // heatLegend.valueAxis.title.contentAlign = "top";
  // heatLegend.valueAxis.title.fontSize = 5;
  heatLegend.orientation = "vertical"; 
  heatLegend.align = "right"




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
  // chart.exporting.menu = new am4core.ExportMenu();
  // chart.exporting.menu.align = "left";
  // chart.exporting.menu.valign = "bottom";

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
      series.columns.template.height = am4core.percent(70);
      // series.sequencedInterpolation = true;

      var valueLabel = series.bullets.push(new am4charts.LabelBullet());
      valueLabel.label.text = "{valueX}";
      valueLabel.label.horizontalCenter = "left";
      valueLabel.label.dx = 5;
      // valueLabel.label.hideOversized = false;
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

    chart.exporting.menu = new am4core.ExportMenu();
    chart.exporting.menu.align = "left"
  });

}

var svg;

function terroristBubble(country){
  
  if(country == "USA"){
      country = "United States"
    }

  console.log(country)

  d3.csv('/get_data_terrorist/' + country, function(error, data_){
  var data = []
  data_.forEach(function(p, i){
    data.push({name: p.gname, title: p.gname, group: p.group, value: +p.eventid})
  })

  format = d3.format(",d")
  
  color = d3.scaleOrdinal(data.map(function(d){ return d.group}), d3.schemeCategory10)
 
  if(count == 0){
    // console.log("if")
    // console.log(data)

    var width = 1000
    var height = 1000
    pack = data => d3.pack()
                    .size([width - 2, height - 2])
                    .padding(3)
                    (d3.hierarchy({children: data})
                      .sum(d => d.value))
    
    svg = d3.select("#bubblediv").append("svg")
      .attr("viewBox", [0, 0, width, height])
      .attr("font-size", 10)
      .attr("font-family", "sans-serif")
      .attr("text-anchor", "middle");
    count = 1
    var root = pack(data);
    var leaf = svg.selectAll("g")
                    .data(root.leaves())
                    .enter()
                    .append("g")
                    .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`);
    leaf.append("circle")
      .attr("r", function(d){
        // console.log(d.r); 
        return d.r;})
      .attr("fill-opacity", 0.7)
      .attr("fill", function(d) { 
        if(d.data.group == "Inactive"){
          // console.log(d.data.group)
          return "skyblue";
        }
        else{
          return "#c72c41";
        };
      });


   leaf.append("text")
      .attr("dy", ".5em")
      .attr("dx", ".10em")
      .style("text-anchor", "middle")
      .style("color", "black")
      // .style("font-size", "6px")
      .text(function(d) {return d.data.name});
    }
  else{
      // console.log("else")
      // console.log(data)
      var width = 1000
      var height = 1000
      pack = data => d3.pack()
                      .size([width - 2, height - 2])
                      .padding(3)
                      (d3.hierarchy({children: data})
                        .sum(d => d.value))
      var root = pack(data);
      var leaf = svg.selectAll("g")
                      .data(root.leaves())
      leaf.exit().remove();
      
      leaf.enter()
          .append("g")
          .merge(leaf)
          .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`);
          

      var text = svg.selectAll("text")
                      .data(root.leaves())
      text.exit().remove();
      text.enter()
          .append("text")
          .merge(text)
          .attr("dy", ".5em")
          .attr("dx", ".10em")
          .style("text-anchor", "middle")
          .style("color", "black")
          // .style("font-size", "6px")
          .text(function(d) {return d.data.name});

      // console.log(root)
      // console.log(root.leaves())
      var circle = svg.selectAll("circle")
                      .data(root.leaves())
      circle.exit().remove();
      
      circle.enter()
          .append("circle")
          .merge(circle)
          .attr("r", function(d){
            // console.log(d.r); 
            return d.r;})
          .attr("fill-opacity", 0.5)
          .attr("fill", function(d) { 
            if(d.data.group == "Inactive"){
              // console.log(d.data.group)
              return "skyblue";
            }
            else{
              return "#c72c41";
            };
          });
          
  }
  return svg.node();

});

}


function updateterroristBubble(country){

 if(country == "USA"){
    country = "United States"
  }

  d3.csv('/get_data_terrorist/' + country, function(error, data_){
  var data = []
  data_.forEach(function(p, i){
    data.push({name: p.gname, title: p.gname, group: p.group, value: +p.eventid})
  })

  var width = 1000
  var height = 1000
  format = d3.format(",d")

 pack = data => d3.pack()
    .size([width - 2, height - 2])
    .padding(3)
  (d3.hierarchy({children: data})
    .sum(d => d.value))
  
  color = d3.scaleOrdinal(data.map(function(d){ console.log(d.group); return d.group}), d3.schemeCategory10)

  const root = pack(data);

  const svg = d3.select("#bubblediv").append("svg")
      .attr("viewBox", [0, 0, width, height])
      .attr("font-size", 10)
      .attr("font-family", "sans-serif")
      .attr("text-anchor", "middle");
  
  const leaf = svg.selectAll("g")
                  .data(root.leaves())
                  .enter()
                  .append("g")
                  .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`);

  leaf.append("circle")
      .attr("r", d => d.r)
      .attr("fill-opacity", 0.7)
      .attr("fill", function(d) { 
        if(d.data.group == "Inactive"){
          return "blue";
        }
        else{
          return "red";
        };
      });

  leaf.append("text")
      .attr("dy", ".5em")
      .attr("dx", ".10em")
      .style("text-anchor", "middle")
      .style("color", "black")
      // .style("font-size", "6px")
      .text(function(d) { return d.data.name});

  leaf.append("title")
      .text(d => `${d.data.title === undefined ? "" : `${d.data.title}
    `}${format(d.value)}`);
        
      return svg.node();

    });

}

function amcharts_attack(data_list, country){

  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end
  // Create chart instance
  var chart = am4core.create("piediv", am4charts.PieChart);

  // Add data
  chart.data = data_list;
  // chart.data = [
  // {"type":  "Armed Assault", "count": 284}, 
  // {"type":  "Unarmed Assault", "count": 61}, 
  // {"type":  "Assassination", "count": 133}, 
  // {"type":  "Bombing/Explosion", "count": 1383}, 
  // {"type":  "Facility/Infrastructure Attack", "count": 864}, 
  // {"type":  "Hijacking", "count": 17}, 
  // {"type":  "Hostage Taking (Barricade Incident)", "count": 62}, 
  // {"type":  "Hostage Taking (Kidnapping)", "count": 21}, 
  // {"type":  "Unknown", "count": 11}
  // ];

  // Set inner radius
  chart.innerRadius = am4core.percent(40);

  // var title = chart.titles.create();
  // title.text = "Attack Type Distribution in "+ country;
  // title.fontSize = 20;
  // title.marginBottom = 10;

  /*  var label = chart.chartContainer.createChild(am4core.Label);
   label.text = "Target Type Distribution in the U.S.";
   label.align = "center"; */

  // Add and configure Series
  var pieSeries = chart.series.push(new am4charts.PieSeries());
  pieSeries.dataFields.value = "count";
  pieSeries.dataFields.category = "type";
  pieSeries.slices.template.stroke = am4core.color("#fff");
  pieSeries.slices.template.strokeWidth = 2;
  pieSeries.slices.template.strokeOpacity = 1;
  pieSeries.labels.template.maxWidth = 100;
  pieSeries.labels.template.wrap = true;
  pieSeries.labels.template.text = "{category}";
  pieSeries.labels.template.fontSize = 10;
  // This creates initial animation
  pieSeries.hiddenState.properties.opacity = 1;
  pieSeries.hiddenState.properties.endAngle = -90;
  pieSeries.hiddenState.properties.startAngle = -90;

  chart.exporting.menu = new am4core.ExportMenu();

}


function amcharts_target(data_list, country){

  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end
  // Create chart instance
  var chart = am4core.create("piediv", am4charts.PieChart);

  // Add data
  chart.data = data_list;
  // chart.data = [
  // {"type":  "Armed Assault", "count": 284}, 
  // {"type":  "Unarmed Assault", "count": 61}, 
  // {"type":  "Assassination", "count": 133}, 
  // {"type":  "Bombing/Explosion", "count": 1383}, 
  // {"type":  "Facility/Infrastructure Attack", "count": 864}, 
  // {"type":  "Hijacking", "count": 17}, 
  // {"type":  "Hostage Taking (Barricade Incident)", "count": 62}, 
  // {"type":  "Hostage Taking (Kidnapping)", "count": 21}, 
  // {"type":  "Unknown", "count": 11}
  // ];

  // Set inner radius
  chart.innerRadius = am4core.percent(40);

  // var title = chart.titles.create();
  // title.text = "Target Type Distribution in "+ country;
  // title.fontSize = 20;
  // title.marginBottom = 10;

  /*  var label = chart.chartContainer.createChild(am4core.Label);
   label.text = "Target Type Distribution in the U.S.";
   label.align = "center"; */

  // Add and configure Series
  var pieSeries = chart.series.push(new am4charts.PieSeries());
  pieSeries.dataFields.value = "count";
  pieSeries.dataFields.category = "type";
  pieSeries.slices.template.stroke = am4core.color("#fff");
  pieSeries.slices.template.strokeWidth = 2;
  pieSeries.slices.template.strokeOpacity = 1;
  pieSeries.labels.template.maxWidth = 100;
  pieSeries.labels.template.wrap = true;
  pieSeries.labels.template.text = "{category}";
  pieSeries.labels.template.fontSize = 9;
  pieSeries.alignLabels = false;

  // This creates initial animation
  pieSeries.hiddenState.properties.opacity = 1;
  pieSeries.hiddenState.properties.endAngle = -90;
  pieSeries.hiddenState.properties.startAngle = -90;

  chart.exporting.menu = new am4core.ExportMenu();

}


function amcharts_weapon(data_list, country){

  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end
  // Create chart instance
  var chart = am4core.create("piediv", am4charts.PieChart);

  // Add data
  chart.data = data_list;
  // chart.data = [
  // {"type":  "Armed Assault", "count": 284}, 
  // {"type":  "Unarmed Assault", "count": 61}, 
  // {"type":  "Assassination", "count": 133}, 
  // {"type":  "Bombing/Explosion", "count": 1383}, 
  // {"type":  "Facility/Infrastructure Attack", "count": 864}, 
  // {"type":  "Hijacking", "count": 17}, 
  // {"type":  "Hostage Taking (Barricade Incident)", "count": 62}, 
  // {"type":  "Hostage Taking (Kidnapping)", "count": 21}, 
  // {"type":  "Unknown", "count": 11}
  // ];

  // Set inner radius
  chart.innerRadius = am4core.percent(40);

  // var title = chart.titles.create();
  // title.text = "Weapon Type Distribution in "+ country;
  // title.fontSize = 20;
  // title.marginBottom = 10;

  /*  var label = chart.chartContainer.createChild(am4core.Label);
   label.text = "Target Type Distribution in the U.S.";
   label.align = "center"; */

  // Add and configure Series
  var pieSeries = chart.series.push(new am4charts.PieSeries());
  pieSeries.dataFields.value = "count";
  pieSeries.dataFields.category = "type";
  pieSeries.slices.template.stroke = am4core.color("#fff");
  pieSeries.slices.template.strokeWidth = 2;
  pieSeries.slices.template.strokeOpacity = 1;
  pieSeries.labels.template.maxWidth = 100;
  pieSeries.labels.template.wrap = true;
  pieSeries.labels.template.text = "{category}";
  pieSeries.labels.template.fontSize = 10;

  // This creates initial animation
  pieSeries.hiddenState.properties.opacity = 1;
  pieSeries.hiddenState.properties.endAngle = -90;
  pieSeries.hiddenState.properties.startAngle = -90;

  chart.exporting.menu = new am4core.ExportMenu();

}