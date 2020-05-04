
countryList = ["Worldwide", "Afghanistan", "Angola", "Albania", "United Arab Emirates", "Argentina", "Armenia", "Antarctica", "Australia", "Austria", "Azerbaijan", "Burundi", "Belgium", "Benin", "Burkina Faso", "Bangladesh", "Bulgaria", "The Bahamas", "Bosnia and Herzegovina", "Belarus", "Belize", "Bolivia", "Brazil", "Brunei", "Bhutan", "Botswana", "Central African Republic", "Canada", "Switzerland", "Chile", "China", "Ivory Coast", "Cameroon", "Democratic Republic of the Congo", "Republic of the Congo", "Colombia", "Costa Rica", "Cuba", "Northern Cyprus", "Cyprus", "Czech Republic", "Germany", "Djibouti", "Denmark", "Dominican Republic", "Algeria", "Ecuador", "Egypt", "Eritrea", "Spain", "Estonia", "Ethiopia", "Finland", "Fiji", "Falkland Islands", "France", "Gabon", "England", "Georgia", "Ghana", "Guinea", "Gambia", "Guinea Bissau", "Equatorial Guinea", "Greece", "Greenland", "Guatemala", "Guyana", "Honduras", "Croatia", "Haiti", "Hungary", "Indonesia", "India", "Ireland", "Iran", "Iraq", "Iceland", "Israel", "Italy", "Jamaica", "Jordan", "Japan", "Kazakhstan", "Kenya", "Kyrgyzstan", "Cambodia", "South Korea", "Kosovo", "Kuwait", "Laos", "Lebanon", "Liberia", "Libya", "Sri Lanka", "Lesotho", "Lithuania", "Luxembourg", "Latvia", "Morocco", "Moldova", "Madagascar", "Mexico", "Macedonia", "Mali", "Myanmar", "Montenegro", "Mongolia", "Mozambique", "Mauritania", "Malawi", "Malaysia", "Namibia", "New Caledonia", "Niger", "Nigeria", "Nicaragua", "Netherlands", "Norway", "Nepal", "New Zealand", "Oman", "Pakistan", "Panama", "Peru", "Philippines", "Papua New Guinea", "Poland", "Puerto Rico", "North Korea", "Portugal", "Paraguay", "Qatar", "Romania", "Russia", "Rwanda", "Western Sahara", "Saudi Arabia", "Sudan", "South Sudan", "Senegal", "Solomon Islands", "Sierra Leone", "El Salvador", "Somaliland", "Somalia", "Republic of Serbia", "Suriname", "Slovakia", "Slovenia", "Sweden", "Swaziland", "Syria", "Chad", "Togo", "Thailand", "Tajikistan", "Turkmenistan", "East Timor", "Trinidad and Tobago", "Tunisia", "Turkey", "Taiwan", "United Republic of Tanzania", "Uganda", "Ukraine", "Uruguay", "USA", "Uzbekistan", "Venezuela", "Vietnam", "Vanuatu", "West Bank", "Yemen", "South Africa", "Zambia", "Zimbabwe"]

var dropdown = d3.select("#countryButton")
                .on("change", dropdownChange);

dropdown.selectAll('myOptions')
      .data(countryList)
      .enter()
      .append('option')
      .text(function (d) { return d; }) 
      .attr("value", function (d) { return d; })
      .property("selected", function(k){ return k == "Worldwide"; }); 

function dropdownChange(){
    country = d3.select(this).property('value')
    country_list = []
    if(country == "Worldwide"){
        reset();
    }
    else{
    d3.json('/static/json/world-110m2.json', function (error, data) {

        for( key in data.features){
            if (data.features.hasOwnProperty(key)) {
                var d = data.features[key]
                if(d.properties.name == country){
                    click(d);
                }
            }
        }
        
    });
    }
    linePlot(country);

}


var width = d3.select('#map').node().getBoundingClientRect().width,
    height = d3.select('#map').node().getBoundingClientRect().height;

var center = [width / 2, height / 2];
var active;

var projection = d3.geo.mercator()
        .center([0, 10]);

var svg = d3.select("#map")
        .append("svg")
        .attr("width", width)
        .attr("height", height-20);

