import * as X from "@bluelibs/x-bundle";
import { IResolverMap } from "@bluelibs/graphql-bundle";

import { EndUsersTodosUpdateInput } from "../../../services/inputs/EndUsersTodosUpdate.input";
import { TodoService } from "../../../services/Todo.service";

export default {
  Mutation: {
    EndUsersTodosUpdate: [
      X.CheckLoggedIn(),
      X.CheckPermission(["ADMIN"]),
      X.ToModel(EndUsersTodosUpdateInput),
      X.Validate(),
      X.ToService(TodoService, "update"),
    ],
  },
} as IResolverMap;
