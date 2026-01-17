/**
 * Reading Store
 * Handles KV/D1 storage for reading sessions
 * LOCKED FILE – DO NOT MODIFY AFTER CREATION
 */

import { getTodayKey } from "../utils/time.js";

/* ================== ACTIVE SESSION ================== */

export async function getActiveSession(env, userId) {
  const key = `reading:active:${userId}`;
  const raw = await env.KV.get(key);
  return raw ? JSON.parse(raw) : null;
}

export async function saveSession(env, session) {
  const key = `reading:active:${session.userId}`;
  await env.KV.put(key, JSON.stringify(session));
}

export async function endSession(env, userId) {
  const key = `reading:active:${userId}`;
  await env.KV.delete(key);
}

/* ================== DAILY TOTAL ================== */

export async function getTodayMinutes(env, userId, date = getTodayKey()) {
  const key = `reading:daily:${userId}:${date}`;
  const val = await env.KV.get(key);
  return val ? Number(val) : 0;
}

export async function addDailyMinutes(env, userId, date, minutes) {
  const key = `reading:daily:${userId}:${date}`;
  const current = await getTodayMinutes(env, userId, date);
  const updated = current + minutes;
  await env.KV.put(key, String(updated));
    }