var path = d3.geo.path()
                .projection(projection);

var g = svg.append("g");

var width_text = d3.select('#textInfo').node().getBoundingClientRect().width,
    height_text = d3.select('#textInfo').node().getBoundingClientRect().height;

var textContainer = d3.select("#textInfo")
                        .append("svg")
                        .attr("width", width_text)
                        .attr("height", height_text);
var size = d3.scaleLinear()
      .domain([0, 1000])  // What's in the data
      .range([ 0.5, 25])

var byCountry;
var byYear;
d3.csv('/get_data_country_year_att_kills', function(error, data_){

        if(error){console.error(error)}
        const data = crossfilter(data_)
        // const nestByCountry = d3.nest()
        //                     .key(d => d.country_txt);
        // const dataByCountry = nestByCountry.entries(country)

        byCountry = data.dimension(function(d) { return d.country_txt; });
        byYear = data.dimension(function(d) { return d.iyear; });

    })

var first = 1;
function updateLinks(){
    if(d3.select("#linkBox").property("checked")){
                    // newData = data.filter(function(d,i){return d % 2 == 0;});
                    console.log("Links on")
                    addLinks(1970)
                } else {
                    // newData = data;         
                    console.log("links off")
                    removeLinks()
                }   
}
var checkbox = d3.select("#linkBox")
                .on("change", updateLinks);


