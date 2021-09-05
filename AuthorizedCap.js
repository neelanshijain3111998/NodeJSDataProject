const csv = require("csv-parser");
const fs = require("fs");

let AuthorizedCap = {
  ["<=1L"]: 0,
  ["1L to 10L"]: 0,
  ["10L to 1Cr"]: 0,
  ["1Cr to 10Cr"]: 0,
  [">10Cr"]: 0,
};

fs.createReadStream("WestBengal.csv")
  .pipe(csv())
  .on("data", (data) => {
    let x = parseInt(data.AUTHORIZED_CAP);
    if (x <= 100000) AuthorizedCap["<=1L"]++;
    else if (x > 100000 && x <= 1000000) AuthorizedCap["1L to 10L"]++;
    else if (x > 1000000 && x <= 10000000) AuthorizedCap["10L to 1Cr"]++;
    else if (x > 10000000 && x <= 100000000) AuthorizedCap["1Cr to 10Cr"]++;
    else AuthorizedCap[">10Cr"]++;
  })
  .on("end", () => {
    console.log(AuthorizedCap);
    fs.writeFileSync(
      "Test1.json",
      JSON.stringify(AuthorizedCap),
      "utf-8",
      (err) => {
        if (err) console.log(err);
      }
    );
  });
