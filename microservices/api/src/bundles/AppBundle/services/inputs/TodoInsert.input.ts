import { Schema, Is, a, an } from "@bluelibs/validator-bundle";
import { TodoInsertInput as BaseTodoInsertInput } from "./TodoInsert.input.base";

@Schema()
export class TodoInsertInput extends BaseTodoInsertInput {
  // You can extend the base here
}
