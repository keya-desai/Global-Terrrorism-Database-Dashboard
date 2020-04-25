// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

 // Create chart instance
var chart = am4core.create("chartdiv", am4charts.XYChart);

country = "United States"
d3.json('/get_data_top_cities/' + country, function(error, json_data){

      console.log(json_data)
      chart.data = json_data
      // data.forEach(function(d){
      //   data_list_line.push({"year" : d.iyear, "attacks": d.attacks, "kills": d.kills, "wounds": d.wounds});
      // })
    // console.log(data);
    // amcharts_line(data_list_line, country);
  });

// Add data
// chart.data = [{
//   "year": 2005,
//   "income": 23.5,
//   "expenses": 18.1
// },{
//   "year": 2006,
//   "income": 26.2,
//   "expenses": 22.8
// },{
//   "year": 2007,
//   "income": 30.1,
//   "expenses": 23.9
// },{
//   "year": 2008,
//   "income": 29.5,
//   "expenses": 25.1
// },{
//   "year": 2009,
//   "income": 24.6,
//   "expenses": 25
// }];

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