import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import { toast } from "react-toastify";

export default function useFirebaseImage(setValue, getValues) {
  const [progress, setProgress] = useState();
  const [urlImage, setUrlImage] = useState("");
  if (!setValue || !getValues) return;
  const handleUploadImage = (fileImage) => {
    const storage = getStorage();
    const storageRef = ref(storage, "images/" + fileImage?.name);
    if (!fileImage) return;
    const uploadTask = uploadBytesResumable(storageRef, fileImage);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progressPersent =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressPersent);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            return null;
        }
      },
      (error) => {
        toast(error.code);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUrlImage(downloadURL);
          setProgress(0);
        });
      }
    );
  };
  const handleDeleteImage = () => {
    const storage = getStorage();
    if (!urlImage) return;
    const desertRef = ref(storage, "images/" + getValues("image_name"));
    deleteObject(desertRef)
      .then(() => {
        setUrlImage("");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSelectImage = (e) => {
    const fileImage = e.target.files[0];
    if (!fileImage) return;
    setValue("image_name", fileImage?.name);
    handleUploadImage(fileImage);
  };

  return {
    urlImage,
    progress,
    handleSelectImage,
    handleDeleteImage,
    handleUploadImage,
  };
}
