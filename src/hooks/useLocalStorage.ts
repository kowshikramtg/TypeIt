import { useEffect, useState } from "react";

const useLocalStorage = <T>(
  key: string,
  initialValue: T
) => {
  const [storedValue, setStoredValue] =
    useState<T>(() => {
      try {
        const item =
          localStorage.getItem(key);

        if (!item) {
          return initialValue;
        }

        return JSON.parse(item);
      } catch {
        return (
          localStorage.getItem(
            key
          ) as T
        ) || initialValue;
      }
    });

  useEffect(() => {
    localStorage.setItem(
      key,
      JSON.stringify(storedValue)
    );
  }, [key, storedValue]);

  return [
    storedValue,
    setStoredValue,
  ] as const;
};

export default useLocalStorage;