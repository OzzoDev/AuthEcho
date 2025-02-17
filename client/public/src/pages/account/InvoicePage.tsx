import { IoArrowBackOutline } from "react-icons/io5";
import OutlineBtn from "../../components/btn/OutlineBtn";
import { useNavigate, useParams } from "react-router";
import useAccountStore from "../../hooks/useAccountStore";
import AppCardData from "../../components/account/app/AppCardData";
import { useEffect } from "react";
import DangerBtn from "../../components/btn/DangerBtn";
import { FaRegTrashCan } from "react-icons/fa6";
import useAccountApi from "../../hooks/useAccountApi";
import { HashLoader } from "react-spinners";

export default function InvoicePage() {
  const navigate = useNavigate();
  const { invoiceid } = useParams();
  const { status, getInvoice, removeInvoice } = useAccountStore();
  const { callApi: readInvocie } = useAccountApi("PUT", "READINVOICE");
  const { callApi: deleteInvocie } = useAccountApi("DELETE", "DELETEINVOCIE");
  const invoice = getInvoice(decodeURIComponent(invoiceid || ""));

  useEffect(() => {
    (async () => {
      await readInvocie();
    })();
  }, []);

  const navigateToInvoicesPage = (): void => {
    navigate("/account/invoices");
  };

  const handleDeleteInvocie = async (): Promise<void> => {
    const response = await deleteInvocie();
    if (response) {
      removeInvoice(decodeURIComponent(invoiceid || ""));
      navigateToInvoicesPage();
    }
  };

  if (status === "loading") {
    return <HashLoader size={50} color="white" className="m-auto" />;
  }

  if (!invoice) {
    return (
      <div>
        <div className="p-4">
          <OutlineBtn
            btnText="Go back"
            onClick={navigateToInvoicesPage}
            icon={<IoArrowBackOutline size={24} />}
          />
        </div>
        <h2 className="text-2xl font-semibold text-red-400 ml-[20px] pt-[30px] pb-[60px]">
          Invoice not found
        </h2>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="p-4">
        <OutlineBtn
          btnText="Go back"
          onClick={navigateToInvoicesPage}
          icon={<IoArrowBackOutline size={24} />}
        />
      </div>
      <div className="flex flex-col gap-y-20 mt-10 p-6">
        <div className="flex flex-col-reverse md:flex-row gap-y-4 justify-between">
          <div className="flex flex-col gap-y-1 w-full">
            <AppCardData desciption="Subject" data={invoice.subject} />
            <AppCardData desciption="From" data={invoice.from} />
            <AppCardData desciption="Sent at" data={invoice.sentAt} />
          </div>
          <div className="self-end md:self-start">
            <DangerBtn btnText="Delete" onClick={handleDeleteInvocie} icon={<FaRegTrashCan />} />
          </div>
        </div>
        <p>{invoice.text}</p>
      </div>
    </div>
  );
}
