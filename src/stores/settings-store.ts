import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface SettingsStore {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

interface SettingsLanguage {
  language: "es-Es" | "en-Us"; 
  setLanguage: (language: "es-Es" | "en-Us") => void;
}

export const useSettingsStore = create<SettingsStore>()(
  devtools(
    (set) => ({
      theme: "light",
      setTheme: (theme) => set({ theme }),
    }),
    { name: "settingsStore" }
  )
);

export const useSettingsLanguage = create<SettingsLanguage>()(
  devtools(
    (set) => ({
      language: "es-Es",
      setLanguage: (language) => set({ language }),
    }),
    { name: "settingsLanguage" } 
  )
);
