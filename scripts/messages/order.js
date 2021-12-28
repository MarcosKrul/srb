/*
  usage: yarn message:order <LOCALE>
*/

const { promises: fs } = require("fs");
const path = require("path");


const [ _, __, locale ] = process.argv;
console.log("LOG", locale)


if (!locale) {
  console.log("ERROR: mal formatted");
  return;
}

const filepath = path.join(__dirname, "..", "..", "src", "handlers", "i18n", `${locale}.json`);

const exec = async () => {
  try {

    const buffer = await fs.readFile(filepath, "utf8");
    const jsonData = JSON.parse(buffer);

    let ordened = {};
    
    Object.entries(jsonData)
    .sort(([a, _], [b, __]) => {
      if (a === b) return 0;
      return a > b? 1 : -1;
    })
    .map(([key, value]) => {
      Object.assign(ordened, { [`${key}`]: value });
      return null;
    });
    
    await fs.writeFile(filepath, JSON.stringify(ordened));

  } catch (e) {
    console.log("ERROR", e.message);
  }
}

exec();