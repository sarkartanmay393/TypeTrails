"use client";

import { MouseEvent, useEffect, useState } from "react";
import { useStoreState } from "~/app/_provider";
import { cn, charLevelChecks } from "~/lib/utils";
import { Stats } from "./Stats";
import { getListOfRandomText } from "~/lib/actions/client";

export function DisplayText({ handleInputChange, isComplete }: any) {
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { text, userInput, setText, loadListOfQuote } = useStoreState(
    (state) => state
  );

  const activeFocusOnTyping = () => {
    document.getElementById("input")?.focus();
    // document.querySelector(".text-vercel-effect")?.addEventListener("mouseover", ;
  };
  useEffect(() => {
    setIsLoading(true);
    getListOfRandomText()
      .then((quotes) => {
        setIsLoading(false);
        loadListOfQuote(quotes);
        setText(
          quotes[Number(Math.random().toString().slice(2, 5)) % quotes.length]
            .quote
        );
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div
      onClick={activeFocusOnTyping}
      className="overflow-hidden max-h-[60%] max-w-[920px] text-2xl md:text-3xl font-medium justify-center tracking-wide border-[0px] border-solid border-black rounded-md px-6 py-4 "
    >
      {isLoading && (
        <div className="flex flex-col items-center justify-center">
          <div className="border-slate-700 border-[4px] border-t-transparent h-8 w-8 rounded-full animate-spin mb-6"></div>
          <h5 className="text-sm font-medium tracking-wide">
            Downloading a quote for you
          </h5>
          <h5 className="text-2xl font-normal tracking-wide text-justify text-vercel-effect">
            Just few seconds
          </h5>
        </div>
      )}
      {!isLoading && isComplete && (
        <div className="space-y-2 h-full flex flex-col items-center justify-center">
          <h1 className="text-4xl font-semibold">Completed</h1>
          <p className="text-xl">
            Press <span className="text-gray-600">enter</span> ⎆
          </p>
          <Stats />
        </div>
      )}
      <p>
        {!isLoading &&
          !isComplete &&
          text.split("").map((char: string, index: number) => (
            <span
              key={index}
              className={cn(charLevelChecks(userInput, index, char, isFocused))}
            >
              {char}
            </span>
          ))}
      </p>
      {!isLoading && (
        <input
          id="input"
          className="h-0"
          value={userInput}
          onChange={handleInputChange}
          autoFocus
          onFocus={() => !isFocused && setIsFocused(true)}
          onBlur={() => isFocused && setIsFocused(false)}
        />
      )}
    </div>
  );
}
