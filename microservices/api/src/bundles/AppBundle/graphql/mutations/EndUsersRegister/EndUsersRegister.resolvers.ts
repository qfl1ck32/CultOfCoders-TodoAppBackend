import * as X from "@bluelibs/x-bundle";
import {
  getResult,
  IGraphQLContext,
  IResolverMap,
} from "@bluelibs/graphql-bundle";

import { EndUsersTodosCreateInput } from "../../../services/inputs/EndUsersTodosCreate.input";
import { EndUserService } from "../../../services/EndUser.service";

export default {
  Mutation: {
    EndUsersRegister: [
      X.ToModel(EndUsersTodosCreateInput),
      X.Validate(),
      X.ToService(EndUserService, "register"),
      (_, ctx: IGraphQLContext) => {
        const { token } = getResult(ctx);

        return {
          token,
        };
      },
    ],
  },
} as IResolverMap;
