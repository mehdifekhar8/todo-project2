export default /* GraphQL */ `
  type Todo {
    User: User
    userId: ObjectId
    _id: ObjectId
    done: Boolean!
    titel: String!
  }
`;
