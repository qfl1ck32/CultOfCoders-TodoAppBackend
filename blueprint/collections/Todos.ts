import { collection, field, shortcuts } from "../utils";

export const Todos = collection({
  id: "Todos",

  behaviors: {
    blameable: true,
    softdeletable: true,
    timestampable: true,
  },

  fields: [
    field.string("title"),

    field.string("description", {
      isRequired: !true,
    }),

    field.boolean("isDone"),

    field.date("deadline", {
      isRequired: !true,
    }),

    field.integer("index"),

    ...shortcuts.fields.timestampable(),
  ],

  relations: [...shortcuts.relations.blameable()],
});
