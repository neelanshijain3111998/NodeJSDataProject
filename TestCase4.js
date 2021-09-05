// JavaScript source code

fetch("Test4.json")
  .then((response) => response.json())
  .then((data) => plotWithHighCharts4(data));

function plotWithHighCharts4(data) {
  let jsonkey1 = Object.keys(data); //["2000","2001","2002".....]
  let jsonvalue1 = Object.values(data); // jasonvalue1=[{Activ1:value,Activity2:value},{�},{�}]
  console.log(jsonkey1);
  console.log(jsonvalue1);

  let jsonAllPrincipalActivity = [];

  //store all principal business activity
  for (var i = 0; i <= 19; i++) {
    var jsonkey2 = Object.keys(jsonvalue1[i]);
    jsonAllPrincipalActivity.push(...jsonkey2);
  }
  var uniquePrincipalActivity = [...new Set(jsonAllPrincipalActivity)]; //get Distinct Acitvites of PBAs
  console.log(uniquePrincipalActivity);

  var finalArray = [];
  for (var i = 0; i < 4; i++) {
    var keys = uniquePrincipalActivity[i];

    var values = [];
    e = 0;
    for (var j = 0; j <= 19; j++) {
      var dictt = jsonvalue1[j]; //{Activ1:value,Activity2:value}
      if (typeof dictt[keys] == "undefined") {
        values[e] = 0;
      } else {
        values[e] = dictt[keys];
      }
      e++;
    }

    console.log(keys); //agriculture hunting
    console.log(values); //[24,31,3,1,0,5,3,3,67,5,4,35,6,4,2,3,4,2,1]
    var dict = {
      name: keys,
      data: values,
    };
    console.log(dict);
    finalArray.push(dict);
  }
  console.log(finalArray);

  Highcharts.chart("container4", {
    chart: {
      type: "column",
    },
    title: {
      text: "4. Grouped aggregation",
    },
    subtitle: {
      text: 'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>',
    },
    xAxis: {
      categories: jsonkey1,
      title: {
        text: null,
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Population (millions)",
        align: "high",
      },
      labels: {
        overflow: "justify",
      },
    },
    tooltip: {
      valueSuffix: " millions",
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
        },
      },
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "top",
      x: -40,
      y: 80,
      floating: true,
      borderWidth: 1,
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || "#FFFFFF",
      shadow: true,
    },
    credits: {
      enabled: false,
    },
    series: finalArray,
  });
}
