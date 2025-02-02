import GettingStarted from "./GettingStarted";
import PreviewCategorySwitch from "./PreviewCategorySwitch";
const APP_NAME = "MyApp";

export default function Preview() {
  return (
    <div className="grow flex flex-col items-center py-[80px] text-white">
      <h1 className="text-white text-center font-smeibold text-[3rem]">Welcome to {APP_NAME}!</h1>
      <GettingStarted />
      <h2 className="text-cyan-500 text-center text-2xl my-8">What is included?</h2>
      <PreviewCategorySwitch />
    </div>
  );
}
