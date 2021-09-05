// JavaScript source code
fetch("./Test1.json")
  .then((response) => response.json())
  .then((data) => plotWithHighCharts1(data));

function plotWithHighCharts1(data) {
  console.log(Object.keys(data));
  console.log(Object.values(data));

  var chart = {
    type: "bar",
    backgroundColor: "white",
  };
  var title = {
    text: "1. Count by Authorized Cap",
  };
  var subtitle = {
    text: 'no of companies whose "Authorized Cap" falls in intervals',
  };
  var xAxis = {
    categories: Object.keys(data),
    title: {
      text: "Bin",
    },
  };
  var yAxis = {
    min: 0,
    title: {
      text: "No of companies",
    },
  };

  var plotOptions = {
    bar: {
      dataLabels: {
        enabled: true,
      },
    },
  };
  var legend = {
    layout: "vertical",
    align: "right",
    verticalAlign: "top",
  };

  var credits = {
    enabled: false,
  };
  var series = [{ name: "Year", data: Object.values(data) }];
  var json = {};
  json.chart = chart;
  json.title = title;
  json.subtitle = subtitle;

  json.xAxis = xAxis;
  json.yAxis = yAxis;
  json.series = series;
  json.plotOptions = plotOptions;
  json.legend = legend;
  json.credits = credits;
  $("#container1").highcharts(json);
}
