import * as X from "@bluelibs/x-bundle";
import { IResolverMap } from "@bluelibs/graphql-bundle";

import { EndUsersTodosChangeOrderInput } from "../../../services/inputs/EndUsersTodosChangeOrder.input";
import { TodoService } from "../../../services/Todo.service";

export default {
  Mutation: {
    EndUsersTodosChangeOrder: [
      X.CheckLoggedIn(),
      X.CheckPermission(["ADMIN"]),
      X.ToModel(EndUsersTodosChangeOrderInput),
      X.Validate(),
      X.ToService(TodoService, "changeOrder"),
    ],
  },
} as IResolverMap;
