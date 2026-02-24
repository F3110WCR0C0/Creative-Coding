// Chart on Global_Sales, Year_of_Release (Line Chart)
class LineChart {
  constructor(_data, _posX, _posY, _chartWidth, _chartHeight, _barWidth) {
    this.data = _data;
    this.cleanedData = [];
    this.yValues = [];
    this.yValue = "Year_of_Release";
    this.binValues = [];
    this.binRange;
    this.numBins = 5;
    this.rangeMin;
    this.rangeMax;
    this.posX = _posX;
    this.posY = _posY;
    this.convertInts = ["Year_of_Release", "Global_Sales"];

    this.chartWidth = _chartWidth;
    this.chartHeight = _chartHeight;
    this.barWidth = _barWidth;
    this.axisThickness = 2;
    this.barColour = "#00beff";
    this.axisColour = "#000000";
    this.labelColour = "#0000FF";
  }

  render() {
    this.cleanData();
    this.makeBins();
    this.fillBins();
    this.drawAxis();
    this.drawLines();
    this.drawLabels();
  }

  cleanData() {
    for (let i = 0; i < this.data.rows.length; i++) {
      this.cleanedData.push(this.data.rows[i].obj);
      this.convertInts.forEach((value) => {
        this.cleanedData[i][value] = +this.cleanedData[i][value];
      });
    }
    this.yValues = this.cleanedData.map((row) => row[this.yValue]);
  }

  makeBins() {
    for (let i = 0; i < this.numBins; i++) {
      this.binValues.push(0);
    }
  }

  fillBins() {
    this.rangeMin = min(this.yValues);
    this.rangeMax = max(this.yValues);
    this.binRange = (this.rangeMax - this.rangeMin) / this.numBins;

    for (let i = 0; i < this.yValues.length; i++) {
      let value = this.yValues[i];

      let binIndex = floor((value - this.rangeMin) / this.binRange);

      if (binIndex === this.numBins) {
        binIndex--;
      }

      this.binValues[binIndex]++;
    }
  }

  drawAxis() {
    noFill();
    stroke(this.axisColour);
    strokeWeight(this.axisThickness);
    translate(this.posX, this.posY);
    line(0, 0, this.chartWidth, 0);
    line(0, 0, 0, -this.chartHeight);
  }

  drawLines() {
    this.numBins;
    noStroke();
    push();
    stroke(1);
    fill(this.barColour);
    translate(this.posX, -1);
    for (let i = 0; i < this.numBins; i++) {
      let barHeight = this.scaler(this.binValues[i]);
      ellipse(i * this.barWidth, barHeight * -2, 10);
    }
    pop();
  }

  drawLabels() {
    fill(this.labelColour);
    textAlign(CENTER);
    text("Line Chart", this.chartWidth / 2, -this.chartHeight - 25);

    for (let i = 0; i < this.numBins; i++) {
      push();
      textAlign(LEFT, BOTTOM);

      let barHeight = this.scaler(this.binValues[i]);
      text(
        this.binValues[i],
        i * this.barWidth + this.barWidth + 20,
        -barHeight,
      );
      push();
      translate(this.barWidth / 2, 0);
      // Should say (ENTER HERE)
      text(
        `${this.rangeMin} - ${this.rangeMax}`,
        i * this.barWidth + this.barWidth,
        20,
      );
      pop();
    }
  }

  scaler(num) {
    let maxBin = max(this.binValues);
    return map(num, 0, maxBin, 0, this.chartHeight);
  }
}
