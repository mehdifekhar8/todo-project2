export default /* GraphQL */ `
  input UserRegistrationInput {
    email: String!
    password: String!
    profile: UserProfileInput!

  }

  input UserProfileInput {
    firstName: String!
    lastName: String!
  }
`;
