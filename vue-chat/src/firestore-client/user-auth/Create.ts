import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Ref } from "vue";

/**
 * @Name createChatRoom
 * @description
 * Create a new chat room in firestore
 */
export const signInOrCreateUser = async (
  isNewUser: boolean,
  email: Ref,
  password: Ref
) => {
  const auth = getAuth();
  try {
    if (isNewUser) {
      await createUserWithEmailAndPassword(auth, email.value, password.value);
      return [null];
    } else {
      await signInWithEmailAndPassword(auth, email.value, password.value);
      return [null];
    }
  } catch (error: unknown) {
    return error;
  }
};
