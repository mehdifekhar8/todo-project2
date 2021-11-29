export default /* GraphQL */ `
  type Query {
    TodoFindOne(query: QueryInput): Todo
    TodoFindOneByID(_id: ObjectId!): Todo
    TodoFind(query: QueryInput): [Todo]!
    TodoCount(query: QueryInput): Int!
  }

  type Mutation {
    TodoInsertOne(document: TodoInsertInput!): Todo
    TodoUpdateOne(_id: ObjectId!, document: TodoUpdateInput!): Todo!
    TodoDeleteOne(_id: ObjectId!): Boolean
  }

  type Subscription {
    TodoSubscription(body: EJSON): SubscriptionEvent
    TodoSubscriptionCount(filters: EJSON): SubscriptionCountEvent
  }
`;
