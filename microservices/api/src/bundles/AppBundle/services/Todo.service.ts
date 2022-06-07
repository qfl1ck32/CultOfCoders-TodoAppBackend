import {
  Service,
  Inject,
  EventManager,
  ContainerInstance,
} from "@bluelibs/core";
import { ObjectId } from "@bluelibs/ejson";
import { TodosCollection } from "../collections";
import { EndUsersTodosChangeOrderInput } from "./inputs/EndUsersTodosChangeOrder.input";
import { EndUsersTodosCreateInput } from "./inputs/EndUsersTodosCreate.input";
import { EndUsersTodosDeleteInput } from "./inputs/EndUsersTodosDelete.input";
import { EndUsersTodosGetInput } from "./inputs/EndUsersTodosGet.input";
import { EndUsersTodosUpdateInput } from "./inputs/EndUsersTodosUpdate.input";
import { TodoSecurityService } from "./TodoSecurity.service";

@Service()
export class TodoService {
  @Inject()
  public collection: TodosCollection;

  @Inject()
  public security: TodoSecurityService;

  public async create(input: EndUsersTodosCreateInput, userId: ObjectId) {
    const index =
      (await this.collection.count({
        createdById: userId,
      })) + 1;

    const { insertedId } = await this.collection.insertOne(
      {
        ...input,
        isDone: false,

        index,
      },
      {
        context: {
          userId,
        },
      }
    );

    return this.collection.findOne({ _id: insertedId });
  }

  public async get(input: EndUsersTodosGetInput, userId: ObjectId) {
    const { todoId } = input;

    await this.security.checkEndUserOwnsTodo(todoId, userId);

    return this.collection.findOne({ _id: todoId });
  }

  public getAll(userId: ObjectId) {
    return this.collection
      .find(
        { createdById: userId },
        {
          sort: [["index", 1]],
        }
      )
      .toArray();
  }

  public async delete(input: EndUsersTodosDeleteInput, userId: ObjectId) {
    const { todoId } = input;

    await this.security.checkEndUserOwnsTodo(todoId, userId);

    await this.collection.deleteOne({ _id: todoId }, { context: { userId } });

    return true;
  }

  public async update(input: EndUsersTodosUpdateInput, userId: ObjectId) {
    const { todoId, ...fieldsToUpdate } = input;

    await this.security.checkEndUserOwnsTodo(todoId, userId);

    const { value } = await this.collection.findOneAndUpdate(
      {
        _id: todoId,
      },
      {
        $set: fieldsToUpdate,
      },
      {
        context: {
          userId,
        },
        returnDocument: "after",
      }
    );

    return value;
  }

  public async changeOrder(
    input: EndUsersTodosChangeOrderInput,
    userId: ObjectId
  ) {
    const { todoId, index } = input;

    await this.security.checkEndUserOwnsTodo(todoId, userId);

    const todos = await this.getAll(userId);

    if (!todos.some((todo) => todo.index === index)) {
      await this.collection.updateOne(
        { _id: todoId },
        {
          $set: {
            index,
          },
        }
      );

      return true;
    }

    const todoIdsToUpdate = todos.map((t) => t._id);

    const todoToUpdateIndex = todoIdsToUpdate.findIndex((id) =>
      id.equals(todoId)
    );

    const [todoToMove] = todos.splice(todoToUpdateIndex, 1);

    todos.splice(index, 0, todoToMove);

    for (const [idx, todo] of todos.entries()) {
      await this.collection.updateOne(
        {
          _id: todo._id,
        },
        {
          $set: {
            index: idx + 1,
          },
        },
        {
          context: { userId },
        }
      );
    }

    return true;
  }
}
