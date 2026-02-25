// Line Chart: Global_Sales by Year_of_Release
class LineChart {
  constructor(_data, _posX, _posY, _chartWidth, _chartHeight) {
    this.data = _data;
    this.cleanedData = [];
    this.yValue = "Global_Sales";
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
    this.salesPerYear();
    this.drawAxis();
    this.drawLines();
    this.drawLabels();
  }

  cleanData() {
    for (let i = 0; i < this.data.rows.length; i++) {
      let row = this.data.rows[i].obj;
      this.cleanedData.push(row);
      row["Year_of_Release"] = +row["Year_of_Release"];
      row["Global_Sales"] = +row["Global_Sales"];
    }
  }

  // Used AI here
  salesPerYear() {
    this.salesByYear = {};
    for (let row of this.cleanedData) {
      let year = row["Year_of_Release"];
      let sales = row["Global_Sales"];
      if (!this.salesByYear[year]) this.salesByYear[year] = 0;
      this.salesByYear[year] += sales;
    }
    this.sortedYears = Object.keys(this.salesByYear)
      .map(Number)
      .sort((a, b) => a - b);
    this.maxSales = max(Object.values(this.salesByYear));
  }

  drawAxis() {
    push();
    translate(this.posX, this.posY);
    noFill();
    stroke(this.axisColour);
    strokeWeight(this.axisThickness);
    line(0, 0, this.chartWidth, 0);
    line(0, 0, 0, -this.chartHeight);
    pop();
  }

  drawLines() {
    push();
    translate(this.posX, this.posY);
    stroke(this.barColour);
    strokeWeight(2);
    noFill();

    for (let i = 0; i < this.sortedYears.length - 1; i++) {
      let year1 = this.sortedYears[i];
      let sales1 = this.salesByYear[year1];
      let x1 = map(i, 0, this.sortedYears.length - 1, 0, this.chartWidth);
      let y1 = -map(sales1, 0, this.maxSales, 0, this.chartHeight);

      let year2 = this.sortedYears[i + 1];
      let sales2 = this.salesByYear[year2];
      let x2 = map(i + 1, 0, this.sortedYears.length - 1, 0, this.chartWidth);
      let y2 = -map(sales2, 0, this.maxSales, 0, this.chartHeight);

      line(x1, y1, x2, y2);
    }

    textAlign(CENTER, BOTTOM);
    fill(this.labelColour);

    for (let i = 0; i < this.sortedYears.length; i++) {
      let year = this.sortedYears[i];
      let sales = this.salesByYear[year];
      let x = map(i, 0, this.sortedYears.length - 1, 0, this.chartWidth);
      let y = -map(sales, 0, this.maxSales, 0, this.chartHeight);

      fill(this.barColour);
      noStroke();
      ellipse(x, y, 6, 6);
      fill(this.labelColour);
      text(Math.round(sales), x, y - 10);
    }

    pop();
  }

  drawLabels() {
    push();
    translate(this.posX, this.posY);
    noStroke();
    fill(this.labelColour);

    textAlign(CENTER);
    text(
      "Yearly games global sales (Millions)",
      this.chartWidth / 2,
      -this.chartHeight - 25,
    );

    let minValue = 0;
    let maxValue = this.maxSales;
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
    for (let i = 1; i < this.sortedYears.length; i++) {
      let year = this.sortedYears[i];
      let x = map(i, 1, this.sortedYears.length, 0, this.chartWidth);
      text(year, x, 5);
    }
    pop();
  }
}
