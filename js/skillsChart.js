function skillsChart(selector,data){

	var heightChart=height/1.5;
	var skillsData=[];

	    	
	(data[0].nodes).forEach (function(d,i) {		
		if(d.subgroup==2 && d.group=="Skills")
			skillsData.push(d);
	});


    svg = d3.select(selector)
      .append('svg')
      .attr('width', width)
      .attr('height', heightChart);


	var y = d3.scaleBand().rangeRound([0, heightChart]).padding(0.1),
	    x = d3.scaleLinear().rangeRound([0, width]);

	x.domain(d3.extent(skillsData, function(d) { return parseFloat(d.value); })).nice();
	y.domain(skillsData.map(function(d) { return d.name; }));


	svg.selectAll(".bar")
	    .data(skillsData.sort(function (a, b) {return parseFloat(b.value) - parseFloat(a.value);}))
	    .enter()
	    .append("rect")
	    .attr("class", function(d) { return "bar bar--" + (parseFloat(d.value) < 0 ? "negative" : "positive"); })
	    .attr("x", function(d) { return x(Math.min(0, parseFloat(d.value))); })
	    .attr("y", function(d) { return y(d.name); })
	    .attr("width", function(d) { return Math.abs(x(parseFloat(d.value)) - x(0)); })
	    .attr("height", y.bandwidth());


	  svg.append("g")
	      .attr("class", "x axis")
	      .attr("transform", "translate(0," + heightChart + ")")
	      .call(d3.axisBottom(x));

	  var tickNegative = svg.append("g")
	      .attr("class", "y axis")
	      .attr("transform", "translate(" + x(0) + ",0)")
	      .call(d3.axisLeft(y).ticks(6));

	  tickNegative.select("line")
	      .attr("x2", 6);

	  tickNegative.select("text")
	      .attr("x", 9)
	      .style("text-anchor", "start");
	

	function type(d) {
	  d.value = +d.value;
	  return d;
	}

}