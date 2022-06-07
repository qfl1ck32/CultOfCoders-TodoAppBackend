import {
  Collection,
  CollectionLinkConfig,
  CollectionTransformMap,
} from "@bluelibs/x-ui";
import { Todo } from "@root/api.types";
import { UsersCollection } from "@bundles/UIAppBundle/collections";
import { ObjectId } from "@bluelibs/ejson";

export type { Todo };

export class TodosCollection extends Collection<Todo> {
  getName() {
    return "Todos";
  }

  getInputs() {
    return {
      insert: "TodoInsertInput!",
      update: "TodoUpdateInput!",
    };
  }

  // Return here the relations with other configs
  getLinks(): CollectionLinkConfig<Todo>[] {
    return [
      {
        collection: () => UsersCollection,
        name: "createdBy",
        field: "createdById",
      },
      {
        collection: () => UsersCollection,
        name: "updatedBy",
        field: "updatedById",
      },
    ];
  }

  // Return here how you want to transform certain fields
  getTransformMap(): CollectionTransformMap<Todo> {
    return {
      deadline: (v) => (v && new Date(v) ? new Date(v) : v),
      createdAt: (v) => (v && new Date(v) ? new Date(v) : v),
      updatedAt: (v) => (v && new Date(v) ? new Date(v) : v),
    };
  }
}
