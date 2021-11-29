import { Schema, Is, a, an } from "@bluelibs/validator-bundle";
import { TodoUpdateInput as BaseTodoUpdateInput } from "./TodoUpdate.input.base";

@Schema()
export class TodoUpdateInput extends BaseTodoUpdateInput {
  // You can extend the base here
}
