class Histogram {
  constructor(_data, _posX, _posY, _chartWidth, _chartHeight, _barWidth) {
    this.data = _data;
    this.cleanedData = [];
    this.platforms = [];
    this.platformSales = [];
    this.posX = _posX;
    this.posY = _posY;
    this.chartWidth = _chartWidth;
    this.chartHeight = _chartHeight;
    this.barWidth = _barWidth;

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
      row.Global_Sales = +row.Global_Sales; 
      if (!salesMap[row.Platform]) {
        salesMap[row.Platform] = 0;
      }
      salesMap[row.Platform] += row.Global_Sales;
    }

    this.platforms = Object.keys(salesMap);
    this.platformSales = Object.values(salesMap);
  }

  drawAxis() {
    noFill();
    stroke(this.axisColour);
    strokeWeight(this.axisThickness);
    translate(this.posX, this.posY);
    line(0, 0, this.chartWidth, 0); 
    line(0, 0, 0, -this.chartHeight); 
  }

  drawBars() {
    fill(this.barColour);
    translate(this.posX, -1);
    let maxSale = max(this.platformSales);
    for (let i = 0; i < this.platforms.length; i++) {
      let barHeight = map(this.platformSales[i], 0, maxSale, 0, this.chartHeight);
      rect(i * this.barWidth, 0, this.barWidth, -barHeight);
    }
  }

  drawLabels() {
    noStroke();
    fill(this.labelColour);
    textAlign(CENTER);
    text("Global Sales per Platform (M Units)", this.chartWidth / 2, -this.chartHeight - 25);

    for (let i = 0; i < this.platforms.length; i++) {
      let maxSale = max(this.platformSales);
      let barHeight = map(this.platformSales[i], 0, maxSale, 0, this.chartHeight);

      text(this.platforms[i], i * this.barWidth + this.barWidth * 0.4, 20);
      text(this.platformSales[i].toFixed(2), i * this.barWidth + this.barWidth * 0.4, -barHeight - 5);
    }
  }
}