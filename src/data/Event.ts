export interface Item {
  id: number;
  name: string;
  createdAt: number;
}

export type FieldType = "Integer" | "BigInteger" | "String" | "Timestamp" | "Enum";

export interface Field {
  id: number;
  itemId: number; // Keep itemId to associate fields with custom items
  name: string;
  type: FieldType;
  unit?: string;
  options?: string[]; // For Enum type
  createdAt: number;
}

// --- Specific Event Types ---

export interface RunningEvent {
  id: number;
  timestamp: number;
  duration: number; // Assuming duration in minutes, using Integer type
  distance: number; // Assuming distance in km, using Float type
  avgPace?: number; // Calculated field, optional
  createdAt: number;
}

export interface MeditationEvent {
  id: number;
  timestamp: number;
  duration: number; // Assuming duration in minutes, using Integer type
  createdAt: number;
}

export interface YogaEvent {
  id: number;
  timestamp: number;
  duration: number; // Assuming duration in minutes
  style?: string; // e.g., "Hatha", "Vinyasa" - could be an Enum, but keeping it as string for flexibility
  createdAt: number;
}

// Union type for all event types
export type AnyEvent = RunningEvent | MeditationEvent | YogaEvent;

// Keep EventValue for generic field storage in the database
export interface EventValue {
  fieldId: number;
  value: string | number | null; // Store value based on FieldType
}
