import { Service } from "@bluelibs/core";
import { QueryBodyType } from "@bluelibs/x-ui";
import { Todo } from "@bundles/UIAppBundle/collections";
import { TodoViewer as BaseTodoViewer } from "./TodoViewer.base";

@Service({ transient: true })
export class TodoViewer extends BaseTodoViewer {
  build() {
    super.build();
    this.remove("UserId")

    // Perform additional modifications such as updating rendering functions, labels, description
  }

  static getRequestBody(): QueryBodyType<Todo> {
    // You have the ability to modify the request by adding certain fields or relations

    return super.getRequestBody();
  }
}
