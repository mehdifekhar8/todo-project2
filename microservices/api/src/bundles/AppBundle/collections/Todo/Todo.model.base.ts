/** overridable */
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";
import { User } from "../";

@Schema()
export class Todo {
  User: User;

  @Is(an.objectId().required())
  UserId: any;

  @Is(an.objectId())
  _id?: any;

  @Is(a.boolean().required())
  done: boolean;

  @Is(a.string().required())
  titel: string;
}
