import { ActivityLog } from "../../../types/types";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";

interface Props {
  appActivity: ActivityLog[];
}

export default function AppTrafficGraph({ appActivity }: Props) {
  if (!appActivity || appActivity.length === 0) {
    return (
      <div className="w-full h-[700px] mb-10 px-8">
        <h1 className="text-xl text-red-400">No data available for this time span</h1>
      </div>
    );
  }

  const averageUserCount =
    appActivity.reduce((acc, curr) => {
      return acc + curr.userCount;
    }, 0) / appActivity.length;

  const progress: number =
    averageUserCount / (appActivity[0].userCount === 0 ? 1 : appActivity[0].userCount);

  const dataPoints = appActivity.filter(
    (_, index) => index % Math.ceil(appActivity.length / 10) === 0
  );

  const reversedDates = [...dataPoints].map((point) => point.date).reverse();

  const points: ActivityLog[] = [...dataPoints].map((activityLog, index) => {
    if (index === dataPoints.length - 1) {
      return {
        date: reversedDates[index],
        userCount: Number(
          ((appActivity[0].userCount === 0 ? 1 : appActivity[0].userCount) * progress).toFixed(0)
        ),
      };
    }
    return { date: reversedDates[index], userCount: Number(activityLog.userCount.toFixed(0)) };
  });

  return (
    <div className="w-full h-[700px] mb-10 px-8">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={points}>
          <XAxis dataKey="date" tick={{ fontSize: 10 }} angle={-20} textAnchor="end" />
          <YAxis />
          <Line
            type="monotone"
            dataKey="userCount"
            stroke="#67d3e6"
            strokeWidth={2}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
