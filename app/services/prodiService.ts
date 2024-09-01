import apiClient from "@/app/lib/axios/axios";

export const saveProdiData = async (data: any) => {
  const cekData = await apiClient.get(`/api/prodi`);
  if (cekData.data.length === 0) {
    return await apiClient.post(`/api/prodi`, { data });
  } else {
    return await apiClient.patch(`/api/prodi/1/update`, { data });
  }
};
