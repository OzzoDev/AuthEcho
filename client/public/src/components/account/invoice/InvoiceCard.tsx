import { useNavigate } from "react-router";
import { Invoice } from "../../../types/types";
import AppCardData from "../app/AppCardData";
import PrimaryBtn from "../../btn/PrimaryBtn";
import { IoMailUnreadOutline } from "react-icons/io5";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import useAccountApi from "../../../hooks/useAccountApi";

interface Props {
  invoice: Invoice;
}

export default function InvoiceCard({ invoice }: Props) {
  const navigate = useNavigate();
  const { callApi: readInvocie } = useAccountApi("PUT", "READINVOICE");

  const navigateToInvoiceDetailsPage = async () => {
    const response = await readInvocie(false, { invoiceID: invoice._id });
    response && navigate(`${encodeURIComponent(invoice._id)}`);
  };

  return (
    <div className="flex items-center justify-between w-full p-4">
      <div className="flex flex-col gap-y-1 w-full">
        <AppCardData desciption="Subject" data={invoice.subject} />
        <AppCardData desciption="From" data={invoice.from} />
        <AppCardData desciption="Sent at" data={invoice.sentAt} />
      </div>
      <PrimaryBtn
        btnText="Read"
        onClick={navigateToInvoiceDetailsPage}
        icon={invoice.isRead ? <MdOutlineMarkEmailRead /> : <IoMailUnreadOutline />}
      />
    </div>
  );
}
