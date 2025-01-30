import { useState } from "react";
import ProjectTree from "./ProjectTree";
import Dependencies from "./Dependencies";
import SwitchBtn from "./SwitchBtn";
import General from "./General";

type PreviewCategory = "general" | "files" | "dependencies";

export default function PreviewCategorySwitch() {
  const [previewCategory, setPreviewCategory] = useState<PreviewCategory>("general");

  const switchButtonGroup = (
    <div className="flex justify-center space-x-4 w-fit m-auto mb-[80px] mt-[40px] p-6 rounded-[30px] shadow-white-l">
      <SwitchBtn
        btnText="General"
        active={previewCategory === "general"}
        onClick={() => setPreviewCategory("general")}
      />
      <SwitchBtn
        btnText="Project structure"
        active={previewCategory === "files"}
        onClick={() => setPreviewCategory("files")}
      />
      <SwitchBtn
        btnText="Dependencies"
        active={previewCategory === "dependencies"}
        onClick={() => setPreviewCategory("dependencies")}
      />
    </div>
  );

  switch (previewCategory) {
    case "general":
      return (
        <div className="grow">
          {switchButtonGroup}
          <General />
        </div>
      );
    case "files":
      return (
        <div className="grow">
          {switchButtonGroup}
          <ProjectTree />
        </div>
      );
    case "dependencies":
      return (
        <div className="grow">
          {switchButtonGroup}
          <Dependencies />
        </div>
      );
  }
}
