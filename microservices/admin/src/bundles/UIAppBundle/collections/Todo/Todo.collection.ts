import {
  Collection,
  CollectionLinkConfig,
  CollectionTransformMap,
} from "@bluelibs/x-ui";
import { Todo } from "@root/api.types";
import { UsersCollection } from "@bundles/UIAppBundle/collections";
import { ObjectId } from "@bluelibs/ejson";

export type { Todo };

export class TodoCollection extends Collection<Todo> {
  getName() {
    return "Todo";
  }

  getInputs() {
    return {
      insert: "TodoInsertInput!",
      update: "TodoUpdateInput!",
    };
  }

  // Return here the relations with other configs
  getLinks(): CollectionLinkConfig<Todo>[] {
    return [
      {
        collection: () => UsersCollection,
        name: "User",
        field: "UserId",
      },
    ];
  }

  // Return here how you want to transform certain fields
  getTransformMap(): CollectionTransformMap<Todo> {
    return {};
  }
}
