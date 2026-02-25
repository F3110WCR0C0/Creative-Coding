class StackedChart {
  constructor(_data, _posX, _posY, _chartWidth, _chartHeight) {
    this.data = _data;
    this.cleanedData = [];
    this.posX = _posX;
    this.posY = _posY;
    this.chartWidth = _chartWidth;
    this.chartHeight = _chartHeight;

    this.axisThickness = 2;
    this.convertInts = ["Critic_Score", "Critic_Count"];
    this.platformData = {};
    this.platforms = [];
    this.maxStackValue = 0;

    this.axisColour = "#000000";
    this.labelColour = "#000000";
    this.scoreColour = "#00beff";
    this.countColour = "#ff9f1c";
  }

  render() {
    this.cleanData();
    this.platformGrouping();
    this.drawAxis();
    this.drawLabels();
    this.drawBars();
  }

  cleanData() {
    for (let i = 0; i < this.data.rows.length; i++) {
      let row = this.data.rows[i].obj;
      this.convertInts.forEach((value) => {
        row[value] = +row[value] || 0;
      });
      this.cleanedData.push(row);
    }
  }

  // used ai to assist me here
  platformGrouping() {
    this.cleanedData.forEach((row) => {
      let platform = row.Platform;
      if (!this.platformData[platform])
        this.platformData[platform] = { score: 0, count: 0 };
      this.platformData[platform].score += row.Critic_Score;
      this.platformData[platform].count += row.Critic_Count;
    });
    this.platforms = Object.keys(this.platformData);
    this.maxStackValue = max(
      this.platforms.map(
        (i) => this.platformData[i].score + this.platformData[i].count,
      ),
    );
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

  drawLabels() {
    push();
    translate(this.posX, this.posY);
    noStroke();
    fill(this.labelColour);
    textAlign(CENTER);
    text(
      "Critic score (Blue) vs count (Orange) for each platfrom",
      this.chartWidth / 2,
      -this.chartHeight - 25,
    );

    let values = this.platforms.map(
      (i) => this.platformData[i].score + this.platformData[i].count,
    );
    let minValue = 0;
    let maxValue = max(values);

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

    let barWidth = this.chartWidth / this.platforms.length;

    textAlign(CENTER, TOP);

    pop();

    push();
    textAlign(CENTER);
    translate(this.posX, this.posY);
    for (let i = 0; i < this.platforms.length; i++) {
      let platform = this.platforms[i];
      let data = this.platformData[platform];
      let countHeight = map(
        data.count,
        0,
        this.maxStackValue,
        0,
        this.chartHeight,
      );

      text(
        Math.round(this.platformData[this.platforms[i]].count),
        i * barWidth + barWidth / 2,
        -countHeight,
      );
      text(
        Math.round(this.platformData[this.platforms[i]].score),
        i * barWidth + barWidth / 2,
        10,
      );
      text(this.platforms[i], i * barWidth + barWidth / 2, 20);
    }

    pop();
  }

  drawBars() {
    push();
    translate(this.posX, this.posY);
    let barWidth = this.chartWidth / this.platforms.length;

    for (let i = 0; i < this.platforms.length; i++) {
      let platform = this.platforms[i];
      let data = this.platformData[platform];
      let countHeight = map(
        data.count,
        0,
        this.maxStackValue,
        0,
        this.chartHeight,
      );
      let scoreHeight = map(
        data.score,
        0,
        this.maxStackValue,
        0,
        this.chartHeight,
      );

      fill(this.scoreColour);
      rect(i * barWidth, -1, barWidth, -scoreHeight);

      fill(this.countColour);
      rect(i * barWidth, -1, barWidth, -countHeight);
    }

    pop();
  }
}
