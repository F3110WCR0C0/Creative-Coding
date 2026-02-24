// Kinda working currently
// Pie Chart
// Histogram
// Filled bar chart


let data;
let histogram;

let canvasWidth = 1920;
let canvasHeight = 2500;

// Avregae Data
///////////////////////////////////////////////////////////////////
// const totals = this.cleanedData.map((row) => row[this.yValue]);

// const mean = this.calculateMean(totals);
// console.log("Stacked Chart) The mean is (rounded): ", round(mean));

// const median = this.calculateMedian(totals);
// console.log("Stacked Chart) The median is: (rounded)", round(median));

let backgroundColour = "#e3e3e3";

function preload() {
  data = loadTable("data/Video_Games.csv", "csv", "header");
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  histogram = new Histogram(data, 50, 500, 400, 400, 40);
  stackedChart = new StackedChart(data, -50, 500, 400, 400, 40);
  areaChart = new AreaChart(data, -50, 1000, 400, 400, 40);
  lineChart = new LineChart(data, 500, 0, 400, 400, 40);
  pieChart = new PieChart(data, -300, 450, 400, 300);
  pieChart.render();
  noLoop();
}

function draw() {
  background(backgroundColour);
  histogram.render();
  stackedChart.render();
  areaChart.render();
  lineChart.render();
  pieChart.render();
}

function calculateMean(values) {
  let sum = 0;
  for (let v of values) {
    sum += v;
  }
  return sum / values.length;
}

function calculateMedian(values) {
  let sorted = [...values].sort((a, b) => a - b);
  let middle = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  } else {
    return sorted[middle];
  }
}
