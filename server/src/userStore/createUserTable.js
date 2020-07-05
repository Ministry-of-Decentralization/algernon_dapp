const dynamodb = require("../connectors/dynamodb")

const tableParams = {
  TableName : "Users",
  KeySchema: [
    { AttributeName: "stakeAddress", KeyType: "HASH"}, //Partition key
  ],
  AttributeDefinitions: [
    { AttributeName: "stakeAddress", AttributeType: "S" }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
  }
};

const createTable = () => {
  try {
    console.log(`Creating user table`)
    dynamodb.dynamodb.createTable(tableParams, (_, data) => {
      {
        console.log('Table created ', data)
      }
    })
  } catch (e) {
    console.log('Could not create table ', e)
  }
}

module.exports = createTable