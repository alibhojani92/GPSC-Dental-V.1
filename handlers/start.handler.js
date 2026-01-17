/**
 * Start Handler
 * Sends bot intro + master keyboard
 * LOCKED FILE – DO NOT MODIFY AFTER CREATION
 */

import { sendMessage } from "../utils/telegram.js";
import { getMasterKeyboard } from "../keyboards/master.keyboard.js";

export async function handleStart(update, env) {
  const chatId = update.message.chat.id;
  const userId = update.message.from.id;

  const introText =
`🌺 Dr. Arzoo Fatema 🌺

Welcome Doctor ❤️🦷  
This bot will help you prepare for  
🎯 GPSC Dental Class-2 Exam

📌 Use the buttons below to:
• Track daily reading
• Practice MCQs
• Attempt tests
• Analyze performance

💪 Let’s build consistency, not stress`;

  await sendMessage(env, chatId, introText, {
    reply_markup: getMasterKeyboard(userId, env),
  });
                    }
