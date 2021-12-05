import * as X from "@bluelibs/x-bundle";
import { IResolverMap } from "@bluelibs/graphql-bundle";
import { TodoInsertInput, TodoUpdateInput } from "../../../services/inputs";
import { TodoCollection } from "../../../collections/Todo/Todo.collection";
import { ObjectId } from "@bluelibs/ejson";


export default {
  Query: [
    [],
    {
      TodoFindOne: [X.ToNovaOne(TodoCollection)],
      TodoFind: [
        X.ToNova(TodoCollection, async (_, args, ctx, info) => {
          (args.query.filters) ?
            args.query.filters.userId = ctx.userId
            :
            args.query = {
              filters: { userId: ctx.userId }
            }
          return args.query
        })],
      TodoCount: [X.ToCollectionCount(TodoCollection)],
    },
  ],
  Mutation: [
    [],
    {
      TodoInsertOne: [
        X.ToModel(TodoUpdateInput, { field: "document" }), 
        X.ToDocumentInsert(TodoCollection, "document", async (document, ctx) => {
          const { container } = ctx;
          const collection = container.get(TodoCollection);
          document.userId = ctx.userId
          const  getLastDocument = await  collection.find({userId: ctx.userId }).sort({index:-1}).limit(1).toArray()
          document.index =  (getLastDocument[0])? getLastDocument[0].index + 1 : 1
          // why not use count ? 
          // let list  of indexs [1,2,3,4,5]
          // delete fourth  element from list 
          // [1,2,3,5]
          // add new index
          // variable = list.count() = 4 
          // new  index = 4 + 1 
          // final list = [1,2,3,5,5]  (duplicated index )  => error 
          // soulution : get the index with max value and add one  of the document with the max index value  
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
