import {create} from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import zustandStorage from './zustandStorage';


const useOperationsStore = create(
  persist(
    (set, get) => ({
      selectedOperation: null,
      setSelectedOperation: (selectedOperation) => {
        set({ selectedOperation });
      },
      getSelectedOperation: () => {
        return get().selectedOperation; 
      },

    }),
    {
      name: 'operations-store',
      getStorage: () => createJSONStorage(() => zustandStorage), 
    }
  )
);

export default useOperationsStore;
