/**
 * ---------------------------------------
 * This demo was created using amCharts 4.
 * 
 * For more information visit:
 * https://www.amcharts.com/
 * 
 * Documentation is available at:
 * https://www.amcharts.com/docs/v4/
 * ---------------------------------------
 */


var updateLinePlot = function(country){
    // console.log(country)
    data_list_line = []
    d3.csv('/get_csv_data_lineplot/' + country, function(error, csvdata){

      csvdata.forEach(function(d){
        data_list_line.push({"year" : d.iyear, "attacks": d.attacks, "kills": d.kills, "wounds": d.wounds});
      })
    // console.log(data);
    amcharts_line(data_list_line, country);
  });
}

var updateAttackDonut = function(country){
    console.log(country)
    data_list_attack = []
    d3.csv('/get_csv_attack_donutchart/' + country, function(error, attackdata){

      attackdata.forEach(function(d){
        data_list_attack.push({"type" : d.attacktype1_txt, "count" : d.count});
      })
    console.log(data_list_attack);
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

var dropdownChange = function(){

  country = d3.select(this).property('value')
  updateLinePlot(country)
  updateAttackDonut(country)
  updateTargetDonut(country)
  updateWeaponDonut(country)

}

countryList = ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia-Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Czechoslovakia', 'Democratic Republic of the Congo', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Germany (GDR)', 'East Timor', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Fiji', 'Finland', 'France', 'French Guiana', 'French Polynesia', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guadeloupe', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'International', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Ivory Coast', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Martinique', 'Mauritania', 'Mauritius', 'Mexico', 'Moldova', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nepal', 'Netherlands', 'New Caledonia', 'New Hebrides', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Yemen', 'Norway', 'Pakistan', 'Panama', 'Papua New Guinea', 'Paraguay', "People's Republic of the Congo", 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Republic of the Congo', 'Rhodesia', 'Romania', 'Russia', 'Rwanda', 'Saudi Arabia', 'Senegal', 'Serbia', 'Serbia-Montenegro', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovak Republic', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'South Vietnam', 'South Yemen', 'Soviet Union', 'Spain', 'Sri Lanka', 'St. Kitts and Nevis', 'St. Lucia', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 'Wallis and Futuna', 'West Bank and Gaza Strip', 'West Germany (FRG)', 'Western Sahara', 'Yemen', 'Yugoslavia', 'Zaire', 'Zambia', 'Zimbabwe']
var dropdown = d3.select("#countryButton")
                  .on("change", dropdownChange);


dropdown.selectAll('myOptions')
      .data(countryList)
      .enter()
      .append('option')
      .text(function (d) { return d; }) 
      .attr("value", function (d) { return d; })
      // .property("selected", function(d){ return d == 'United States'; }); 

// updateLinePlot('United States')
// updateAttackDonut('United States')


function amcharts_line(data_list, country){
      am4core.useTheme(am4themes_animated);

    // Create chart instance
    var chart = am4core.create("stackedDiv", am4charts.XYChart);

    // console.log(data_list);
    chart.data = data_list;

    // Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "year";
    categoryAxis.renderer.grid.template.location = 0;

    var title = chart.titles.create();
    title.text = "Number of Attacks/Deaths/Wounds in "+ country + " through the Years (1970-2017)";
    title.fontSize = 25;
    title.marginBottom = 30;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.inside = true;
    valueAxis.renderer.labels.template.disabled = true;
    valueAxis.min = 0;
    /* valueAxis.max = 3100; */

    // Create series
    function createSeries(field, name) {
      
      // Set up series
      var series = chart.series.push(new am4charts.ColumnSeries());
      series.name = name;
      series.dataFields.valueY = field;
      series.dataFields.categoryX = "year";
      series.sequencedInterpolation = true;
      
      // Make it stacked
      series.stacked = true;
      
      // Configure columns
      series.columns.template.width = am4core.percent(60);
      series.tooltipHTML = "<span style='font-size:14px; color:#000000;'><b>{name}: {valueY.value}</b></span>";
      series.columns.template.tooltipText = "[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}";
      
      // Add label
      var labelBullet = series.bullets.push(new am4charts.LabelBullet());
      labelBullet.label.text = "{valueY}";
      labelBullet.locationY = 0.5;
      labelBullet.label.hideOversized = true;
      
      return series;
    }

    createSeries("attacks", "attacks");
    createSeries("kills", "kills");
    createSeries("wounds", "wounds");
    /* createSeries("lamerica", "Latin America");
    createSeries("meast", "Middle-East");
    createSeries("africa", "Africa");
     */
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = categoryAxis;
    chart.scrollbarX = new am4core.Scrollbar();
    // Create vertical scrollbar and place it before the value axis

    chart.scrollbarY = new am4core.Scrollbar();
    chart.scrollbarY.parent = chart.leftAxesContainer;
    chart.scrollbarY.toBack();
     
    // Legend
    chart.legend = new am4charts.Legend();

}


function amcharts_attack(data_list, country){

  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end
  // Create chart instance
  var chart = am4core.create("attackDonutDiv", am4charts.PieChart);

  // Add data
  chart.data = data_list;
  console.log(data_list)
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
  chart.innerRadius = am4core.percent(50);

  var title = chart.titles.create();
  title.text = "Attack Type Distribution in "+ country;
  title.fontSize = 20;
  title.marginBottom = 10;

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

  // This creates initial animation
  pieSeries.hiddenState.properties.opacity = 1;
  pieSeries.hiddenState.properties.endAngle = -90;
  pieSeries.hiddenState.properties.startAngle = -90;

}


function amcharts_target(data_list, country){

  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end
  // Create chart instance
  var chart = am4core.create("targetDonutDiv", am4charts.PieChart);

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
  chart.innerRadius = am4core.percent(50);

  var title = chart.titles.create();
  title.text = "Target Type Distribution in "+ country;
  title.fontSize = 20;
  title.marginBottom = 10;

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

  // This creates initial animation
  pieSeries.hiddenState.properties.opacity = 1;
  pieSeries.hiddenState.properties.endAngle = -90;
  pieSeries.hiddenState.properties.startAngle = -90;

}


function amcharts_weapon(data_list, country){

  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end
  // Create chart instance
  var chart = am4core.create("weaponDonutDiv", am4charts.PieChart);

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
  chart.innerRadius = am4core.percent(50);

  var title = chart.titles.create();
  title.text = "Weapon Type Distribution in "+ country;
  title.fontSize = 20;
  title.marginBottom = 10;

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

  // This creates initial animation
  pieSeries.hiddenState.properties.opacity = 1;
  pieSeries.hiddenState.properties.endAngle = -90;
  pieSeries.hiddenState.properties.startAngle = -90;

}
