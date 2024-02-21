"use client";

import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import { DisplayText } from "~/components/DisplayText";
import { useStoreState } from "./_provider";
import { calculateSpeed, checkAccuracy } from "~/lib/utils";
import { TimerIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { GenreInputEle } from "~/components/GenreInput";

export default function Home() {
  const [defaultTimer, setDefaultTimer] = useState<30 | 60>(30);
  const intervalId = useRef<NodeJS.Timeout>();

  const [isStart, setIsStart] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [, setEndTime] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [timeRemaing, setTimeRemaining] = useState<number>(defaultTimer);

  const {
    setSpeed,
    setAccuracy,
    setMistakes,
    setTimeTaken,
    text,
    userInput,
    setUserInput,
    setRandomQuote,
    quoteGenre,
  } = useStoreState((state) => state);

  useEffect(() => {
    if (!isComplete) setTimeRemaining(defaultTimer);
  }, [defaultTimer, isComplete]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    !isStart && setIsStart(true);
    !isComplete && setUserInput(e.target.value);
  };

  function generateSummary() {
    let endAt = Date.now();
    setEndTime(endAt);
    setIsStart(false);
    setIsComplete(true);
    setTimeRemaining(defaultTimer);
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
    if (userInput.length >= 520) {
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
      if (e.shiftKey && e.key === "Enter" && e.altKey) {
        // generateSummary();
      }
    }

    const pressEnterEle = document.getElementById("press_enter");
    pressEnterEle?.addEventListener("click", resetEverything);
    window.addEventListener("keydown", handleKeydown);

    return () => {
      pressEnterEle?.removeEventListener("click", resetEverything);
      window.removeEventListener("keydown", handleKeydown);
    };
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
    setMistakes(0);
    setAccuracy(0);
    setSpeed(0);
    if (intervalId.current) clearInterval(intervalId.current);
  };

  useEffect(() => {
    return () => resetEverything();
  }, [quoteGenre]);

  const simulatePressKeyboard = () => {
    const shiftEnter = new KeyboardEvent("keydown", {
      key: "Enter",
      keyCode: 13,
      which: 13,
      shiftKey: true,
    });

    window.dispatchEvent(shiftEnter);
  };

  return (
    <main className="flex h-screen w-screen flex-col items-center overflow-hidden bg-gray-100 vignette">
      <div className="relative h-fit space-y-3 md:space-y-0 md:h-16 w-full flex flex-col md:flex p-2 items-center justify-center border-0 shadow-sm">
        <div className="ml-8 text-4xl font-bold flex items-center transition-all duration-1000">
          <span>
            {timeRemaing < 0 ? "- " : null}
            {timeRemaing / 10 >= 1
              ? timeRemaing
              : `0${
                  timeRemaing < 0
                    ? timeRemaing.toString().slice(1)
                    : timeRemaing
                }`}
          </span>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setDefaultTimer((p) => (p === 30 ? 60 : 30))}
          >
            <TimerIcon className="" />
          </Button>
        </div>
        <GenreInputEle />
      </div>

      <DisplayText
        isComplete={isComplete}
        handleInputChange={handleInputChange}
      />

      <p className="h-16 text-lg font-semibold text-gray-400 flex items-center ">
        Press{" "}
        <span
          onClick={simulatePressKeyboard}
          className="select:none font-mono mx-2 text-sm border-2 p-0.5 px-1 cursor-pointer hover:bg-gray-400 hover:text-white rounded-md"
        >
          Shift+Enter
        </span>
        to Reset
      </p>
    </main>
  );
}
