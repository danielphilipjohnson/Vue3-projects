import { setDoc } from "firebase/firestore";
import { Ref } from "vue";

/**
 * @Name createMessage
 * @description
 * Create a new message in firestore
 */

interface createMessage {
  newMessageRef: any;
  newMessageText: Ref;
  uid: any;
  downloadURL?: string | null;
  gifURL?: string | null;
}
export const createMessage = async ({
  newMessageRef,
  newMessageText,
  uid,
  downloadURL,
  gifURL,
}: createMessage) => {
  // AudioURL is null if the user didn't record anything
  if (downloadURL) {
    await setDoc(newMessageRef, {
      text: newMessageText.value,
      sender: uid,
      createdAt: Date.now(),
      audioURL: downloadURL,
    });
    return;
  }
  if (gifURL) {
    await setDoc(newMessageRef, {
      text: newMessageText.value,
      sender: uid,
      createdAt: Date.now(),
      gifURL: gifURL,
    });
    return;
  } else {
    await setDoc(newMessageRef, {
      text: newMessageText.value,
      sender: uid,
      createdAt: Date.now(),
    });
    return;
  }
};
