var mapWidth = 500;
var mapHeight = 500;

//Create canvas context
var canvas = document.getElementById('mapCanvas');
var ctx = canvas.getContext('2d');

//Create MCPR object
var mcprObject = new MCPR(1000, 1000000, 0, 0, 200);

//Create Map object
var cityMap = new CityMap(mapWidth, mapHeight, ctx, 10);
cityMap.drawOutline();
cityMap.drawGridLines();

//Create Parking Space Button
var addNewParkingSpaceSubmitButton = document.getElementById("addParkingSpaceSubmitButton");
//Parking Space Form members
var xCoord = document.getElementById("xCoord");
var yCoord = document.getElementById("yCoord");
var pricePerSpace = document.getElementById("pricePerSpace");
var noAvailable = document.getElementById("noAvailable");

addNewParkingSpaceSubmitButton.addEventListener("click", (e) => {
    e.preventDefault();
    mcprObject.addNewParkingSpace(xCoord.value * 50, yCoord.value * 50, pricePerSpace.value, noAvailable.value);
    console.log(mcprObject.parkingSpacesCoordinates)
    cityMap.addParkingSpaceOnMap(xCoord.value * 50, yCoord.value * 50);
});

//Create destination details button
var destinationDetailsButton = document.getElementById("addDestinationDetails");

//Destination Details Form members
var xDest = document.getElementById("xDest");
var yDest = document.getElementById("yDest");

destinationDetailsButton.addEventListener("click", (e) => {

    e.preventDefault();
    mcprObject.modifyUserDest(xDest.value * 50, yDest.value * 50);
    cityMap.addDestinationOnMap(xDest.value * 50, yDest.value * 50);

});

//Find Closest space button
var findClosestSpaceButton = document.getElementById("findClosestSpace");

findClosestSpaceButton.addEventListener("click", (e) => {
    e.preventDefault();
    mcprObject.calculateUtilityValues();
    var bestIndex = mcprObject.getBestSpace();
    cityMap.highlightBestSpace(mcprObject.parkingSpacesCoordinates[bestIndex][0], mcprObject.parkingSpacesCoordinates[bestIndex][1]);
})

var adminPanel = document.getElementById("adminPanel");
var userPanel = document.getElementById("userPanel");

var adminPanelButton = document.getElementById("adminPanelButton");
var userPanelButton = document.getElementById("userPanelButton");
console.log(adminPanelButton)
adminPanelButton.addEventListener("click", (e) => {

    adminPanel.style.display = "";
    userPanel.style.display = "none";
});

userPanelButton.addEventListener("click", (e) => {
    console.log("here")
    userPanel.style.display = "";
    adminPanel.style.display = "none";
});

//For priority info

var priorityButton = document.getElementById("addPriorityInformation");

priorityButton.addEventListener("click", (e) => {
    var distPriority = parseFloat(document.getElementById("distPriority").value);
    var pricePriority = parseFloat(document.getElementById("pricePriority").value);
    var spacePriority = parseFloat(document.getElementById("spacePriority").value);

    var sum = distPriority + pricePriority + spacePriority;
    console.log(sum)
    if (distPriority + pricePriority + spacePriority != 1.0) {
        alert("Enter valide combo")
    } else {
        mcprObject.modifyPriorites(distPriority, pricePriority);
    }

})