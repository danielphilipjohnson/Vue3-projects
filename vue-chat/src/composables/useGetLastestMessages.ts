import { db } from "@/firebase";
import {
  collection,
  limitToLast,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { Ref, ref } from "vue";

/**
 * Reactive `Chatrooms`
 */
export function useGetLatestMessages(chatID: Ref) {
  const messages: Ref = ref([]);

  const chatQuery = query(
    collection(db, "chats", `${chatID.value}`, "messages"),
    orderBy("createdAt"),
    limitToLast(10)
  );

  onSnapshot(chatQuery, (querySnapshot) => {
    messages.value = [];
    querySnapshot.forEach((doc) => {
      messages.value.push({ id: doc.id, ...doc.data() });
    });
  });
  return { messages };
}
