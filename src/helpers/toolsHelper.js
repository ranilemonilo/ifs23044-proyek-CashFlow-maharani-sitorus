// Format angka ke Rupiah
export function formatRupiah(angka) {
  if (angka == null || isNaN(angka)) return "Rp0";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(angka);
}

// Format tanggal ke tampilan Indonesia
export function formatTanggal(dateStr) {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "-"; // fallback jika invalid date
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Cek email valid
export function isValidEmail(email) {
  if (typeof email !== "string") return false;
  return /^\S+@\S+\.\S+$/.test(email);
}
