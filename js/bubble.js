
function bubbleChart() {



	// @v4 strength to apply to the position forces
	var forceStrength = 1;

  	var svg = null;
  	var bubbles = null;
  	var nodes = [];

	function charge(d) {
	return -Math.pow(d.radius, 2.3) * forceStrength;
	}


  	// Here we create a force layout and
  	// @v4 We create a force simulation now and
  	//  add forces to it.
	var simulation = d3.forceSimulation()
    	.velocityDecay(0.2)
		.force("link", d3.forceLink().id(function(d) { return d.id; }))
    	.force('x', d3.forceX().strength(forceStrength).x(center.x))
    	.force('y', d3.forceY().strength(forceStrength).y(center.y))
    	.force('charge', d3.forceManyBody().strength(charge))
    	.on('tick', ticked);

  	// @v4 Force starts up automatically,
  	//  which we don't want as there aren't any nodes yet.
  	simulation.stop();

	var chart = function chart(selector, rawData) {


	   // Use the max total_amount in the data as the max in the scale's domain
	    // note we have to ensure the total_amount is a number.
	    var maxAmount = d3.max(rawData[0].nodes, function(d) { return d.value; });
	    //d3.max(rawData.nodes, function (d) { return +d.nodes.value; });
	    var minAmount = d3.min(rawData[0].nodes, function (d) { return +d.value; });
	    var maxValue= d3.max([Math.abs(maxAmount),Math.abs(minAmount)])

	    // Sizes bubbles based on area.
	    // @v4: new flattened scale names.
	    var radiusScale = d3.scalePow()
	      .exponent(0.5)
	      .range([1, width/50])
	      .domain([0, maxValue]);

	    // convert raw data into nodes data
		nodes = rawData[0].nodes
		nodes.forEach(function(d) {
   			d.radius= radiusScale(Math.abs(d.value));
	   }); 
		nodes.sort(function (a, b) { return Math.abs(b.value) - Math.abs(a.value); });


	    // Create a SVG element inside the provided selector
	    // with desired size.
	    svg = d3.select(selector)
	      .append('svg')
	      .attr('width', width)
	      .attr('height', height);



		addLegend(svg,radiusScale,maxValue);

		

		rawData[0].nodes.forEach(function(d) {
			//Deleted the country links
				/**if(d.subgroup=="0"){
					linkNetwork.push({
						"source" : "country",
						"target" : d.id,
						"value" :0
					})
		  		} else **/if (d.subgroup=="1"){
					linkNetwork.push({
						"source": d.group.toLowerCase(),
						"target":d.id,
						"value":0
					})
		  		}else if (d.subgroup=="2"){
					linkNetwork.push({
						"source": d.cat,
						"target":d.id,
						"value":1
					})
				}
		})

	    bubblesLinks = svg.append("g")
  			.attr("class", "links")
			.selectAll("line")
			.data(linkNetwork)
			.enter().append("line")
  			.attr("id", function(d){return d.source;})
  			.attr("stroke-width", "1px")
  			.attr("visibility",function(d){
  				if (d.value==1)
  					return "hidden"
  				else
  					return "visible"
  			});

	    // Bind nodes data to what will become DOM elements to represent them.
	    bubbles = svg.selectAll('.bubble')
	    	.data(nodes, function (d) { return d.id; });


	    // Create new circle elements each with class `bubble`.
	    // There will be one circle.bubble for each object in the nodes array.
	    // Initially, their radius (r attribute) will be 0.
	    // @v4 Selections are immutable, so lets capture the
	    //  enter selection to apply our transtition to below.
	    var bubblesE = bubbles.enter().append('circle')
      		.filter(function(d) { return d.subgroup != -1 }) // Deleted the country node
	   		//.class('bubble', true)
	   		.attr("class",function(d){
	   			if (d.subgroup==1)
	   				return "bubble" + " "+d.cat;
	   			else
	   				return "bubble";
	   		})
	   		.attr("id",function(d){return d.cat;})
	      	.attr('r', 0)
	      	.attr('fill', function (d) { 
	      		if(d.subgroup>0){
	      			return colorScale(parseFloat(d.value));
	      		}else{
	      			return "#39617D";
	      		}
	      	})
	      	.attr('opacity',1)
		    .attr('stroke', function (d) { 
	      		if(d.subgroup<=0 ){
	      			return "#e0e0e0";
	      		}else if(d.subgroup==1){
	      			return "#006FB3";
	      		}else{
	      			return "#993484"; 
	      		}
	      	})
	      	.attr('stroke-width', 3)
	      	.attr("visibility",function(d){
	      		if(d.subgroup==2)
	      			return "hidden";
	      		else 
	      			return "visible";
	      	})
	      	.on('mouseover', showDetail)
	      	.on('mouseout', hideDetail)
	      	.on("click",hideShow);



	    // @v4 Merge the original empty selection and the enter selection
	    bubbles = bubbles.merge(bubblesE);


	    // Fancy transition to make bubbles appear, ending with the
	    // correct radius
	    bubbles.transition()
	      	.duration(1000)
	      	.attr('r', function (d) { 
	      		if(d.group=="Country" || d.group=="Ref_Abilities" || d.group=="Ref_Skills" ||d.group=="Ref_Knowledge" )
	      			return 10;
	      		else
	      			return radiusScale(Math.abs(d.value)); 
	      	});

		
		/**bubbles.enter().append("text")
      		.attr('class', 'tree')
      		.attr('y', 0)
      		.attr('x', 0)
      		.attr("transform", "rotate(-90)")
      		.attr('text-anchor', 'end')

			.text(function(d){
				if(d.subgroup==0){
					return d.name;
				}
			});**/
			
	    // Set the simulation's nodes to our newly created nodes array.
	    // @v4 Once we set the nodes, the simulation will start running automatically!
	    simulation.nodes(nodes);

			simulation.force("link")
  			.links(linkNetwork);

	    // Set initial layout to single group.
	    splitBubbles();
	};


  	/*
   	* Callback function that is called after every tick of the
   	* force simulation.
   	* Here we do the acutal repositioning of the SVG circles
   	* based on the current x and y values of their bound node data.
   	* These x and y values are modified by the force simulation.
   	*/
  	function ticked() {
		bubblesLinks
    		.attr("x1", function(d) { return d.source.x; })
    		.attr("y1", function(d) { return d.source.y; })
    		.attr("x2", function(d) { return d.target.x; })
    		.attr("y2", function(d) { return d.target.y; });

    	bubbles
      		.attr('cx', function (d) { return d.x; })
      		.attr('cy', function (d) { return d.y; });
  	}

  	/*
   	* Provides a x value for each node to be used with the split by year
   	* x force.
   	*/
  	function nodeTreePosX(d) {
    	return treeCenters[d.group].x;
  	}

  	function nodeTreePosY(d) {
    	return treeCenters[d.group].y;
  	}



 	function splitBubbles() {

    	showTreeTitles();
    	// @v4 Reset the 'x' force to draw the bubbles to their year centers
	    simulation.force('x', d3.forceX().strength(forceStrength).x(nodeTreePosX)); 
	    // @v4 Reset the 'y' force to draw the bubbles to their year centers
	    simulation.force('y', d3.forceY().strength(forceStrength).y(nodeTreePosY));

    	// @v4 We can reset the alpha value and restart the simulation
	    simulation.alpha(1).restart();


  	}

  	/*
   	* Shows Year title displays.
   	*/
  	function showTreeTitles() {
    	// Another way to do this would be to create
    	// the year texts once and then just hide them.
    	var treesData = d3.keys(treeTitleX);
    	var trees = svg.selectAll('.tree')
      		.data(treesData);

    	trees.enter().append('text')
      		.attr('class', 'treeText')
      		.attr('x', function (d) { return treeTitleX[d]; })
      		.attr('y', 87.5/100*height)
      		//.attr("transform", "rotate(-90)")
      		.attr('text-anchor', 
      			function(d,i){
      			if(i==0)
      				return 'middle';
      			else if(i==1)
      				return 'start';
      			else
      				return 'end';


      		})
      		.text(function (d) { return d; });
  	}	

  	function showDetail(d) {
  		if(d.subgroup>0){
	  		d3.select(this)
	  			//.attr("fill","#F08373")
	  			.style('opacity',0.8);

	  		var filtered_nodes=[];


	  		data_usage[0].nodes.forEach(function(k) {
	    		if (k.group === d.name) {
	        		filtered_nodes.push(k);
	    		}
			});
			var filtered_links=[];

	  		linkNetwork.forEach(function(k) {
	    		if (k.group === d.name) {
	        		filtered_links.push(k);
	    		}
			});

			if(filtered_nodes.length>0){
				showUsage(filtered_nodes,colorScale(parseFloat(d.value)));

		  		d3.select("#usageIntro")
		  			.style("visibility","visible")
	  		}
	  		

	  		if(d.subgroup>0 ){

	  			var text2Display;
	  			definitions.forEach(function(k){
					if(k.id==d.id){
						text2Display = k.def;
					}
				})
	  			/**if (text2Display!=""){
		    		var content = "<span class=\"name\">Skills: </span><span class=\"value\">" +  d.name + 
		    		"</span><br/>" + 
		    		"<span class=\"name\">Value: </span><span class=\"value\">" + format(d.value) + "</span>" + 
		    		"</span><br/>" +
		    		"<span class=\"name\">Def: </span><span class=\"value\">" + text2Display + "</span>" ;
		    		
		    		tooltip.showTooltip(content, d3.event);
	    		}else{
		    		var content = "<span class=\"name\">Skills: </span><span class=\"value\">" +  d.name + 
		    		"</span><br/>" + 
		    		"<span class=\"name\">Value: </span><span class=\"value\">" + format(d.value) + "</span>" + 
		    		"</span><br/>" ;

		    		tooltip.showTooltip(content, d3.event);

	    		}**/
				if (text2Display!=""){
		    		var content = "<span class=\"name\"></span><span class=\"value\"><b>" +  d.name + 
		    		"</b></span><br/>" + 
		    		"<span class=\"name\"></span><span class=\"value\"><i>" + text2Display + "</i></span>" ;
		    		
		    		tooltip.showTooltip(content, d3.event);
	    		}else{
		    		var content = "<span class=\"name\"></span><span class=\"value\"><b>" +  d.name + 
		    		"</b></span><br/>" ;

		    		tooltip.showTooltip(content, d3.event);

	    		}


	    	}
    	}
  	}

  	function hideDetail(d) {
  		d3.select(this)
  			/**.attr("fill",function (d) { 
	      		if(d.subgroup>0){
	      			return colorScale(parseFloat(d.value));
	      		}else{
	      			return "#39617D";
	      		}
	      	})**/
			.style('opacity',1);
		
		removeUsage();

  		d3.select("#usageIntro")
  			.style("visibility","hidden")



  		if(this.subgroup!=0){
  			tooltip.hideTooltip();
  		}
    	// reset outline
    	/**d3.select(this)
      		.attr('stroke', d3.rgb(fillColor(d.Country)).darker());

    	tooltip.hideTooltip();**/
  	}  
  

	function showUsage(data,colorNode){
		var selectedCou= document.getElementById("dropDownButton").options[document.getElementById("dropDownButton").selectedIndex].text;
		document.getElementById("countryName").innerHTML = selectedCou;
			
		var i=0;

		var usageBubbles = usageCircles.selectAll("g")
			.data(data)
			.enter()
			.append("g")
			.attr("class","usage")
			.attr("transform",function(d,i){
				i++;
				return "translate("+i*width/6 + ","+height_usage/3 + ")"
			});

			usageBubbles.append("circle")
			.attr("r",function(d){
				return (radiusUsage(parseFloat(d.value)));
			})
			.style("fill",colorNode);
			
			usageBubbles.append("text")
			.attr("class","usage")
			.attr("dy", "0.35em")
      		.attr('text-anchor', 'middle')
      		.attr('font-size',"11px")
			.attr("x",-width/50)
			.attr("y",height_usage/8)
			.text(function(d){
				return d.name;
			})
			.call(wrap,wrapWidth);

			/**usageBubbles.append("text")
			.attr("class","usage")
			.attr("dy", "0.35em")
      		.attr('text-anchor', 'middle')
      		.attr('font-size',"11px")
			.attr("x",-width/50)
			.attr("y",-height_usage/8)
			.text(function(d){
				return format(d.value);
			})
			.call(wrap,wrapWidth);**/

		
	}

	function removeUsage(){
		
		d3.select("#usage")
		.selectAll(".usage")
			.remove();
	}



  	/**chart.toggleDisplay = function (displayName) {
    	if (displayName === 'tree') {
      		splitBubbles();
    	} else {
      		groupBubbles();
    	}
  	};**/
  	//return the chart function from closure.
  	return chart;
}


/*
 * Helper function to convert a number into a string
 * and add commas to it to improve presentation.
 */
function addCommas(nStr) {
  nStr += '';
  var x = nStr.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }

  return x1 + x2;
}



function wrap(text, width) {	
	text.each(function() {
	    var text = d3.select(this),
	        words = text.text().split(/\s+/).reverse(),
	        word,
	        line = [],
	        lineNumber = 0,
	        lineHeight = 1.1, // ems
	        y = text.attr("y"),
	        dy = parseFloat(text.attr("dy")),
	        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
	    while (word = words.pop()) {
	      	line.push(word);
	      	tspan.text(line.join(" "));
	      	if (tspan.node().getComputedTextLength() > width) {
	        	line.pop();
	        	tspan.text(line.join(" "));
	        	line = [word];
	        	tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
	      	}
	    }
	});
}


