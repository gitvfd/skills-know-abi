function skillsChart(selector,data){

	var heightChart=height/1.25;
	var skillsData=[];
	var marginTop=20;
	var marginRight=10,
	marginLeft=10;
	    	
	data.forEach (function(d,i) {		
		if(d.subgroup==2 && d.group=="Skills")
			skillsData.push(d);
	});


    svg = d3.select(selector)
      .append('svg')
      .attr('width', width/3)
      .attr('height', heightChart);


	var y = d3.scaleBand().rangeRound([1*marginTop, heightChart]).padding(0.25),
	    x = d3.scaleLinear().rangeRound([marginLeft, width/3-marginRight]);


	var skillsData=skillsData.sort(function (a, b) {return (parseFloat(b.value) - parseFloat(a.value));})
	
	x.domain(d3.extent(skillsData, function(d) { return parseFloat(d.value); })).nice();
	y.domain(skillsData.map(function(d) { return d.name; }));

//var test=skillsData.sort(function (a, b) {return (parseFloat(b.value) - parseFloat(a.value));})
	svg.selectAll(".bar")
		.attr("class","skillsChart")
	    .data(skillsData)
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

			var xPosition = d3.event.pageX - 20;
			var yPosition = d3.event.pageY + 15;

			if (yPosition>window.innerHeight-200)
				yPosition=yPosition-100;


		     d3.select("#middleSurplusShortage")
		        .text(function(){ 
		        	if (format(d.value)>=0)
		        		return "shortage";
		        	else
		        		return "surplus"
		        });
		        
		    d3.select("#middleSkills")
		        .text("skills");


		    d3.select("#middleCat")
		        .text(d.name);


		    d3.select("#middleCountry")
		        .text(document.getElementById("dropDownButton").options[document.getElementById("dropDownButton").selectedIndex].text)

			d3.select("#middleChartTooltip")
		        .style("left", xPosition + "px")
		        .style("top", yPosition + "px") ;

			d3.select("#middleChartTooltip").classed("hidden", false);
	    })
	    .on("mouseout",function(d){
				d3.select(this)
					.attr("opacity",  1)
	            
	            //Hide the tooltip
				d3.select("#middleChartTooltip").classed("hidden", true);	            

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
			.text("Skills")

	function type(d) {
	  d.value = +d.value;
	  return d;
	}

}