/**
 * Reading Handler
 * Entry point for start/stop reading actions
 * LOCKED FILE – DO NOT MODIFY AFTER CREATION
 */

import { startReading, stopReading } from "../controllers/reading.controller.js";
import { sendMessage } from "../utils/telegram.js";

export async function handleReading(update, env) {
  const chatId =
    update.message?.chat?.id ||
    update.callback_query?.message?.chat?.id;

  const user =
    update.message?.from ||
    update.callback_query?.from;

  if (!chatId || !user) return;

  // Detect action
  const text = update.message?.text || "";
  const action = update.callback_query?.data || "";

  try {
    // START READING
    if (
      text === "/read" ||
      text === "/startreading" ||
      action === "READ_START"
    ) {
      const result = await startReading(user, env);

      await sendMessage(env, chatId,
`📚 Reading STARTED ✅

🕒 Start Time: ${result.startTime}
🎯 Daily Target: ${result.target}

🔥 Keep going Doctor 💪🦷
Consistency today = Rank tomorrow 💯`);

      return;
    }

    // STOP READING
    if (
      text === "/stop" ||
      text === "/stopreading" ||
      action === "READ_STOP"
    ) {
      const result = await stopReading(user, env);

      await sendMessage(env, chatId,
`⏸ Reading STOPPED ✅

🕒 Start: ${result.startTime}
🕒 End: ${result.endTime}
⏱ Duration: ${result.sessionDuration}

📊 Today Total: ${result.todayTotal}
🎯 Target Left: ${result.remaining}

🌟 Consistency beats intensity!`);

      return;
    }
  } catch (err) {
    await sendMessage(
      env,
      chatId,
      "⚠️ Something went wrong. Please try again."
    );
  }
      }
