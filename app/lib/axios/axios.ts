import axios from "axios";

// Buat instance axios dengan konfigurasi default
const apiClient = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Gunakan environment variable untuk base URL
  // timeout: 60000, // Set waktu timeout 10 detik
  headers: {
    "Content-Type": "application/json", // Set header default
  },

  // adapter: cache.adapter({ maxAge: 15 * 60 * 1000 }),
});

// Tambahkan interceptor untuk request
apiClient.interceptors.request.use(
  (config) => {
    // Tambahkan logika tambahan sebelum request dikirim, misalnya menambahkan token
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Tambahkan interceptor untuk response
apiClient.interceptors.response.use(
  (response) => response, // Cukup return response jika sukses
  (error) => {
    // Tangani kesalahan global, misalnya jika token expired atau server error
    if (error.response?.status === 401) {
      // Logika untuk logout atau refresh token
      console.error("Unauthorized, redirecting...");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
