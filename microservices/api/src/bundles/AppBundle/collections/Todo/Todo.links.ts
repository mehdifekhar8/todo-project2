import { UsersCollection } from "./../Users/Users.collection";
import { IBundleLinkCollectionOption } from "@bluelibs/mongo-bundle";

// Export link names as constants with type of: IBundleLinkCollectionOption, sample:
// export const myCustomLink: IBundleLinkCollectionOption = { ... }

export const user: IBundleLinkCollectionOption = {
  collection: () => UsersCollection,
  field: "userId",
};
