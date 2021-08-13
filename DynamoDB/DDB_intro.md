# DynamoDB
key value db			
I have to think about how I can retrieve data before saving				
Dynamodb freetier free forever				
25GB data storage				
25 WCU, 25 RCU				
				
To read nessesarry attri in table, use GSI				
한번에 최대한 많이 쓰기, 필요한 것만 읽기				
여러 데이터들을 모아서 한개의 item으로 처리 (e.g. JSON)				
속성값이 큰경우 압축활용 GZIP, LZO로 압축후 Binary타입속성에 저장)				
크기가 큰 속성은 S3에 저장하고 식별자만 DynamoDb 에 저장				
				
Auto Scaling을 적용하라				
				
we don’t have JOIN or GROUP BY in DynamoDB. Instead, we’ve got to structure our data in such a way that it’s “pre-joined” right in the table.				
Create a DynamoDB table with three generic attributes: “partition key”, “sort key”, and “data”				
				
the main table index which uses pk as the partition and sk as the sort key, and a global secondary index which uses sk as the partition and data as the sort.				
				
With only partition key and sort keys, this limits the possible types of query without duplicating data in a table. To solve this issue, DynamoDB also offers two types of indexes:				
				
Local secondary indexes (LSIs): these must be created at the same time the table is created and effectively enable another sort key using the same partition key.				
Global secondary indexes (GSIs): create and delete these at any time, and optionally use a different partition key from the existing table.							
