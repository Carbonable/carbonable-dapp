import { createCookie } from "@remix-run/node";

export const userPrefs = createCookie("user-prefs", {
    maxAge: 3_600, // one week
  });