import * as X from "@bluelibs/x-bundle";
import { IResolverMap } from "@bluelibs/graphql-bundle";

import { EndUsersTodosDeleteInput } from "../../../services/inputs/EndUsersTodosDelete.input";
import { TodoService } from "../../../services/Todo.service";

export default {
  Mutation: {
    EndUsersTodosDelete: [
      X.CheckLoggedIn(),
      X.CheckPermission(["ADMIN"]),
      X.ToModel(EndUsersTodosDeleteInput),
      X.Validate(),
      X.ToService(TodoService, "delete"),
    ],
  },
} as IResolverMap;
