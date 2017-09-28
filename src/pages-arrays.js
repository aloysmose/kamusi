const fs = require("fs");
const pagesEngSwa = require("./eng-swa-pages-raw.json");
const pagesSwaEng = require("./swa-eng-pages-raw.json");

const deDupe = pages => {
  const letter = i => String.fromCharCode(65 + i).toLowerCase();
  let totalBefore = 0;
  let totalAfter = 0;

  pages.forEach((page, i) => {
    totalBefore += page.length;
    // console.log(`${letter(i)} BEFORE:`, page.length);
    page = page.filter((entry, i) => {
      return entry.indexOf("PREPENDED TO NEXT ENTRY") === -1 && i !== 0;
      // console.log(entry);
    });
    // fs.writeFile(
    //   `./dict-array/eng-swa/eng-swa-${letter(i)}-entries.json`,
    //   // `./dict-array/swa-eng/swa-eng-${letter(i)}-entries.json`,
    //   JSON.stringify(page),
    //   "utf-8",
    //   err => {
    //     if (err) {
    //       console.log(err);
    //     } else {
    //       // resolve();
    //     }
    //   }
    // );
    totalAfter += page.length;

    // console.log("AFTER:", page.length);
    // console.log("\n");
  });

  // console.log("BEFORE:", totalBefore.toLocaleString());
  // console.log("AFTER:", totalAfter.toLocaleString());
};

// console.log("ENG-SWA:");
deDupe(pagesEngSwa);
// console.log("\n");
// console.log("SWA-ENG:");
// deDupe(pagesSwaEng);

// const requireFiles = () => {
//   const letters = [
//     "a",
//     "b",
//     "c",
//     "d",
//     "e",
//     "f",
//     "g",
//     "h",
//     "i",
//     "j",
//     "k",
//     "l",
//     "m",
//     "n",
//     "o",
//     "p",
//     "q",
//     "r",
//     "t",
//     "u",
//     "v",
//     "w",
//     "x",
//     "y",
//     "z"
//   ];

//   let dictionary = {};

//   letters.forEach((letter, i) => {
//     // letter = require(`./dict-array/eng-swa/eng-swa-${letter}-entries.json`);

//     if (i < 1) {
//       letter.forEach(entry => {
//         let startIndex = entry.indexOf("<b>");
//         let endIndex = entry.indexOf("</b>");
//         console.log(entry.slice(startIndex, endIndex));
//         // dictionary
//       });
//     }
//   });
//   // return dictionary;
// };

// requireFiles();
