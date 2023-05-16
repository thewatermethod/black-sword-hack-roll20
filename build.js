const fs = require("fs");

const { readFile, writeFile, copyFile } = fs;
const encoding = "utf-8";

const copySlugs = ["style.css", "sword.png", "texture.png", "logo.png"];

async function build() {
  // copy css file

  copySlugs.forEach((slug) => {
    copyFile(`./src/${slug}`, `./dist/${slug}`, (err) => {
      if (err) {
        console.log("Error Found:", err);
      }
    });
  });

  // combine js + html
  let output;
  readFile("./src/index.html", encoding, async (err, html) => {
    if (err) {
      throw new Error(err);
    }

    readFile("./src/main.js", encoding, async (err, javascript) => {
      if (err) {
        throw new Error(err);
      }

      output = html.replace("${INLINE_SCRIPT}", javascript);
      writeFile("./dist/roll20.html", output, {}, (err) => {
        if (err) {
          throw new Error(err);
        }

        console.log("Successfully written to file dist/roll20.html");

        let index;

        readFile("./src/template.html", encoding, async (err, contents) => {
          if (err) {
            throw new Error(err);
          }
          index = contents.replace("${INSERT_HTML}", output);
          writeFile("./dist/index.html", index, {}, (err) => {
            if (err) {
              throw new Error(err);
            }
            console.log("Successfully written to file dist/index.html");
          });
        });
      });
    });
  });
}

try {
  build();
} catch (err) {
  console.log("There has been an error: ", err);
}
