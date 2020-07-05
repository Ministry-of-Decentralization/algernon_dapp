const typeDefs = `
input CreateUserInput {
  stakeAddress: String!
  username: String!
  password: String!
}

type User {
  stakeAddress: String
  username: String
  password: String
  organization: String
  description: String
  profileImage: String
}

input UpdateUserProfileInput {
  stakeAddress: String!
  username: String
  description: String
  organization: String
  profileImage: String
}

type Query {
  health: String
  getUser(stakeAddress: String!): User
  getUsers: [User!]!
  getFile(hash: String!): String
}

type Mutation {
  addFile(file: String!): String
  createUser(input: CreateUserInput!): User
  updateUserProfile(update: UpdateUserProfileInput!): User
}
`

module.exports = typeDefs