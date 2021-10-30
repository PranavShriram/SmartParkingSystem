// Multiple Criteria based Parking space Reservation algorithm
class MCPR {

    constructor(maxDist, maxPrice, userDestX, userDestY, maxSpacesProvided) {
        this.maxDist = maxDist;
        this.maxPrice = maxPrice;
        this.parkingSpacesCoordinates = [];
        this.parkingSpacesPrices = [];
        this.parkingSpacesUnoccupied = [];
        this.numberOfParkingSpaces = 0;
        this.priorities = [0.33, 0.33, 0.33];
        this.utilities = [];
        this.userDestX = userDestX;
        this.userDestY = userDestY;
        this.maxSpacesProvided = maxSpacesProvided;
    }

    modifyUserDest(userDestX, userDestY) {
        this.userDestX = userDestX;
        this.userDestY = userDestY;
    }

    modifyMaxSpacesProvided(maxSpacesProvided) {
        this.maxSpacesProvided = maxSpacesProvided;
    }

    modifyMaxDist(maxDist) {
        this.maxDist = maxDist;
    }

    modifyMaxPrice(maxPrice) {
        this.maxPrice = maxPrice;
    }

    addNewParkingSpace(x, y, pricePerSpace, noOfFreeSpaces) {
        this.numberOfParkingSpaces++;
        this.parkingSpacesCoordinates.push([x, y]);
        this.parkingSpacesPrices.push(pricePerSpace);
        this.parkingSpacesUnoccupied.push(noOfFreeSpaces);
        this.utilities.push(0);
    }

    modifyPriorites(distPriority, pricePriority) {
        this.priorities[0] = distPriority;
        this.priorities[1] = pricePriority;
        this.priorities[2] = (1 - distPriority - pricePriority);
    }

    calcEucledianDistance(xa, ya, xb, yb) {
        return Math.sqrt((xa - xb) ^ 2 + (ya - yb) ^ 2);
    }

    calculateUtilityValues() {

        for (var i = 0; i < this.numberOfParkingSpaces; i++) {
            distBetweenDestSpace = this.calcEucledianDistance(this.parkingSpacesCoordinates[i][0], this.parkingSpacesCoordinates[i][1], this.userDestX, this.userDestY);
            Z1i = (distBetweenDestSpace - this.maxDist) / (0 - this.maxDist);
            Z2i = (parkingSpacesPrices[i] - this.maxPrice) / (0 - this.maxPrice);
            Z3i = (parkingSpacesUnoccupied[i] - 1) / (this.maxSpacesProvided - 1);
            this.utilities[i] = Z1i * this.priorities[0] + Z2i * this.priorities[1] + Z3i * this.priorities[2];
        }
    }

    getBestSpace() {
        var maxUtility = 0,
            index = -1;
        for (var i = 0; i < this.numberOfParkingSpaces; i++) {
            if (this.utilities[i] > maxUtility) {
                maxUtility = this.utilities[i];
                index = i;
            }
        }
        return index;
    }
}