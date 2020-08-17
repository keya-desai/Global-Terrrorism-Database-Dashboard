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

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
var chart1 = am4core.create("weaponDiv", am4charts.PieChart);

// Add data
chart1.data = [
{"type":  "Biological", "count": 35},
{"type":  "Chemical", "count": 321},
{"type":  "Radiological", "count": 14},
{"type":  "Firearms", "count": 58524},
{"type":  "Fake Weapons", "count": 33},
{"type":  "Explosives", "count": 92426},
{"type":  "Sabotage Equipment", "count": 141},
{"type":  "Incendiary", "count": 11135},
{"type":  "Melee", "count": 3655},
{"type":  "Vehicle (not to include vehicle-borne explosives, i.e., car or truck bombs)", "count": 136},
{"type":  "Unknown", "count": 15157},
{"type":  "Other", "count": 114}
];

// Set inner radius
chart1.innerRadius = am4core.percent(40);

// var title = chart.titles.create();
// title.text = "Weapon Type Distribution (Global)";
// title.fontSize = 20;
// title.marginBottom = 10;

/*  var label = chart.chartContainer.createChild(am4core.Label);
 label.text = "Target Type Distribution in the U.S.";
 label.align = "center"; */

// Add and configure Series
var pieseries1 = chart1.series.push(new am4charts.PieSeries());
pieseries1.dataFields.value = "count";
pieseries1.dataFields.category = "type";
pieseries1.slices.template.stroke = am4core.color("#fff");
pieseries1.slices.template.strokeWidth = 2;
pieseries1.slices.template.strokeOpacity = 1;
pieseries1.labels.template.maxWidth = 100;
pieseries1.labels.template.wrap = true;
pieseries1.labels.template.text = "{category}";
pieseries1.labels.template.fontSize = 9;

// This creates initial animation
pieseries1.hiddenState.properties.opacity = 1;
pieseries1.hiddenState.properties.endAngle = -90;
pieseries1.hiddenState.properties.startAngle = -90;

chart1.exporting.menu = new am4core.ExportMenu();