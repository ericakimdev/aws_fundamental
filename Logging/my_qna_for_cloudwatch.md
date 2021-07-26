My questions:
Hi guys, I hope you have a good day!
I am creating a logger to create and send logs from some Lambdas to a specific logGroup on CloudWatch using Winston and Winston-cloudwatch. (node packages for logging).
It should use the same logStream which is created every day for all lambdas as well.
const winston = require('./nodejs/node_modules/winston');
const WinstonCloudWatch = require('./nodejs/node_modules/winston-cloudwatch');
....
const logger = createLogger(logConfiguration);
logger.add(
    new WinstonCloudWatch({
        logGroupName: 'lambda-logs',
        logStreamName: todate
    })
);
It is very easy to use, but lambdas run very slow when sending logs to Cloudwatch.
So, I found pino which is another node package but just concerned it might have the same issue.
and AWS.CloudWatchLogs but I am a little struggled how to use it.
Do you have any recommendations or the same experiences?

---
Second, you should let Lambda choose the log group and stream for you. 
The log group isn’t of particular importance (I wish they’d let you choose, and I know it’s been requested), but the stream is. 
If your Lambda is really low volume you won’t run into issues, but if you run multiple invocations at the same time you very well might. 
Log streams have limited write capacity. Lambda automatically creates a new stream for each unique invocation so that you don’t run into issues exceeding that capacity.

---
just to jump in: any particular reason you’re using a logger like Winston, rather than just CloudWatch directly?
all I ever do is something like:
console.log(JSON.stringify({
  userId,
  error,
  metadata,
  // etc.
})
when you stringify an object & log it, CloudWatch will parse it and you can actually run queries on all those fields using CloudWatch Log Insights:
fields @timestamp, @message, error
| filter userId = 'd9565df6-0ad9-4a97-8a79-7a6a284887fa'
| sort @timestamp desc

---
There is only one reason that I can think of that would cause Lambda to slow down when writing the logs, 
and that would be because you are running into the limits when trying to write them. 
The AWS SDKs (which I assume are being used by Winston) have retry logic in them, 
so if you try writing a bunch of logs messages and you start to run into throttling it will wait for a bit before trying again. 
If you have to do that for a lot of messages that time could really start to add up. I think you should rethink your strategy here.
If you need some set of data that is collected by day a log isn’t really the best tool for that, and a log stream is even worse. 
Without knowing what the data is being used for, and how it’s being accessed, I can’t really provide alternatives.
---
I would recommend a log subscription to fetch the message you want and forward them to a stream. 
You can subscribe multiple log groups to a stream, but a log group can only have one subscriber. 
So plan accordingly. That way, all the processing is happening out-of-band from your lambda.
You can give a pattern to the subscription and only those records will be forwarded.
https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Subscriptions.html
docs.aws.amazon.comdocs.aws.amazon.com
Real-time processing of log data with subscriptions - Amazon CloudWatch Logs
Use CloudWatch Logs subscriptions to process log data in real-time.
---
If you just want another way to query the logs, besides using CloudWatch itself (I believe Insights uses Athena under the hood) 
then a Firehose subscription to the log would probably be the best option. Have Firehose send it to S3 and use Athena to query it.
---
Beware that if you do Logs -> Firehose -> S3 you will need to unpack those files into something that Athena can query. 
It's unfortunate that AWS doesn't have something that just works out of the gate.

---
can you not use the data format conversion for that?
docs.aws.amazon.comdocs.aws.amazon.com
AWS::KinesisFirehose::DeliveryStream DataFormatConversionConfiguration - AWS CloudFormation
Use the AWS CloudFormation AWS::KinesisFirehose::DeliveryStream.DataFormatConversionConfiguration resource for KinesisFirehose.
---
The problem is that the logs are compressed and base64 encoded.
Which makes sense from a bandwidth perspective.
That said, I've never tried it. I just assumed it would not work.
---
I haven’t tried it either. Didn’t really think about the base64 encoding. I think the compression is from Firehose, so I don’t think that would be an issue.
---
Looking at the code, each Firehose record is a compressed list of log lines.
So the conversion is from one kinesis record to many log records, which sounds rather specific. It's not 1-to-1.
I should probably just try it out and see what garbage comes out or if it works!
---
In this example they used aws glue in between s3 and athena: 
https://aws.amazon.com/blogs/mt/cost-optimization-aws-amazon-cloudwatch-metric-streams-aws-cost-and-usage-reports-and-amazon-athena/







