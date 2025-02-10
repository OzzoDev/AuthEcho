import { IoMdCheckmark } from "react-icons/io";
import SecondaryBtnCheck from "../../../components/btn/SecondaryBtnCheck";
import ConnectCommand from "../../../components/connect/ConnectCommand";
import useClipboard from "../../../hooks/useClipboard";

const INSTALLATION_COMMANDS = [
  "npm install authecho-sdk",
  "authecho-sdk",
  "npm run install:all",
  "npm start",
];

export default function ConnectInstallPage() {
  const { copyToClipboard } = useClipboard();

  const handleCopyAllCommands = () => {
    copyToClipboard(INSTALLATION_COMMANDS.join(" "));
  };

  return (
    <div className="w-full flex flex-col items-center gap-y-[50px] py-[100px]">
      <h2 className="text-4xl text-center max-w-[90%] text-sky-200">Installation guide</h2>
      <h3 className="my-10 w-[90%] max-w-[1000px] text-gray-300 text-center text-lg">
        To initiate the development of your upcoming application using the Authecho SDK, we kindly
        request that you adhere to the following installation guide. This will facilitate a seamless
        experience throughout the setup process. During the installation, you will be prompted to
        provide both the <span className="text-sky-400">name</span> of your application and your{" "}
        <span className="text-sky-400">API key</span>. Therefore, we recommend that you have this
        information readily accessible to ensure a smooth and efficient installation. Thank you for
        your attention to these details, as they are essential for a successful integration with the
        Authecho SDK
      </h3>
      <SecondaryBtnCheck
        btnText="Copy all"
        onClick={handleCopyAllCommands}
        checkedIcon={<IoMdCheckmark size={24} />}
      />
      <ul className="flex flex-col items-center gap-y-40 w-full">
        {INSTALLATION_COMMANDS.map((command, index) => {
          return <ConnectCommand key={index} text={command} order={index + 1} />;
        })}
      </ul>
    </div>
  );
}
