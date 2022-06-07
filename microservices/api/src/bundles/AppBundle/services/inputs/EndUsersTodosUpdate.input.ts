import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class EndUsersTodosUpdateInput {
  @Is(a.objectId().required())
  todoId: ObjectId;

  @Is(a.string().nullable())
  title?: string;

  @Is(a.string().nullable())
  description?: string;

  @Is(a.date().nullable())
  deadline?: Date;

  @Is(a.boolean().nullable())
  isDone?: boolean;
}
