var mapWidth = 500;
var mapHeight = 500;

//Create canvas context
var canvas = document.getElementById('mapCanvas');
var ctx = canvas.getContext('2d');

//Create MCPR object
var mcprObject = new MCPR(1000, 200, 0, 0, 200);

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
    drawFullMap()
        // cityMap.addParkingSpaceOnMap(xCoord.value * 50, yCoord.value * 50);
});

//Create destination details button
var destinationDetailsButton = document.getElementById("addDestinationDetails");

//Destination Details Form members
var xDest = document.getElementById("xDest");
var yDest = document.getElementById("yDest");

destinationDetailsButton.addEventListener("click", (e) => {

    e.preventDefault();
    mcprObject.modifyUserDest(xDest.value * 50, yDest.value * 50);
    drawFullMap()
        // cityMap.addDestinationOnMap(xDest.value * 50, yDest.value * 50);

});

function drawFullMap() {
    ctx.clearRect(0, 0, mapWidth, mapHeight)
    cityMap.drawGridLines()
    for (var i = 0; i < mcprObject.parkingSpacesCoordinates.length; i++) {
        console.log(mcprObject.parkingSpacesCoordinates[i][0])
        cityMap.addParkingSpaceOnMap(mcprObject.parkingSpacesCoordinates[i][0], mcprObject.parkingSpacesCoordinates[i][1]);
    }
    if (!(mcprObject.userDestX == 0 && mcprObject.userDestY == 0))
        cityMap.addDestinationOnMap(mcprObject.userDestX, mcprObject.userDestY)
}

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
    e.preventDefault();
    var distPriority = parseFloat(document.getElementById("distPriority").value);
    var pricePriority = parseFloat(document.getElementById("pricePriority").value);
    var spacePriority = parseFloat(document.getElementById("spacePriority").value);

    var sum = distPriority + pricePriority + spacePriority;
    console.log(sum)
    if (distPriority + pricePriority + spacePriority != 1.0) {
        alert("Enter valide combo")
    } else {
        mcprObject.modifyPriorites(distPriority, pricePriority);
        drawFullMap()
        alert("Successfully set new priorities")
    }

})

var normalInforButton = document.getElementById("addNormalInfo");

normalInforButton.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("here")
    var maxDist = parseFloat(document.getElementById("maxDist").value);
    var maxPrice = parseFloat(document.getElementById("maxPrice").value);


    mcprObject.modifyMaxDist(maxDist);
    mcprObject.modifyMaxPrice(maxPrice);
    drawFullMap()
    console.log(mcprObject.maxDist, mcprObject.maxPrice)
    alert("Successfully set parameters")
})