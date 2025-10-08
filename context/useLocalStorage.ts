import { useState, useEffect } from 'react';

// A utility function to safely get and parse values from localStorage.
export function getStorageValue<T>(key: string, defaultValue: T): T {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        // We use a reviver to parse date strings back into Date objects.
        return JSON.parse(saved, (k, v) => {
            if (typeof v === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(v)) {
                return new Date(v);
            }
            return v;
        });
      } catch(e) {
        console.error("Failed to parse localStorage item", e);
        return defaultValue;
      }
    }
  }
  return defaultValue;
}

// A custom hook to keep state in sync with localStorage.
export const useLocalStorage = <T,>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
