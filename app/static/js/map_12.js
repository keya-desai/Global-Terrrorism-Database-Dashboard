// $.getScript("https://code.jquery.com/jquery-1.9.1.min.js", function() {
//    alert("Script loaded but not necessarily executed.");
// });

// $.post( "/postmethod", {
//       canvas_data: JSON.stringify(outputData)
//     }, function(err, req, resp){
//       window.location.href = "/results/"+resp["responseJSON"]["uuid"];  
//     });




      // console.log("here")
      var chartDiv = document.getElementById("chart");
      // console.log(chartDiv.style.width)
      // console.log(chartDiv.style.height)
      // var height = document.getElementById('chart').clientHeight
      // var width = document.getElementById('chart').clientWidth 
      // var width = 600;
      // var height = 500;

      const svg = d3.select('svg')
      const params = svg.attr('viewBox').split(' ').map((n) => parseInt(n, 10))
      const width = params[2]
      const height = params[3]
      const mapContainer = svg.append('g')


      // Map and projection

                          // .scale(100)
                          // .center([0,0])
                          // .translate([width / 2, height / 2]);

      // Data and color scale
      var data = d3.map();
      var data_attacks = d3.map();
      var data_deaths = d3.map();
      var colorScale = d3.scaleThreshold()
        .domain([1, 100, 250, 500, 750, 1000])
        // .domain([1,2000])
        .range(d3.schemeBlues[6]);


      // markers = []

      // Load external data and boot
      d3.queue()
        .defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
        .defer(d3.csv, 
          // "{{url_for('get_csv_data_dropdown')}}" 
          '/get_csv_data_dropdown', 
          function(d) { 
          data_attacks.set([d.name, d.iyear], +d.num_attacks);
          data_deaths.set([d.name, d.iyear], +d.num_deaths) ;                                         
          })

        // .defer(d3.csv, 
        // "{{url_for('get_csv_data_scatter')}}", 
        // function(d) {
        // markers.push({long : d.long , lat : d.lat})
        //  })
        .await(ready);

// background: rgba(0, 0, 0, 0.6);
//         color: #FFA500;
     
      // A simple promise that resolves after a given time

      tooltip = d3.select("body")
                  .append("div")
                  .style("position", "absolute")
                  .style("z-index", "10")
                  .style("visibility", "hidden")
                  .style("background", "rgba(0, 0, 0, 0.6)")
                  .style("color", "#FFA500")
                  .style("width", "120px")
                  .style("text-align", "center")
                  .style("border-radius", "6px")
                  .style("padding", "5px", "0")
                  .style("font-size", "12px")
                  .text("a simple tooltip");



      function ready(error, topo) {

        let mouseOver = function(d) {
                d3.selectAll(".Country")
                  .transition()
                  .duration(200)
                  .style("opacity", .5)

                d3.select(this)
                  .transition()
                  .duration(200)
                  .style("opacity", 1)
                  .style("stroke", "black")

                var dropdown = document.getElementById("selectButton").value
                if(dropdown == 'num_attacks'){
                  tooltip.html("Country: " + d.properties.name + "<br>"+ "Attacks: " + d.total);
                  // console.log("In tootltip attacks")
                }
                else{
                    tooltip.html("Country: " + d.properties.name + "<br>" + "Deaths: " + d.total);
                }

                // tooltip.text("Country : " + d.properties.name + "   " + dropdown + " : " + d.total );
          
          return tooltip.style("visibility", "visible")
        }

        let mouseLeave = function(d) {
                d3.selectAll(".Country")
                  .transition()
                  .duration(200)
                  .style("opacity", .8)
                d3.select(this)
                  .transition()
                  .duration(200)
                  .style("stroke", "transparent")

                tooltip.style("visibility", "hidden")
        }

         var path = d3.geoPath();
         var projection = d3.geoMercator()
                            .scale(100)
                            .center([0,0])
                            .translate([width / 2, height / 2]);
                         // .fitSize([width, height], data_attacks);


        // Draw the map
        svg.append("g")
            .selectAll("path")
            .data(topo.features)
            // .data(topojson.feature)
            .enter()
            .append("path")
            // draw each country
            .attr("d", d3.geoPath().projection(projection))
            // set the color of each country
            .attr("fill", function (d) {
              d.total = data_attacks.get([d.properties.name, "1970"]) || 0;
              return colorScale(d.total);
            })
            .style("stroke", "transparent")
            .attr("class", function(d){ return "Country" } )
            .style("opacity", .8)
            .on("mouseover", mouseOver )
            .on("mouseleave", mouseLeave )
            .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})


        d3.select("#timeslide").on("input", function() {
          update(+this.value);
          });

          // update the fill of each SVG of class "incident" with value
          function update(value) {

                  document.getElementById("range").innerHTML = value;

                  var dropdown = document.getElementById("selectButton").value
                  if (dropdown == "num_attacks"){
                      data = data_attacks;
                  } else {
                      data = data_deaths;
                  }
                  d3.selectAll(".Country")
                      .transition().duration(250)
                      .attr("fill", function (d) {
                          d.total = data.get([d.properties.name, value]) || 0;
                          return colorScale(d.total);
                      })

          }

          d3.select("#selectButton")
            .on("input", function() {
                  updateDropDown(this.value);
               });

          function updateDropDown(value) {

                document.getElementById("selectButton").value = value;

                if (value == "num_attacks"){
                  data = data_attacks;
                } else {
                  data = data_deaths;
                }

                var year = document.getElementById("range").innerHTML

                d3.selectAll(".Country")
                    .transition().duration(250)
                    .attr("fill", function (d) {
                        d.total = data.get([d.properties.name, year]) || 0;
                        return colorScale(d.total);
                  })
          }

          d3.select("#scatter")
            .on("input", function() {
                  updateScatter();
               });

          function updateScatter(){
            if(document.getElementById("scatter").checked == true){
              d3.selectAll("circles")
                .data(markers)
                .enter()
                .append("circle")
                .attr("cx", function(d){ return projection([d.long, d.lat])[0] })
                .attr("cy", function(d){ return projection([d.long, d.lat])[1] })
                .attr("r", 4)
                .style("fill", "69b3a2")
                .attr("stroke", "#69b3a2")
                .attr("stroke-width", 3)
                .attr("fill-opacity", .4)

            }

            else{
              d3.selectAll("circles")
                .data(markers)
                .enter()
                .append("circle")
                .attr("cx", function(d){ return 0 })
                .attr("cy", function(d){ return 1 })
                .attr("r", 0)
                
            }
          }

      }

          // redraw();
          // // Redraw based on the new size whenever the browser window is resized.
          // window.addEventListener("resize", redraw);

// $( document ).ready(readyFn);
