import { setDoc } from "firebase/firestore";
import { Ref } from "vue";

/**
 * @Name createMessage
 * @description
 * Create a new message in firestore
 */
export const createMessage = async (
  newMessageRef: any,
  newMessageText: Ref,
  uid: string,
  downloadURL?: string | null
) => {
  // AudioURL is null if the user didn't record anything
  if (downloadURL) {
    await setDoc(newMessageRef, {
      text: newMessageText.value,
      sender: uid,
      createdAt: Date.now(),
      audioURL: downloadURL,
    });
  } else {
    await setDoc(newMessageRef, {
      text: newMessageText.value,
      sender: uid,
      createdAt: Date.now(),
    });
  }
};
