function transitionChart(){
	d3.csv("data/occup_status.csv",function(data){


		var selectedCou= document.getElementById("dropDownButton").options[document.getElementById("dropDownButton").selectedIndex].text;
		var selectedCouCode= document.getElementById("dropDownButton").options[document.getElementById("dropDownButton").selectedIndex].value;

		document.getElementById("countrySmallChartWhatIAm").innerHTML = selectedCou;
		document.getElementById("countrySmallChartWhatIBecome").innerHTML = selectedCou;

		var whatIAmOccup=document.getElementById("dropDownWhatIAm").options[document.getElementById("dropDownWhatIAm").selectedIndex].text;
		var whatIBecomeOccup=document.getElementById("dropDownWhatIBecome").options[document.getElementById("dropDownWhatIBecome").selectedIndex].text;	



		if (whatIAmOccup=="-" || whatIBecomeOccup=="-" ){

			d3.selectAll("#transitionSkillsChart")
				.selectAll("*")
				.remove();

			d3.selectAll("#transitionKnowledgeChart")
				.selectAll("*")
				.remove();

			d3.selectAll("#transitionAbilitiesChart")
				.selectAll("*")
				.remove();

				d3.selectAll("#WhatIAm").style("visibility", "hidden");
				d3.selectAll("#WhatIBecome").style("visibility", "hidden");
				d3.selectAll("#vizIntroDisplay").style("visibility", "hidden");

		}else{


			document.getElementById("WhatIAmName").innerHTML = whatIAmOccup;
			document.getElementById("WhatIBecomeName").innerHTML = whatIBecomeOccup;



			document.getElementById("occupationA").innerHTML = whatIAmOccup;
			document.getElementById("occupationB").innerHTML = whatIBecomeOccup;

			d3.selectAll("#WhatIAm").style("visibility", "visible");
			d3.selectAll("#WhatIBecome").style("visibility", "visible");
			d3.selectAll("#vizIntroDisplay").style("visibility", "visible");
			
			var whatIAmstock; var whatIBecomestock;

			data.forEach(function(d){
				if(d.Country==selectedCouCode && d.occupation==document.getElementById("dropDownWhatIAm").options[document.getElementById("dropDownWhatIAm").selectedIndex].value)
					whatIAmstock=d.status;
				if(d.Country==selectedCouCode && d.occupation==document.getElementById("dropDownWhatIBecome").options[document.getElementById("dropDownWhatIBecome").selectedIndex].value)
					whatIBecomestock=d.status;
			});
			document.getElementById("WhatIAmValue").innerHTML = whatIAmstock;
			document.getElementById("WhatIBecomeValue").innerHTML = whatIBecomestock;




			d3.selectAll("#transitionSkillsChart")
				.selectAll("*")
				.remove();

			d3.selectAll("#transitionKnowledgeChart")
				.selectAll("*")
				.remove();

			d3.selectAll("#transitionAbilitiesChart")
				.selectAll("*")
				.remove();



			var transSkillsData=[];
			var transKnowData=[];
			var transAbiData=[];

			var codeWhatIAm=document.getElementById("dropDownWhatIAm").options[document.getElementById("dropDownWhatIAm").selectedIndex].value
			var codeWhatIBecome=document.getElementById("dropDownWhatIBecome").options[document.getElementById("dropDownWhatIBecome").selectedIndex].value
			var selectedCouCode= document.getElementById("dropDownButton").options[document.getElementById("dropDownButton").selectedIndex].value;
			
			transitionData.forEach(function(d,i) {	
				if(d.country==selectedCouCode && d.dimension=="skills"){
						transSkillsData.push({
							"IAm": d[codeWhatIAm],
							"IBecome":d[codeWhatIBecome],
							"label": d.label,
							"score":d[codeWhatIBecome]-d[codeWhatIAm]
						})
				}
			});

			transitionSkillsChart('#transitionSkillsChart',transSkillsData);

			transitionData.forEach(function(d,i) {	
				if(d.country==selectedCouCode && d.dimension=="knowledge"){
						transKnowData.push({
							"IAm": d[codeWhatIAm],
							"IBecome":d[codeWhatIBecome],
							"label": d.label,
							"score":d[codeWhatIBecome]-d[codeWhatIAm]
						})
				}
			});

			transitionKnowledgeChart('#transitionKnowledgeChart',transKnowData);

			transitionData.forEach(function(d,i) {	
				if(d.country==selectedCouCode && d.dimension=="abilities"){
						transAbiData.push({
							"IAm": d[codeWhatIAm],
							"IBecome":d[codeWhatIBecome],
							"label": d.label,
							"score":d[codeWhatIBecome]-d[codeWhatIAm]
						})
				}
			});

			transitionAbilitiesChart('#transitionAbilitiesChart',transAbiData);
		}
	});
}