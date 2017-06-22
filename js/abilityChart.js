function abilitiesChart(selector,data){

	var heightChart=height/1.25;
	var abilitiesData=[];
	var marginTop=20;
	var marginRight=10,
	marginLeft=10;
	    	
	(data[0].nodes).forEach (function(d,i) {		
		if(d.subgroup==2 && d.group=="Abilities")
			abilitiesData.push(d);
	});


    svg = d3.select(selector)
      .append('svg')
      .attr('width', width/3)
      .attr('height', heightChart);


	var y = d3.scaleBand().rangeRound([1*marginTop, heightChart]).padding(0.25),
	    x = d3.scaleLinear().rangeRound([marginLeft, width/3-marginRight]);


	var abilitiesData=abilitiesData.sort(function (a, b) {return (parseFloat(b.value) - parseFloat(a.value));})

	x.domain(d3.extent(abilitiesData, function(d) { return parseFloat(d.value); })).nice();
	y.domain(abilitiesData.map(function(d) { return d.name; }));

//var test=abilitiesData.sort(function (a, b) {return (parseFloat(b.value) - parseFloat(a.value));})
	svg.selectAll(".bar")
		.attr("class","abilitiesChart")
	    .data(abilitiesData)
	    .enter()
	    .append("rect")
	    .attr("class", function(d) { return "bar bar--" + (parseFloat(d.value) < 0 ? "negative" : "positive"); })
	    .attr("x", function(d) { return x(Math.min(0, parseFloat(d.value))); })
	    .attr("y", function(d) { return y(d.name); })
	    .attr("width", function(d) { return Math.abs(x(parseFloat(d.value)) - x(0)); })
	    .attr("height", y.bandwidth())
	    .on("mouseover",function(d){
	    	d3.select(this)
				.attr("opacity",0.5);

			var xPosition = event.pageX-20;
			var yPosition = event.pageY+15;

			if (yPosition>window.innerHeight-50)
				yPosition=yPosition-100;

		     d3.select("#chartBarName")
		        .text(function(){ return d.name;});



		     d3.select("#chartBarValue")
		        .text(function(){ return format(d.value);});
			d3.select("#chartTooltip")
		        .style("left", xPosition + "px")
		        .style("top", yPosition + "px") 
		        .select("#countryTooltip")
		        .text(d.Country);

			d3.select("#chartTooltip").classed("hidden", false);
	    })
	    .on("mouseout",function(d){
				d3.select(this)
					.attr("opacity",  1)
	            
	            //Hide the tooltip
				d3.select("#chartTooltip").classed("hidden", true);	            

		});


	  svg.append("g")
	      .attr("class", "x axis")
	      .attr("transform", "translate(0," + heightChart + ")")
	      .call(d3.axisBottom(x));

	
	svg.append("text")
			.attr("class","skillsChart")
			.attr("dy", "0.35em")
      		.attr('text-anchor', 'middle')
      		.attr('font-size',"11px")
			.attr("x",width/6)
			.attr("y",10)
			.text("Abilities")

	function type(d) {
	  d.value = +d.value;
	  return d;
	}

}