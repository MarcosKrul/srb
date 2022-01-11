/*
  usage: yarn message:insert <KEY> <LOCALE> <MESSAGE>
*/

const { promises: fs } = require("fs");
const path = require("path");


const [ _, __, key, locale, message ] = process.argv;
console.log("LOG", locale, key, message)

if ((!key || !key.startsWith("Error") && !key.startsWith("Success") && !key.startsWith("Mail")) || !locale || !message) {
  console.log("ERROR: mal formatted");
  return;
}

const filepath = path.join(__dirname, "..", "..", "src", "handlers", "i18n", `${locale}.json`);

const exec = async () => {
  try {

    const buffer = await fs.readFile(filepath, "utf8")
    const jsonData = JSON.parse(buffer);

    if (jsonData[key]) {
      console.log("WARNING: key already exists");
      return;
    }

    Object.assign(jsonData, { [`${key}`]: message });
    await fs.writeFile(filepath, JSON.stringify(jsonData));

  } catch (e) {
    console.log("ERROR", e.message);
  }
}

exec();
