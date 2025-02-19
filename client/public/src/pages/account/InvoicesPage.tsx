import { useEffect, useState } from "react";
import InvoiceCard from "../../components/account/invoice/InvoiceCard";
import SearchBarFlat from "../../components/utils/SearchBarFlat";
import { Invoice, PaginatedPage } from "../../types/types";
import { calcPageCount, showOnPagination } from "../../utils/utils";
import Paginator from "../../components/utils/Paginator";
import { Outlet, useParams } from "react-router";
import useAccountStore from "../../hooks/useAccountStore";
import useAccountApi from "../../hooks/useAccountApi";
import { HashLoader } from "react-spinners";

export default function InvoicesPage() {
  const { invoiceid } = useParams();
  const { status, updateInvoices } = useAccountStore();
  const { callApi: fetchInvoices } = useAccountApi("GET", "GETINVOICES");
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [page, setPage] = useState<PaginatedPage>({ current: 1, latest: 1, pageCount: 1 });

  useEffect(() => {
    (async () => {
      const response = await fetchInvoices();
      const fetchedInvocies = response?.data.invoices;

      if (fetchedInvocies) {
        const sortedInvoices = [...fetchedInvocies]
          .map((invocie) => ({ ...invocie, isVisible: true }))
          .sort((a, b) => {
            const isReadA = a.isRead;
            const isReadB = b.isRead;

            return isReadA === isReadB ? 0 : isReadA ? 1 : -1;
          });

        setInvoices(sortedInvoices);
        updateInvoices(sortedInvoices);
        setPage((prev) => ({ ...prev, pageCount: calcPageCount(sortedInvoices, 4) }));
      }
    })();
  }, []);

  useEffect(() => {
    const matchingInvocies = [...invoices].filter((invoice) => invoice.isVisible);
    setPage((prev) => ({ ...prev, pageCount: calcPageCount(matchingInvocies, 4) }));
  }, [invoices]);

  const handleSearch = (query: string): void => {
    const filteredInvoices: Invoice[] = [...invoices].map((invoice) => {
      return { ...invoice, isVisible: invoice.subject.toLowerCase().includes(query) };
    });
    setInvoices(filteredInvoices);

    if (query) {
      setPage((prev) => ({ ...prev, current: 1 }));
    } else {
      setPage((prev) => ({ ...prev, current: prev.latest }));
    }
  };

  const handlePagination = (_: unknown, value: number): void => {
    setPage((prev) => ({ ...prev, current: value, latest: value }));
  };

  const filteredInvoices = [...invoices]
    .filter((_, index) => showOnPagination(index, page.current, 4))
    .filter((invoice) => invoice.isVisible);

  const paginate = invoices.length > 4;
  const noMatchingInvocies = ![...invoices].some((invocie) => invocie.isVisible);

  if (status === "loading") {
    return <HashLoader size={50} color="white" className="m-auto" />;
  }

  if (invoices.length === 0) {
    return (
      <h2 className="text-2xl font-semibold text-cyan-300 ml-[20px] pt-[30px] pb-[60px]">
        You currently have no invoices
      </h2>
    );
  }

  if (invoiceid) {
    return <Outlet />;
  }

  return (
    <div className="w-full">
      <div className="p-2 mb-10">
        <SearchBarFlat onChange={handleSearch} />
      </div>
      {noMatchingInvocies ? (
        <h2 className="text-xl font-semibold text-red-400 p-8">
          You do not have any invoices that match the search query.
        </h2>
      ) : (
        <>
          {paginate && (
            <div className="flex justify-center py-6">
              <Paginator onChange={handlePagination} count={page.pageCount} />
            </div>
          )}
          <ul className="flex flex-col gap-y-10 w-full">
            {filteredInvoices.map((invoice) => {
              return <InvoiceCard key={invoice._id} invoice={invoice} />;
            })}
          </ul>
        </>
      )}
    </div>
  );
}
