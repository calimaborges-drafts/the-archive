import { only } from "sanitize-object";

export const validFields = ["_id", "username", "password"];

export const sanitizeUser = user => only(validFields)(user);
