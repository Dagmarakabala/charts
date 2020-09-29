import * as d3 from 'd3';
import $ from 'jquery';
export default function dt() {
  let data = [10, 5, 12, 15, 20, 2];
  let width = 1000;
  let scaleFactor = 20;
  let barHeight = 30;
  const graph = d3.select("#d3")
   .append("svg")
   .attr("width", width)
   .attr("height", barHeight * data.length);
  const bar = graph.selectAll("g")
   .data(data)
   .enter()
   .append("g")
   .attr("transform", function(d, i) {
      return "translate(0," + i * barHeight + ")";
   });
  bar.append("rect").attr("width", function(d) {
    return d * scaleFactor;
    })
    .attr("height", barHeight - 1);

  bar.append("text")
   .attr("x", function(d) { return (d*scaleFactor); })
   .attr("y", barHeight / 2)
   .attr("dy", ".35em")
   .text(function(d) { return d; });

  const svg = d3.select("#d32");
  let width2 = 400;
  let height2 = 400;
  let radius = Math.min(width2, height2) / 2;
        
  let g = svg.append("g")
    .attr("transform", "translate(" + width2/2 + "," + (height2/2 + 15) + ")");
  let color = d3.scaleOrdinal([ 'gray', 'green', 'brown', 'orange', 'yellow', 'red', 'purple' ]);
  let pie = d3.pie().value(function(d) { 
    return d.percent;
  });
  let path = d3.arc().outerRadius(radius - 10).innerRadius(0);
  let label = d3.arc().outerRadius(radius).innerRadius(radius - 80);   
  d3.csv("../assets/population.csv").then(function(data) { 
    let arc = g.selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");     
    arc.append("path")
      .attr("d", path)
      .attr("fill", function(d) { return color(d.data.states); });
    arc.append("text").attr("transform", function(d) { 
      return "translate(" + label.centroid(d) + ")"; 
  })
    .text(function(d) { return d.data.states;  })
  });
  svg.append("g")
    .attr("transform", "translate(" + (width2 -100) + "," + 15 + ")")
    .append("text").text("Top population states in india")
    .attr("class", "title")
}
