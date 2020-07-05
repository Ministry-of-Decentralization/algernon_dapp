const { makeExecutableSchema } = require('@graphql-tools/schema')
const resolvers = require('./resolvers')
const typeDefs = require('./types/index')

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = executableSchema