d3.json('/static/json/world-110m2.json', function (error, data) {

    g.selectAll("path")
        // .data(topojson.object(topology, topology.objects.countries).geometries)
        .data(data.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("id", function (d) { return d.properties.name; })
        .attr("class", "feature")
        .attr("class", "Country")
        .on("click", function (d) { click(d); })
        .style("stroke", "white")
        .style("stroke-width", "0.5px")
        .style("fill", "#EBEBE0")
        .style("opacity", 1)
        .on("mouseover", function() {
            d3.selectAll(".Country")
              .transition()
              .duration(200)
              .style("opacity", .5)

            d3.select(this)
              .transition()
              .duration(200)
              .style("opacity", 1)
              .style("stroke", "black")
        })
        .on("mouseleave", function(){
            d3.selectAll(".Country")
              .transition()
              .duration(200)
              .style("opacity", 1)
            d3.select(this)
              .transition()
              .duration(200)
              .style("stroke", "transparent")
        });


    // // append labels
    //   g
    //   .selectAll('.label')
    //   .data(data.features)
    //   .enter()
    //   .append('text')
    //   .attr('class', 'label')
    //   .text((d)=> d.properties.name)
    //   .attr('transform', (d)=> {
    //     const centroid = path.centroid(d)
    //     return `translate(${centroid[0]}, ${centroid[1]})`
    //   })

    // d3.csv("static/csv/cities.csv", function (error, cities) {

    //     svg.selectAll("circle")
    //             .data(cities)
    //             .enter()
    //             .append("circle")
    //             .attr("cx", function (d) {
    //                 return projection([d.lon, d.lat])[0];
    //             })
    //             .attr("cy", function (d) {
    //                 return projection([d.lon, d.lat])[1];
    //             })
    //             .attr("r", 5)
    //             .style("fill", "red");
    // });

    
    year = document.getElementById("range").innerHTML;
    addBubbles(year);
    linePlot("Worldwide");
    add_text("Worldwide", year);

});

function addLinks(year){

    var link = []
    d3.csv('/static/csv/related.csv', function(error, data){
        newData = data.filter(function(d,i){return d.year == year;});
        newData.forEach(function(row){
        if(row.long1 != 0 && row.long2 != 0 && row.lat1 != 0 && row.lat2 != 0 ){
            
        
          source = [+row.long1, +row.lat1]
          target = [+row.long2, +row.lat2]
          topush = {type: "LineString", coordinates: [source, target]}
          link.push(topush)
        }
        })
        
        svg.selectAll("myPath")
            .data(link)
            .enter()
            .append("path")
            .attr("id", "id")
            .attr("d", function(d){ console.log(path(d)); return path(d)})
            .style("fill", "none")
            .style("stroke", "#69b3a2")
            .style("stroke-width", 2)

    }); 

}

function removeLinks(){
   
    var link = [{type: "LineString", coordinates: [[0,0], [1,1]]}]

    var temp = svg.selectAll("#id")
                    .data(link) 
    temp.exit().remove()
}


var zoom = d3.behavior.zoom()
        .scaleExtent([1, 8])
        .on("zoom", function () {
            g.attr("transform", "translate(" + d3.event.translate.join(",") + ") scale(" + d3.event.scale + ")");
            g.selectAll("path")
                .attr("d", path.projection(projection));
            
            svg.selectAll("circle")
                    .attr("transform", "translate(" + d3.event.translate.join(",") + ") scale(" + d3.event.scale + ")")
                    .transition()
                    .attr("r", function(d){ return size(d.size)/ (zoom.scale()) })

            svg.selectAll("#id")
                .transition()
                .attr("transform", "translate(" + zoom.translate().join(",") + ") scale(" + zoom.scale() + ")")
                .attr("d", function(d){ console.log(path(d)); return path(d)})
            d3.select("#map-zoomer").node().value = zoom.scale();
        });
svg.call(zoom);

d3.select('#zoom-in').on('click', function () {
    var scale = zoom.scale(), extent = zoom.scaleExtent(), translate = zoom.translate();
    var x = translate[0], y = translate[1];
    var factor = 1.2;

    var target_scale = scale * factor;

    if (scale === extent[1]) {
        return false;
    }
    var clamped_target_scale = Math.max(extent[0], Math.min(extent[1], target_scale));
    if (clamped_target_scale != target_scale) {
        target_scale = clamped_target_scale;
        factor = target_scale / scale;
    }
    x = (x - center[0]) * factor + center[0];
    y = (y - center[1]) * factor + center[1];

    zoom.scale(target_scale).translate([x, y]);

    g.transition().attr("transform", "translate(" + zoom.translate().join(",") + ") scale(" + zoom.scale() + ")");
    g.selectAll("path")
            .attr("d", path.projection(projection));

    svg.selectAll("circle")
            .transition()
            .attr("transform", "translate(" + zoom.translate().join(",") + ") scale(" + zoom.scale() + ")")
            .attr("r", function(d){ return size(d.size)/ (zoom.scale()) })
            // .attr("r", 5 );

    svg.selectAll("#id")
            .transition()
            .attr("transform", "translate(" + zoom.translate().join(",") + ") scale(" + zoom.scale() + ")")
            .attr("d", function(d){ console.log(path(d)); return path(d)})
            // .attr("r", 5 / zoom.scale());



    d3.select("#map-zoomer").node().value = zoom.scale();
});

d3.select('#zoom-out').on('click', function () {
    var scale = zoom.scale(), extent = zoom.scaleExtent(), translate = zoom.translate();
    var x = translate[0], y = translate[1];
    var factor = 1 / 1.2;

    var target_scale = scale * factor;

    if (scale === extent[0]) {
        return false;
    }
    var clamped_target_scale = Math.max(extent[0], Math.min(extent[1], target_scale));
    if (clamped_target_scale != target_scale) {
        target_scale = clamped_target_scale;
        factor = target_scale / scale;
    }
    x = (x - center[0]) * factor + center[0];
    y = (y - center[1]) * factor + center[1];

    zoom.scale(target_scale).translate([x, y]);

    g.transition()
            .attr("transform", "translate(" + zoom.translate().join(",") + ") scale(" + zoom.scale() + ")");
    g.selectAll("path")
            .attr("d", path.projection(projection));


    svg.selectAll("circle")
            .transition()
            .attr("transform", "translate(" + zoom.translate().join(",") + ") scale(" + zoom.scale() + ")")
            .attr("r", function(d){ return size(d.size)/ (zoom.scale()) })

    svg.selectAll("#id")
            .transition()
            .attr("transform", "translate(" + zoom.translate().join(",") + ") scale(" + zoom.scale() + ")")
            .attr("r", function(d){ return size(d.size)/ (zoom.scale()) })

    d3.select("#map-zoomer").node().value = zoom.scale();
});

d3.select('#reset').on('click', function () {
    zoom.translate([0, 0]);
    zoom.scale(1);
    g.transition().attr("transform", "translate(" + zoom.translate().join(",") + ") scale(" + zoom.scale() + ")");
    g.selectAll("path")
            .attr("d", path.projection(projection))

    svg.selectAll("circle")
            .transition()
            .attr("transform", "translate(" + zoom.translate().join(",") + ") scale(" + zoom.scale() + ")")
            .attr("r", function(d){ return size(d.size)/ (zoom.scale()) })

    svg.selectAll("#id")
            .transition()
            .attr("transform", "translate(" + zoom.translate().join(",") + ") scale(" + zoom.scale() + ")")
            .attr("d", function(d){ console.log(path(d)); return path(d)})
    d3.select("#map-zoomer").node().value = zoom.scale();

    year = document.getElementById("range").innerHTML;
    add_text("Worldwide", year)
    linePlot("Worldwide")
});

d3.select('#map-zoomer').on("change", function () {
    var scale = zoom.scale(), extent = zoom.scaleExtent(), translate = zoom.translate();
    var x = translate[0], y = translate[1];
    var target_scale = +this.value;
    var factor = target_scale / scale;

    var clamped_target_scale = Math.max(extent[0], Math.min(extent[1], target_scale));
    if (clamped_target_scale != target_scale) {
        target_scale = clamped_target_scale;
        factor = target_scale / scale;
    }
    x = (x - center[0]) * factor + center[0];
    y = (y - center[1]) * factor + center[1];

    zoom.scale(target_scale).translate([x, y]);

    g.transition()
            .attr("transform", "translate(" + zoom.translate().join(",") + ") scale(" + zoom.scale() + ")");
    g.selectAll("path")
            .attr("d", path.projection(projection));

    svg.selectAll("circle")
            .transition()
            .attr("transform", "translate(" + zoom.translate().join(",") + ") scale(" + zoom.scale() + ")")
            .attr("r", function(d){ return size(d.size)/ (zoom.scale()) })

    svg.selectAll("#id")
            .transition()
            .attr("transform", "translate(" + zoom.translate().join(",") + ") scale(" + zoom.scale() + ")")
            .attr("d", function(d){ console.log(path(d)); return path(d)})
});


// zoom into country by selection on dropdow 
function click(d){

        // updating dropdown
        dropdown.selectAll('myOptions')
                  .data(countryList)
                  .enter()
                  .append('option')
                  .text(function (k) { return k; }) 
                  .attr("value", function (k) { return k; })
                  .property("selected", function(k){ return k == d.properties.name; }); 

        // console.log(dropdown.property('value'))

        if (active === d) return reset();
        g.selectAll(".active").classed("active", false);
        d3.select("#"+d.properties.name).classed("active", active = d)
        .style("fill", "#95afc0"); // changed selection to id
       
        var b = path.bounds(d);

        g.transition().duration(750).attr("transform",
           "translate(" + projection.translate() + ")"
           + "scale(" + .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height) + ")"
           + "translate(" + -(b[1][0] + b[0][0]) / 2 + "," + -(b[1][1] + b[0][1]) / 2 + ")");

        svg.selectAll("circle")
            .transition()
            .attr("transform", "translate(" +  projection.translate() + ")"
                + "scale(" + .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height) + ")"
                + "translate(" + -(b[1][0] + b[0][0]) / 2 + "," + -(b[1][1] + b[0][1]) / 2 + ")")
            .attr("r", 1/ zoom.scale());

        year = document.getElementById("range").innerHTML;
        add_text(d.properties.name, year)
        
    }

    // clicking the zoomed in country again : Zoom out, change colour
