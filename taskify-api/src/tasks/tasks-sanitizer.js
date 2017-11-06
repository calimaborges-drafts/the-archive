import { only } from "sanitize-object";

export const validFields = [
  "_id",
  "title",
  "content",
  "userid",
  "deleted_at",
  "completed",
  "postpone_date"
];

export const sanitizeTask = task => only(validFields)(task);
