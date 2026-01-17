/**
 * MASTER FEATURE REGISTRY
 * =======================
 * - Single source of truth
 * - Drives keyboard, commands, callbacks
 * - NO logic here
 */

export const FEATURES = [

  /* ============================
   * CORE / START
   * ============================ */
  {
    id: "start",
    label: "🏠 Home",
    type: "command",
    command: "/start",
    handler: "core.start",
    role: ["user", "admin"],
    showInKeyboard: false
  },

  /* ============================
   * READING MODULE
   * ============================ */
  {
    id: "reading_start",
    label: "📚 Start Reading",
    type: "action",
    handler: "reading.start",
    role: ["user"],
    showInKeyboard: true
  },
  {
    id: "reading_stop",
    label: "⏸ Stop Reading",
    type: "action",
    handler: "reading.stop",
    role: ["user"],
    showInKeyboard: true
  },
  {
    id: "daily_target_set",
    label: "🎯 Set Daily Target (Hours)",
    type: "action",
    handler: "reading.setTarget",
    role: ["user"],
    showInKeyboard: true
  },
  {
    id: "reading_summary",
    label: "📊 Reading Summary",
    type: "action",
    handler: "reading.summary",
    role: ["user"],
    showInKeyboard: true
  },
  {
    id: "reading_history",
    label: "🕒 Reading History",
    type: "action",
    handler: "reading.history",
    role: ["user"],
    showInKeyboard: true
  },

  /* ============================
   * MCQ PRACTICE
   * ============================ */
  {
    id: "mcq_practice",
    label: "🧠 MCQ Practice",
    type: "menu",
    handler: "mcq.menu",
    role: ["user"],
    showInKeyboard: true
  },
  {
    id: "mcq_free_mode",
    label: "🧠 Free Revision MCQs",
    type: "action",
    handler: "mcq.free",
    role: ["user"],
    showInKeyboard: false
  },
  {
    id: "mcq_timed",
    label: "⏱ Timed MCQs",
    type: "action",
    handler: "mcq.timed",
    role: ["user"],
    showInKeyboard: false
  },

  /* ============================
   * TESTS
   * ============================ */
  {
    id: "daily_test",
    label: "📝 Daily Test",
    type: "action",
    handler: "test.daily",
    role: ["user"],
    showInKeyboard: true
  },
  {
    id: "weekly_test",
    label: "📅 Weekly Test",
    type: "action",
    handler: "test.weekly",
    role: ["user"],
    showInKeyboard: true
  },
  {
    id: "mock_test",
    label: "🏁 Full Mock Test",
    type: "action",
    handler: "test.mock",
    role: ["user"],
    showInKeyboard: true
  },

  /* ============================
   * PROGRESS & REPORTS
   * ============================ */
  {
    id: "my_progress",
    label: "📈 My Progress",
    type: "action",
    handler: "report.progress",
    role: ["user"],
    showInKeyboard: true
  },
  {
    id: "analytics",
    label: "📊 Performance Analytics",
    type: "action",
    handler: "report.analytics",
    role: ["user"],
    showInKeyboard: true
  },

  /* ============================
   * SUBJECT LIST (DENTAL PULSE 18)
   * ============================ */
  {
    id: "subject_list",
    label: "📘 Subject List (Dental Pulse 18)",
    type: "menu",
    handler: "subjects.list",
    role: ["user"],
    showInKeyboard: true
  },

  /* ============================
   * ADMIN PANEL
   * ============================ */
  {
    id: "admin_panel",
    label: "👑 Admin Panel",
    type: "menu",
    handler: "admin.panel",
    role: ["admin"],
    showInKeyboard: true
  },
  {
    id: "admin_broadcast",
    label: "📢 Broadcast Message",
    type: "action",
    handler: "admin.broadcast",
    role: ["admin"],
    showInKeyboard: false
  },
  {
    id: "admin_user_stats",
    label: "👥 User Statistics",
    type: "action",
    handler: "admin.userStats",
    role: ["admin"],
    showInKeyboard: false
  }

];
