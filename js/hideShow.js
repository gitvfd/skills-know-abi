function hideShow(){

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