import { buildSchema } from 'graphql';

export default buildSchema(`
type User {
    _id: ID!
    email: String!
    token: String!
    nickname: String!
    role: String!
}
input UserInput {
    email: String!
    password: String!
    confirm: String!
    nickname: String!
    role: String!
}
type RootQuery {
    login(email: String!, password: String!): User
    verifyToken(token: String!): User
}
type RootMutation {
    createUser(userInput: UserInput): User
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`)
