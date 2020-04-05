// $.getScript("https://code.jquery.com/jquery-1.9.1.min.js", function() {
//    alert("Script loaded but not necessarily executed.");
// });

// $.post( "/postmethod", {
//       canvas_data: JSON.stringify(outputData)
//     }, function(err, req, resp){
//       window.location.href = "/results/"+resp["responseJSON"]["uuid"];  
//     });




      console.log("here")
      var chartDiv = document.getElementById("chart");
      var width = 200
      var height = 1500


      // Map and projection
      var path = d3.geoPath();
      var projection = d3.geoMercator()
                          .scale(70)
                          .center([0,20])
                          .translate([width / 4, height / 4]);

      // Data and color scale
      var data = d3.map();
      var data_attacks = d3.map();
      var data_deaths = d3.map();
      var colorScale = d3.scaleThreshold()
        <!--.domain([1, 10, 100, 300, 1000, 5000])-->
        .domain([1, 5, 10, 15, 20, 25, 30])
        .range(d3.schemeBlues[7]);

      // var markers = {};
      // var markers = d3.map();
      // markers = d3.map();
      markers = []
      // const url = 'http://localhost:5000/get_csv_data_dropdown'
      // fetch(url)
      //   .then(data_csv => {
      //     console.log(data_csv)
      //   })  

      // fetch(url)
      //   .then(function(response) {
      //     return response.text;
      //   })
      //   .then(function(resText) {
      //     console.log(resText);
      //   });

      // // fetch(url)
      // .then(function(response) {
      //   return response.ok ? response.text() : Promise.reject(response.status);
      // }).then(function(text) {
      //   return d3.csvParse(text);
      // });
        // .then(json => {
        //     console.log(json);
        //     document.getElementById("demo").innerHTML = JSON.stringify(json)
        // })

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

      // A simple promise that resolves after a given time

      tooltip = d3.select("body")
                  .append("div")
                  .style("position", "absolute")
                  .style("z-index", "10")
                  .style("visibility", "hidden")
                  .style("background", "#101820FF ")
                  .style("color", "white")
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

                tooltip.text("Country : " + d.properties.name + "   " + dropdown + " : " + d.total );
          
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




        var svg = d3.select(chartDiv).append("svg");

        // Extract the width and height that was computed by CSS.
        // var width = chartDiv.clientWidth;
        // var height = chartDiv.clientHeight;

        // Use the extracted size to set the size of an SVG element.
        
        // svg.attr("viewBox", "0 0 500 500")

          
        svg
        .attr("width", width)
        .attr("height", height);


        // var svg = d3.select("svg"),
        // width = +svg.attr("width"),
        // height = +svg.attr("height");





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
