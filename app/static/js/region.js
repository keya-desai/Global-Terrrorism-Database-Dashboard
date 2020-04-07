


// load the data, find the svg container in the dom,
// and call createMap
d3.json('/static/json/asia.json', function(error, data){
  const svg = d3.select('svg')
  createMap(svg, data)
  // console.log(data)

});

// put all logic in a nice reusable function
function createMap(svg, data) {
  // use viewBox attributes instead of width + height
  const params = svg.attr('viewBox').split(' ').map((n) => parseInt(n, 10))
  const width = params[2]
  const height = params[3]
  const mapContainer = svg.append('g')

  const projection = d3.geoMercator()
   // d3's 'fitSize' magically sizes and positions the map for you
    .fitSize([width, height], data);

  // this is the function that generates position data from the projection
  const path = d3.geoPath()
    .projection(projection);

  // append country outlines
  const countries = mapContainer.selectAll('.country')
    .data(data.features)
    .enter()
    .append('path')
    .attr('class', 'country')
    .attr('d', path)
    

// append labels
  mapContainer
  .selectAll('.label')
  .data(data.features)
  .enter()
  .append('text')
  .attr('class', 'label')
  .text((d)=> d.properties.admin)

  // zoom and pan
  d3.behavior.zoom()
    .on("zoom",function() {
        g.attr("transform","translate("+ 
            d3.event.translate.join(",")+")scale("+d3.event.scale+")");
        g.selectAll("path")  
            .attr("d", path.projection(projection)); 
      });

  // svg.call(zoom)

  // .attr('transform', (d)=> {
  //   const centroid = path.centroid(d)
  //   return `translate(${centroid[0]}, ${centroid[1]})`
  // })


  // markers = []

  // d3.queue()
  //   .defer(d3.csv, "/get_csv_data_scatter ", function(d){
  //     markers.push({long : d.long , lat : d.lat, size : d.kills});
  //   })
  //   .await()

  addBubbles(mapContainer, projection);
   
}



function addBubbles(mapContainer, projection){
  // console.log(markers);

  // var color = #F08080
  markers = [];
  d3.csv("/get_csv_data_scatter ", function(error, bubbledata){
    if(error) {console.error(error)}

      bubbledata.forEach(function(d) {
        markers.push({long : d.long , lat : d.lat, size: d.kills});
      });
    
    // console.log("hi there");
    console.log(markers)

    var size = d3.scaleLinear()
      .domain([1,200])  // What's in the data
      .range([ 1, 3])  // Size in pixel


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
      console.log(top)
      console.log(left)
      Tooltip
        .html("long: " + d.long + "<br>" + "lat: " + d.lat + "<br>" + "killed: " + d.size )
        .style("left", (left + 5) + "px")
        .style("top", (top + 5) + "px");
        // .style("left", (d3.mouse(this)[0]-20) + "px")
        // .style("top", (d3.mouse(this)[1] -20) + "px")
      console.log("In mousemove");
      
    }
    var mouseleave = function(d) {
      Tooltip.style("opacity", 0);
    }

    mapContainer
        .selectAll("myCircles")
        .data(markers)
        .enter()
        .append("circle")
        .attr("cx", function(d){ return projection([d.long, d.lat])[0] })
        .attr("cy", function(d){ return projection([d.long, d.lat])[1] })
        .attr("r", function(d){ return size(d.size) })
        .style("fill", "69b3a2")
        .attr("stroke", "#69b3a2")
        .attr("stroke-width", 3)
        .attr("fill-opacity", .4)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave);
      
  });









}
// });