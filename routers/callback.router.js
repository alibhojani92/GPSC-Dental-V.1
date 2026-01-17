/**
 * Callback Router
 * Handles all inline keyboard actions
 * LOCKED FILE – DO NOT MODIFY AFTER CREATION
 */

import { sendMessage, sendInlineKeyboard } from "../utils/telegram.js";
import { getMasterKeyboard } from "../keyboards/master.keyboard.js";
import {
  handleReadStart,
  handleReadStop,
} from "../handlers/reading.handler.js";

export async function callbackRouter(update, env) {
  if (!update.callback_query) return;

  const cq = update.callback_query;
  const data = cq.data;
  const chatId = cq.message.chat.id;
  const userId = cq.from.id;

  // Acknowledge callback (important for Telegram UX)
  await fetch(
    `https://api.telegram.org/bot${env.BOT_TOKEN}/answerCallbackQuery`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ callback_query_id: cq.id }),
    }
  );

  switch (data) {
    case "START_READING":
      return handleReadStart({ message: cq.message, from: cq.from }, env);

    case "STOP_READING":
      return handleReadStop({ message: cq.message, from: cq.from }, env);

    case "DAILY_TEST":
      return sendMessage(
        env,
        chatId,
        "📝 Daily Test will begin soon.\n⏳ Please wait…"
      );

    case "MCQ_PRACTICE":
      return sendMessage(
        env,
        chatId,
        "🧠 MCQ Practice Mode\nSelect subject 👇"
      );

    case "MY_PROGRESS":
      return sendMessage(
        env,
        chatId,
        "📊 Your progress will appear here."
      );

    case "SUBJECT_LIST":
      return sendMessage(
        env,
        chatId,
        "📘 Subject list loading…"
      );

    case "ADMIN_PANEL":
      if (userId !== Number(env.ADMIN_ID)) {
        return sendMessage(env, chatId, "⛔ Admin access only");
      }
      return sendInlineKeyboard(
        env,
        chatId,
        "👑 Admin Panel\nChoose action 👇",
        getMasterKeyboard(userId, env)
      );

    default:
      // Unknown button → ignore silently
      return;
  }
}
