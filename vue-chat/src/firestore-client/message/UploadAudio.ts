import { getDownloadURL, uploadBytesResumable } from "firebase/storage";

/**
 * @Name createMessage
 * @description
 * Create a new message in firestore
 */
export const createMessage = async (
  ext: any,
  newAudio: any,
  onSuccess: (downloadURL: string) => void
) => {
  const uploadTask = uploadBytesResumable(ext, newAudio);

  // Register three observers:
  // 1. 'state_changed' observer, called any time the state changes
  // 2. Error observer, called on failure
  // 3. Completion observer, called on successful completion
  uploadTask.on(
    "state_changed",
    (snapshot: any) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error: any) => {
      console.log(error);
      // Handle unsuccessful uploads
    },
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        if (onSuccess) {
          onSuccess(downloadURL);
        }
      });
    }
  );
};
