class CityMap {
    constructor(mapWidth, mapHeight, ctx, numberOfGridLines) {
        this.mapHeight = mapHeight;
        this.mapWidth = mapWidth;
        this.ctx = ctx;
        this.numberOfGridLines = numberOfGridLines;
    }

    drawOutline() {
        ctx.rect(0, 0, mapWidth, mapHeight);
        ctx.stroke();
    }

    drawGridLines() {
        var numY = this.mapHeight / this.numberOfGridLines;
        var numX = this.mapWidth / this.numberOfGridLines;

        //Draw lines from left to right
        for (var i = 0; i < this.numberOfGridLines; i++) {
            ctx.moveTo(0, i * numY);
            ctx.lineTo(this.mapWidth, i * numY);
            this.ctx.stroke();
        }

        //Draw lines from top to bottom
        for (var i = 0; i < this.numberOfGridLines; i++) {
            ctx.moveTo(i * numX, 0);
            ctx.lineTo(i * numX, mapHeight);
            this.ctx.stroke();
        }
    }

    addParkingSpaceOnMap(x, y) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, 10, 0, 2 * Math.PI);
        this.ctx.fillStyle = "red";
        this.ctx.fill();
    }

    addDestinationOnMap(x, y) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, 10, 0, 2 * Math.PI);
        this.ctx.fillStyle = "blue";
        this.ctx.fill();
    }

    highlightBestSpace(x, y) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, 10, 0, 2 * Math.PI);
        this.ctx.fillStyle = "green";
        this.ctx.fill();
    }
}