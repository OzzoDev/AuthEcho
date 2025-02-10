import { useEffect, useState } from "react";
import { ConnectRequest } from "../../types/types";
import useAuthStore from "../../hooks/useAuthStore";
import { IoMdCheckmark } from "react-icons/io";
import ConnectForm from "../../components/connect/ConnectForm";
import Modal from "../../components/utils/Modal";
import SecretText from "../../components/utils/SecretText";
import SecondaryBtnCheck from "../../components/btn/SecondaryBtnCheck";
import useClipboard from "../../hooks/useClipboard";

export default function ConnectControls() {
  const { copyToClipboard } = useClipboard();
  const { username } = useAuthStore();
  const [connectData, setConnectData] = useState<ConnectRequest>({
    appName: "",
    origin: "http://localhost:3001",
    admin: username || "",
    appDescription: "",
  });
  const [appKey, setAppKey] = useState<string>("");
  const [appName, setAppName] = useState<string>("");
  const [keyIsCopied, setKeyIsCopied] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    if (showModal) {
      setShowModal(false);
    }
  }, [connectData]);

  useEffect(() => {
    if (appKey) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [appKey]);

  const handleCopyKey = () => {
    if (!keyIsCopied) {
      copyToClipboard(appKey);
    }
    setKeyIsCopied((prev) => !prev);
  };

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      if (keyIsCopied) {
        setKeyIsCopied(false);
      }
    }, 3000);

    return () => clearTimeout(timeoutID);
  }, [keyIsCopied]);

  return (
    <div className="grow flex flex-col items-center gap-y-[100px] pt-[100px] pb-[50px] text-white">
      <h1 className="text-4xl text-center max-w-[90%] text-sky-200">
        Connect your app to Authecho!
      </h1>
      <ConnectForm
        connectData={connectData}
        setConnectData={setConnectData}
        setAppKey={setAppKey}
        setAppName={setAppName}
      />
      {showModal && (
        <Modal onClose={() => setAppKey("")}>
          <h2 className="text-xl">
            App <span className="text-gray-400">{appName}</span> connected successfully
          </h2>
          <p className="text-green-500">Your API key</p>
          <div className="flex space-x-4">
            <SecretText text={appKey} />
          </div>
          <p className="text-gray-400 max-w-[250px]">
            This key is displayed only once for your security. Please ensure that you store it in a
            secure location for future reference.
          </p>
          <SecondaryBtnCheck
            btnText="Copy API key"
            fontSize="sm"
            width="w-full"
            checkedIcon={<IoMdCheckmark size={20} />}
            onClick={handleCopyKey}
          />
          {keyIsCopied && (
            <p className="text-green-400 text-center">APi key copied to clipboard </p>
          )}
        </Modal>
      )}
    </div>
  );
}
