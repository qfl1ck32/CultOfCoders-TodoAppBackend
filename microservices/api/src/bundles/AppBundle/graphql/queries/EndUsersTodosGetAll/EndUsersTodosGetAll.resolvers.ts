import * as X from "@bluelibs/x-bundle";
import { IResolverMap } from "@bluelibs/graphql-bundle";

import { TodoService } from "../../../services/Todo.service";

export default {
  Query: {
    EndUsersTodosGetAll: [
      X.CheckLoggedIn(),
      X.CheckPermission(["ADMIN"]),
      X.ToService(TodoService, "getAll", (_, ctx) => [ctx.userId]),
    ],
  },
} as IResolverMap;