function reset() {

    // updating dropdown
    dropdown.selectAll('myOptions')
                  .data(countryList)
                  .enter()
                  .append('option')
                  .text(function (k) { return k; }) 
                  .attr("value", function (k) { return k; })
                  .property("selected", function(k){ return k == 'Worldwide'; }); 


    g.selectAll(".active").classed("active", active = false)
    .style("fill", "#EBEBE0");
    g.transition().duration(750).attr("transform", "");

    svg.selectAll("circle")
            .transition()
            .attr("transform", "translate(" + zoom.translate().join(",") + ") scale(" + d3.event.scale  + ")")
            .transition()
            .attr("r", function(d){ return size(d.size)/ (10*zoom.scale()) })

    svg.selectAll("#id")
            .transition()
            .attr("transform", "translate(" + zoom.translate().join(",") + ") scale(" + zoom.scale() + ")")
            .attr("d", function(d){ console.log(path(d)); return path(d)})

    year = document.getElementById("range").innerHTML;
    add_text("Worldwide", year)
    linePlot("Worldwide")
}




function add_text(country, year){

        var textData;
        if(country == "Worldwide"){
            if(first == 1){
                attacks = 549;
                kills = 163;
            }

            else{
                var groupByYear = byYear.group()
                attackSum = groupByYear.reduceSum(function(d) { return d.attacks; })
                var attacks, kills;
                attackSum.top(Infinity).forEach(function(p, i) { 
                    // console.log(p.key + ": " + p.value)
                    if(p.key == year){
                        attacks = p.value
                    }
                }) 
                killSum = groupByYear.reduceSum(function(d) { return d.kills; })
                killSum.top(Infinity).forEach(function(p, i) { 
                    // console.log(p.key + ": " + p.value)
                    if(p.key == year){
                        kills = p.value
                    }
                })

            }
            
            textData  = [{"attacks" : attacks , "kills" : kills}]
            first = 0 
        }

        else{
            byCountry.filterExact(country);
            byYear.filter([new Date(year-1), new Date(year + 1)])
            byYear.top(Infinity).forEach(function(p, i) {
              // console.log(p.iyear + ": " + p.attacks + ": " + p.kills)
              if(p.iyear == year){
                textData  = [{"attacks" : p.attacks , "kills" : p.kills}]
              }
              
            });
            byYear.filterAll()
            byCountry.filterAll()
        }

        if(!textData){
            textData  = [{"attacks" : 0 , "kills" : 0}]
        }
        var text = textContainer.selectAll("text")
                                .data(textData)   
        text.exit().remove();

        text.enter()
            .append("text")
            .merge(text)
            .attr("x", function(d) { return 40; })
            .attr("y", function(d) { return 20; })
            .html( function (d) { 
                var x = d3.select(this).attr("x");//get the x position of the text
                var t = "<tspan x="+x+" dx="+(+x+100)+">"+d.kills+"</tspan>";
                // console.log(t)
                return d.attacks + t   })
            .attr("font-family", "sans-serif")
            .attr("font-size", "20px")
            .attr("fill", "#e74c3c");        
   
    // console.log(circleData)

}

