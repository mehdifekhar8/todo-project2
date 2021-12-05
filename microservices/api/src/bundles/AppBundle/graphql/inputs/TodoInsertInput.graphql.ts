export default /* GraphQL */ `
  input TodoInsertInput {
    done: Boolean!
    index: Int
    titel: String!
    userId: ObjectId
  }
`;
