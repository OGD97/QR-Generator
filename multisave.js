import inquirer from "inquirer";
import { type } from "os";
import qr from "qr-image";
import fs from "fs";

import { randomInt } from "crypto";

const number = randomInt(0, 10);

inquirer
  .prompt([
    /* Pass your questions in here */
    {
      message: "Enter URL: ",
      name: "url",
    },
    // {
    //   type: "password",
    //   message: "Password:",
    //   name: "password",
    // },
  ])
  .then((answers) => {
    // URL API

    // const url = new URL("../cats", "http://www.example.com/dogs");
    // console.log(url.hostname); // "www.example.com"
    // console.log(url.pathname); // "/cats"

    console.log(answers.url); //TEST

    const website = answers.url;

    var QRimage = qr.image(website);

    const number = randomInt(0, 10);

    QRimage.pipe(fs.createWriteStream(website + ".png"), {
      flags: "a", //appending flags
    });

    console.log(number);

    fs.writeFile("message.txt", website + "\n", { flag: "a" }, (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    });

    // var svg_string = qr.imageSync('I love QR!');
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
