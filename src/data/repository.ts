import * as SQLite from "expo-sqlite";

import { AnyEvent, EventValue, Field, FieldType, Item, MeditationEvent, RunningEvent, YogaEvent } from "./Event";

// Function to add a new item
export const addItem = async (db: SQLite.SQLiteDatabase, name: string): Promise<number> => {
  try {
    const result = await db.runAsync("INSERT INTO items (name) VALUES (?)", name);
    console.log(`Item "${name}" added with ID: ${result.lastInsertRowId}`); // Log
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error adding item:", error); // Log
    throw error;
  }
};

// Function to add a new field to an item
export const addField = async (
  db: SQLite.SQLiteDatabase,
  itemId: number,
  name: string,
  type: FieldType,
  unit?: string,
  options?: string[],
): Promise<number> => {
  try {
    const result = await db.runAsync(
      "INSERT INTO fields (item_id, name, type, unit, options) VALUES (?, ?, ?, ?, ?)",
      itemId,
      name,
      type,
      unit,
      options !== undefined ? options.join(",") : null, // Convert options array to comma-separated string
    );
    console.log(`Field "${name}" added to item ${itemId} with ID: ${result.lastInsertRowId}`); // Log
    return result.lastInsertRowId!;
  } catch (error) {
    console.error("Error adding field:", error); // Log
    throw error;
  }
};

// Function to add a new event for an item
export const addEvent = async (db: SQLite.SQLiteDatabase, event: AnyEvent): Promise<number> => {
  try {
    let itemId: number;
    let timestamp: number = event.timestamp;
    let values: EventValue[] = [];

    if (event.hasOwnProperty("createdAt")) {
      // @ts-ignore
      delete event.createdAt;
    }

    if ("duration" in event) {
      // @ts-ignore
      values.push({ fieldId: 0, value: event.duration }); // Assuming fieldId 0 is always duration
    }

    if ("distance" in event) {
      // @ts-ignore
      values.push({ fieldId: 1, value: event.distance }); // Assuming fieldId 1 is always distance
    }
    if ("style" in event) {
      // @ts-ignore
      values.push({ fieldId: 2, value: event.style });
    }

    // This is a bit hacky and relies on item IDs. A better solution would involve a lookup table or a different DB schema.
    if (event.hasOwnProperty("distance")) {
      itemId = 1; // Running
    } else if (event.hasOwnProperty("style")) {
      itemId = 3; // Yoga
    } else {
      itemId = 2; // Meditation
    }

    const eventResult = await db.runAsync("INSERT INTO events (item_id, timestamp) VALUES (?, ?)", itemId, timestamp);
    const eventId = eventResult.lastInsertRowId!;
    console.log(`Event added for item ${itemId} with ID: ${eventId}`); // Log

    for (const { fieldId, value } of values) {
      await db.runAsync(
        "INSERT INTO event_values (event_id, field_id, value) VALUES (?, ?, ?)",
        eventId,
        fieldId,
        value !== null ? String(value) : null, // Convert value to string for storage
      );
      console.log(`Value "${value}" added for field ${fieldId} in event ${eventId}`); // Log
    }

    return eventId;
  } catch (error) {
    console.error("Error adding event:", error); // Log
    throw error;
  }
};

// Function to get all events for an item
export const getEventsForItem = async (db: SQLite.SQLiteDatabase, itemId: number): Promise<AnyEvent[]> => {
  try {
    const events: AnyEvent[] = [];
    // First, get all event IDs and timestamps for the item
    const eventRows = await db.getAllAsync<{ id: number; timestamp: number }>(
      `SELECT id, timestamp FROM events WHERE item_id = ? ORDER BY timestamp DESC`,
      itemId,
    );
    console.log("eventRows", eventRows);

    for (const eventRow of eventRows) {
      // For each event, get all associated event values
      const valueRows = await db.getAllAsync<{ field_id: number; value: string; type: FieldType; options: string | null }>(
        `SELECT ev.field_id, ev.value, f.type, f.options
        FROM event_values ev
        JOIN fields f ON ev.field_id = f.id
        WHERE ev.event_id = ?`,
        eventRow.id,
      );

      // Convert the raw database rows into EventValue objects
      const eventValues: EventValue[] = valueRows.map((row) => {
        let parsedValue: string | number | null = row.value;
        if (row.type === "Integer") {
          parsedValue = parseInt(row.value, 10);
        } else if (row.type === "Float" || row.type === "FloatScale10") {
          parsedValue = parseFloat(row.value);
        } else if (row.type === "Timestamp") {
          parsedValue = parseInt(row.value, 10);
        }
        return {
          fieldId: row.field_id,
          value: parsedValue,
        };
      });

      // Reconstruct the specific event type based on itemId and field values.  This is fragile and should be improved with a better DB schema.
      let event: AnyEvent;
      if (itemId === 1) {
        // Running
        const durationValue = eventValues.find((v) => v.fieldId === 0)?.value as number | undefined;
        const distanceValue = eventValues.find((v) => v.fieldId === 1)?.value as number | undefined;

        if (durationValue !== undefined && distanceValue !== undefined) {
          event = {
            id: eventRow.id,
            timestamp: eventRow.timestamp,
            duration: durationValue,
            distance: distanceValue,
            createdAt: Date.now(), // You might want to fetch this from the database if needed
          };
          events.push(event);
        }
      } else if (itemId === 2) {
        // Meditation
        const durationValue = eventValues.find((v) => v.fieldId === 0)?.value as number | undefined;
        if (durationValue !== undefined) {
          event = {
            id: eventRow.id,
            timestamp: eventRow.timestamp,
            duration: durationValue,
            createdAt: Date.now(),
          };
          events.push(event);
        }
      } else if (itemId === 3) {
        const durationValue = eventValues.find((v) => v.fieldId === 0)?.value as number | undefined;
        const styleValue = eventValues.find((v) => v.fieldId === 2)?.value as string | undefined;

        if (durationValue !== undefined) {
          event = {
            id: eventRow.id,
            timestamp: eventRow.timestamp,
            duration: durationValue,
            style: styleValue,
            createdAt: Date.now(),
          };
          events.push(event);
        }
      }
    }
    console.log(`Retrieved events for item ${itemId}:`, events); // Log
    return events;
  } catch (error) {
    console.error("Error retrieving events:", error); // Log
    throw error;
  }
};
