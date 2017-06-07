
	var format = d3.format(",.3f");
	var formatDecimalRectLegend = d3.format(".1f");
    var margin = 20,
    
    width = document.getElementById("viz").offsetWidth,
    /**height=  3*window.innerHeight/4;
    height_usage=  1*window.innerHeight/4;**/
    height= 430;
    height_usage= 150;
    height_legend=  75;

	var wrapWidth = width/10;
    
    var tooltip = floatingTooltip('tooltip', 240);
	
	// SVG for usage bubbles
	var usageCircles= d3.select("#usage")
      .append('svg')
      .attr('width', width)
      .attr('height', height_usage);


    //scale radius usage dots !!! Used only for usage data. For the main viz we use radiusScale define in bubble.js
	var radiusUsage = d3.scalePow()
	    .exponent(0.5)
	    .range([0, width/50])
	    .domain([0, 1]);

    //scale radius usage dots
	var colorScale = d3.scaleQuantize()
	    //.range(["#5AB9D2","#7FABD5","#A29BCC","#BE8BBA","#CF7DA0","#D57383"])
	    .range(["#537C98","#4AB891"])
	    .domain([-1, 1]);

	var center = { x: width / 2, y: height / 2 };

	// Location of the tree's branches centres
	var treeCenters = {

	    "Country": { x: 1* width / 2 , y: 9*height / 10 },
	    "Skills": { x: 1* width / 6 , y: height / 3 },
	    "Knowledge": { x: 3 * width / 6 , y: height / 4 },
	    "Abilities": { x: 5 * width / 6, y: height / 2 },
	    "Ref_Skills": { x: 1 * width / 3, y: 3* height / 4 },
	    "Ref_Knowledge": { x:  width / 2, y: 3* height / 4 },
	    "Ref_Abilities": { x: 2 * width / 3, y: 3* height / 4 }
	};


  // X locations of the year titles.
  	var treeTitleX = {
    	"Skills": 1*width/4,
    	"Knowledge": width / 2,
    	"Abilities": 3 * width / 4
  	};


//viz explanations are hidden as long as you haven't clicked on a country
d3.select(".vizExplanation").classed("hidden", true);

var data_usage;
var linkNetwork;


//Load the definition
var definitions=[];

d3.json('data/definition.json', function(data){ 
	data.forEach(function(d){
			definitions.push(d)
		})
})	



function initialiseAll(isoCode) {
	//reset svgs and data
	d3.selectAll("#viz")
		.selectAll("*")
		.remove();

	d3.selectAll("#legend")
		.selectAll("g")
		.remove();

	linkNetwork=[];
	data_usage=[];	
	//Initialisation

	var myTreeChart = bubbleChart();

 
	if(isoCode=="PIC"){
		d3.select("#viz")
	      .append('svg')
	      .attr('width', 900)
	      .attr('height', 430)
		.append("svg:image")
		   .attr('x',0)
		   .attr('y',0)
		   .attr('width', 900)
		   .attr('height', 430)
		      .attr("xlink:href", "pics/intro.jpg");

	}else{
		// Load the data.
		d3.json('data/data.json', function(error,data){
			if (error) {
		    	console.log(error);
		  	}
		  	var data2Use=[];

	    	
			data.forEach (function(d,i) {		
				if(d.country==isoCode)
					data2Use.push(d.data);
			});

		  	myTreeChart('#viz', data2Use);
		  	//skillsChart('#skillsChart', data2Use)
		});


		d3.json('data/data_usage.json', function(usage){ 
			usage.forEach (function(d,i) {		
				if(d.country==isoCode)
					data_usage.push(d.data);
			});
		

        
		d3.select("#map").selectAll("path").style("fill","#F8FAFC");
		classCountry="."+isoCode
		d3.select(classCountry).style("fill","rgb(57,97,125)")
		});
	}

}

//start it all
initialiseAll("PIC");
