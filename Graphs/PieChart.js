class PieChart {
  constructor(_data, _posX, _posY, _diameter) {
    this.data = _data;
    this.posX = _posX;
    this.posY = _posY;
    this.diameter = _diameter;

    this.regions = ["NA_Sales", "EU_Sales", "JP_Sales"];
    this.regionNames = ["North America", "Europe", "Japan"];
    this.values = [];

    this.sliceColours = ["#00beff", "#ffcc00", "#ff9f1c"];
  }

  render() {
    push();
    this.cleanData();
    this.drawSlices();
    this.drawLabels();
    pop();
  }

  cleanData() {
    let totals = { "NA_Sales": 0, "EU_Sales": 0, "JP_Sales": 0 };

    for (let i = 0; i < this.data.rows.length; i++) {
      let row = this.data.rows[i].obj;

      this.regions.forEach(region => {
        totals[region] += +row[region];
      });
    }

    this.values = this.regions.map(region => totals[region]);
  }

  drawSlices() {
    let total = this.values.reduce((a, b) => a + b, 0);
    let startAngle = 0;

    stroke(1)
    translate(this.posX, this.posY);

    for (let i = 0; i < this.values.length; i++) {
      let angle = (this.values[i] / total) * TWO_PI;

      fill(this.sliceColours[i % this.sliceColours.length]);
      arc(0, 0, this.diameter, this.diameter, startAngle, startAngle + angle, PIE);

      startAngle += angle;
    }
  }

  drawLabels() {
    let total = this.values.reduce((a, b) => a + b, 0);
    let startAngle = 0;

    noStroke();
    fill(0);
    textAlign(CENTER, CENTER);

    text("Sales from different regions", 0, -this.diameter / 2 - 30);

    for (let i = 0; i < this.values.length; i++) {
      let angle = (this.values[i] / total) * TWO_PI;
      let midAngle = startAngle + angle / 2;

      let x = cos(midAngle) * (this.diameter / 2 + 20);
      let y = sin(midAngle) * (this.diameter / 2 + 20);

      text(`${this.regionNames[i]}: ${this.values[i].toFixed(2)}M`, x, y);

      startAngle += angle;
    }
  }
}