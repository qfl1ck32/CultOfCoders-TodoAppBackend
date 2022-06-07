export default /* GraphQL */ `
  type Mutation {
    EndUsersRegister(input: RegistrationInput!): EndUsersRegisterResponse
  }

  type EndUsersRegisterResponse {
    token: String
  }
`;
