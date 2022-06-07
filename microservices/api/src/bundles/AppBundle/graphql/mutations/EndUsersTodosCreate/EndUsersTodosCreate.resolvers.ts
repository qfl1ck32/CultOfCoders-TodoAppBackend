import * as X from "@bluelibs/x-bundle";
import { IResolverMap } from "@bluelibs/graphql-bundle";

import { EndUsersTodosCreateInput } from "../../../services/inputs/EndUsersTodosCreate.input";
import { TodoService } from "../../../services/Todo.service";
import { UserRole } from "@bundles/AppBundle/collections";

export default {
  Mutation: {
    EndUsersTodosCreate: [
      X.CheckLoggedIn(),
      X.CheckPermission(UserRole.END_USER),
      X.ToModel(EndUsersTodosCreateInput),
      X.Validate(),
      X.ToService(TodoService, "create"),
    ],
  },
} as IResolverMap;
