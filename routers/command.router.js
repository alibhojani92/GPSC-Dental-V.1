/**
 * Command Router
 * LOCKED FILE – DO NOT MODIFY AFTER CREATION
 */

import { sendMessage, sendInlineKeyboard } from "../utils/telegram.js";
import { getMasterKeyboard } from "../keyboards/master.keyboard.js";
import { handleStart } from "../handlers/start.handler.js";
import { handleReadStart, handleReadStop } from "../handlers/reading.handler.js";

export async function commandRouter(update, env) {
  if (!update.message || !update.message.text) return;

  const text = update.message.text.trim();
  const chatId = update.message.chat.id;
  const userId = update.message.from.id;

  // Normalize command (case-insensitive)
  const cmd = text.split(" ")[0].toLowerCase();

  switch (cmd) {
    case "/start":
      return handleStart(update, env);

    case "/read":
    case "/startreading":
      return handleReadStart(update, env);

    case "/stop":
    case "/stopreading":
      return handleReadStop(update, env);

    case "/menu":
      return sendInlineKeyboard(
        env,
        chatId,
        `🌺 <b>Dr. Arzoo Fatema</b> 🌺\n\nChoose an option below 👇`,
        getMasterKeyboard(userId, env)
      );

    case "/dt":
      return sendMessage(
        env,
        chatId,
        "📝 Daily Test will start soon.\nUse the buttons below 👇",
        { reply_markup: { inline_keyboard: getMasterKeyboard(userId, env) } }
      );

    case "/mcq":
      return sendMessage(
        env,
        chatId,
        "🧠 MCQ Practice Mode\nSelect subject from buttons 👇",
        { reply_markup: { inline_keyboard: getMasterKeyboard(userId, env) } }
      );

    case "/report":
      return sendMessage(
        env,
        chatId,
        "📊 Report generation in progress…"
      );

    case "/admin":
      if (userId !== Number(env.ADMIN_ID)) {
        return sendMessage(env, chatId, "⛔ Admin access only");
      }
      return sendMessage(
        env,
        chatId,
        "👑 Admin Panel\nUse admin buttons below 👇",
        { reply_markup: { inline_keyboard: getMasterKeyboard(userId, env) } }
      );

    default:
      // Ignore random messages (ANTI-SPAM rule)
      return;
  }
  }
