import * as X from "@bluelibs/x-bundle";
import { IResolverMap } from "@bluelibs/graphql-bundle";

import { EndUsersTodosGetInput } from "../../../services/inputs/EndUsersTodosGet.input";
import { TodoService } from "../../../services/Todo.service";

export default {
  Query: {
    EndUsersTodosGet: [
      X.CheckLoggedIn(),
      X.CheckPermission(["ADMIN"]),
      X.ToModel(EndUsersTodosGetInput),
      X.Validate(),
      X.ToService(TodoService, "get"),
    ],
  },
} as IResolverMap;
