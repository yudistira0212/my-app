import { toast } from "react-toastify";
import { saveProdiData } from "../services/prodiService";

export const useSaveProdi = () => {
  const saveProdi = async (data: any) => {
    try {
      const response = await saveProdiData(data);
      toast.success("Prodi successfully saved.");
      return response;
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data.error);

        toast.error(error.response.data.error);
      } else {
        toast.error(error.message);
      }
      throw error;
    }
  };

  return { saveProdi };
};
