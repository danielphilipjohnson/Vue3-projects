import { Ref, ref } from "vue";

/**
 * Reactive `Chat audio`
 */
export function useGetChatRooms() {
  const newAudio: Ref<Blob | null> = ref(null);
  const recorder: Ref = ref(null);

  const record = async () => {
    newAudio.value = null;

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });

    const options = { mimeType: "audio/webm" };
    const recordedChunks: any[] = [];
    recorder.value = new MediaRecorder(stream, options);

    recorder.value.addEventListener(
      "dataavailable",
      (e: { data: { size: number } }) => {
        if (e.data.size > 0) {
          recordedChunks.push(e.data);
        }
      }
    );

    recorder.value.addEventListener("stop", () => {
      newAudio.value = new Blob(recordedChunks);
      console.log(newAudio);
    });

    recorder.value.start();
  };
  return { record };
}