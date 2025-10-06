// src/helpers/apiHelper.js

const BASE_URL =
  import.meta.env.VITE_DELCOM_BASEURL || "https://open-api.delcom.org/api/v1";

/**
 * Helper untuk request API
 * Semua method (GET, POST, PUT, DELETE) otomatis pakai base URL dan header standar
 */

export const apiHelper = {
  async get(endpoint, token = null) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "GET",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return handleResponse(response);
  },

  async post(endpoint, data = {}, token = null, isFormData = false) {
    const headers = {
      Authorization: token ? `Bearer ${token}` : "",
    };

    if (!isFormData) headers["Content-Type"] = "application/json";

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers,
      body: isFormData ? data : JSON.stringify(data),
    });

    return handleResponse(response);
  },

  async put(endpoint, data = {}, token = null) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(data),
    });

    return handleResponse(response);
  },

  async delete(endpoint, token = null) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return handleResponse(response);
  },
};

// 🔧 Fungsi untuk handle response dan error
async function handleResponse(response) {
  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      result.message || "Terjadi kesalahan saat memproses permintaan"
    );
  }

  return result;
}
