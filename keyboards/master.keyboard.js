/**
 * Master Inline Keyboard
 * Used across the entire bot
 * LOCKED FILE – DO NOT MODIFY AFTER CREATION
 */

export function getMasterKeyboard(userId, env) {
  const isAdmin = userId === Number(env.ADMIN_ID);

  const studentButtons = [
    [
      { text: "📚 Start Reading", callback_data: "START_READING" },
      { text: "⏸ Stop Reading", callback_data: "STOP_READING" },
    ],
    [
      { text: "📝 Daily Test", callback_data: "DAILY_TEST" },
      { text: "🧠 MCQ Practice", callback_data: "MCQ_PRACTICE" },
    ],
    [
      { text: "📊 My Progress", callback_data: "MY_PROGRESS" },
      { text: "📘 Subject List", callback_data: "SUBJECT_LIST" },
    ],
  ];

  const adminButtons = [
    [
      { text: "👑 Admin Panel", callback_data: "ADMIN_PANEL" },
    ],
  ];

  return {
    inline_keyboard: isAdmin
      ? [...studentButtons, ...adminButtons]
      : studentButtons,
  };
}
