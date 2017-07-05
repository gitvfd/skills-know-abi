function hideShow(){
	
		d3.selectAll(".temporary")
		.remove();


		d3.selectAll("circle")
			.attr("visibility",function(d){
	      		if(d.subgroup==2)
	      			return "hidden";
	      		else 
	      			return "visible";
	      	});


		d3.selectAll(".canDisappear")
  			.attr("visibility",  "hidden");


	var toDisplay = "#"+this.id;

	d3.selectAll(toDisplay)
		   .attr("visibility",function(d){
		   	if(d.subgroup != 1 || d.value==1){
		   		if(d.visible !="yes"){
		   			d.visible="yes";
		   			return "visible";
		   		}
		   		else {

		   			d.visible="no";
		   			return "hidden";
		   		}
		   		
		   	}	
		});

}