import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../firebase/firebase";

export const uploadImage = async (
  rute: string,

  image: File
) => {
  const namaImage = `${Date.now()}_${image.name}`;
  const imgRef = ref(storage, `${rute}/${namaImage}/`);

  try {
    await uploadBytes(imgRef, image);

    const url = await getDownloadURL(imgRef);

    return { url, namaImage };
  } catch (error: any) {
    return null;
  }
};

export const updateImage = async (
  rute: string,
  oldImageName: string,
  newImage: File
) => {
  try {
    // Delete the old image
    const oldImgRef = ref(storage, `${rute}/${oldImageName}`);
    try {
      await deleteObject(oldImgRef);
      console.log("Old image deleted successfully");
    } catch (error: any) {
      if (error.code === "storage/object-not-found") {
        // Ignore this error, object was not found
        console.warn("Old image not found, skipping delete.");
      } else {
        // Log other errors
        console.error("Error deleting old image:", error);
        throw error; // Re-throw if necessary for handling
      }
    }

    // Upload the new image
    const newImageName = `${Date.now()}_${newImage.name}`;
    const newImgRef = ref(storage, `${rute}/${newImageName}`);
    await uploadBytes(newImgRef, newImage);
    const url = await getDownloadURL(newImgRef);

    return { url, namaImage: newImageName };
  } catch (error: any) {
    console.error("Error updating image: ", error);
    return null;
  }
};

export const deleteImage = async (rute: string, imageName: string) => {
  try {
    const imgRef = ref(storage, `${rute}/${imageName}`);
    try {
      await deleteObject(imgRef);
      console.log("Old image deleted successfully");
    } catch (error: any) {
      if (error.code === "storage/object-not-found") {
        // Ignore this error, object was not found
        console.warn("Old image not found, skipping delete.");
      } else {
        // Log other errors
        console.error("Error deleting old image:", error);
        throw error; // Re-throw if necessary for handling
      }
    }
    console.log("Image deleted successfully");
    return true;
  } catch (error: any) {
    console.error("Error deleting image: ", error);
    return false;
  }
};
