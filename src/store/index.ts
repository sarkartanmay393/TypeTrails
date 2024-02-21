import { createStore } from "zustand";

interface StoreState {
  mistakes: number;
  speed: number;
  accuracy: number;
  timeTaken: number;
  text: string;
  userInput: string;
  quoteGenre: string;
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
  setQuoteGenre: (g: string) => void;
}

export type Store = StoreState & StoreAction;

export const defaultInitState: StoreState = {
  mistakes: 0,
  speed: 0,
  accuracy: 0,
  timeTaken: 0,
  text: "",
  userInput: "",
  listOfQuote: [
    {
      quote: `A demigod!" one snarled."Eat it!" yelled another.But that's as far as they got before I slashed a wide arc with Riptide and vaporized the entire front row of monsters."Back off!" I yelled at the rest, trying to sound fierce. Behind them stood their instructor--a six-foot tall telekhine with Doberman fangs snarling at me. I did my best to stare him down."New lesson, class," I announced. "Most monsters will vaporize when sliced with a celestial bronze sword. This change is completely normal, and will happen to you right now if you don't BACK OFF!"To my surprise, it worked. The monsters backed off, but there was at least twenty of them. My fear factor wasn't going to last that long.I jumped out of the cart, yelled, "CLASS DISMISSED!" and ran for the exit.`,
    },
  ],
  quoteGenre: "humor",
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
        text: prev.listOfQuote[
          prev.text.length % prev.listOfQuote.length
        ].quote.trim(),
      })),
    setQuoteGenre: (g) => set({ quoteGenre: g }),
  }));
};
