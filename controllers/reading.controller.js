/**
 * Reading Controller
 * Core business logic for reading sessions
 * LOCKED FILE – DO NOT MODIFY AFTER CREATION
 */

import { getTodayKey, formatTime, diffMinutes } from "../utils/time.js";
import {
  getActiveSession,
  saveSession,
  endSession,
  addDailyMinutes,
  getTodayMinutes
} from "../stores/reading.store.js";

const DAILY_TARGET_MIN = 8 * 60; // 8 hours

export async function startReading(user, env) {
  const userId = String(user.id);
  const today = getTodayKey();

  // Prevent duplicate session
  const active = await getActiveSession(env, userId);
  if (active) {
    return {
      startTime: formatTime(active.start),
      target: "08:00 Hours"
    };
  }

  const start = Date.now();

  await saveSession(env, {
    userId,
    date: today,
    start
  });

  return {
    startTime: formatTime(start),
    target: "08:00 Hours"
  };
}

export async function stopReading(user, env) {
  const userId = String(user.id);
  const today = getTodayKey();

  const session = await getActiveSession(env, userId);
  if (!session) {
    throw new Error("No active session");
  }

  const end = Date.now();
  const minutes = diffMinutes(session.start, end);

  await endSession(env, userId);
  await addDailyMinutes(env, userId, today, minutes);

  const todayTotal = await getTodayMinutes(env, userId, today);
  const remaining = Math.max(DAILY_TARGET_MIN - todayTotal, 0);

  return {
    startTime: formatTime(session.start),
    endTime: formatTime(end),
    sessionDuration: formatTime(minutes * 60000),
    todayTotal: formatTime(todayTotal * 60000),
    remaining: formatTime(remaining * 60000)
  };
}
