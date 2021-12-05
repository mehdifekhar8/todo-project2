/** overridable */
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class TodoUpdateInput {
  @Is(a.boolean().nullable())
  done?: boolean;

  @Is(a.number().nullable())
  index?: number;

  @Is(a.string().nullable())
  titel?: string;

  @Is(an.objectId().nullable())
  userId?: any;
}
