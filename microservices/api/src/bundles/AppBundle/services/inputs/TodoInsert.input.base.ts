/** overridable */
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class TodoInsertInput {
  @Is(an.objectId().required())
  userId: any;

  @Is(a.boolean().required())
  done: boolean;

  @Is(a.string().required())
  titel: string;
}
