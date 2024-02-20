import { createStore } from "zustand";

interface StoreState {
  mistakes: number;
  speed: number;
  accuracy: number;
  timeTaken: number;
  text: string;
  userInput: string;
  listOfQuote: {
    quote: string;
  }[];
}

interface StoreAction {
  setMistakes: (m: number) => void;
  setSpeed: (s: number) => void;
  setAccuracy: (a: number) => void;
  setTimeTaken: (tt: number) => void;
  setText: (t: string) => void;
  setUserInput: (ui: string) => void;
  loadListOfQuote: (
    loq: {
      quote: string;
    }[]
  ) => void;
  setRandomQuote: () => void;
}

export type Store = StoreState & StoreAction;

export const defaultInitState: StoreState = {
  mistakes: 0,
  speed: 0,
  accuracy: 0,
  timeTaken: 0,
  text: "",
  userInput: "",
  listOfQuote: [],
};

export const createStoreState = (
  defaultState: StoreState = defaultInitState
) => {
  return createStore<Store>()((set) => ({
    ...defaultState,
    setMistakes: (m) => set({ mistakes: m }),
    setSpeed: (s) => set({ speed: s }),
    setAccuracy: (a) => set({ accuracy: a }),
    setTimeTaken: (tt) => set({ timeTaken: tt }),
    setText: (t) => set({ text: t }),
    setUserInput: (ui) => set({ userInput: ui }),
    loadListOfQuote: (loq) => set({ listOfQuote: loq }),
    setRandomQuote: () =>
      set((prev) => ({
        text: prev.listOfQuote[prev.text.length % prev.listOfQuote.length]
          .quote,
      })),
  }));
};
