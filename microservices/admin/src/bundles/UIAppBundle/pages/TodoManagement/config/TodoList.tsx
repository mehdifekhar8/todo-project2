import { Service } from "@bluelibs/core";
import { QueryBodyType } from "@bluelibs/x-ui";
import { Todo } from "@bundles/UIAppBundle/collections";
import { TodoList as BaseTodoList } from "./TodoList.base";

@Service({ transient: true })
export class TodoList extends BaseTodoList {
  build() {
    super.build();
    this.remove("User");

    // Perform additional modifications such as updating how a list item renders or add additional ones
  }

  static getRequestBody(): QueryBodyType<Todo> {
    // You have the ability to modify the request by adding certain fields or relations

    return super.getRequestBody();
  }
}
