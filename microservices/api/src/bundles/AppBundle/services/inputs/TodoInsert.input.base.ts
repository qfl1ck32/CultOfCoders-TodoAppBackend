/** @overridable */
import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class TodoInsertInput {
  @Is(a.date().nullable())
  deadline?: Date;

  @Is(a.string().nullable())
  description?: string;

  @Is(a.number().required())
  index: number;

  @Is(a.boolean().required())
  isDone: boolean;

  @Is(a.string().required())
  title: string;
}
