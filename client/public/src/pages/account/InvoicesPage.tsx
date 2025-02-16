import { useEffect, useState } from "react";
import InvoiceCard from "../../components/account/invoice/InvoiceCard";
import SearchBarFlat from "../../components/utils/SearchBarFlat";
import { Invoice, paginatedPage } from "../../types/types";
import { calcPageCount, showOnPagination } from "../../utils/utils";
import Paginator from "../../components/utils/Paginator";

const invoicesArray: Invoice[] = [
  {
    _id: "invoice_1",
    subject: "Invoice #001 - Web Development Services",
    from: "designstudio@example.com",
    to: "clientA@example.com",
    text: "Thank you for choosing our web development services. This invoice covers the design and implementation of your new website.",
    isRead: true,
    sentAt: "2025-04-01:13:55",
    isVisible: true,
  },
  {
    _id: "invoice_2",
    subject: "Invoice #002 - Graphic Design Services",
    from: "graphics@example.com",
    to: "clientB@example.com",
    text: "We appreciate your business! This invoice details the graphic design work completed for your marketing materials.",
    isRead: false,
    sentAt: "2025-04-01:13:55",
    isVisible: true,
  },
  {
    _id: "invoice_3",
    subject: "Invoice #003 - SEO Optimization",
    from: "seoagency@example.com",
    to: "clientC@example.com",
    text: "Your SEO optimization services are detailed in this invoice. Thank you for trusting us to enhance your online visibility.",
    isRead: false,
    sentAt: "2025-04-01:13:55",
    isVisible: true,
  },
  {
    _id: "invoice_4",
    subject: "Invoice #004 - Content Creation",
    from: "contentwriters@example.com",
    to: "clientD@example.com",
    text: "This invoice reflects the content creation services provided for your blog posts and articles. We hope you enjoy the results!",
    isRead: false,
    sentAt: "2025-04-01:13:55",
    isVisible: true,
  },
  {
    _id: "invoice_5",
    subject: "Invoice #005 - Digital Marketing Campaign",
    from: "marketingteam@example.com",
    to: "clientE@example.com",
    text: "Thank you for allowing us to manage your digital marketing campaign. This invoice outlines the services provided this month.",
    isRead: false,
    sentAt: "2025-04-01:13:55",
    isVisible: true,
  },
  {
    _id: "invoice_6",
    subject: "Invoice #006 - Social Media Management",
    from: "socialmedia@example.com",
    to: "clientF@example.com",
    text: "We appreciate your partnership! This invoice covers the management of your social media accounts for the past month.",
    isRead: false,
    sentAt: "2025-04-01:13:55",
    isVisible: true,
  },
  {
    _id: "invoice_7",
    subject: "Invoice #007 - Mobile App Development",
    from: "appdev@example.com",
    to: "clientG@example.com",
    text: "Thank you for choosing us for your mobile app development needs. This invoice outlines the work completed to date.",
    isRead: false,
    sentAt: "2025-04-01:13:55",
    isVisible: true,
  },
  {
    _id: "invoice_8",
    subject: "Invoice #008 - Video Production Services",
    from: "videostudio@example.com",
    to: "clientH@example.com",
    text: "This invoice details the video production services provided for your latest project. We appreciate your trust in us!",
    isRead: false,
    sentAt: "2025-04-01:13:55",
    isVisible: true,
  },
  {
    _id: "invoice_9",
    subject: "Invoice #009 - IT Support Services",
    from: "itsupport@example.com",
    to: "clientI@example.com",
    text: "Thank you for using our IT support services. This invoice covers the assistance provided over the last month.",
    isRead: false,
    sentAt: "2025-04-01:13:55",
    isVisible: true,
  },
  {
    _id: "invoice_10",
    subject: "Invoice #010 - Consulting Services",
    from: "consultancy@example.com",
    to: "clientJ@example.com",
    text: "We value your business! This invoice summarizes the consulting services rendered to help your business grow.",
    isRead: false,
    sentAt: "2025-04-01:13:55",
    isVisible: true,
  },
];

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>(invoicesArray);
  const [page, setPage] = useState<paginatedPage>({ current: 1, latest: 1, pageCount: 1 });

  useEffect(() => {
    setPage((prev) => ({ ...prev, pageCount: calcPageCount(invoices, 4) }));
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

  const handlePagination = (_: unknown, value: number) => {
    setPage((prev) => ({ ...prev, current: value, latest: value }));
  };

  const filteredInvoices = [...invoices]
    .filter((_, index) => showOnPagination(index, page.current, 4))
    .filter((invoice) => invoice.isVisible);

  const paginate = invoices.length > 4;

  return (
    <div className="w-full">
      <div className="p-2 mb-10">
        <SearchBarFlat onChange={handleSearch} />
      </div>
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
    </div>
  );
}
