// JavaScript source code
fetch("./Test2.json")
  .then((response) => response.json())
  .then((data) => plotWithHighCharts2(data));

function plotWithHighCharts2(data) {
  console.log(Object.keys(data));
  console.log(Object.values(data));

  /* var jsonData = [data];
    console.log(jsonData);
    var obj = [];
    var range = [];
    var c = 0;
    for (var i in jsonData) {
        console.log(i);
        var key = i;
        var val = jsonData[i];
        for (var j in val) {
            var sub_key = j;
            var sub_val = val[j];
            obj[c] = sub_key;
            range[c] = sub_val;
            c++;
            console.log(c + " " + sub_key + " " + sub_val);
        }
        console.log(obj);
        console.log(range);
    }
    */
  var chart = {
    type: "line",
    backgroundColor: "orange",
  };
  var title = {
    text: "2. Company Registration by Year(From 2000 to 2019)",
  };
  var subtitle = {
    text: null,
  };
  var xAxis = {
    categories: Object.keys(data),
    title: {
      text: "Per Year",
    },
  };
  var yAxis = {
    title: {
      text: "No of companies Registration",
    },
  };

  var plotOptions = {
    line: {
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
  var series = [{ name: "Registration", data: Object.values(data) }];
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
  $("#container2").highcharts(json);
}
