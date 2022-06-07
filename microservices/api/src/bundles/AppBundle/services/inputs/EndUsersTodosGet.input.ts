import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class EndUsersTodosGetInput {
  @Is(an.objectId().required())
  todoId: ObjectId;
}
