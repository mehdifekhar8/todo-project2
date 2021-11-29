import { Todo } from "./collections/Todo";
import { Users } from "./collections/Users";
import { generateProject, app } from "./utils";

const application = app({
  id: "todo-project2",
  sharedModels: [
    // Configure shared models
  ],
  collections: [Users,Todo],
});

generateProject(application, {
  // Mark this as true when you want to override even the non-overridable files
  // override: true,
});
