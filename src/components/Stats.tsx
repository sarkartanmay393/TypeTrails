"use client";

import { useStoreState } from "~/app/_provider";

export function Stats() {
  const { speed, accuracy, timeTaken } = useStoreState((state) => state);
  let time = timeTaken / 1000;
  time = Number(time.toFixed(0));

  // const prettyTime = (timeInSeconds: number) => {
  //   let time = timeInSeconds / 60;
  //   let time2 = time.toFixed(2);
  //   let res = "";
  //   if (Number(time2.split(".")[0]) % 60) {
  //     res += time2.split(".")[0] = "s ";
  //   }
  // };

  return (
    <div className="px-4 py-3 w-[320px] flex flex-col items-start justify-center border-2 bg-gray-200 rounded-md space-y-2">
      <div className="shadow-sm rounded-md px-2 w-full flex justify-between text-2xl font-bold border-2">
        Time: <span className="font-medium text-gray-700">{time}s</span>
      </div>
      <div className="shadow-sm rounded-md px-2 w-full flex justify-between text-2xl font-bold border-2">
        Speed: <span className="font-medium text-gray-700">{speed}wpm</span>
      </div>
      <div className="shadow-sm rounded-md px-2 w-full flex justify-between text-2xl font-bold border-2">
        Accuracy: <span className="font-medium text-gray-700">{accuracy}%</span>
      </div>
    </div>
  );
}
