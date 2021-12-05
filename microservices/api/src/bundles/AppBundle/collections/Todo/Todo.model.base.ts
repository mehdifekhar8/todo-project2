/** overridable */
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";
import { User } from "../";

@Schema()
export class Todo {
  @Is(an.objectId())
  _id?: any;

  @Is(a.boolean().required())
  done: boolean;

  @Is(a.number().required())
  index: number;

  @Is(a.string().required())
  titel: string;

  user: User;

  @Is(an.objectId().required())
  userId: any;
}
