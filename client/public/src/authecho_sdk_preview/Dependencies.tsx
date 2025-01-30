import { mappedDependencies } from "./previewHelper";

export default function Dependencies() {
  return (
    <div>
      <h2 className="text-center text-2xl text-sky-300 mb-[70px]">
        Comprehensive Overview of Pre-Installed Dependencies to Facilitate Your Experience with
        Authecho's SDK
      </h2>
      {mappedDependencies.map((dependencyCategory, index) => {
        return (
          <div key={index}>
            <h3 className="text-center text-xl font-bold my-8 pb-4 border-b-[1px] border-gray-500">
              {dependencyCategory.entry}
            </h3>
            <div>
              {dependencyCategory.dependencies.map((dep, ind) => {
                return (
                  <div key={index + 1 * ind + 1}>
                    <h4 className="text-center font-semibold text-sky-500 my-6">
                      {dep.dependency}
                    </h4>
                    <p className="max-w-[80%] xl:max-w-[1200px] m-auto">{dep.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
