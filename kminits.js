//Global variables
const themeArray=["Chrome", "Clouds", "Crimson Editor", "Dawn", "Dreamweaver", "Eclipse",
  "GitHub", "IPlastic", "Solarized Light", "TextMate", "Tomorrow", "Xcode", "Terminal", "Monokai", "Ambiance", "twilight"];
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
//Load the Themes in the select element
    const selectEle = document.querySelector('#acetheme');  

    for (i=0; i<themeArray.length;i++)
    {
        const option = new Option(themeArray[i], String(i+1));
        selectEle.add(option, undefined);
    }
//Load the callback function for onSelect event of the select element    
    //const sb = document.querySelector('#acetheme')
                        
    selectEle.onchange = (event) => {
        event.preventDefault();
        // show the selected index
        var theme=(selectEle[selectEle.selectedIndex].text).toLowerCase();
        kmCurrentTheme="ace/theme/"+theme;
        url="framedisplay.html?file="+ kmCurrentFilename+"&th="+kmCurrentTheme+"&d="+kmCurrentDirectory;
        window.open(url,"displayiframe");
  };

}

