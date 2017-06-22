	// SVG for usage bubbles
	var map= d3.select("#map")
      .append('svg')
      .attr("width", width)
      .attr("height", 2*height_usage/2); //previously 3*height_usage/2

    map.append("rect")
	    .attr("x",0)
	    .attr("y",0)
	    .attr("width",width)
	    .attr("height",2*height_usage/2)	//previously 3*height_usage/2
	    .attr("fill","none");
	    //.attr("fill","#DDE9EF")




	map.append("line")
		.attr("class","splitCountries")
		.attr("x1",4*width/5)
		.attr("y1",2.75*height_usage/4)
		.attr("x2",4*width/5)
		.attr("y2",3*height_usage/2);

	map.append("line")
		.attr("class","splitCountries")
		.attr("x1",3*width/5)
		.attr("y1",2.75*height_usage/4)
		.attr("x2",3*width/5)
		.attr("y2",3*height_usage/2);

	map.append("line")
		.attr("class","splitCountries")
		.attr("x1",3*width/5)
		.attr("y1",2.75*height_usage/4)
		.attr("x2",4*width/5)
		.attr("y2",2.75*height_usage/4);

	var projection = d3.geoOrthographic()
	            .center([0, 41])  //previously [0, 50]
	            .scale(width/2.2) //previously scale(width/1.6)
	            .translate([(width) / 4, 3*height_usage/4])
	        	.precision(.1);

	var path = d3.geoPath()
                   .projection(projection);


	var projection2 = d3.geoOrthographic()
	            .center([30, -29])  //previously [30, -22]
	            .scale(width/2.2) //previously scale(width/1.6)
	            .translate([(width) / 4, 3*height_usage/4])
	        	.precision(0.1);

	var path2 = d3.geoPath()
                   .projection(projection2);

    var europeMap=map.append("g")
    	.attr("class", "Europe")
    	.attr("id","countries")
      	.attr('width', width/2)
      	.attr('height', 3*height_usage/2);


    var SouthAfricaMap=map.append("g")
    	.attr("class", "southAfrica")
    	.attr("id","countries")
      	.attr('width', width/2)
      	.attr('height', 3*height_usage/2)
	    .attr("transform", "translate(" + width/2 + "," + 0+")");



	map.append("text")
	.attr("class","inVizText")
	.attr("x",2*width/5)
	.attr("y",1*height_usage/5)
	.text("Find out more about skills shortages and surpluses")

map.append("text")
	.attr("class","inVizText")
	.attr("x",3*width/5)
	.attr("y",1.85*height_usage/5)
	.text("by selecting a country of interest.")

    d3.json("data/Europe.json", function(error, worldData) {
                europeMap.selectAll(".Europe")
                        .data(worldData.features)
                        .enter().append("path")
                        .attr("class", function(d){ return d.properties.ISO3_CODE; })
                        .attr("d", path)
                    	.on("mouseover", function(d) {
                    		d3.select(this).style("fill","rgb(231,55,65)");

                    		var xPosition = event.pageX+10;
							var yPosition = event.pageY+10;

							var countryLabel = decodeURIComponent(d.properties.NAME_ENGL) ;

							//Update the tooltip position and value
							d3.select("#countryTooltipSetUP")
						        .style("left", xPosition + "px")
						        .style("top", yPosition + "px") 
						        .select("#countryTooltip")
						        .text(countryLabel);

							d3.select("#countryTooltipSetUP").classed("hidden", false);
						})
						.on("mouseout", function(d) {
							
							if(document.getElementById("dropDownButton").value==d.properties.ISO3_CODE)
								d3.select(this).style("fill","rgb(57,97,125)")
                    		else 
                    			d3.select(this).style("fill","#F8FAFC");


							d3.select("#countryTooltipSetUP").classed("hidden", true);
						})
						.on("click",function(d){	


                    		d3.selectAll("path").style("fill","#F8FAFC");

                    		d3.select(this).style("fill","rgb(57,97,125)");
							//viz explanations are hidden as long as you haven't clicked on a country
							//d3.select(".vizExplanation").classed("hidden", false);
							document.getElementById("dropDownButton").value = d.properties.ISO3_CODE;


							initialiseAll(d.properties.ISO3_CODE)
                    		
						});

    });

    d3.json("data/ZAF.json", function(error, worldData) {
			SouthAfricaMap.selectAll(".southAfrica")
                        .data(worldData.features)
                        .enter().append("path")
                        .attr("class", function(d){ return d.properties.ISO3_CODE; })
                        .attr("d", path2)
                        .on("mouseover", function(d) {
                    		d3.select(this).style("fill","rgb(231,55,65)");

                    		var xPosition = event.pageX+10;
							var yPosition = event.pageY+10;

							var countryLabel = decodeURIComponent(d.properties.NAME_ENGL) ;

							//Update the tooltip position and value
							d3.select("#countryTooltipSetUP")
						        .style("left", xPosition + "px")
						        .style("top", yPosition + "px") 
						        .select("#countryTooltip")
						        .text(countryLabel);

							d3.select("#countryTooltipSetUP").classed("hidden", false);
						})
						.on("mouseout", function(d) {

							if(document.getElementById("dropDownButton").value==d.properties.ISO3_CODE)
								d3.select(this).style("fill","rgb(57,97,125)")
                    		else 
                    			d3.select(this).style("fill","#F8FAFC");


							d3.select("#countryTooltipSetUP").classed("hidden", true);
						})
						.on("click",function(d){

                    		d3.selectAll("path").style("fill","#F8FAFC");

                    		d3.select(this).style("fill","rgb(57,97,125)");
							//viz explanations are hidden as long as you haven't clicked on a country
							d3.select(".vizExplanation").classed("hidden", false);
							document.getElementById("dropDownButton").value = d.properties.ISO3_CODE;
							initialiseAll(d.properties.ISO3_CODE)
						});
						

               
    });