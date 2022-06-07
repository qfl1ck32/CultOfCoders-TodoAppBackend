export default /* GraphQL */ `
  input EndUsersTodosUpdateInput {
    todoId: ObjectId!

    title: String
    description: String
    deadline: Date
    isDone: Boolean
  }
`;
