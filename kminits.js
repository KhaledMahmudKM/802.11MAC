//Global variables
var kmCurrentTheme="terminal";
var kmCurrentFilename="";
var kmCurrentDirectory="";
var kmSVGFile="";

window.onload = function() {
    var aList;
    var svgDiv=document.getElementById("sgvdiv");
//Load the SVG image
    fetch(kmCurrentDirectory+'/'+kmSVGFile).then(function(response) {
        response.text().then(function(text) {
            svgDiv.innerHTML=text;
            aList=svgDiv.getElementsByTagName("a");

//Find the filename of the frame, save it an object attribute 
            var i;
            for (i=0; i<aList.length-1; i++)
            {
                let a=aList[i];
                let target=a.href;
                target=target.substring(target.lastIndexOf('/')+1);
                a.filename=target;
        
                a.onclick = function() {
                    kmCurrentFilename=a.filename;
                    //Create proper url for displaying the frame
                    this.href= "framedisplay.html?file="+ kmCurrentFilename+"&th="+kmCurrentTheme+"&d="+kmCurrentDirectory;
                    
                    return true; //Set false if link is not to be followed
                }
            }
        });
    });  

    


}

