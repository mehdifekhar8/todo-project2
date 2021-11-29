import { Schema, Is, a, an } from "@bluelibs/validator-bundle";
import { Todo as BaseTodo } from "./Todo.model.base";

@Schema()
export class Todo extends BaseTodo {
  // You can extend the base here
}
