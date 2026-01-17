/**
 * Time Utilities
 * Handles IST time, date keys, formatting
 * LOCKED FILE – DO NOT MODIFY AFTER CREATION
 */

const IST_OFFSET_MINUTES = 330; // +5:30

/* ================== NOW (IST) ================== */

export function nowIST() {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utc + IST_OFFSET_MINUTES * 60000);
}

/* ================== DATE KEY ================== */

export function getTodayKey() {
  const d = nowIST();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`; // YYYY-MM-DD
}

/* ================== TIME FORMAT ================== */

export function formatTime(date) {
  const h = String(date.getHours()).padStart(2, "0");
  const m = String(date.getMinutes()).padStart(2, "0");
  return `${h}:${m}`;
}

/* ================== DURATION ================== */

export function minutesBetween(startMs, endMs) {
  return Math.max(0, Math.floor((endMs - startMs) / 60000));
}

export function formatMinutes(mins) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h}h ${m}m`;
}
