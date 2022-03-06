import { db } from "@/firebase";
import { collection, onSnapshot, query } from "firebase/firestore";
import { ref } from "vue";

/**
 * Reactive `Chatrooms`
 */
export function useGetChatRooms() {
  const chats: any = ref([]);

  const q = query(collection(db, "chats"));

  onSnapshot(q, (querySnapshot) => {
    chats.value = [];
    querySnapshot.forEach((doc) => {
      chats.value.push({ id: doc.id, ...doc.data() });
    });
  });
  return { chats };
}
