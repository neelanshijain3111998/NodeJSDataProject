const csv = require("csv-parser");
const fs = require("fs");

const GROUPEDAGGREGATION = new Object();

fs.createReadStream("WestBengal.csv")
  .pipe(csv())
  .on("data", (data) => {
    if (data.DATE_OF_REGISTRATION != "NA") {
      dt = data.DATE_OF_REGISTRATION;
      //fetch the year
      let x = dt.split("-");

      if (parseInt(x[2]) >= 0 && parseInt(x[2]) < 20) {
        year = "20" + x[2];
        if (parseInt(year) >= 2000 && parseInt(year) <= 2019) {
          if (
            typeof GROUPEDAGGREGATION[year.toString()] != "undefined" &&
            typeof GROUPEDAGGREGATION[year.toString()][
              data.PRINCIPAL_BUSINESS_ACTIVITY_AS_PER_CIN
            ] != "undefined"
          ) {
            GROUPEDAGGREGATION[year.toString()][
              data.PRINCIPAL_BUSINESS_ACTIVITY_AS_PER_CIN
            ]++;
          } else if (
            typeof GROUPEDAGGREGATION[year.toString()] != "undefined"
          ) {
            GROUPEDAGGREGATION[year.toString()][
              data.PRINCIPAL_BUSINESS_ACTIVITY_AS_PER_CIN
            ] = 1;
          } else {
            let dictt = {};
            GROUPEDAGGREGATION[year.toString()] = dictt;

            dictt[data.PRINCIPAL_BUSINESS_ACTIVITY_AS_PER_CIN] = 1;
            Object.assign(GROUPEDAGGREGATION[year.toString()], dictt);
          }
        }
      }
    }
  })
  .on("end", () => {
    console.log(GROUPEDAGGREGATION);
    fs.writeFileSync(
      "Test4.json",
      JSON.stringify(GROUPEDAGGREGATION),
      "utf-8",
      (err) => {
        if (err) console.log(err);
      }
    );
  });
