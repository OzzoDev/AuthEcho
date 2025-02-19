import { useEffect, useState } from "react";
import { Issue } from "../../types/types";
import useAuthStore from "../../hooks/useAuthStore";
import useAccountApi from "../../hooks/useAccountApi";
import DescriptiveInput from "../../components/utils/DescriptiveInput";
import SecondaryBtn from "../../components/btn/SecondaryBtn";
import { LuFlag } from "react-icons/lu";
import Modal from "../../components/utils/Modal";
import useAccountStore from "../../hooks/useAccountStore";
import { HashLoader } from "react-spinners";

export default function ContactPage() {
  const { isAuthenticated } = useAuthStore();
  const { status, error } = useAccountStore();
  const { callApi: reportIssue } = useAccountApi("POST", "REPORTISSUE");
  const [issueData, setIssueData] = useState<Issue>({ issue: "", text: "" });
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (showModal) {
        setShowModal(false);
      }
    }, 7000);

    return () => clearTimeout(timeout);
  }, [showModal]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setIssueData((prev) => ({ ...prev, [name]: value }));
    setShowModal(false);
  };

  const handleReportIssue = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const response = await reportIssue(true, issueData);
    if (response) {
      setIssueData({ issue: "", text: "" });
    }
    setShowModal(true);
  };

  if (status === "loading") {
    return <HashLoader size={50} color="white" className="m-auto" />;
  }

  return (
    <div className="relative">
      <div className="flex flex-col gap-y-20 m-auto mt-10 w-[90%] max-w-[900px]">
        <h1 className="text-2xl text-center text-sky-300">
          Welcome to the Authecho Contact Page. Here, you can report any issues you may have
          experienced while using Authecho.
        </h1>
        <h2 className="text-center text-gray-400">
          To report an issue with any of Authecho's services, please complete the form below while
          logged in. It is essential that all issues are submitted by an authenticated user, as this
          ensures accountability and facilitates efficient resolution. When you choose to report an
          issue, your name will be recorded to associate your username with the reported problem.
          Additionally, please note that you are permitted to submit only one issue at a time.
          Therefore, if you submit a report, you will not be able to report any further issues until
          the current one has been resolved.
        </h2>
      </div>
      {isAuthenticated ? (
        <form
          onSubmit={handleReportIssue}
          className="flex flex-col gap-y-16 w-[90%] max-w-[700px] m-auto my-[200px]">
          <DescriptiveInput
            labelText="Name the issue"
            name="issue"
            value={issueData.issue}
            placeholder="eg., Account access issue"
            maxLength={100}
            isRequired
            onChange={handleChange}>
            <p>
              Please provide a descriptive name for the issue you wish to report. This will enable
              our team to investigate the problem more effectively and facilitate a timely
              resolution.
              <span className="text-red-400">
                &nbsp;Please note that the maximum allowable character limit is 100.
              </span>
            </p>
          </DescriptiveInput>
          <DescriptiveInput
            labelText="Describe the issue"
            type="textarea"
            name="text"
            value={issueData.text}
            placeholder="eg., I have been locked out of my account"
            maxLength={500}
            isRequired
            onChange={handleChange}>
            <p>
              Please provide a comprehensive description of the issue you have encountered. A
              thorough explanation will help ensure that the problem does not persist for an
              extended period.
              <span className="text-red-400">
                &nbsp;Kindly note that you may use a maximum of 500 characters to describe the
                issue.
              </span>
            </p>
          </DescriptiveInput>
          <div className="mt-4">
            <SecondaryBtn
              type="submit"
              btnText="Report issue"
              icon={<LuFlag size={24} />}
              width="w-full"
            />
          </div>
        </form>
      ) : (
        <h2 className="text-center text-xl text-red-300 my-24">Please login to report an issue</h2>
      )}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {error ? (
            <p className="text-red-400">{error}</p>
          ) : (
            <p className="text-green-400">
              Your issue has been reported successfully. An invoice has been sent to you for
              confirmation of the reported issue. You will receive further communication from
              Authecho once the issue has been resolved.
            </p>
          )}
        </Modal>
      )}
    </div>
  );
}
