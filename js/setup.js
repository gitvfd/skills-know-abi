
	var format = d3.format(",.3f");
	var formatDecimalRectLegend = d3.format(".1f");
    var margin = 20,
    
    width = document.getElementById("viz").offsetWidth,
    /**height=  3*window.innerHeight/4;
    height_usage=  1*window.innerHeight/4;**/
    height= 430;
    height_usage= 150;
    height_legend=  75;

	var wrapWidth = width/7;
    
    var tooltip = floatingTooltip('tooltip', 240);
	
	// SVG for usage bubbles
	var usageCircles= d3.select("#usage")
      .append('svg')
      .attr('width', width)
      .attr('height', height_usage)
      .style('background-color','#d8e9e5') //lighter background color
      //.style('background-color','#F8FAFC');


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
	    "Skills": { x: 1* width / 4 , y: height / 2 },
	    "Knowledge": { x: 3 * width / 6 , y: height / 2 },
	    "Abilities": { x: 3 * width / 4, y: height / 2 },
	    "Ref_Skills": { x: 1 * width / 4, y: 3* height / 4 },
	    "Ref_Knowledge": { x:  width / 2, y: 3* height / 4 },
	    "Ref_Abilities": { x: 3 * width / 4, y: 3* height / 4 }
	};


  // X locations of the year titles.
  	var treeTitleX = {
    	"Skills": 1*width/4,
    	"Knowledge": 2*width / 5,
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


var transitionData=[];
		d3.tsv('data/transition_data.csv', function(data){ 
			data.forEach (function(d,i) {	
					transitionData.push(d);
			});
		});



var hiddenData=[];
		d3.tsv('data/dataHiddenCharts.tsv', function(data){ 
			data.forEach (function(d,i) {	
					hiddenData.push(d);
			});
		});


function initialiseAll(isoCode) {
	//reset svgs and data
	d3.selectAll("#viz")
		.selectAll("*")
		.remove();


	d3.selectAll("#skillsChart")
		.selectAll("*")
		.remove();

	d3.selectAll("#knowledgeChart")
		.selectAll("*")
		.remove();

	d3.selectAll("#abilitiesChart")
		.selectAll("*")
		.remove();

	d3.selectAll("#transitionSkillsChart")
		.selectAll("*")
		.remove();

	d3.selectAll("#transitionKnowledgeChart")
		.selectAll("*")
		.remove();

	d3.selectAll("#transitionAbilitiesChart")
		.selectAll("*")
		.remove();


  		d3.select("#usageIntro")
  			.style("visibility","hidden");
  			


		d3.select("#usage")
		.selectAll(".usage")
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


		  	d3.select("#smallChartIntro").style("visibility","hidden")
		  	d3.select("#transitionChart").style("visibility","hidden")
		  	d3.select("#hideShowToggle").style("visibility","hidden")
			d3.select("#map").selectAll("path").style("fill","#F8FAFC");
			document.getElementById("dropDownButton").value = "PIC";

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

			var data2Hide=[];	    	
			
			hiddenData.forEach (function(d,i) {		
				if(d.country==isoCode)
					data2Hide.push(d);
			});


		  	skillsChart('#skillsChart', data2Hide)
		  	knowledgeChart('#knowledgeChart', data2Hide)
		  	abilitiesChart('#abilitiesChart', data2Hide)
		  	transitionChart();

		  	var selectedCou= document.getElementById("dropDownButton").options[document.getElementById("dropDownButton").selectedIndex].text;
			document.getElementById("countrySmallChart").innerHTML = selectedCou;	
			document.getElementById("countryNameSel").innerHTML = selectedCou;	
		  	d3.select("#smallChartIntro").style("visibility","visible")
		  	d3.select("#transitionChart").style("visibility","visible")
		  	d3.select("#hideShowToggle").style("visibility","visible")
		});


		d3.json('data/data_occupation.json', function(usage){ 
			usage.forEach (function(d,i) {		
				if(d.country==isoCode)
					data_usage.push(d.data);
			});
		});

        
		d3.select("#map").selectAll("path").style("fill","#F8FAFC");
		classCountry="."+isoCode
		d3.select(classCountry).style("fill","rgb(57,97,125)")

	}

}

//start it all
initialiseAll("PIC");
feedDropDown();
