import { ReactNode } from "react";

interface Props {
  data: string;
  label: string;
  icon?: ReactNode;
  children?: ReactNode;
}

export default function DataCard({ data, label, icon, children }: Props) {
  return (
    <div className="flex flex-col gap-y-8 w-[90%] max-w-[400px] p-6 rounded-lg bg-gradient-to-t from-sky-700 to-slate-700 shadow-[0_0px_10px_rgb(255,255,255,0.3)]">
      <div className="flex justify-between">
        <div className="flex flex-col gap-y-4">
          <p className="text-cyan-200 text-lg">{label}</p>
          <p className="text-green-400 bg-slate-800 w-fit px-2 py-1 rounded-full">{data}</p>
        </div>
        {icon}
      </div>
      {children}
    </div>
  );
}
