import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class EndUsersTodosDeleteInput {
  @Is(an.objectId().required())
  todoId: ObjectId;
}
