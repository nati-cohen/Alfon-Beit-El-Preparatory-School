// ---------------------------------------------------------------------------
// CONFIGURATION
// ---------------------------------------------------------------------------

// הגדרות האפליקציה - שנה כאן את הכותרת שמופיעה בראש הדף
export const APP_CONFIG = {
  NAME: "אלפון מכינת בית אל", // הכותרת הראשית
  SUBTITLE: "ספר תלמידים דיגיטלי" // (אופציונלי לשימוש עתידי)
};

// Google Sheet CSV Export URL
// To update this:
// 1. Open your Google Sheet
// 2. Go to File -> Share -> Share with others -> Anyone with the link -> Viewer
// 3. Use the ID from your URL in the format below
export const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/1wQY8SQy55j-JIQeLs_hFtRc2689L-sSYNBWI3Yngvls/export?format=csv"; 

export const SHEET_HEADERS = {
  FULL_NAME: 'full_name',
  PHONE: 'phone_number',
  IMAGE: 'image_url',
  CLASS: 'class',
  NOTES: 'notes',
};

// Default placeholder image if none provided
export const DEFAULT_AVATAR = "https://ui-avatars.com/api/?background=random&color=fff&name=";