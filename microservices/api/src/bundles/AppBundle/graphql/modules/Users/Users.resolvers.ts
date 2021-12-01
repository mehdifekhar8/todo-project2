import * as X from "@bluelibs/x-bundle";
import { IGraphQLContext, InputType, IResolverMap } from "@bluelibs/graphql-bundle";
import { UserInsertInput, UserUpdateInput,UserRegistrationInput } from "../../../services/inputs";
import { UsersCollection } from "../../../collections/Users/Users.collection";
import { RegistrationInput, XPasswordService } from "@bluelibs/x-password-bundle";
import { objectId } from "yup";
import { ObjectId } from "@bluelibs/ejson";
import { UserRole } from "../../../collections/Users/enums/UserRole.enum";


export default {
  Query: [
    [],
    {
      UsersFindOne: [X.ToNovaOne(UsersCollection)],
      UsersFind: [X.ToNova(UsersCollection)],
      UsersCount: [X.ToCollectionCount(UsersCollection)],
    },
  ],
  Mutation: [
    [],
    {
      UsersInsertOne: [
        X.CheckPermission("ADMIN"),
        X.ToModel(UserInsertInput, { field: "document" }),
        X.Validate({ field: "document" }),
        X.ToDocumentInsert(UsersCollection),
        X.ToNovaByResultID(UsersCollection),
      ],
      UsersUpdateOne: [
        X.CheckPermission("ADMIN"),
        X.ToModel(UserUpdateInput, { field: "document" }),
        X.Validate({ field: "document" }),
        X.CheckDocumentExists(UsersCollection),
        X.ToDocumentUpdateByID(UsersCollection, null, ({ document }) => ({
          $set: document,
        })),
        X.ToNovaByResultID(UsersCollection),
      ],
      UsersDeleteOne: [
        X.CheckPermission("ADMIN"),
        X.CheckDocumentExists(UsersCollection),
        X.ToDocumentDeleteByID(UsersCollection),
      ],
      UserRegistration : [
        X.ToModel(UserRegistrationInput, { field: "document" }),
        X.Validate({ field: "document" }),
        async (_, args, ctx) => {
          const { container } = ctx;
          const xPasswordService = container.get(XPasswordService);
          const collection = container.get(UsersCollection);
          const { userId, token } = await xPasswordService.register({
            email:args.document.email,
            password:args.document.password,
            firstName:args.document.profile.firstName,
            lastName:args.document.profile.lastName
          }); 
           await collection.updateOne(
            { _id: new ObjectId(userId) },
            { 
              $set: {  roles: [UserRole.USER] }
            })
        return (userId) ? true : false ; 
        }, 
      ]
    },
  ],
  Subscription: {
    UsersSubscription: {
      resolve: (payload) => payload,
      subscribe: [X.ToSubscription(UsersCollection)],
    },
    UsersSubscriptionCount: {
      resolve: (payload) => payload,
      subscribe: [X.ToSubscriptionCount(UsersCollection)],
    },
  },
} as IResolverMap;
