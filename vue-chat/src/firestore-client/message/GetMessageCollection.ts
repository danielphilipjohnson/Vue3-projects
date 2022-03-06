import { collection, doc } from "firebase/firestore";
import { Ref } from "vue";
import { db } from "../../firebase";
/**
 * @Name getMessageCollection
 * @description
 * return Message Reference
 */
export const getMessageCollection = (chatID: string) => {
  const collectionRef = collection(db, "chats", `${chatID}`, "messages");

  // Add a new document with a generated id
  const newMessageRef = doc(collectionRef);

  return newMessageRef;
};
