import {
  Service,
  Inject,
  EventManager,
  ContainerInstance,
} from "@bluelibs/core";
import { ObjectId } from "@bluelibs/ejson";
import { TodosCollection } from "../collections";
import { EndUserDoesNotOwnTodoException } from "../exceptions/EndUserDoesNotOwnTodo.exception";

@Service()
export class TodoSecurityService {
  @Inject()
  private collection: TodosCollection;

  public async checkEndUserOwnsTodo(todoId: ObjectId, userId: ObjectId) {
    const count = await this.collection.count({
      _id: todoId,
      createdById: userId,
    });

    if (count === 0) {
      throw new EndUserDoesNotOwnTodoException();
    }
  }
}
