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
var chart3 = am4core.create("attackDiv", am4charts.PieChart);

// Add data
chart3.data = [
{"type":  "Armed Assault", "count": 42669},
{"type":  "Unarmed Assault", "count": 1015},
{"type":  "Assassination", "count": 19312},
{"type":  "Bombing/Explosion", "count": 88255},
{"type":  "Facility/Infrastructure Attack", "count": 10356},
{"type":  "Hijacking", "count": 659},
{"type":  "Hostage Taking (Barricade Incident)", "count": 991},
{"type":  "Hostage Taking (Kidnapping)", "count": 11158},
{"type":  "Unknown", "count": 7276}
];

// Set inner radius
chart3.innerRadius = am4core.percent(40);

// Add and configure Series
var pieSeries3 = chart3.series.push(new am4charts.PieSeries());
pieSeries3.dataFields.value = "count";
pieSeries3.dataFields.category = "type";
pieSeries3.slices.template.stroke = am4core.color("#fff");
pieSeries3.slices.template.strokeWidth = 2;
pieSeries3.slices.template.strokeOpacity = 1;
pieSeries3.labels.template.maxWidth = 100;
pieSeries3.labels.template.wrap = true;
pieSeries3.labels.template.text = "{category}";
pieSeries3.labels.template.fontSize = 10;

// This creates initial animation
pieSeries3.hiddenState.properties.opacity = 1;
pieSeries3.hiddenState.properties.endAngle = -90;
pieSeries3.hiddenState.properties.startAngle = -90;
chart3.exporting.menu = new am4core.ExportMenu();