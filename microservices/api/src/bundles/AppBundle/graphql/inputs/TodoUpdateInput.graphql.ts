export default /* GraphQL */ `
  input TodoUpdateInput {
    deadline: Date
    description: String
    index: Int
    isDone: Boolean
    title: String
  }
`;
