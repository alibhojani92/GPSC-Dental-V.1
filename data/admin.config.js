/**
 * Admin Configuration
 * LOCKED FILE – DO NOT EDIT AFTER CREATION
 */

/**
 * Telegram User IDs with Admin Access
 * (Add only numeric Telegram IDs)
 */
export const ADMIN_IDS = [
  7539477188 // Main Admin – Dr. Arzoo Fatema
];

/**
 * Admin Roles (Future-proof)
 */
export const ADMIN_ROLES = {
  SUPER_ADMIN: "super_admin",
  CONTENT_ADMIN: "content_admin",
  TEST_ADMIN: "test_admin"
};

/**
 * Admin Permissions
 * Used by handlers & guards
 */
export const ADMIN_PERMISSIONS = {
  ADD_MCQ: true,
  BULK_ADD_MCQ: true,
  START_TEST: true,
  CANCEL_TEST: true,
  VIEW_ALL_REPORTS: true,
  VIEW_STUDENT_PROGRESS: true,
  BROADCAST_MESSAGE: true
};

/**
 * Admin Panel Buttons
 * (Used in Inline Keyboard)
 */
export const ADMIN_PANEL_BUTTONS = [
  {
    text: "➕ Add MCQs",
    action: "admin_add_mcq"
  },
  {
    text: "📦 Bulk MCQ Upload",
    action: "admin_bulk_mcq"
  },
  {
    text: "📝 Start Test",
    action: "admin_start_test"
  },
  {
    text: "⛔ Cancel Test",
    action: "admin_cancel_test"
  },
  {
    text: "📊 View Reports",
    action: "admin_reports"
  }
];

/**
 * Helper
 */
export function isAdmin(userId) {
  return ADMIN_IDS.includes(Number(userId));
    }
