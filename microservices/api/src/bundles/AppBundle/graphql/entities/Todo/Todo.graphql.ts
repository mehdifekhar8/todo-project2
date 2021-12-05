export default /* GraphQL */ `
  type Todo {
    _id: ObjectId
    done: Boolean!
    index: Int
    titel: String!
    user: User
    userId: ObjectId
  }
`;
