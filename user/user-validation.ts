import { User } from "./user";

export function validateUser(user: Partial<User>): boolean {
  // Do all necessary validation here, including checking field values as well as existence.
  // Will say only user's name, username, and email are required.
  // Other checks can inlude the email formatting, username length, etc.
  return !!(user.name && user.username && user.email);
}
