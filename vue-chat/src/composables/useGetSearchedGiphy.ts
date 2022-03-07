import { Ref, ref } from "vue";
import { searchGiphy } from "../api-client/searchGiphy";

/**
 * Reactive `Chatrooms`
 */
export async function useGetSearchedGiphy(searchTerm: string) {
  const gifs: Ref<any> = ref([]);

  const data = await searchGiphy(searchTerm);

  const formattedGifs = data
    .map((gif) => gif.id)
    .map((gifId) => {
      return `https://media.giphy.com/media/${gifId}/giphy.gif`;
    });

  return { formattedGifs };
}
