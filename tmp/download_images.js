const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");

const html = fs.readFileSync("/tmp/jinnyloan-personal.html", "utf8");

const imgRegex = /https:\/\/jinnyloan\.com\/wp-content\/uploads\/[^\s"'\)]+/gi;
const urls = [...new Set(html.match(imgRegex) || [])];

console.log("Found unique image URLs:", urls.length);

const targetDir = "/public/assets/personal-loan";
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

function downloadFile(url) {
  return new Promise((resolve) => {
    const filename = path.basename(new URL(url).pathname);
    const dest = path.join(targetDir, filename);
    const file = fs.createWriteStream(dest);
    const client = url.startsWith("https") ? https : http;
    client.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(file);
        file.on("finish", () => {
          file.close();
          console.log("Downloaded:", filename);
          resolve(filename);
        });
      } else {
        console.error("Failed:", url, res.statusCode);
        resolve(null);
      }
    }).on("error", (err) => {
      console.error("Error:", url, err.message);
      resolve(null);
    });
  });
}

async function run() {
  for (const u of urls) {
    await downloadFile(u);
  }
  console.log("Download completed!");
}
run();
