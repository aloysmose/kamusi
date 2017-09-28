const fs = require("fs");
const util = require("util");
const uuid = require("uuid");
const pagesEngSwa = require("./eng-swa-pages-raw.json");
const pagesSwaEng = require("./swa-eng-pages-raw.json");

const deDupe = pages => {
  const letter = i => String.fromCharCode(65 + i).toLowerCase();
  let totalBefore = 0;
  let totalAfter = 0;
  // let dictionary = [];

  pages.forEach((page, i) => {
    // if (i !== 1) return;
    let entries = {};
    totalBefore += page.length;
    page = page.filter((entry, j) => {
      return entry.indexOf("PREPENDED TO NEXT ENTRY") === -1 && j !== 0;
      // console.log(entry);
    });

    // TODO: Look for anomalies
    page.forEach((entry, j) => {
      let startBold = entry.indexOf("<b>");
      let endBold = entry.indexOf("</b>");
      let word = entry.slice(startBold + 3, endBold).toLowerCase();

      if (entries[word]) {
        let startSup = entry.indexOf("<sup>");
        let endSup = entry.indexOf("</sup>");
        let sup = entry.slice(startSup, endSup + 6);
        word = word += sup;
      }
      entries[word] = `<p> ${entry}`;
    });
    // console.log(dictionary);
    // console.log(util.inspect(entries, { depth: null, colors: true }));

    fs.writeFile(
      `./dict-object/eng-swa-${letter(i)}-entries.json`,
      // `./dict-array/swa-eng/swa-eng-${letter(i)}-entries.json`,
      JSON.stringify(entries),
      "utf-8",
      err => {
        if (err) {
          console.log(err);
        } else {
          // resolve();
        }
      }
    );
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
