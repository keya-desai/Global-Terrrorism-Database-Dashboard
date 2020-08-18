optionList = ["By #attacks", "By #deaths"]

function updatePlot(option){
	if(option == optionList[0]){
		d3.json('/get_data_top_countries_attacks', function(error, data_json){
			console.log(data_json)
			plot(data_json);
		});
	}
	else{
		d3.json('/get_data_top_countries_deaths', function(error, data_json){
			plot(data_json);
		});
	}
}


dropdownChange = function(){
  option = d3.select(this).property('value')
  console.log(option)
  updatePlot(option)
}


var dropdown = d3.select("#optionButton")
                .on("change", dropdownChange);

dropdown.selectAll('myOptions')
      .data(optionList)
      .enter()
      .append('option')
      .text(function (d) { return d; }) 
      .attr("value", function (d) { return d; });

updatePlot(optionList[0])

function plot(data_){
	console.log(data_)
	// Themes begin
	am4core.useTheme(am4themes_animated);
	var chart = am4core.create("topCountBarDiv", am4charts.XYChart);
	chart.data = data_
	/// Add data
	// chart.data = [
	// {"country_txt":"Iraq",
	//  "nkill":78589.0
	// },
	// {"country_txt":"Afghanistan","nkill":39384.0},
	// {"country_txt":"Pakistan","nkill":23822.0},
	// {"country_txt":"Nigeria","nkill":22682.0},
	// {"country_txt":"India","nkill":19341.0},
	// {"country_txt":"Sri Lanka","nkill":15530.0},
	// {"country_txt":"Syria","nkill":15229.0},
	// {"country_txt":"Colombia","nkill":14698.0},
	// {"country_txt":"Peru","nkill":12771.0},
	// {"country_txt":"El Salvador","nkill":12053.0}];
	// Create axes


	var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
	categoryAxis.dataFields.category = "country_txt";
	categoryAxis.renderer.grid.template.location = 0;
	categoryAxis.renderer.minGridDistance = 30;

	categoryAxis.renderer.labels.template.adapter.add("dy", function(dy, target) {
	  if (target.dataItem && target.dataItem.index & 2 == 2) {
	    return dy + 25;
	  }
	  return dy;
	});

	var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

	// Create series
	var series = chart.series.push(new am4charts.ColumnSeries());
	series.dataFields.valueY = "value";
	series.dataFields.categoryX = "country_txt";
	series.name = "Count";
	series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
	series.columns.template.fillOpacity = .8;

	var columnTemplate = series.columns.template;
	columnTemplate.strokeWidth = 2;
	columnTemplate.strokeOpacity = 1;


	chart.exporting.menu = new am4core.ExportMenu();

}