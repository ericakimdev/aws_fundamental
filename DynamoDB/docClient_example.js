getData(id) {
    let params = {
        TableName: tableName,
        Key: { id: id }
    }

    var documentClient = new AWS.DynamoDB.DocumentClient();
    return new Promise((resolve, reject) => {
        documentClient.get(params, function (err, data) {
            if (err) reject(err);
            resolve(data);
        })
    });
}

createData(data) {
    var newId = uuidv4();
    var params = {
        TableName : tableName,
        Item: {
            id: newId,
            name: data.name,
            created: createdTime,
            modified: createdTime,
            created_by_ID: data.created_by_ID,
            modified_by_ID: data.modified_by_ID
        }
    };

    var documentClient = new AWS.DynamoDB.DocumentClient();
    return new Promise((resolve, reject) => {
        documentClient.put(params, function (err, data) {
            if (err) reject(err);
            resolve(data);
        })
    });
}

updateData(data) {
    var params = {
        TableName : tableName,
        Key: { id: data.id },
        UpdateExpression: 'set #sur_name = :sur_name, #sur_modified = :sur_modified, #sur_modified_by_ID = :sur_modified_by_ID',
        ExpressionAttributeValues: {
            ':sur_name': data.name,
            ':sur_modified': modifiedTime,
            ':sur_modified_by_ID': data.modified_by_ID
        },
        ExpressionAttributeNames: {
            '#sur_name': 'name',
            '#sur_modified': 'modified',
            '#sur_modified_by_ID': 'modified_by_ID'
        }
    };

    var documentClient = new AWS.DynamoDB.DocumentClient();
    return new Promise((resolve, reject) => {
        documentClient.update(params, function (err, data) {
            if (err) reject(err);
            resolve(data);
        })
    });
}

deleteData(id) {
    let params = {
        TableName: tableName,
        Key: { id: id },
    }

    var documentClient = new AWS.DynamoDB.DocumentClient();
    return new Promise((resolve, reject) => {
        documentClient.delete(params, function (err, data) {
            if (err) reject(err);
            resolve(data);
        })
    });
}

listData() {
    let params = {
        TableName: tableName
    }

    var documentClient = new AWS.DynamoDB.DocumentClient();
    return new Promise((resolve, reject) => {
        documentClient.scan(params, function (err, data) {
            if (err) reject(err);
            resolve(data);
        })
    });
} 

