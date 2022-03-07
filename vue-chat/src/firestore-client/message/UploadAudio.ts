import {
  getDownloadURL,
  StorageReference,
  uploadBytesResumable,
  UploadTaskSnapshot,
} from "firebase/storage";

/**
 * @Name createMessage
 * @description
 * Create a new message in firestore
 */
export const upLoadAudioClip = async (
  storageReference: StorageReference,
  newAudio: Blob,
  onSuccess: (downloadURL: string) => void
) => {
  const uploadTask = uploadBytesResumable(storageReference, newAudio);

  // Register three observers:
  // 1. 'state_changed' observer, called any time the state changes
  // 2. Error observer, called on failure
  // 3. Completion observer, called on successful completion
  uploadTask.on(
    "state_changed",
    (snapshot: UploadTaskSnapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(progress);
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error: Error) => {
      console.log(error);
      // Handle unsuccessful uploads
    },
    () => {
      // Handle successful uploads on complete
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        if (onSuccess) {
          onSuccess(downloadURL);
        }
      });
    }
  );
};
