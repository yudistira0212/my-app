import useSWR, { SWRConfiguration } from "swr";
import apiClient from "../lib/axios/axios";

const fetcher = (url: string) =>
  apiClient
    .get(url)
    .then((res) => res.data)
    .catch((error) => {
      console.log("Error fetching data: ", error);
      throw error;
    });

const swrConfig: SWRConfiguration = {
  dedupingInterval: 60000, // Mencegah pengambilan ulang data dalam 60 detik
  revalidateOnFocus: false, // Data akan direvalidasi saat halaman mendapat fokus
  revalidateOnReconnect: true, // Data akan direvalidasi ketika koneksi kembali
  shouldRetryOnError: true, // Akan mencoba ulang jika terjadi kesalahan
  errorRetryCount: 3, // Maksimum 3 kali percobaan ulang
  errorRetryInterval: 5000, // Interval 5 detik antara percobaan ulang
  onSuccess: (data) => {
    console.log("Data berhasil diambil:", data);
  },
  onError: (error) => {
    console.log("Terjadi kesalahan:", error);
  },
};

export function useFetch(url: string) {
  const { data, error, mutate } = useSWR(url, fetcher, swrConfig);

  console.log({ data, error });

  return {
    data,
    isLoading: !error && !data,
    isError: !!error, // Menandakan ada kesalahan
    mutate, // Menambahkan mutate ke dalam return statement
  };
}