d3.select("#timeslide").on("input", function() {
          document.getElementById("range").innerHTML = this.value;
          year = document.getElementById("range").innerHTML;
          // update(+this.value, mapContainer, projection, mouseleave, mousemove, mouseover, size);
          removeBubbles();
          addBubbles(year)
          country = d3.select("#countryButton").property("value"); 
          add_text(country, year)
          if(d3.select("#linkBox").property("checked")){
              removeLinks();
              addLinks(year);
            }
});

function addBubbles(year){

  markers = [];
  longList = [];
  latList = [];
  d3.csv("/get_csv_data_scatter/" + year, function(error, bubbledata){
    if(error) {console.error(error)}

    var count = 0.00001;
      bubbledata.forEach(function(d) {
        if(longList.indexOf(d.long) > -1 && latList.indexOf(d.lat) > -1){
           d.long = (parseInt(d.long) + count).toString()
           d.lat = (parseInt(d.lat) + count).toString()
           count = count + 0.00001;
           // console.log(count)
            
        }
        if(d.country_txt == "Iraq" && year == 2014 && d.provstate == 'Saladin'){
            console.log(d.kills)
        }
        markers.push({long : d.long , lat : d.lat, size: d.kills,
                      wounds : d.wounds, state: d.provstate, city: d.city,
                      country : d.country_txt, summary : d.summary, gname: d.gname,
                      motive: d.motive, location : d.location, attack: d.attacktype1_txt,
                       target: d.targtype1_txt, weapon: d.weaptype1_txt, gname: d.gname,
                        year : d.iyear, scite1: d.scite1, month: d.imonth, day: d.iday});
        longList.push(d.long)
        latList.push(d.lat)


      });
    // console.log(dict);
      // Size in pixel

    var Tooltip = d3.selectAll("body")
                    .append("div")
                    .attr("class", "tooltip")
                    .style("opacity", 1);
                  
    var mouseover = function(d) {
      Tooltip.style("opacity", 1);
    }
    var mousemove = function(d) {
      var offsets = document.getElementById('textbox').getBoundingClientRect();
      var top = offsets.top;
      var left = offsets.left;
      Tooltip
        .html( "Country: " + d.country + "<br>" + "Year: " + d.year + "<br>" + "Month: " + d.month  + "<br>" + "Day: " + d.day 
              +  "<br>"  +"State: " + d.state + "<br>" + "City: " + d.city 
              + "<br>" + "Location: " + d.location + "<br>" + "Longitutde: " + d.long + "<br>" + "Latitude: " + d.lat 
              + "<br>" + "#Killed: " + d.size 
              + "<br>" +"#Wounded: " + d.wounds 
              + "<br>" +"Attack type: " + d.attack
              + "<br>" +"Target type: " + d.target
              + "<br>" +"Weapon type: " + d.weapon
              + "<br>" +"Gang name: " + d.gname
              + "<br>" + "Motive: " + d.motive
              + "<br>" + "Summary: " + d.summary 
              + "<br>" + "Citation: " + d.scite1 
              )
        .style("left", (left + 10) + "px")
        .style("top", (top + 50) + "px");
      
    }
    var mouseleave = function(d) {
      Tooltip.style("opacity", 0);
    }

    svg.selectAll("circle")
        .data(markers)
        .enter()
        .append("circle")
        .attr("cx", function(d){ return projection([d.long, d.lat])[0] })
        .attr("cy", function(d){ return projection([d.long, d.lat])[1] })
        .attr("r", function(d){ return size(d.size) })
        .style("fill", "e74c3c")
        .attr("stroke", "#e74c3c")
        .attr("stroke-width", 2)
        .attr("fill-opacity", .4)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave);
  });
}

