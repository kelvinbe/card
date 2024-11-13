import { createContext, useContext, useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";

const initialState = {
  theme: "light",
  setTheme: (theme: string) => { }
}
const ThemeContext = createContext(initialState)

export function ThemeContextProvider({ children }) {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'light' : 'dark');
  const root = window.document.documentElement
  root.classList.remove("dark", "light")
  root.classList.add(theme)
  

  return <ThemeContext.Provider value={{ theme, setTheme }}>
    {children}
  </ThemeContext.Provider>
}

export const useTheme = () => {
  return useContext(ThemeContext)
}