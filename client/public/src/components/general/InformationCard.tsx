import React from "react";

interface Props {
  headline: string;
  text: string;
  icon: React.ReactNode;
}

export default function InformationCard({ headline, text, icon }: Props) {
  return (
    <div className="grid grid-cols-[repeat(2,1fr)] w-full max-w-[800px] p-10 rounded-xl bg-black bg-opacity-40 shadow-[0_0px_30px_rgb(255,255,255,0.5)] text-white">
      <h2 className="text-2xl font-bold">{headline}</h2>
      <div className="flex justify-end">{icon}</div>
      <p className="text-lg col-span-2 mt-8">{text}</p>
    </div>
  );
}
