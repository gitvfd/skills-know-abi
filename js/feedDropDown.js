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




//PREVENT PICKING THE SAME OCCUPATIONS IN BOTH DROPDOWNS
function preventDupes( select, index ) {
    var options = select.options,
        len = options.length;
    while( len-- ) {
        options[ len ].disabled = false;
    }
    select.options[ index ].disabled = true;
    if( index === select.selectedIndex ) {
        alert('You\'ve already selected the item "' + select.options[index].text + '".\n\nPlease choose another.');
        this.selectedIndex = 0;
    }
    else
      transitionChart();
}

var dropDownWhatIAm = select = document.getElementById( 'dropDownWhatIAm' );
var dropDownWhatIBecome = select = document.getElementById( 'dropDownWhatIBecome' );

dropDownWhatIAm.onchange = function() {
    preventDupes.call(this, dropDownWhatIBecome, this.selectedIndex );
    
};

dropDownWhatIBecome.onchange = function() {
    preventDupes.call(this, dropDownWhatIAm, this.selectedIndex );
};