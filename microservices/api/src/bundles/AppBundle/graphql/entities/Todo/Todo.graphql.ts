export default /* GraphQL */ `
  type Todo {
    User: User
    UserId: ObjectId
    _id: ObjectId
    done: Boolean!
    titel: String!
  }
`;
