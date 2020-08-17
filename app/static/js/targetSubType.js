
// Themes begin
// am4core.useTheme(am4themes_dataviz);
am4core.useTheme(am4themes_animated);
// Themes end

var container = am4core.create("targetDiv", am4core.Container);
container.width = am4core.percent(100);
container.height = am4core.percent(100);
container.layout = "horizontal";


var chart = container.createChild(am4charts.PieChart);

chart.data = [{
  "target": "Private Citizens & Property",
  "value": 43511,
  "subData": [{ name: "Alleged Informant/Protestor", value: 780 }, { name: "Residence", value: 3044 }, { name: "Labor", value: 3312 },{ name: "Public place", value: 4209 },
  { name: "Named Civilian", value: 2549 },{ name: "Political Party Member/Rally", value: 1932 },{ name: "Race/Ethnicity/Religion Identified", value: 3915 },
{name:"Village/City/Town/Suburb",value: 6542}, {name:"Unnamed Civilian", value:11596}, {name:"Vehicles/Transportation", value:2928}, {name:"Others", value:2507} ]
},
{
  "target": "Police",
  "value": 24440,
  "subData": [{ name: "Police Building", value: 5907 }, { name: "Police Security Forces", value: 11178 }, { name: "Police Patrol", value: 5150 }, {name:"Other", value:2205}]
},
 {
  "target": "Military",
  "value": 27984,
  "subData": [{ name: "Military Unit/Patrol/Convoy  ", value: 8277 }, { name: "Military Personnel", value: 7963 }, { name: "Other", value: 11744 }]
},
{
"target": "Government",
  "value": 21283,
  "subData": [{ name: "Govt. Building", value: 4802 }, { name: "Govt. Personnel", value: 6610 }, { name: "Politician or Political Party Rally", value: 6306 }, { name: "Diplomatic Personnel or Embassy", value: 2547 }, {name:"Judge/Attorney/Court", value:1330}, {name:"Others", value:3104}]
},{
  "target": "Business",
  "value": 20669,
  "subData": [{ name: "Bank", value: 3242 }, { name: "Construction", value: 1128 }, { name: "Corporation/Industry", value: 3810 }, {name:"Hotel/Resort", value:1019},{name:"Restaurant", value:1827},{name:"Retail/Grocery", value:4274},
{name:"Others", value:2775}]
},
 {
  "target": "Others",
  "value": 31913,
  "subData": [{ name: "Journalists and Media", value: 2948 }, { name: "NGO", value: 970 }, { name: "Tourists", value: 440 },{ name: "Abortion related", value: 263 },{ name: "Educational institution", value: 4322 },
  { name: "Terrorists", value: 3039 },{ name: "Religious", value: 4440 },{ name: "Transportation", value: 8142 },{ name: "Utilities", value: 6340 }, { name: "Telecommunication", value: 1009} ]
}
];

// Add and configure Series
var pieSeries = chart.series.push(new am4charts.PieSeries());
pieSeries.dataFields.value = "value";
pieSeries.dataFields.category = "target";
pieSeries.slices.template.states.getKey("active").properties.shiftRadius = 0;
//pieSeries.labels.template.text = "{category}\n{value.percent.formatNumber('#.#')}%";

pieSeries.slices.template.events.on("hit", function(event) {
  selectSlice(event.target.dataItem);
})

var chart2 = container.createChild(am4charts.PieChart);
chart2.width = am4core.percent(30);
chart2.radius = am4core.percent(80);

// Add and configure Series
var pieSeries2 = chart2.series.push(new am4charts.PieSeries());
pieSeries2.dataFields.value = "value";
pieSeries2.dataFields.category = "name";
pieSeries2.slices.template.states.getKey("active").properties.shiftRadius = 0;
pieSeries2.labels.template.radius = am4core.percent(40);
/* pieSeries2.labels.template.inside = true; */
pieSeries2.labels.template.fill = am4core.color("#FFFFFF");
pieSeries2.labels.template.disabled = true;
pieSeries2.ticks.template.disabled = true;
pieSeries2.alignLabels = false;
pieSeries2.events.on("positionchanged", updateLines);

var interfaceColors = new am4core.InterfaceColorSet();

var line1 = container.createChild(am4core.Line);
line1.strokeDasharray = "2,2";
line1.strokeOpacity = 0.5;
line1.stroke = interfaceColors.getFor("alternativeBackground");
line1.isMeasured = false;

var line2 = container.createChild(am4core.Line);
line2.strokeDasharray = "2,2";
line2.strokeOpacity = 0.5;
line2.stroke = interfaceColors.getFor("alternativeBackground");
line2.isMeasured = false;

var selectedSlice;

function selectSlice(dataItem) {

  selectedSlice = dataItem.slice;

  var fill = selectedSlice.fill;

  var count = dataItem.dataContext.subData.length;

  pieSeries2.colors.list = [];
  for (var i = 0; i < count; i++) {
    pieSeries2.colors.list.push(fill.brighten(i * 2 / count));
  }

  chart2.data = dataItem.dataContext.subData;
  pieSeries2.appear();

  var middleAngle = selectedSlice.middleAngle;
  var firstAngle = pieSeries.slices.getIndex(0).startAngle;
  var animation = pieSeries.animate([{ property: "startAngle", to: firstAngle - middleAngle }, { property: "endAngle", to: firstAngle - middleAngle + 360 }], 600, am4core.ease.sinOut);
  animation.events.on("animationprogress", updateLines);

  selectedSlice.events.on("transformed", updateLines);

//  var animation = chart2.animate({property:"dx", from:-container.pixelWidth / 2, to:0}, 2000, am4core.ease.elasticOut)
//  animation.events.on("animationprogress", updateLines)
}


function updateLines() {
  if (selectedSlice) {
    var p11 = { x: selectedSlice.radius * am4core.math.cos(selectedSlice.startAngle), y: selectedSlice.radius * am4core.math.sin(selectedSlice.startAngle) };
    var p12 = { x: selectedSlice.radius * am4core.math.cos(selectedSlice.startAngle + selectedSlice.arc), y: selectedSlice.radius * am4core.math.sin(selectedSlice.startAngle + selectedSlice.arc) };

    p11 = am4core.utils.spritePointToSvg(p11, selectedSlice);
    p12 = am4core.utils.spritePointToSvg(p12, selectedSlice);

    var p21 = { x: 0, y: -pieSeries2.pixelRadius };
    var p22 = { x: 0, y: pieSeries2.pixelRadius };

    p21 = am4core.utils.spritePointToSvg(p21, pieSeries2);
    p22 = am4core.utils.spritePointToSvg(p22, pieSeries2);

    line1.x1 = p11.x;
    line1.x2 = p21.x;
    line1.y1 = p11.y;
    line1.y2 = p21.y;

    line2.x1 = p12.x;
    line2.x2 = p22.x;
    line2.y1 = p12.y;
    line2.y2 = p22.y;
  }
}

chart.events.on("datavalidated", function() {
  setTimeout(function() {
    selectSlice(pieSeries.dataItems.getIndex(0));
  }, 1000);
});

chart.exporting.menu = new am4core.ExportMenu();