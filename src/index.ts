import { cloneDeep, defaultsDeep, get, set } from 'lodash-es';
import { useState } from 'react';

export function readStorageValue(storage: Storage, key: string) {
  try {
    return JSON.parse(storage.getItem(key));
  } catch (error) {
    return {};
  }
}

export function writeStorageValue(storage: Storage, key: string, value: any) {
  storage.setItem(key, JSON.stringify(value));
}

export function useStoragedObject<T extends object>(
  storage: Storage,
  key: string,
  defaults: T
) {
  const [storageValue, setStorageValue] = useState(
    defaultsDeep(readStorageValue(storage, key), defaults)
  );

  return {
    get(path: string) {
      return get(storageValue, path) as any;
    },
    set(path: string, newValue: any) {
      const newStorageValue = set(cloneDeep(storageValue), path, newValue);
      writeStorageValue(storage, key, newStorageValue);
      setStorageValue(newStorageValue);
    },
  };
}
