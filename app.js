const fs = require("fs");

setImmediate(() => {
  console.log("setImmediate");
});

Promise.resolve().then(() => {
  console.log("promise");
});

fs.readFile("./file.txt", "utf-8", () => {
  console.log("file reading successfully");
});

setTimeout(() => {
  console.log("SetTimeout");
}, 0);

process.nextTick(() => {
  console.log("next tick");
  process.nextTick(() => {
    console.log("2nd next tick");
  });
});
