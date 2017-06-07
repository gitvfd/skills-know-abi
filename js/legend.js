function addLegend(svg,radiusUsage,maxValue){

	var	legendMargin = {left: 5, top: 10, right: 5, bottom: 10},
		legendWidth = width,
		legendHeight = 55,
		squareMargin=width/20;
				

	var legendWrapper = svg.append("g").attr("class", "legendWrapper")
					.attr("transform", "translate(" + legendMargin.left + "," + legendMargin.top +")");


	var rectSize = 15, //dimensions of the colored square
		columnWidth = 50, //height of a row in the legend
		rowHeight = 20, //height of a row in the legend
		maxWidth = 15; //widht of each row
		  
	//Create container per rect/text pair  
	var legend = legendWrapper.selectAll('.legendSquare')  	
			  .data(colorScale.range())                              
			  .enter().append('g')   
			  .attr('class', 'legendSquare') 
			  .attr("transform", function(d,i) { return "translate(" + ( squareMargin + i * columnWidth) + "," + (height-2*legendHeight/3 )+ ")"; });


	
	//Append small squares to Legend
	legend.append('rect')                                     
		  .attr('width', rectSize) 
		  .attr('height', rectSize) 			 
		  .style('fill', function(d) {return d;});  

	//Append text to Legend
	legend.append('text')                                     
		  .attr('transform', function(d,i) { return "translate(" + 0 + "," + 4*rectSize/3 + ")"; })
		  .attr("class", "legendText")
		  .style("font-size", "10px")
		  .attr("dy", ".35em")		  
		  .text(function(d,i) { 
		  	if (i==0)
		  		return "Surplus"
		  	else if (i==(colorScale.range().length/2))
		  		return "Shortage"
			else
		  		return ""
		  	//return formatDecimalRectLegend(-1 + 2*i/5)
		  	 });  

	legendWrapper.append("text")
		.attr("class","legendTitle")
		.attr("transform", "translate(" + 50 + "," + (height - legendHeight ) +")")
		.attr("x", 0 + "px")
		.attr("y", 0 + "px")
		.attr("dy", "1em")
		.text("Scale ");



/**legendWrapper.append("line")
.attr("class","legendLine")
	.attr("x1",squareMargin + 5/4 * columnWidth)
	.attr("x2",squareMargin + 10/4 * columnWidth)
	.attr("y1",(height-2*legendHeight/3 + 4*rectSize/3 ))
	.attr("y2",(height-2*legendHeight/3 + 4*rectSize/3 ));


legendWrapper.append("line")
.attr("class","legendLine")
	.attr("x1",squareMargin + 17/4 * columnWidth)
	.attr("x2",squareMargin + 22/4 * columnWidth)
	.attr("y1",(height-2*legendHeight/3 + 4*rectSize/3 ))
	.attr("y2",(height-2*legendHeight/3 + 4*rectSize/3 ));**/



	//End color scale
	
	var bubbleSizeLegend = svg.append("g")
		.attr("transform", "translate(" + (width*2.75/10 ) + "," + (height - legendHeight )+")");
	
	//Draw the bubble size legend
	//bubbleLegend(bubbleSizeLegend, radiusUsage, legendSizes = [maxValue/4,maxValue/2,maxValue], legendName = "");		

	//////////////////////////////////////////////////////
	/////////////////// Bubble Legend ////////////////////
	//////////////////////////////////////////////////////

	function bubbleLegend(wrapperVar, scale, sizes, titleName) {

		var legendSize1 = sizes[0],
			legendSize2 = sizes[1],
			legendSize3 = sizes[2],
			legendCenter = 0,
			legendBottom = legendHeight,
			legendLineLength = 25,
			textPadding = 5,
			numFormat = d3.format(",");
		
		wrapperVar.append("text")
			.attr("class","legendTitle")
			.attr("transform", "translate(" + legendCenter + "," +  0 +")")
			.attr("x", 0 + "px")
			.attr("y", 0 + "px")
			.attr("dy", "1em")
			.text(titleName);
			
		wrapperVar.append("circle")
	        .attr('r', scale(legendSize1))
	        .attr('class',"legendCircle")
	        .attr('cx', legendCenter)
	        .attr('cy', (legendBottom-scale(legendSize1)));
	    wrapperVar.append("circle")
	        .attr('r', scale(legendSize2))
	        .attr('class',"legendCircle")
	        .attr('cx', legendCenter)
	        .attr('cy', (legendBottom-scale(legendSize2)));
	    wrapperVar.append("circle")
	        .attr('r', scale(legendSize3))
	        .attr('class',"legendCircle")
	        .attr('cx', legendCenter)
	        .attr('cy', (legendBottom-scale(legendSize3)));
			
		wrapperVar.append("line")
	        .attr('class',"legendLine")
	        .attr('x1', legendCenter)
	        .attr('y1', (legendBottom-2*scale(legendSize1)))
			.attr('x2', (legendCenter + legendLineLength))
	        .attr('y2', (legendBottom-2*scale(legendSize1)));	
		wrapperVar.append("line")
	        .attr('class',"legendLine")
	        .attr('x1', legendCenter)
	        .attr('y1', (legendBottom-2*scale(legendSize2)))
			.attr('x2', (legendCenter + legendLineLength))
	        .attr('y2', (legendBottom-2*scale(legendSize2)));
		wrapperVar.append("line")
	        .attr('class',"legendLine")
	        .attr('x1', legendCenter)
	        .attr('y1', (legendBottom-2*scale(legendSize3)))
			.attr('x2', (legendCenter + legendLineLength))
	        .attr('y2', (legendBottom-2*scale(legendSize3)));
			
		wrapperVar.append("text")
	        .attr('class',"legendText")
	        .attr('x', (legendCenter + legendLineLength + textPadding))
	        .attr('y', (legendBottom-2*scale(legendSize1)))
			.attr('dy', '0.25em')
			.text(" " + numFormat(format(legendSize1)) + " ");
		wrapperVar.append("text")
	        .attr('class',"legendText")
	        .attr('x', (legendCenter + legendLineLength + textPadding))
	        .attr('y', (legendBottom-2*scale(legendSize2)))
			.attr('dy', '0.25em')
			.text(" " + numFormat(format(legendSize2)) + " ");
		wrapperVar.append("text")
	        .attr('class',"legendText")
	        .attr('x', (legendCenter + legendLineLength + textPadding))
	        .attr('y', (legendBottom-2*scale(legendSize3)))
			.attr('dy', '0.25em')
			.text(" " + numFormat(format(legendSize3)) + " ");
			
	}//bubbleLegend
	
}
