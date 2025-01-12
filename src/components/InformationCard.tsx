import React from "react";

interface Props {
  headline: string;
  text: string;
  icon: React.ReactNode;
}

export default function InformationCard({ headline, text, icon }: Props) {
  return (
    <div className="information-card">
      <h2 className="information-card-headline">{headline}</h2>
      <div className="information-card-icon">{icon}</div>
      <p className="information-card-text">{text}</p>
    </div>
  );
}
