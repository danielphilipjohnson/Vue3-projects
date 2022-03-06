/**
 * @Name Auth Error Handle
 * @description
 * Return error message
 */

import { FirebaseError } from "firebase/app";

export const AuthErrorHandle = (error: FirebaseError) => {
  switch (error.code) {
    case "auth/invalid-email":
      return "Invalid email";
    case "auth/email-already-exists":
      return "Email already exists";
    case "auth/internal-error":
      return "Something Went Wrong!";
    case "auth/invalid-password":
      return "Something Went Wrong";
    default:
      return "Something Went Wrong!";
  }
};
