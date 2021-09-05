const csv = require("csv-parser");
const fs = require("fs");

const PRINCIPALACTIVITY = new Object();

fs.createReadStream("WestBengal.csv")
  .pipe(csv())
  .on("data", (data) => {
    if (data.DATE_OF_REGISTRATION != "NA") {
      dt = data.DATE_OF_REGISTRATION;
      //fetch the year
      let x = dt.split("-");

      if (parseInt(x[2]) == 15) {
        year = "20" + x[2];
        let AnyActivity = data.PRINCIPAL_BUSINESS_ACTIVITY_AS_PER_CIN;
        if (typeof PRINCIPALACTIVITY[AnyActivity] != "undefined")
          PRINCIPALACTIVITY[AnyActivity]++;
        else PRINCIPALACTIVITY[AnyActivity] = 1;
      }
    }
  })
  .on("end", () => {
    console.log(PRINCIPALACTIVITY);
    fs.writeFileSync(
      "Test3.json",
      JSON.stringify(PRINCIPALACTIVITY),
      "utf-8",
      (err) => {
        if (err) console.log(err);
      }
    );
  });
