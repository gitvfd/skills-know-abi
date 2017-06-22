function transitionKnowledgeChart(selector,data){

	var heightChart=height/1.15;
	var marginTop=20;
	var marginRight=10,
	marginLeft=10;
	    	



    svg = d3.select(selector)
      .append('svg')
      .attr('width', width/3)
      .attr('height', heightChart);


	var y = d3.scaleBand().rangeRound([1*marginTop, heightChart]).padding(0.25),
	    x = d3.scaleLinear().rangeRound([marginLeft, width/3-marginRight]);


	var transKnowledgeData=data.sort(function (a, b) {return (parseFloat(b.score) - parseFloat(a.score));})
	
	x.domain(d3.extent(transKnowledgeData, function(d) { return parseFloat(d.score); })).nice();
	y.domain(transKnowledgeData.map(function(d) { return d.label; }));

	svg.selectAll(".bar")
		.attr("class","transitionKnowledgeChart")
	    .data(transKnowledgeData)
	    .enter()
	    .append("rect")
	    .attr("class", function(d) { return "bar bar--" + (parseFloat(d.score) < 0 ? "negative" : "positive"); })
	    .attr("x", function(d) { return x(Math.min(0, parseFloat(d.score))); })
	    .attr("y", function(d) { return y(d.label); })
	    .attr("width", function(d) { return Math.abs(x(parseFloat(d.score)) - x(0)); })
	    .attr("height", y.bandwidth())
	    .on("mouseover",function(d){
	    	d3.select(this)
				.attr("opacity",0.5);

			var xPosition = event.pageX-20;
			var yPosition = event.pageY+15;

			if (yPosition>window.innerHeight-200)
				yPosition=yPosition-100;

		     d3.select("#chartBarValue")
		        .text(function(){ return d.label;});

		    if(format(d.score)>0){
		     	d3.select("#chartBarName")
		        	.text("You don't have enough knowledge in");
		    }	else if(format(d.score)<0){
		     	d3.select("#chartBarName")
		        	.text("You already have enough knowledge in");
		    }	else {
		     	d3.select("#chartBarName")
		        	.text("You already have the right level of knowledge in");
		    }

			d3.select("#chartTooltip")
		        .style("left", xPosition + "px")
		        .style("top", yPosition + "px") ;

			d3.select("#chartTooltip").classed("hidden", false);
	    })
	    .on("mouseout",function(d){
				d3.select(this)
					.attr("opacity",  1)
	            
	            //Hide the tooltip
				d3.select("#chartTooltip").classed("hidden", true);	            

		});


/**	  svg.append("g")
	      .attr("class", "x axis")
	      .attr("transform", "translate(0," + heightChart + ")")
	      .call(d3.axisBottom(x));
**/
	
	svg.append("text")
			.attr("class","transitionKnowledgeChart")
			.attr("dy", "0.35em")
      		.attr('text-anchor', 'middle')
      		.attr('font-size',"11px")
			.attr("x",width/6)
			.attr("y",10)
			.text("Knowledge")

	function type(d) {
	  d.value = +d.value;
	  return d;
	}


	
}