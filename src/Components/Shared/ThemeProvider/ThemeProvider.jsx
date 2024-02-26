// ThemeContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [isSystemTheme, setIsSystemTheme] = useState(true);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
      setIsSystemTheme(false);
    }
  }, []);

  const prefersDarkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  useEffect(() => {
    if (isSystemTheme) {
      setTheme(prefersDarkMode ? "dark" : "light");
    }
  }, [isSystemTheme, prefersDarkMode]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setIsSystemTheme(false);
    localStorage.setItem("theme", newTheme);
  };

  const toggleSystemTheme = () => {
    setIsSystemTheme(true);
    localStorage.removeItem("theme");
  };

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, isSystemTheme, toggleSystemTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