function removeBubbles(){
    var circle = svg.selectAll("circle")
                          .data(markers);
    circle.exit().remove();
}


function linePlot(country){
    // console.log(country)
    // country = "Worldwide"

    am4core.useTheme(am4themes_animated);
    var chart = am4core.create("linePlotDiv", am4charts.XYChart);
    var data = []
    if(country == "Worldwide"){

       d3.csv('/get_data_world', function(error, data_){
                if(error){console.error(error)}
                data_.forEach(function(p,i){
                    data.push({"year":p.iyear.toString(), "attacks": parseInt(p.attacks) , "deaths": parseInt(p.deaths)})
                })
            // console.log(data)
            chart.data = data
        });


    }

    else{
        var data = [];
        var prev_year = 2017;
        byCountry.filterExact(country);
        byYear.top(Infinity).forEach(function(p, i) {
          // console.log(p.iyear + ": " + p.attacks + ": " + p.kills)
            if(prev_year - parseInt(p.iyear) > 1){
                
                prev_year = prev_year -  1
                while(prev_year!=p.iyear){
                    data.push({"year":prev_year.toString(), "attacks": 0 , "deaths": 0})
                    prev_year = prev_year - 1
                }
            }

          data.push({"year":p.iyear, "attacks": parseInt(p.attacks) , "deaths": parseInt(p.kills)})
          prev_year = parseInt(p.iyear)
          
        });
        if(prev_year - 1970 != 0){
            prev_year = prev_year -  1
            while(prev_year!=1969){
                data.push({"year":prev_year.toString(), "attacks": 0 , "deaths": 0})
                prev_year = prev_year - 1
            }

        }
        data.reverse()
        byYear.filterAll()
        byCountry.filterAll()
        chart.data = data
        
    }    

    // console.log(chart.data)
    

    // Set input format for the dates
    chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";

    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    var title = chart.titles.create();
    if(country=="Worldwide"){
        title.text = "Number of Attacks and Deaths through the Years (1970-2017)";
    }
    else{
        title.text = "Number of Attacks and Deaths through the Years (1970-2017) in "+ country;
    }
    
    title.fontSize = 20;
    title.marginBottom = 10;

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
    // dateAxis.height = 0.1;

}