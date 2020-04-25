


// countryList = ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia-Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Czechoslovakia', 'Democratic Republic of the Congo', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Germany (GDR)', 'East Timor', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Fiji', 'Finland', 'France', 'French Guiana', 'French Polynesia', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guadeloupe', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'International', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Ivory Coast', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Martinique', 'Mauritania', 'Mauritius', 'Mexico', 'Moldova', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nepal', 'Netherlands', 'New Caledonia', 'New Hebrides', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Yemen', 'Norway', 'Pakistan', 'Panama', 'Papua New Guinea', 'Paraguay', "People's Republic of the Congo", 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Republic of the Congo', 'Rhodesia', 'Romania', 'Russia', 'Rwanda', 'Saudi Arabia', 'Senegal', 'Serbia', 'Serbia-Montenegro', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovak Republic', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'South Vietnam', 'South Yemen', 'Soviet Union', 'Spain', 'Sri Lanka', 'St. Kitts and Nevis', 'St. Lucia', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 'Wallis and Futuna', 'West Bank and Gaza Strip', 'West Germany (FRG)', 'Western Sahara', 'Yemen', 'Yugoslavia', 'Zaire', 'Zambia', 'Zimbabwe']


var updatePiePlot = function(country){
    console.log(country)
    data_list = []
    d3.csv('/get_csv_attack_donutchart/' + country, function(error, csvdata){

      csvdata.forEach(function(d){
        data_list.push({"type" : d.attacktype1_txt, "count" : d.count});
      })
    // console.log(data);
    amcharts(data_list, country);
  });
}

var PiedropdownChange = function(){

  country = d3.select(this).property('value')
  updatePiePlot(country)

}

var dropdown = d3.select("#countryButton")
                  .on("change", PiedropdownChange);

// dropdown.selectAll('myOptions')
//       .data(countryList)
//       .enter()
//       .append('option')
//       .text(function (d) { return d; }) 
//       .attr("value", function (d) { return d; })
//       .property("selected", function(d){ return d == 'United States'; }); 

updatePiePlot('United States')



function amcharts_pie(data_list, country){

	// Themes begin
	am4core.useTheme(am4themes_animated);
	// Themes end
	// Create chart instance
	var chart = am4core.create("attackDonutDiv", am4charts.PieChart);

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
	title.text = "Attack Type Distribution in the U.S.";
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