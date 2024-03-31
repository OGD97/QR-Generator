import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";
import { URL } from "url";

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

    const website = answers.url;
    const sliceURL = new URL("../", website);

    console.log(answers.url); //TEST

    //URL API
    console.log("This is hostname: " + sliceURL.hostname);
    console.log("This is origin: " + sliceURL.origin);
    console.log("This is port: " + sliceURL.port);
    console.log("This is protocol: " + sliceURL.protocol);

    var QRimage = qr.image(website);

    QRimage.pipe(fs.createWriteStream(sliceURL.hostname + ".png"), {
      flags: "a", //appending flags
    });

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
