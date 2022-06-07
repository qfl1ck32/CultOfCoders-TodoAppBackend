export default /* GraphQL */ `
  input TodoInsertInput {
    deadline: Date
    description: String
    index: Int!
    isDone: Boolean!
    title: String!
  }
`;
