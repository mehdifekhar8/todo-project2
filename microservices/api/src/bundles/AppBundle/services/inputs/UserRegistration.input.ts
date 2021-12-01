import { Schema, Is, a, an } from "@bluelibs/validator-bundle";
import { UserRegistrationInput as BaseUserRegistrationInput } from "./UserRegistration.input.base";

@Schema()
export class UserRegistrationInput extends BaseUserRegistrationInput {
  // You can extend the base here
}
