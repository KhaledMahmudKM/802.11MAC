//Global variables
const themeArray=["IPlastic", "Dreamweaver", "Chrome", "Clouds", "Crimson Editor", "Dawn",  "Eclipse",
  "GitHub", "Solarized Light", "TextMate", "Tomorrow", "Xcode", "Terminal", "Monokai", "Ambiance", "twilight"];

//Protocols must provide the values of this object
var protoInfo={
    protocolTitle:"Template",
    directory:"directoryname",  //sample          
    SVGFile:"svg.svg",
    notesFile:"notesmarkdownfile.md",
    curFrameFilename:'frame1.yaml' //Default frame
};
const fdDisplayEngine="../framedisplay.html?file=";
//const fdProcotolInfoFile='protocolinfo.json';
//Define Display elements
const fdDisplayInfo={
    eSVG: "svg", 
    eNotes: "notes", 
    eIFrame: "displayiframe", //This should be the name of the target iframe
    eTheme: "idAceTheme",    //
    curTheme:"iplastic"
};

window.onload = function() {

    //Load the protocol info file
    let params=new URLSearchParams(window.location.search);
    let protocol=params.get('p');
    url='/'+protocol+'/'+protocol+'.json';//+fdProcotolInfoFile;
    //console.log(url);
    fetch(url).then(function(response) {
        response.text().then(function(text) {
            protoInfo=JSON.parse(text);

//When the json file is loaded, load all the components
//Load the notes file.
            const figNotes=document.getElementById(fdDisplayInfo.eNotes);
            url='/'+protocol+'/'+protoInfo.notesFile;
            fetch(url).then(function(response) {
                response.text().then(function(text) {
                    figNotes.innerHTML=marked.parse(text);
                });
            });

//Load the SVG image            
            //var aList;
            var svgDiv=document.getElementById(fdDisplayInfo.eSVG);

            url='/'+protocol+'/'+protoInfo.SVGFile;
            fetch(url).then(function(response) {
                response.text().then(function(text) {
                    //console.log(svgDiv)
                    svgDiv.innerHTML=text;
                    const aList=svgDiv.getElementsByTagName("a");
                    console.log(aList.length)
        //Find the filename of the frame, save it an object attribute 
                    var i;
                    for (i=0; i<aList.length; i++)
                    {
                        let a=aList[i];
                        let target=a.href;
                        target=target.substring(target.lastIndexOf('/')+1);
                        a.filename=target;
                
                        a.onclick = function() {
                            protoInfo.curFrameFilename=a.filename;
                            //Create proper url for displaying the frame
                            this.href= fdDisplayEngine+ protoInfo.curFrameFilename+"&d="+protoInfo.directory+"&th="+fdDisplayInfo.curTheme;
                            
                            return true; //Set false if link is not to be followed
                        }
                    }
                });
            });             

//Load protocol frame             
            document.title=document.title+': '+protoInfo.protocolTitle;
            url=fdDisplayEngine+ protoInfo.curFrameFilename+"&d="+protoInfo.directory+"&th="+fdDisplayInfo.curTheme;
            window.open(url,  fdDisplayInfo.eIFrame);
        });
    }); 
 
//Load the Themes in the select element
    const selectEle = document.getElementById(fdDisplayInfo.eTheme);// '#idAceTheme'); 

    for (i=0; i<themeArray.length;i++)
    {
        const option = new Option(themeArray[i], String(i+1));
        selectEle.add(option, undefined);
    }

//Load the callback function for onSelect event of the select element                          
    selectEle.onchange = (event) => {
        event.preventDefault();
        // show the selected index
        var theme=(selectEle[selectEle.selectedIndex].text).toLowerCase();
        fdDisplayInfo.curTheme=theme;
        url=fdDisplayEngine+ protoInfo.curFrameFilename+"&d="+protoInfo.directory+"&th="+fdDisplayInfo.curTheme;
        window.open(url,fdDisplayInfo.eIFrame);
  };

}

