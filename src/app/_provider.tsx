"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore, type StoreApi } from "zustand";
import { createStoreState, type Store } from "~/store/index";

interface Props {
  children: ReactNode;
}

export const StoreStateContext = createContext<StoreApi<Store>>(
  createStoreState()
);

export const StoreStateProvider = ({ children }: Props) => {
  const storeRef = useRef<StoreApi<Store>>();
  if (!storeRef.current) {
    storeRef.current = createStoreState();
  }

  return (
    <StoreStateContext.Provider value={storeRef.current}>
      {children}
    </StoreStateContext.Provider>
  );
};

export const useStoreState = <T,>(selector: (store: Store) => T): T => {
  const storeStateContext = useContext(StoreStateContext);

  if (!storeStateContext) {
    throw new Error(`useCounterStore must be use within CounterStoreProvider`);
  }

  return useStore(storeStateContext, selector);
};
