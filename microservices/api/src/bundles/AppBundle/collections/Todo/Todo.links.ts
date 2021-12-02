import { UsersCollection } from "./../Users/";
import { IBundleLinkCollectionOption } from "@bluelibs/mongo-bundle";

// Export link names as constants with type of: IBundleLinkCollectionOption, sample:
// export const myCustomLink: IBundleLinkCollectionOption = { ... }

export const User: IBundleLinkCollectionOption = {
  collection: () => UsersCollection,
  field: "userId",
};
