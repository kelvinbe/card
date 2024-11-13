import {create} from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import zustandStorage from './zustandStorage';


const useColumnValueStore = create(
  persist(
    (set, get) => ({
      columnValue: null,
      setColumnValue: (columnValue) => {
        set({ columnValue });
      },
      getColumnValue: () => {
        return get().columnValue; 
      },

    }),
    {
      name: 'column-value-store',
      getStorage: () => createJSONStorage(() => zustandStorage), 
    }
  )
);

export default useColumnValueStore;
