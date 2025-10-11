// src/helpers/apiHelper.js

// Ambil base URL dari environment (.env)
// Default fallback ke Delcom API publik
const BASE_URL =
  import.meta.env.VITE_DELCOM_BASEURL?.replace(/\/+$/, "") ||
  "https://open-api.delcom.org/api/v1";

/**
 * Helper serbaguna untuk request ke API
 * Otomatis include base URL, token, dan handle error
 */
export const apiHelper = {
  // 🟢 GET Request
  async get(endpoint, token = null) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "GET",
      headers: buildHeaders(token),
    });
    return handleResponse(response);
  },

  // 🟢 POST Request
  async post(endpoint, data = {}, token = null, isFormData = false) {
    const headers = buildHeaders(token, isFormData);

    console.log("🚀 POST ke:", `${BASE_URL}${endpoint}`);
    console.log("📦 Data:", data);

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers,
      body: isFormData ? data : JSON.stringify(data),
    });

    return handleResponse(response);
  },

  // 🟡 PUT Request
  async put(endpoint, data = {}, token = null, isFormData = false) {
    const headers = buildHeaders(token, isFormData);

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "PUT",
      headers,
      body: isFormData ? data : JSON.stringify(data),
    });

    return handleResponse(response);
  },

  // 🔴 DELETE Request
  async delete(endpoint, token = null) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: buildHeaders(token),
    });

    return handleResponse(response);
  },
};

/**
 * 🧱 Helper untuk bikin headers request
 */
function buildHeaders(token = null, isFormData = false) {
  const headers = {};

  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (!isFormData) headers["Content-Type"] = "application/json";

  return headers;
}

/**
 * ⚙️ Fungsi umum untuk handle response dan error
 */
async function handleResponse(response) {
  try {
    const json = await response.json();

    if (!response.ok) {
      throw new Error(
        json.message || "Terjadi kesalahan saat memproses permintaan"
      );
    }

    // 🔄 Kembalikan dalam bentuk { data: json } agar seragam
    return { data: json };
  } catch (err) {
    console.error("❌ handleResponse error:", err);
    throw new Error(err.message || "Respon server tidak valid");
  }
}
