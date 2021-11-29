/** overridable */
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class TodoUpdateInput {
  @Is(an.objectId().nullable())
  UserId?: any;

  @Is(a.boolean().nullable())
  done?: boolean;

  @Is(a.string().nullable())
  titel?: string;
}
