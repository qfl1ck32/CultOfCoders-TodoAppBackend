import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class EndUsersTodosChangeOrderInput {
  @Is(an.objectId().required())
  todoId: ObjectId;

  @Is(a.number().required())
  index: number;
}
