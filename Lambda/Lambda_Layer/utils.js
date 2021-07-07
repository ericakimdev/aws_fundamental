const CryptoJS = require('./nodejs/node_modules/crypto-js');

exports.getResponse = (code, bodyMessage) => {
    var response = {
        statusCode: code,
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(bodyMessage),
    };
    return response;
};
