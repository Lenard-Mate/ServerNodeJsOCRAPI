const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
let counter = 0;
var PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected:'+socket);
});

server.listen(PORT, () => {
  console.log('listening on *:5000');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  io.on('connection', (socket) => {
    socket.on('counter', (msg) => {
        counter = counter + 1;
      console.log('counter ' + counter);
      io.emit('value_of_counter', counter);
    });
  }); 

// io.on('connection', (socket) => {
//      client.on("sendImagePath", message => {
//      console.log(message);
    
//     ///computerVision(message);
  

//   });
//   }); 
// const server = require("http").createServer();
// var PORT = process.env.PORT || 5000;
// var globalReadResult = "";
// const io = require("socket.io")(server, {
//   transports: ["websocket", "polling"]
// });
// const users = {};
// io.on("connection", client => {
//   // client.on("username", username => {
//   //   const user = {
//   //     name: username,
//   //     id: client.id
//   //   };
//   //   users[client.id] = user;
//   //   io.emit("connected", user);
//   //   io.emit("users", Object.values(users));
//   // });
io.on('connection', (socket) => {
   socket.on('sendImagePath', (msg) => {
    computerVision(msg); 
 // testfunction(msg);
    // io.emit('come_api', msg);
    });

});

// io.on('connection', (socket) => {
//   console.log('a user connected:'+socket);
// });
// });
// server.listen(PORT);
// console.log("i am o the port 5000");



     // io.on('connection', (socket) => {
     //     io.emit("come_api", {
     //      pi_send: "eu sunt mate si am valoare"
        
     //    }); }); 


// function testfunction(value){


//          io.emit("come_api", {
//           pi_send: value
        
//         });
     


// }



var globalReadResult

//import React from 'react';
//function Api(){
 //const sayHello = () =>{
   //  console.log("Api");



     //If you want to start measuring performance in your app, pass a function
     //to log results (for example: reportWebVitals(console.log))
     //or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
     
     
     const async = require('async');
     const fs = require('fs');
     const https = require('https');
     const path = require("path");
     const createReadStream = require('fs').createReadStream
     const sleep = require('util').promisify(setTimeout);
     const ComputerVisionClient = require('@azure/cognitiveservices-computervision').ComputerVisionClient;
     const ApiKeyCredentials = require('@azure/ms-rest-js').ApiKeyCredentials;
     
     const key = 'c47a899ef9114c67a14732d1c1506d7e';
     const endpoint = 'https://apilicenta.cognitiveservices.azure.com/';
     
     
     const computerVisionClient = new ComputerVisionClient(
       new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } }), endpoint);
     
     
       function computerVision(urlPath) {
         async.series([
           async function () {


     
             const printedTextSampleURL = 'https://www.ziuadevest.ro/wp-content/uploads/2018/04/30264895_1770284606348861_676870881456160768_n.jpg';
             const multiLingualTextURL = 'https://raw.githubusercontent.com/Azure-Samples/cognitive-services-sample-data-files/master/ComputerVision/Images/MultiLingual.png';
             const mixedMultiPagePDFURL = 'https://raw.githubusercontent.com/Azure-Samples/cognitive-services-sample-data-files/master/ComputerVision/Images/MultiPageHandwrittenForm.pdf';
             const STATUS_SUCCEEDED = "succeeded";
             const STATUS_FAILED = "failed"
     
     
     //console.log('Read printed text from URL...', printedTextSampleURL.split('/').pop());
     //const printedResult = await readTextFromURL(computerVisionClient, printedTextSampleURL);
     //printRecText(printedResult);
     //console.log(imagePath);
     const handwrittenImageLocalPath = ""+urlPath; //C:\\Users\\Leni\\Desktop\\image.jpg , C:\Users\Leni\Desktop\ReactDemoApp\FrontEndMonyManager\ProiectDeDiplomaFrontEnd\Receipt\Carrefour.jpg
     console.log('\nRead handwritten text from local file...', handwrittenImageLocalPath);
     const handwritingResult = await readTextFromURL(computerVisionClient, handwrittenImageLocalPath);
     
     printRecText(handwritingResult);
     // Perform read and await the result from URL
     async function readTextFromURL(client, url) {
     // To recognize text in a local image, replace client.read() with readTextInStream() as shown:
     let result = await client.read(url);
     // Operation ID is last path segment of operationLocation (a URL)
     let operation = result.operationLocation.split('/').slice(-1)[0];
     
     // Wait for read recognition to complete
     // result.status is initially undefined, since it's the result of read
     while (result.status !== STATUS_SUCCEEDED) { await sleep(1000); result = await client.getReadResult(operation); }
     return result.analyzeResult.readResults; // Return the first page of result. Replace [0] with the desired page if this is a multi-page file such as .pdf or .tiff.
     
     }
     
     async function readTextFromFile(client, localImagePath) {
     // To recognize text in a local image, replace client.read() with readTextInStream() as shown:
     let result = await client.readInStream(() => createReadStream(localImagePath));
     // Operation ID is last path segment of operationLocation (a URL)
     let operation = result.operationLocation.split('/').slice(-1)[0];
     
     // Wait for read recognition to complete
     // result.status is initially undefined, since it's the result of read
     while (result.status !== STATUS_SUCCEEDED) { await sleep(1000); result = await client.getReadResult(operation); }
     return result.analyzeResult.readResults; // Return the first page of result. Replace [0] with the desired page if this is a multi-page file such as .pdf or .tiff.
     }

     function printRecText(readResults) {
     console.log('Recognized text:');
     var myJSON = JSON.stringify(readResults);
     
         globalReadResult=readResults;

     // io.on('connection', (socket) => {
         io.emit("come_api", {
          pi_send: globalReadResult
        
        });
     //    }); 

     
     console.log(globalReadResult);
     for (const page in readResults) {
       if (readResults.length > 1) {
         console.log(`==== Page: ${page}`);
       }
       const result = readResults[page];
     
       if (result.lines.length) {
         for (const line of result.lines) {
           console.log(line.words.map(w => w.text).join(' '));
         }
       }
       else { console.log('No recognized text.'); }
     }
     
     }
     
         },
         function () {
           return new Promise((resolve) => {
             resolve();
           })
         }
       ], (err) => {
         throw (err);
       });
        return globalReadResult;
     }
    
//

