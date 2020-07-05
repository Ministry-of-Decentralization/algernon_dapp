require('dotenv').config()

const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const schema = require('./src/graphql/index')
const createUserTable = require('./src/userStore/createUserTable')

// attempt to create the user table in dynamodb to make sure it exists


createUserTable();
const app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

const port = process.env.PORT || 4000
app.listen(port);
console.log(`Running a GraphQL API server at localhost:${port}/graphql`);