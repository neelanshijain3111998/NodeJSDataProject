const csv = require("csv-parser");
const fs = require("fs");

const DATEOFREGISTRATION = new Object();
for (let i = 2000; i <= 2019; i++) {
  let j = i.toString();
  DATEOFREGISTRATION[j] = 0;
}

fs.createReadStream("WestBengal.csv")
  .pipe(csv())
  .on("data", (data) => {
    if (data.DATE_OF_REGISTRATION != "NA") {
      dt = data.DATE_OF_REGISTRATION;
      //fetch the year
      let x = dt.split("-");

      if (parseInt(x[2]) >= 0 && parseInt(x[2]) < 20) {
        year = "20" + x[2];
        DATEOFREGISTRATION[year]++;
      }
    }
  })
  .on("end", () => {
    console.log(DATEOFREGISTRATION);
    fs.writeFileSync(
      "Test2.json",
      JSON.stringify(DATEOFREGISTRATION),
      "utf-8",
      (err) => {
        if (err) console.log(err);
      }
    );
  });
