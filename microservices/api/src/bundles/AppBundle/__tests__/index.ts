import "./TodoSecurity.service.test.ts";
import "./EndUser.service.test.ts";
import "./Todo.service.test.ts";
import { container } from "@root/__tests__/ecosystem";
import { AppFixture } from "../fixtures";
// import { container } from "../../../__tests__/ecosystem";

test("dummy", () => {
  // Feel free to use container as if you were in a kernel context
  expect(true).toBe(true);
});

// TODO: shouldn't really use AppFixture, but it already has this "clean" functionality
beforeAll(async () => {
  return container.get(AppFixture).clean();
});

afterEach(async () => {
  return container.get(AppFixture).clean();
});
