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
var chart = am4core.create("linePlotDiv", am4charts.XYChart);

// Add data
// chart.data = data
chart.data = [
{"year":  "1970", "attacks": 651, "deaths": 174}, 
{"year":  "1971", "attacks": 471, "deaths": 173}, 
{"year":  "1972", "attacks": 568, "deaths": 566}, 
{"year":  "1973", "attacks": 473, "deaths": 370}, 
{"year":  "1974", "attacks": 581, "deaths": 539}, 
{"year":  "1975", "attacks": 740, "deaths": 617}, 
{"year":  "1976", "attacks": 923, "deaths": 674}, 
{"year":  "1977", "attacks": 1319, "deaths": 456}, 
{"year":  "1978", "attacks": 1526, "deaths": 1459}, 
{"year":  "1979", "attacks": 2662, "deaths": 2100}, 
{"year":  "1980", "attacks": 2662, "deaths": 4400}, 
{"year":  "1981", "attacks": 2586, "deaths": 4851}, 
{"year":  "1982", "attacks": 2544, "deaths": 5136}, 
{"year":  "1983", "attacks": 2870, "deaths": 9444}, 
{"year":  "1984", "attacks": 3495, "deaths": 10450}, 
{"year":  "1985", "attacks": 2915, "deaths": 7094}, 
{"year":  "1986", "attacks": 2860, "deaths": 4976}, 
{"year":  "1987", "attacks": 3183, "deaths": 6482}, 
{"year":  "1988", "attacks": 3721, "deaths": 7208}, 
{"year":  "1989", "attacks": 4324, "deaths": 8152}, 
{"year":  "1990", "attacks": 3887, "deaths": 7148}, 
{"year":  "1991", "attacks": 4683, "deaths": 8429}, 
{"year":  "1992", "attacks": 5071, "deaths": 9742}, 
{"year":  "1993", "attacks": 3456, "deaths": 7690}, 
{"year":  "1994", "attacks": 3081, "deaths": 6103}, 
{"year":  "1995", "attacks": 3058, "deaths": 6966}, 
{"year":  "1996", "attacks": 3197, "deaths": 10924}, 
{"year":  "1997", "attacks": 934, "deaths": 4688}, 
{"year":  "1998", "attacks": 1395, "deaths": 3393}, 
{"year":  "1999", "attacks": 1814, "deaths": 4403}, 
{"year":  "2000", "attacks": 1906, "deaths": 7729}, 
{"year":  "2001", "attacks": 1333, "deaths": 4805}, 
{"year":  "2002", "attacks": 1278, "deaths": 3317}, 
{"year":  "2003", "attacks": 1166, "deaths": 5743}, 
{"year":  "2004", "attacks": 2017, "deaths": 6331}, 
{"year":  "2005", "attacks": 2758, "deaths": 9380}, 
{"year":  "2006", "attacks": 3242, "deaths": 12824}, 
{"year":  "2007", "attacks": 4805, "deaths": 9157}, 
{"year":  "2008", "attacks": 4721, "deaths": 9273}, 
{"year":  "2009", "attacks": 4826, "deaths": 7827}, 
{"year":  "2010", "attacks": 5076, "deaths": 8246}, 
{"year":  "2011", "attacks": 8522, "deaths": 15497}, 
{"year":  "2012", "attacks": 12036, "deaths": 22273}, 
{"year":  "2013", "attacks": 16903, "deaths": 44490}, 
{"year":  "2014", "attacks": 14965, "deaths": 38853}, 
{"year":  "2015", "attacks": 13587, "deaths": 34871}, 
{"year":  "2016", "attacks": 10900, "deaths": 26445}
];

console.log(chart.data)
// Set input format for the dates
chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";

// Create axes
var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

var title = chart.titles.create();
title.text = "Number of Attacks and Deaths through the Years (1970-2017)";
title.fontSize = 25;
title.marginBottom = 30;

// Create series
var series = chart.series.push(new am4charts.LineSeries());
series.dataFields.valueY = "deaths";
series.dataFields.dateX = "year";
series.tooltipText = "{deaths}"
series.name = "deaths"
series.strokeWidth = 2;
series.minBulletDistance = 15;

// Drop-shaped tooltips
series.tooltip.background.cornerRadius = 20;
series.tooltip.background.strokeOpacity = 0;
series.tooltip.pointerOrientation = "vertical";
series.tooltip.label.minWidth = 40;
series.tooltip.label.minHeight = 40;
series.tooltip.label.textAlign = "middle";
series.tooltip.label.textValign = "middle";

// Make bullets grow on hover
var bullet = series.bullets.push(new am4charts.CircleBullet());
bullet.circle.strokeWidth = 2;
bullet.circle.radius = 4;
bullet.circle.fill = am4core.color("#fff");


// Create series
var series2 = chart.series.push(new am4charts.LineSeries());
series2.dataFields.valueY = "attacks";
series2.dataFields.dateX = "year";
series2.tooltipText = "{attacks}"
series2.name = "attacks"
series2.strokeWidth = 2;
series2.minBulletDistance = 15;

// Drop-shaped tooltips
series2.tooltip.background.cornerRadius = 20;
series2.tooltip.background.strokeOpacity = 0;
series2.tooltip.pointerOrientation = "vertical";
series2.tooltip.label.minWidth = 40;
series2.tooltip.label.minHeight = 40;
series2.tooltip.label.textAlign = "middle";
series2.tooltip.label.textValign = "middle";

// Make bullets grow on hover
var bullet2 = series2.bullets.push(new am4charts.CircleBullet());
bullet2.circle.strokeWidth = 2;
bullet2.circle.radius = 4;
bullet2.circle.fill = am4core.color("#fff");


var bullethover = bullet.states.create("hover");
bullethover.properties.scale = 1.3;

// Make a panning cursor
chart.cursor = new am4charts.XYCursor();
chart.cursor.behavior = "panXY";
chart.cursor.xAxis = dateAxis;
chart.cursor.snapToSeries = [series, series2];

// Create vertical scrollbar and place it before the value axis
chart.scrollbarY = new am4core.Scrollbar();
chart.scrollbarY.parent = chart.leftAxesContainer;
chart.scrollbarY.toBack();


// Create a horizontal scrollbar with previe and place it underneath the date axis
chart.scrollbarX = new am4charts.XYChartScrollbar();
chart.scrollbarX.series.push(series);
chart.scrollbarX.parent = chart.bottomAxesContainer;
// console.log(chart.xAxes)

/* Add legend */
chart.legend = new am4charts.Legend();

dateAxis.start = 0.79;
dateAxis.keepSelection = true;

