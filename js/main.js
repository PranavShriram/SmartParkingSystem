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
    mcprObject.addNewParkingSpace(xCoord.value, yCoord.value, pricePerSpace.value, noAvailable.value);
    console.log(mcprObject.parkingSpacesCoordinates)
    cityMap.addParkingSpaceOnMap(xCoord.value, yCoord.value);
});

//Create destination details button
var destinationDetailsButton = document.getElementById("addDestinationDetails");

//Destination Details Form members
var xDest = document.getElementById("xDest");
var yDest = document.getElementById("yDest");

destinationDetailsButton.addEventListener("click", (e) => {

    e.preventDefault();
    mcprObject.modifyUserDest(xDest.value, yDest.value);
    cityMap.addDestinationOnMap(xDest.value, yDest.value);

});

//Find Closest space button
var findClosestSpaceButton = document.getElementById("findClosestSpace");

findClosestSpaceButton.addEventListener("click", (e) => {
    e.preventDefault();
    mcprObject.calculateUtilityValues();
    var bestIndex = mcprObject.getBestSpace();
    cityMap.highlightBestSpace(mcprObject.parkingSpacesCoordinates[bestIndex][0], mcprObject.parkingSpacesCoordinates[bestIndex][1]);
})