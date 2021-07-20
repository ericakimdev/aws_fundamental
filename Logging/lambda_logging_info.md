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

### 4. A Common Sense Logging Format

Generally speaking, a good log message contains at least three vital pieces of information. 
A timestamp — So that we can compare entries based on their time output. 
A log level — To tell use how descriptive or severe our log is. 
A message — To give us details about our log.

### 5. Data You Shouldn’t Log
It’s that whilst we may want to we can’t log all data all of the time. Policies such as the EU’s GDPR work to protect users from their data being breached and logs pose a threat to our users data. 

Some examples of data that we shouldn’t log are: 
```
account numbers
passwords
credit card numbers
encryption keys
social security numbers
email addresses
```

### 6. Reference

[AWS Lambda function logging in Node.js](https://docs.aws.amazon.com/lambda/latest/dg/nodejs-logging.html) </br>
[Accessing Amazon CloudWatch logs for AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/monitoring-cloudwatchlogs.html) </br>
[Nodejs package - winston](https://www.npmjs.com/package/winston) </br>
[Nodejs package - pino](https://www.npmjs.com/package/pino) </br>
