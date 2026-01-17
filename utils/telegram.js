/**
 * Telegram Utility Functions
 * LOCKED FILE – DO NOT MODIFY AFTER CREATION
 */

const TELEGRAM_API = "https://api.telegram.org";

/**
 * Build API URL
 */
function apiUrl(token, method) {
  return `${TELEGRAM_API}/bot${token}/${method}`;
}

/**
 * Send Text Message
 */
export async function sendMessage(env, chatId, text, options = {}) {
  const payload = {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
    ...options
  };

  const res = await fetch(apiUrl(env.BOT_TOKEN, "sendMessage"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  return res.json();
}

/**
 * Send Inline Keyboard Message
 */
export async function sendInlineKeyboard(env, chatId, text, buttons) {
  return sendMessage(env, chatId, text, {
    reply_markup: {
      inline_keyboard: buttons
    }
  });
}

/**
 * Edit Existing Message
 */
export async function editMessage(env, chatId, messageId, text, buttons = null) {
  const payload = {
    chat_id: chatId,
    message_id: messageId,
    text,
    parse_mode: "HTML"
  };

  if (buttons) {
    payload.reply_markup = {
      inline_keyboard: buttons
    };
  }

  const res = await fetch(apiUrl(env.BOT_TOKEN, "editMessageText"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  return res.json();
}

/**
 * Answer Callback Query (Button click)
 */
export async function answerCallback(env, callbackQueryId, text = "", showAlert = false) {
  const payload = {
    callback_query_id: callbackQueryId,
    text,
    show_alert: showAlert
  };

  const res = await fetch(apiUrl(env.BOT_TOKEN, "answerCallbackQuery"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  return res.json();
}

/**
 * Delete Message (Optional future use)
 */
export async function deleteMessage(env, chatId, messageId) {
  const payload = {
    chat_id: chatId,
    message_id: messageId
  };

  const res = await fetch(apiUrl(env.BOT_TOKEN, "deleteMessage"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  return res.json();
}
