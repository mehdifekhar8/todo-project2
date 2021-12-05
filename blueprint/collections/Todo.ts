import {
  generateProject,
  app,
  collection,
  field,
  relation,
  shortcuts,
  sharedModel,
  GeneratorKind,
  faker,
} from "../utils";

export const Todo = collection({
  id: "Todo",

  mock: {
    count: 10,
  },
  fields: [
    field.string("titel"),
    field.boolean("done"),
    field.integer("index")

  ],
  relations: [

    relation({

      id: "user",
      to: "Users",
    }),


  ]
});
