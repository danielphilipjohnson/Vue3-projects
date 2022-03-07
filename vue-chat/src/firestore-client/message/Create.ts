import { DocumentReference, setDoc } from "firebase/firestore";
import { Ref } from "vue";

/**
 * @Name createMessage
 * @description
 * Create a new message in firestore
 */

interface refMessage {
  newMessageRef: DocumentReference;
  newMessageText: Ref;
  uid: string;
  downloadURL?: string | null;
  gifURL?: string | null;
}
interface message {
  text: string;
  sender: string;
  createdAt: number;
  downloadURL?: string | null;
  gifURL?: string | null;
}

export const createMessage = async ({
  newMessageRef,
  newMessageText,
  uid,
  downloadURL,
  gifURL,
}: refMessage) => {
  const baseOBJ: message = {
    text: newMessageText.value,
    sender: uid,
    createdAt: Date.now(),
  };

  if (downloadURL) {
    baseOBJ.downloadURL = downloadURL;
  }

  if (gifURL) {
    baseOBJ.gifURL = gifURL;
  }

  await setDoc(newMessageRef, baseOBJ);
};
