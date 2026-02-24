// Stacked Bar Chart: Critic_Score + Critic_Count by Platform
class StackedChart {
  constructor(_data, _posX, _posY, _chartWidth, _chartHeight, _barWidth) {
    this.data = _data;
    this.cleanedData = [];
    this.posX = _posX;
    this.posY = _posY;
    this.chartWidth = _chartWidth;
    this.chartHeight = _chartHeight;
    this.barWidth = _barWidth;
    this.axisThickness = 2;
    this.convertInts = ["Critic_Score", "Critic_Count"];
    this.platformData = {};
    this.platforms = [];
    this.maxStackValue = 0;

    this.axisColour = "#000000";
    this.labelColour = "#0000FF";
    this.scoreColour = "#00beff";
    this.countColour = "#ff9f1c";


  }

  render() {
    this.cleanData();
    this.groupByPlatform();
    this.drawAxis();
    this.drawBars();
    this.drawLabels();
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

  groupByPlatform() {
    this.cleanedData.forEach((row) => {
      let platform = row.Platform;

      if (!this.platformData[platform]) {
        this.platformData[platform] = {
          score: 0,
          count: 0
        };
      }

      this.platformData[platform].score += row.Critic_Score;
      this.platformData[platform].count += row.Critic_Count;
    });
    this.platforms = Object.keys(this.platformData);
    this.maxStackValue = max(
      this.platforms.map(
        p => this.platformData[p].score + this.platformData[p].count
      )
    );
  }

  drawAxis() {
    noFill();
    push();
    stroke(this.axisColour);
    strokeWeight(this.axisThickness);
    translate(this.posX, this.posY);
    line(0, 0, this.chartWidth, 0);
    line(0, 0, 0, -this.chartHeight);
    pop();
  }

  drawBars() {
    stroke(1)
    push();
    translate(this.posX, this.posY);
    for (let i = 0; i < this.platforms.length; i++) {
      let platform = this.platforms[i];
      let data = this.platformData[platform];

      let countHeight = this.scaler(data.count);
      let scoreHeight = this.scaler(data.score);

      fill(this.countColour);
      rect(i * this.barWidth, 0, this.barWidth, -countHeight);

      fill(this.scoreColour);
      rect(
        i * this.barWidth,
        -countHeight,
        this.barWidth,
        -scoreHeight
      );
    }
    pop();
  }

  drawLabels() {
    push();
    noStroke()
    translate(this.posX, this.posY);
    fill(this.labelColour);
    textAlign(CENTER);
    text(
      "Critic Score + Count by Platform",
      this.chartWidth / 2,
      -this.chartHeight - 25
    );

    for (let i = 0; i < this.platforms.length; i++) {
      textAlign(CENTER, TOP);
      text(
        this.platforms[i],
        i * this.barWidth + this.barWidth / 2,
        10
      );
    }
    pop();
  }

  scaler(num) {
    return map(num, 0, this.maxStackValue, 0, this.chartHeight);
  }
}