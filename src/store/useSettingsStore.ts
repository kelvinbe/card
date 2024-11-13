import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import zustandStorage from './storage.config';

// Define the SettingsStore object
const settingsStore = (set, get) => ({
  themeSelected: 'dark',
  setThemeSelected: themeSelected => set({themeSelected}),
});

// Create the persist middleware configuration
const persistConfig = {
  name: 'settings',
  storage: createJSONStorage(() => zustandStorage),
};

// Create the zustand store with persist middleware
const useSettingsStore = create(persist(settingsStore, persistConfig));

export default useSettingsStore;
