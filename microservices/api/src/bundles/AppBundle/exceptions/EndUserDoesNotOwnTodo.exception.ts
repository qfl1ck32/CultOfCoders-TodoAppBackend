import { Exception } from "@bluelibs/core";

export class EndUserDoesNotOwnTodoException extends Exception<any> {
  getMessage() {
    // Note: you have access to this.data
    return `Exception EndUserDoesNotOwnTodo has occured.`;
  }
}
