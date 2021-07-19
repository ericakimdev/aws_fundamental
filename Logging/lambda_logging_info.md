## AWS Lambda function logging in Node.js

### 1. Creating a function that returns logs - use methods on the console object

```
exports.handler = async function(event, context) {
  console.log("ENVIRONMENT VARIABLES\n" + JSON.stringify(process.env, null, 2))
  console.info("EVENT\n" + JSON.stringify(event, null, 2))
  console.warn("Event not processed.")
  return context.logStreamName
}
```

### 2. Using Node.js logging packages

#### Winston
Winston is a popular logging library. The big selling point of Winston is its transports functionality. It is designed to be simple and enables universal logging with support for multiple transports. With Winston, we can route your logs to other services like AWS cloud watch.

#### Pino
It attributes asynchronous logging to its fast performance. With Pino, you can send the logs to many services by using proper transports like MySQL, Datadog, AWS cloud watch, or log flare.

### 3. How to view logs

You can view logs for Lambda functions using the Lambda console, the CloudWatch console, the AWS Command Line Interface (AWS CLI), or the CloudWatch API. There is no additional charge for using Lambda logs.
</br> However, standard CloudWatch Logs charges apply. 

### 4. Reference

[AWS Lambda function logging in Node.js](https://docs.aws.amazon.com/lambda/latest/dg/nodejs-logging.html) </br>
[Accessing Amazon CloudWatch logs for AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/monitoring-cloudwatchlogs.html) </br>
[Nodejs package - winston](https://www.npmjs.com/package/winston) </br>
[Nodejs package - pino](https://www.npmjs.com/package/pino) </br>
