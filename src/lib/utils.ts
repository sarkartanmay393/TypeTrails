import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function countWords(s: string) {
  s = s.replace(/(^\s*)|(\s*$)/gi, ""); //exclude  start and end white-space
  s = s.replace(/[ ]{2,}/gi, " "); //2 or more space to 1
  s = s.replace(/\n /, "\n"); // exclude newline with a start spacing
  return s.split(" ").filter(String).length;
}

export const checkAccuracy = (userInput: string, text: string) => {
  let mistakes = 0;
  let accuracy = 0;
  let corrects = 0;
  const wordLength = countWords(userInput);
  userInput.split("").forEach((c, i) => {
    if (c === text.charAt(i)) corrects++;
    else mistakes++;
  });

  accuracy = (corrects / userInput.length) * 100;
  accuracy = Number(accuracy.toFixed(1));
  return { accuracy, wordLength, mistakes };
};

export const charLevelChecks = (
  userInput: string,
  index: number,
  char: string,
  focusOnTyping: boolean
) => {
  const color =
    userInput.length > index
      ? userInput.charAt(index) === char
        ? "text-correct"
        : "text-mistake"
      : "";
  const currentPosition =
    userInput.length === index
      ? focusOnTyping
        ? "underline underline-offset-2 decoration-red-300"
        : ""
      : "";

  return [color, currentPosition];
};

export function calculateSpeed(wordCount: number, time: number) {
  let seconds = time / 1000;
  // seconds = seconds % 60;
  // let words = 60*(wordCount/seconds)
  let minutes = seconds / 60;
  let speed = minutes ? (wordCount / minutes).toFixed(1) : 0;
  return Number(speed);
}
