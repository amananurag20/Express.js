const https = require("https");
const crypto = require("crypto");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
console.log("hello world");

var a = 1;
var b = 2;

// Track time for each hash
const start1 = Date.now();
crypto.pbkdf2("12345", "salt", 1000000, 64, "sha512", (err, data) => {
  const end1 = Date.now();
  console.log("hash- 1", `${end1 - start1}ms`);
});

const start2 = Date.now();
crypto.pbkdf2("12345", "salt", 1000000, 64, "sha512", (err, data) => {
  const end2 = Date.now();
  console.log("hash- 2", `${end2 - start2}ms`);
});

const start3 = Date.now();
crypto.pbkdf2("12345", "salt", 1000000, 64, "sha512", (err, data) => {
  const end3 = Date.now();
  console.log("hash- 3", `${end3 - start3}ms`);
});

const start4 = Date.now();
crypto.pbkdf2("12345", "salt", 1000000, 64, "sha512", (err, data) => {
  const end4 = Date.now();
  console.log("hash- 4", `${end4 - start4}ms`);
});

const start5 = Date.now();
crypto.pbkdf2("12345", "salt", 1000000, 64, "sha512", (err, data) => {
  const end5 = Date.now();
  console.log("hash- 5", `${end5 - start5}ms`);
});

const start6 = Date.now();
crypto.pbkdf2("12345", "salt", 1000000, 64, "sha512", (err, data) => {
  const end6 = Date.now();
  console.log("hash- 6", `${end6 - start6}ms`);
});

// HTTPS request (handled by OS, not thread pool)
https.get("https://jsonplaceholder.typicode.com/posts", (res) => {
  console.log("data mil gaya");
});

// Simple sync function
function add(a, b) {
  console.log(a + b);
}
add(1, 2);
