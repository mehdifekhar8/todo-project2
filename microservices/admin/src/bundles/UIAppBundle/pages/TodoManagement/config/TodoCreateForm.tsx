import { Service } from "@bluelibs/core";
import { TodoCreateForm as BaseTodoCreateForm } from "./TodoCreateForm.base";

@Service({ transient: true })
export class TodoCreateForm extends BaseTodoCreateForm {
  build() {
    super.build();
    this.remove("userId")

    // Perform additional modifications such as updating rendering functions, labels, description
  }
}
