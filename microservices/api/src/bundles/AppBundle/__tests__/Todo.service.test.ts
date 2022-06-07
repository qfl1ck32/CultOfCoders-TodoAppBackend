import { TodoService } from "../services/Todo.service";
import { container } from "../../../__tests__/ecosystem";
import { EndUserService } from "../services/EndUser.service";

// Jest Setup & Teardown: https://jestjs.io/docs/en/setup-teardown
// API: https://jestjs.io/docs/en/api
// Expect: https://jestjs.io/docs/en/expect

describe.only("TodoService", () => {
  test("create()", async () => {
    throw new Error("Test not implemented.");
  });
  test("get()", async () => {
    throw new Error("Test not implemented.");
  });
  test("getAll()", async () => {
    throw new Error("Test not implemented.");
  });
  test("delete()", async () => {
    throw new Error("Test not implemented.");
  });
  test("update()", async () => {
    throw new Error("Test not implemented.");
  });
  test.only("changeOrder()", async () => {
    const endUserService = container.get(EndUserService);
    const todoService = container.get(TodoService);

    const { userId } = await endUserService.register({
      firstName: "First name",
      lastName: "Last name",
      email: "test@app.com",
      password: "iulianrules",
    });

    let todoIds = [];

    for (let i = 0; i < 5; ++i) {
      // Rusu Andrei waz here
      const todo = await todoService.create(
        {
          title: `Test - ${i}`,
        },
        userId
      );

      todoIds.push(todo._id);
    }

    await todoService.changeOrder(
      {
        todoId: todoIds[0],
        index: todoIds.length - 1,
      },
      userId
    );

    let todos = await todoService.getAll(userId);

    expect(todos[todos.length - 1]._id).toStrictEqual(todoIds[0]); // Iulian waz h e r e

    // todoIds = todos.map((todo) => todo._id);

    // await todoService.changeOrder(
    //   {
    //     todoId: todoIds[0],
    //     index: 0,
    //   },
    //   userId
    // );

    // todos = await todoService.getAll(userId);

    // expect(todos[0]._id).toStrictEqual(todoIds[0]);

    // await todoService.changeOrder(
    //   {
    //     todoId: todoIds[0],
    //     index: todoIds.length - 1,
    //   },
    //   userId
    // );

    // todos = await todoService.getAll(userId);

    // todoIds = todos.map((todo) => todo._id);

    // console.log({ todos });

    // expect(todos[todoIds.length - 1]._id).toStrictEqual(todoIds[0]);
  });
});
