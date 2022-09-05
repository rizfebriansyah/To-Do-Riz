import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

export const uploadFile = async (file) => {
  const fileData = await (await fetch(file)).blob();
  const storage = getStorage();
  const fileRef = ref(storage, fileData._data.name);
  const uploadTask = uploadBytesResumable(fileRef, fileData);

  return new Promise(async (resolve, reject) => {
  uploadTask.on(
    "state_changed",
    (snapshot) => {},
    (error) => {
      reject(error)
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        resolve(downloadURL)
      });
    }
  );})
};
