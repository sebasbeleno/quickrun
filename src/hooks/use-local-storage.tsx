import React from "react";

const useLocalStorage = (key: string, initialValue?: any) => {
  const [storedValue, setStoredValue] = React.useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: any) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  const editFile = (file: string, value: string) => {
    setValue({ ...storedValue, [file]: value });
  };

  const createFile = (file: string) => {
    setValue({ ...storedValue, [file]: "console.log('hello')" });
  };

  return {
    storedValue,
    setValue,
    editFile,
    createFile,
    files: storedValue,
  };
};

export default useLocalStorage;
