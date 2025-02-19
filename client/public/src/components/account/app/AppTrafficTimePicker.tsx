import { useState } from "react";
import AppTrafficTimeBtn from "./AppTrafficTimeBtn";
import { TIME_OPTIONS } from "../../../constants/contants";
import { ActivityLog, TimeOption } from "../../../types/types";

interface Props {
  appActivity: ActivityLog[][];
  setSelectedAppActivity: (appActivity: ActivityLog[]) => void;
}

export default function AppTrafficTimePicker({ appActivity, setSelectedAppActivity }: Props) {
  const [selectedValue, setSelectedValue] = useState<string>(
    TIME_OPTIONS[TIME_OPTIONS.length - 1].time
  );

  const handleSelectValue = (value: string): void => {
    setSelectedValue(value);
    const index: number = TIME_OPTIONS.indexOf(
      TIME_OPTIONS.find((timeOption) => timeOption.time === value) as TimeOption
    );
    setSelectedAppActivity(appActivity[index]);
  };

  const calcProgression = (index: number): string => {
    if (!appActivity[index] || appActivity[index].length === 0) return "0%";
    const startDate = appActivity[index][0];

    const averageUserCount =
      appActivity[index].reduce((acc, curr) => {
        return acc + curr.userCount;
      }, 0) / appActivity[index].length;

    const progress: number = startDate.userCount === 0 ? 1 : averageUserCount / startDate.userCount;

    if (progress >= 1 || progress === 0) {
      return `+${(progress * 100 - progress > 1 ? 100 : 0).toFixed(0)}%`;
    }
    return `-${((1 - progress) * 100).toFixed(0)}%`;
  };

  return (
    <div className="w-full p-4">
      <ul className="flex lg:justify-center gap-x-6 overflow-x-auto max-w-full mr-30">
        {TIME_OPTIONS.map((opt, index) => {
          return (
            <AppTrafficTimeBtn
              key={opt.time}
              label={opt.time}
              data={calcProgression(index)}
              value={opt.time}
              currentValue={selectedValue}
              onClick={handleSelectValue}
            />
          );
        })}
      </ul>
    </div>
  );
}
