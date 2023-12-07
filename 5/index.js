console.log("Day 5");
const fs = require("fs");

// parse raw data, only need once, than I use the parsed data json

// fs.readFile("./data.txt", "utf8", (err, raw) => {

//     let seeds = [];
//     let converters = [];

//     const rows = raw.split("\r\n\r\n");
//     console.log(rows.length);
//     for (let i = 0; i < rows.length; i++) {
//         const row = rows[i].replace(/\r\n/g, " ");

//         const [key, data] = row.split(":");
//         if (key === "seeds") {
//             seeds = data.trim().split(" ").map((n) => parseInt(n));
//         } else {
//             const rawConverters = data.trim().split(" ").map((n) => parseInt(n));
//             converters.push({
//                 key,
//                 data: chunkArray(rawConverters, 3)
//             });
//         }

//     }

//     console.log(seeds);
//     console.log(JSON.stringify(converters,null, 2));

//     fs.writeFileSync("./parsedData.json", JSON.stringify({
//         seeds,
//         converters
//     }));

//     seeds.forEach((seed) => {

//     });

// });

function chunkArray(myArray, chunk_size) {
  var index = 0;
  var arrayLength = myArray.length;
  var tempArray = [];

  for (index = 0; index < arrayLength; index += chunk_size) {
    const myChunk = myArray.slice(index, index + chunk_size);
    // Do something if you want with the group
    tempArray.push(myChunk);
  }

  return tempArray;
}

fs.readFile("./parsedData.json", "utf8", (err, raw) => {
  const data = JSON.parse(raw);

  // console.log(JSON.stringify(data, null, 2));

  const locations = [];
  const seeds = data.seeds;
  const converters = data.converters;

  const parts = chunkArray(seeds, 2);
  //for (let i = 0; i < parts.length; i++) {
    const i = 0;
    const [start, end] = parts[i];
    for (let j = 0; j < end; j++) {
        const seed =  start + j;

        let result = seed;
        converters.forEach((converter) => {
          //console.log(converter.key, result);
          for (let i = 0; i < converter.data.length; i++) {
            const [dest, src, len] = converter.data[i];
            if (result >= src && result < src + len) {
              const prev = result;
              result += dest - src;
              //console.log(`${prev} -> ${result}`);
              break;
            }
          }
        //console.log("\n\n");

        });
        
        locations.push(result);
    }
//  }

  console.log(locations.sort((a, b) => a - b));
});