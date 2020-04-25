
countryList = ["Worldwide", "Afghanistan", "Angola", "Albania", "United Arab Emirates", "Argentina", "Armenia", "Antarctica", "French Southern and Antarctic Lands", "Australia", "Austria", "Azerbaijan", "Burundi", "Belgium", "Benin", "Burkina Faso", "Bangladesh", "Bulgaria", "The Bahamas", "Bosnia and Herzegovina", "Belarus", "Belize", "Bolivia", "Brazil", "Brunei", "Bhutan", "Botswana", "Central African Republic", "Canada", "Switzerland", "Chile", "China", "Ivory Coast", "Cameroon", "Democratic Republic of the Congo", "Republic of the Congo", "Colombia", "Costa Rica", "Cuba", "Northern Cyprus", "Cyprus", "Czech Republic", "Germany", "Djibouti", "Denmark", "Dominican Republic", "Algeria", "Ecuador", "Egypt", "Eritrea", "Spain", "Estonia", "Ethiopia", "Finland", "Fiji", "Falkland Islands", "France", "Gabon", "England", "Georgia", "Ghana", "Guinea", "Gambia", "Guinea Bissau", "Equatorial Guinea", "Greece", "Greenland", "Guatemala", "Guyana", "Honduras", "Croatia", "Haiti", "Hungary", "Indonesia", "India", "Ireland", "Iran", "Iraq", "Iceland", "Israel", "Italy", "Jamaica", "Jordan", "Japan", "Kazakhstan", "Kenya", "Kyrgyzstan", "Cambodia", "South Korea", "Kosovo", "Kuwait", "Laos", "Lebanon", "Liberia", "Libya", "Sri Lanka", "Lesotho", "Lithuania", "Luxembourg", "Latvia", "Morocco", "Moldova", "Madagascar", "Mexico", "Macedonia", "Mali", "Myanmar", "Montenegro", "Mongolia", "Mozambique", "Mauritania", "Malawi", "Malaysia", "Namibia", "New Caledonia", "Niger", "Nigeria", "Nicaragua", "Netherlands", "Norway", "Nepal", "New Zealand", "Oman", "Pakistan", "Panama", "Peru", "Philippines", "Papua New Guinea", "Poland", "Puerto Rico", "North Korea", "Portugal", "Paraguay", "Qatar", "Romania", "Russia", "Rwanda", "Western Sahara", "Saudi Arabia", "Sudan", "South Sudan", "Senegal", "Solomon Islands", "Sierra Leone", "El Salvador", "Somaliland", "Somalia", "Republic of Serbia", "Suriname", "Slovakia", "Slovenia", "Sweden", "Swaziland", "Syria", "Chad", "Togo", "Thailand", "Tajikistan", "Turkmenistan", "East Timor", "Trinidad and Tobago", "Tunisia", "Turkey", "Taiwan", "United Republic of Tanzania", "Uganda", "Ukraine", "Uruguay", "USA", "Uzbekistan", "Venezuela", "Vietnam", "Vanuatu", "West Bank", "Yemen", "South Africa", "Zambia", "Zimbabwe"]

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
    linePlot(country)
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
        .attr("height", height);

var path = d3.geo.path()
        .projection(projection);

var g = svg.append("g");

var textContainer = d3.select("#text_info")
                        .append("svg")
                        .attr("width", 200)
                        .attr("height", 50);

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
              
        var circleData = [
                       { "cx": 20, "cy": 20, "radius": 20, "color" : "green" }];


        var text = textContainer.selectAll("text")
                                .data(circleData)
                                

        text.enter()
            .append("text")
            .attr("x", function(d) { return 20; })
            .attr("y", function(d) { return 20; })
            // .text( function (d) { return "( " + d.cx + ", " + d.cy +" )"; })
            .attr("font-family", "sans-serif")
            .attr("font-size", "20px")
            .attr("fill", "red");

        // reset()


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

    
    addBubbles(svg, projection);
    linePlot("Worldwide")
});


