import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
/**
 * @Name createChatRoom
 * @description
 * Create a new chat room in firestore
 */
export const createChatRoom = async (uid: string) => {
  // Add a new document with a generated id.
  await addDoc(collection(db, "chats"), {
    createdAt: Date.now(),
    owner: uid,
    members: [uid],
  });
};
