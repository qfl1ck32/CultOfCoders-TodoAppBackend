/** @overridable */
import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class TodoUpdateInput {
  @Is(a.date().nullable())
  deadline?: Date;

  @Is(a.string().nullable())
  description?: string;

  @Is(a.number().nullable())
  index?: number;

  @Is(a.boolean().nullable())
  isDone?: boolean;

  @Is(a.string().nullable())
  title?: string;
}
