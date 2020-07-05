var AWS = require("aws-sdk");
const { DYNAMODB_ENDPOINT } = require('../config')

console.log(`dynamodb endpoint ${DYNAMODB_ENDPOINT}`)
AWS.config.update({
  access_key_id:"dummy-id",
  secret_access_key: "dummy-access-key",
  region: "us-west-2",
  endpoint: DYNAMODB_ENDPOINT
});

const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();

module.exports = {
  dynamodb,
  docClient
}