var zoom = d3.behavior.zoom()
        .scaleExtent([1, 8])
        .on("zoom", function () {
            g.attr("transform", "translate(" + d3.event.translate.join(",") + ") scale(" + d3.event.scale + ")");
            g.selectAll("path")
                .attr("d", path.projection(projection));
            
            svg.selectAll("circle")
                    .attr("transform", "translate(" + d3.event.translate.join(",") + ") scale(" + d3.event.scale + ")")
                    .transition()
                    .attr("r", 5 / d3.event.scale);
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
            .attr("r", 5 / zoom.scale());

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
            .attr("r", 5 / zoom.scale());
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
            .transition()
            .attr("r", 5 / zoom.scale());
    d3.select("#map-zoomer").node().value = zoom.scale();

    year = document.getElementById("range").innerHTML;
    update_text("Worldwide", year)
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
            .attr("r", 5 / zoom.scale());
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
        update_text(d.properties.name, year)
        
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
            .attr("r", 5 / zoom.scale());

    year = document.getElementById("range").innerHTML;
    update_text("Worldwide", year)
    linePlot("Worldwide")
}

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

function update_text(country, year){

        var textData;
        if(country == "Worldwide"){
            // console.log("in world")
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
            textData  = [{"attacks" : attacks , "kills" : kills}]

          
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
            .html( function (d) { 
                var x = d3.select(this).attr("x");//get the x position of the text
                var t = "<tspan x="+x+" dx="+(+x+50)+">"+d.kills+"</tspan>";
                // console.log(t)
                return d.attacks + t   })
            .attr("font-family", "sans-serif")
            .attr("font-size", "20px")
            .attr("fill", "red");        
   
    // console.log(circleData)

}



function addBubbles(mapContainer, projection){

  markers = [];
  d3.csv("/get_csv_data_scatter/1970", function(error, bubbledata){
    if(error) {console.error(error)}

      bubbledata.forEach(function(d) {
        markers.push({long : d.long , lat : d.lat, size: d.kills,
                      wounds : d.wounds, state: d.provstate, city: d.city,
                      country : d.country_txt, summary : d.summary, gname: d.gname,
                      motive: d.motive, location : d.location, attack: d.attacktype1_txt,
                       target: d.targtype1_txt, weapon: d.weaptype1_txt, gname: d.gname,
                        year : d.iyear});
        // markers.push({long : d.long , lat : d.lat, size: d.kills})
      });

    
    // console.log(markers)

    var size = d3.scaleLinear()
      .domain([0, 50])  // What's in the data
      .range([ 2, 25])  // Size in pixel


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
        .html("Year: " + d.year +  "<br>" + "Country: " + d.country + "<br>" +"State: " + d.state + "<br>" + "City: " + d.city 
              + "<br>" + "Location: " + d.location + "<br>" + "long: " + d.long + "<br>" + "lat: " + d.lat 
              + "<br>" + "Killed: " + d.size 
              + "<br>" +"Wounded: " + d.wounds 
              + "<br>" +"Attack type: " + d.attack
              + "<br>" +"Target type: " + d.target
              + "<br>" +"Weapon: " + d.weapon
              + "<br>" +"Gang name: " + d.gname
              + "<br>" + "Summary: " + d.summary 
              + "<br>" + "Motive: " + d.motive)
        .style("left", (left + 10) + "px")
        .style("top", (top + 70) + "px");
        // .style("left", (d3.mouse(this)[0]-20) + "px")
        // .style("top", (d3.mouse(this)[1] -20) + "px")
      // console.log("In mousemove");
      
    }
    var mouseleave = function(d) {
      Tooltip.style("opacity", 0);
    }

    mapContainer
        .selectAll("circle")
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

    d3.select("#timeslide").on("input", function() {
          update(+this.value, mapContainer, projection, mouseleave, mousemove, mouseover, size);
          year = document.getElementById("range").innerHTML;
          country = d3.select("#countryButton").property("value"); 
          update_text(country, year)
          });

      
  });
}

function update(value, mapContainer, projection, mouseleave, mousemove, mouseover, size){

      
      document.getElementById("range").innerHTML = value;

      markers = []

      d3.csv("/get_csv_data_scatter/" + value, function(error, bubbledata){
        if(error) {console.error(error)}

        bubbledata.forEach(function(d) {
            markers.push({long : d.long , lat : d.lat, size: d.kills,
                          wounds : d.wounds, state: d.provstate, city: d.city,
                          country : d.country_txt, summary : d.summary, gname: d.gname,
                          motive: d.motive, location : d.location, attack: d.attacktype1_txt,
                           target: d.targtype1_txt, weapon: d.weaptype1_txt, gname: d.gname, year: d.iyear});
          })
        // console.log(markers);

        var circle = mapContainer.selectAll("circle")
                          .data(markers);

        circle.exit().remove();
        circle.enter().append("circle")
              .attr("r", function(d){ return size(d.size) })
              .merge(circle)
              .attr("cx", function(d){ return projection([d.long, d.lat])[0] })
              .attr("cy", function(d){ return projection([d.long, d.lat])[1] })   
              .style("fill", "e74c3c")
              .attr("stroke", "#e74c3c")
              .attr("stroke-width", 3)
              .attr("fill-opacity", .4)
              .on("mouseover", mouseover)
              .on("mousemove", mousemove)
              .on("mouseleave", mouseleave);


      })
      

}


function linePlot(country){
    console.log(country)
    // country = "Worldwide"

    am4core.useTheme(am4themes_animated);
    var chart = am4core.create("linePlotDiv", am4charts.XYChart);
    var data = [];
    if(country == "Worldwide"){
            data = [
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

              
    }

    else{
        byCountry.filterExact(country);
        var prev_year = 2017;
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
    }

    
    console.log(data)

    // Add data
    chart.data = data

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

}