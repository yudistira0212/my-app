import useSWR, { SWRConfiguration } from "swr";
import apiClient from "../lib/axios/axios";

const fetcher = (url: string) =>
  apiClient
    .get(url)
    .then((res) => res.data)
    .catch((err) => console.log("erorr get data : ", err));

// Konfigurasi SWR untuk caching
const swrConfig: SWRConfiguration = {
  // dedupingInterval: 60000, // 60 detik, mencegah pengambilan ulang data dalam 60 detik
  revalidateOnFocus: true, // Data akan direvalidasi saat halaman mendapat fokus
  revalidateOnReconnect: true, // Data akan direvalidasi ketika koneksi kembali
  shouldRetryOnError: true, // Default true, bisa di-custom lebih lanjut
  errorRetryCount: 3, // Jumlah maksimum percobaan ulang
  errorRetryInterval: 5000, // Interval antara percobaan ulang
};

export function useFetch(url: string) {
  const { data, error, mutate } = useSWR(url, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate, // Menambahkan mutate ke dalam return statement
  };
}
