import { INTRO_CONTENT } from "./previewHelper";

export default function General() {
  return (
    <div className="w-screen px-20 overflow-x-hidden">
      <h2 className="text-center text-2xl text-sky-300 mb-[70px]">
        Benefits of Utilizing the Authecho SDK
      </h2>
      <div className="grid grid-cols-1 gap-x-[100px] xl:grid-cols-3">
        {INTRO_CONTENT.map((intro, index) => {
          return (
            <div key={index}>
              <h3 className="text-xl text-center font-semibold my-6">{intro.header}</h3>
              <ul className="flex flex-col space-y-4 list-disc">
                {intro.contentItems.map((introContent, ind) => {
                  return <li key={ind + 1 * index + 1}>{introContent}</li>;
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
