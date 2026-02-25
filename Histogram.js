class Histogram {
  constructor(_data, _posX, _posY, _chartWidth, _chartHeight) {
    this.data = _data;
    this.cleanedData = [];
    this.platforms = [];
    this.platformSales = [];
    this.posX = _posX;
    this.posY = _posY;
    this.chartWidth = _chartWidth;
    this.chartHeight = _chartHeight;

    this.axisThickness = 2;
    this.barColour = "#00beff";
    this.axisColour = "#000000";
    this.labelColour = "#000000";
  }

  render() {
    this.cleanData();
    this.drawAxis();
    this.drawBars();
    this.drawLabels();
  }

  cleanData() {
    let salesMap = {};
    for (let i = 0; i < this.data.rows.length; i++) {
      let row = this.data.rows[i].obj;
      // + makes it a numerical
      row.Global_Sales = +row.Global_Sales;
      if (!salesMap[row.Platform]) salesMap[row.Platform] = 0;
      salesMap[row.Platform] += row.Global_Sales;
    }
    // used AI here
    this.platforms = Object.keys(salesMap);
    this.platformSales = Object.values(salesMap);
  }

  drawAxis() {
    push();
    translate(this.posX, this.posY);
    stroke(this.axisColour);
    strokeWeight(this.axisThickness);
    noFill();
    line(0, 0, this.chartWidth, 0);
    line(0, 0, 0, -this.chartHeight);
    pop();
  }

  drawBars() {
    let maxSale = max(this.platformSales);
    let barWidth = this.chartWidth / this.platforms.length;
    push();
    translate(this.posX, this.posY);

    fill(this.barColour);
    for (let i = 0; i < this.platforms.length; i++) {
      let barHeight = map(
        this.platformSales[i],
        0,
        maxSale,
        0,
        this.chartHeight,
      );
      rect(i * barWidth, 0, barWidth * 0.8, -barHeight);
    }
    pop();
  }

  drawLabels() {
    let minValue = 0;
    let maxValue = max(this.platformSales);
    push();
    translate(this.posX, this.posY);
    noStroke();
    fill(this.labelColour);

    textAlign(CENTER);
    text(
      "Global Sales per Platform (Millions)",
      this.chartWidth / 2,
      -this.chartHeight - 25,
    );

    textAlign(RIGHT, CENTER);
    text(Math.round(minValue), -5, 0);
    text(
      Math.round((minValue + (minValue + maxValue) / 2) / 2),
      -5,
      -this.chartHeight * 0.25,
    );
    text(Math.round((minValue + maxValue) / 2), -5, -this.chartHeight * 0.5);
    text(
      Math.round(((minValue + maxValue) / 2 + maxValue) / 2),
      -5,
      -this.chartHeight * 0.75,
    );
    text(Math.round(maxValue), -5, -this.chartHeight);

    textAlign(CENTER, TOP);
    let barWidth = this.chartWidth / this.platforms.length;
    for (let i = 0; i < this.platforms.length; i++) {
      let barHeight = map(
        this.platformSales[i],
        0,
        maxValue,
        0,
        this.chartHeight,
      );
      text(this.platforms[i], i * barWidth + barWidth / 2, 5);
      text(
        Math.round(this.platformSales[i]),
        i * barWidth + barWidth / 2,
        -barHeight - 10,
      );
    }

    pop();
  }
}
