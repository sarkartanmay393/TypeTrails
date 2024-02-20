"use client";

import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import { DisplayText } from "~/components/DisplayText";
import { useStoreState } from "./_provider";
import { calculateSpeed, checkAccuracy } from "~/lib/utils";

export default function Home() {
  const defaultTimer = 30;
  const intervalId = useRef<NodeJS.Timeout>();

  const [isStart, setIsStart] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [, setEndTime] = useState(0);
  const [, setTimeElapsed] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [timeRemaing, setTimeRemaining] = useState(defaultTimer);

  const {
    setSpeed,
    setAccuracy,
    setMistakes,
    setTimeTaken,
    text,
    userInput,
    setUserInput,
    setRandomQuote,
  } = useStoreState((state) => state);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    !isStart && setIsStart(true);
    setUserInput(e.target.value);
  };

  function generateSummary() {
    let endAt = Date.now();
    setEndTime(endAt);
    setIsComplete(true);
    setIsStart(false);
    const { wordLength, accuracy, mistakes } = checkAccuracy(userInput, text);
    setSpeed(calculateSpeed(wordLength, endAt - startTime));
    setAccuracy(accuracy);
    setMistakes(mistakes);
    setTimeTaken(endAt - startTime);
  }

  useEffect(() => {
    if (isStart) {
      setStartTime(Date.now());
      intervalId.current = setInterval(() => {
        // if (timeRemaing === 0) {
        //   resetEverything();
        // }
        setTimeElapsed((prevTime: number) => prevTime + 1);
        setTimeRemaining((prevTime: number) => prevTime - 1);
      }, 1000);
    }

    if (isComplete) clearInterval(intervalId.current);
    return () => clearInterval(intervalId.current);
  }, [isStart, isComplete]);

  useEffect(() => {
    if (userInput.length === text.length && userInput.length) {
      generateSummary();
    }
    if (timeRemaing === 0) {
      generateSummary();
    }
  }, [userInput, timeRemaing]);

  useEffect(() => {
    function handleKeydown(e: globalThis.KeyboardEvent) {
      if (e.key === "Enter") {
        if (isComplete) resetEverything();
      }
      if (e.key === "Enter" && e.shiftKey) {
        resetEverything();
      }
    }

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [isComplete]);

  const resetEverything = () => {
    setRandomQuote();
    setIsComplete(false);
    setTimeElapsed(0);
    setTimeRemaining(defaultTimer);
    setEndTime(0);
    setStartTime(0);
    setIsStart(false);
    setUserInput("");
    if (intervalId.current) clearInterval(intervalId.current);
  };

  return (
    <main className="relative flex h-screen w-screen flex-col items-center justify-center p-8 md:p-24 overflow-hidden bg-gray-300">
      <div className="absolute top-0 h-28 w-full flex p-2 items-center justify-center border-0 shadow-sm">
        <div className="space-y-2 text-center">
          <div className="text-4xl font-bold">
            {timeRemaing < 0 ? "- " : null}
            00:
            {timeRemaing / 10 >= 1
              ? timeRemaing
              : `0${
                  timeRemaing < 0
                    ? timeRemaing.toString().slice(1)
                    : timeRemaing
                }`}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Timer</div>
        </div>
      </div>
      <DisplayText
        isComplete={isComplete}
        handleInputChange={handleInputChange}
      />
    </main>
  );
}
