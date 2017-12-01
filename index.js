'use strict';
var fs = require('fs');
var AWSXRay = require('aws-xray-sdk');
var AWS = AWSXRay.captureAWS(require('aws-sdk'));

var sqs = new AWS.SQS();

 exports.get = function(event, context) {
   var contents = fs.readFileSync("public/index.html");

   sqs.sendMessage({
     MessageBody: "hello world",
     QueueUrl: "https://sqs.us-east-1.amazonaws.com/283125242610/reinventdemo-queue"
   }, function (err, data) {
      var statusCode = 200;
      if (err) throw err;

      context.succeed({
        statusCode: statusCode,
        body: contents.toString(),
        headers: {'Content-Type': 'text/html'}
      });

   })


 };



