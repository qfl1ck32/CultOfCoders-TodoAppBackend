/** @overridable */
import { ObjectId } from "@bluelibs/ejson";
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";
import { User } from "../";

@Schema()
export class Todo {
  @Is(an.objectId())
  _id?: ObjectId;

  /**
   * @description Represents the date when this object was created
   */
  @Is(a.date().required())
  createdAt: Date;

  /**
   * @description Represents the user who has created this object
   */
  createdBy?: User;

  /**
   * @description Represents the user's id who has created this object
   */
  @Is(an.objectId().nullable())
  createdById?: ObjectId;

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

  /**
   * @description Represents the last time when the object was updated
   */
  @Is(a.date().required())
  updatedAt: Date;

  /**
   * @description Represents the user who has made the latest update on this object
   */
  updatedBy?: User;

  /**
   * @description Represents the user's id who has made the latest update on this object
   */
  @Is(an.objectId().nullable())
  updatedById?: ObjectId;
}
