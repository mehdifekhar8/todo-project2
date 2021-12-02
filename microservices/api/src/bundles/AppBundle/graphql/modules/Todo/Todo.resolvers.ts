import * as X from "@bluelibs/x-bundle";
import { IResolverMap } from "@bluelibs/graphql-bundle";
import { TodoInsertInput, TodoUpdateInput } from "../../../services/inputs";
import { TodoCollection } from "../../../collections/Todo/Todo.collection";


export default {
  Query: [
    [],
    {
      TodoFindOne: [X.ToNovaOne(TodoCollection)],
      TodoFind: [
        X.ToNova(TodoCollection, async (_, args, ctx, info) => {
        return {
          filters: {
            userId: ctx.userId
          },
          options: {},
        };
      })], TodoCount: [X.ToCollectionCount(TodoCollection)],
    },
  ],
  Mutation: [
    [],
    {
      TodoInsertOne: [
        X.ToModel(TodoUpdateInput, { field: "document" }),
        X.ToDocumentInsert(TodoCollection, "document", async (document, ctx) => {
          document.userId = ctx.userId
          X.Validate({ field: "document" });
        }),
        X.ToNovaByResultID(TodoCollection),
      ],
      TodoUpdateOne: [
        X.ToModel(TodoUpdateInput, { field: "document" }),
        X.CheckDocumentExists(TodoCollection),
        X.Secure.IsUser(TodoCollection, "userId", "_id"),
        async (_, args, ctx) => {
          const { container } = ctx;
          const collection = container.get(TodoCollection);
          args.document.userId = ctx.userId;
          return await collection.updateOne(
            { _id: args._id },
            {
              $set: args.document
            })
        },
      ],
      TodoDeleteOne: [
        X.Secure.IsUser(TodoCollection, "userId", "_id"),
        X.CheckDocumentExists(TodoCollection),
        X.ToDocumentDeleteByID(TodoCollection),
      ],
    },
  ],
  Subscription: {
    TodoSubscription: {
      resolve: (payload) => payload,
      subscribe: [X.ToSubscription(TodoCollection)],
    },
    TodoSubscriptionCount: {
      resolve: (payload) => payload,
      subscribe: [X.ToSubscriptionCount(TodoCollection)],
    },
  },
} as IResolverMap;
