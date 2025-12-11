export interface Student {
  id: string; // We will generate this from phone number or row index
  full_name: string;
  phone_number: string;
  image_url: string;
  class: string;
  notes: string;
}

export interface GoogleSheetRow {
  full_name: string;
  phone_number: string;
  image_url: string;
  class: string;
  notes: string;
}

// Ensure the application state handles loading and errors
export interface AppState {
  students: Student[];
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}