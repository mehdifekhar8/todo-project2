import { Service } from "@bluelibs/core";
import { TodoEditForm as BaseTodoEditForm } from "./TodoEditForm.base";
import { QueryBodyType } from "@bluelibs/x-ui";
import { Todo } from "@bundles/UIAppBundle/collections";

@Service({ transient: true })
export class TodoEditForm extends BaseTodoEditForm {
  build() {
    super.build();
    this.remove("userId")
    this.remove("index")
    // Perform additional modifications such as updating rendering functions, labels, description
  }

  static getRequestBody(): QueryBodyType<Todo> {
    // You have the ability to modify the request by adding certain fields or relations

    return super.getRequestBody();
  }
}
