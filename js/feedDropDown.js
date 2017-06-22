function feedDropDown(){
	d3.tsv("data/occupation.csv", function(data) {
    
    
    var select = d3.select("#dropDownWhatIAm")
      .selectAll("option")
        .data(data)
        .enter().append("option")
        .attr("value", function(d) { 
          return d.code; })
        .text(function(d) { return d.Occupation; });
 

     var select = d3.select("#dropDownWhatIBecome")
      .selectAll("option")
        .data(data)
        .enter().append("option")
        .attr("value", function(d) { 
          return d.code; })
        .text(function(d) { return d.Occupation; });

    document.getElementById("dropDownWhatIBecome").value="21";
       
	})
}