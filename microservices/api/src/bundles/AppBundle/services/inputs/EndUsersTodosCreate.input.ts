import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class EndUsersTodosCreateInput {
  @Is(a.string().required())
  title: string;

  @Is(a.string().nullable())
  description?: string;

  @Is(a.date().nullable())
  deadline?: Date;
}
