const { gql } = require("apollo-server")

const typeDefs = gql`
    type Query {
        product(id: ID!): Product
        products: [Product]
        user(id: ID!): User
        users: [User]
    }
    type Product {
        id: ID!
        name: String!
        description: String
        creator: User!
    }
    input ProductInput {
        name: String!
        description: String
    }
    type User {
        id: ID!
        first_name: String!
        last_name: String!
        email: String!
        products: [Product]
    }
    input UserInput {
        names: String!
        email: String!
    }
    type Mutation {
        createProduct(product: ProductInput!): Product
        createUser(user: UserInput!): User
        login(email: String!): User
    }
`
module.exports = typeDefs