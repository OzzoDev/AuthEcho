import SearchBar from "../../utils/SearchBar";
import { AuthechoApp } from "../../../types/types";
import { APP_STATUS_MAP } from "../../../constants/contants";
import Dropdown from "../../utils/Dropdown";
import useAuthStore from "../../../hooks/useAuthStore";

interface Props {
  apps: AuthechoApp[];
  setApps: (apps: AuthechoApp[]) => void;
  onSearch: (query: string) => void;
}

export default function AppFilters({ apps, setApps, onSearch }: Props) {
  const { username } = useAuthStore();

  const handleSerach = (query: string): void => {
    const filteredApps: AuthechoApp[] = [...apps].map((app) => ({
      ...app,
      isVisible: app.name.toLowerCase().includes(query),
    }));
    setApps(filteredApps);
    onSearch(query);
  };

  const handleSort = (option: string): void => {
    let sortedApps: AuthechoApp[] = apps;

    switch (option) {
      case "Many - Few Users":
        sortedApps = [...apps].sort((a, b) => b.users - a.users);
        break;
      case "Few-Many Users":
        sortedApps = [...apps].sort((a, b) => a.users - b.users);
        break;
      case "Production - Development":
        sortedApps = [...apps].sort(
          (a, b) => APP_STATUS_MAP[b.status].sortValue - APP_STATUS_MAP[a.status].sortValue
        );
        break;
      case "Development - Production":
        sortedApps = [...apps].sort(
          (a, b) => APP_STATUS_MAP[a.status].sortValue - APP_STATUS_MAP[b.status].sortValue
        );
        break;
      case "Many - Few Admins":
        sortedApps = [
          ...apps.map((app) => ({
            ...app,
            admins: app.admins.filter((admin) => admin !== username),
          })),
        ].sort((a, b) => b.admins.length - a.admins.length);
        break;
      case "Few - Many Admins":
        sortedApps = [
          ...apps.map((app) => ({
            ...app,
            admins: app.admins.filter((admin) => admin !== username),
          })),
        ].sort((a, b) => a.admins.length - b.admins.length);
        break;
      case "Many - Few Resources":
        sortedApps = [...apps].sort((a, b) => b.resources.length - a.resources.length);
        break;
      case "Few - Many Resources":
        sortedApps = [...apps].sort((a, b) => a.resources.length - b.resources.length);
        break;
      default:
        break;
    }

    setApps(sortedApps);
  };

  const sortOptions = [
    "Many - Few Users",
    "Few-Many Users",
    "Production - Development",
    "Development - Production",
    "Many - Few Admins",
    "Few - Many Admins",
    "Many - Few Resources",
    "Few - Many Resources",
  ];

  return (
    <div className="flex flex-col gap-y-4 p-2 mb-4 pb-10 border-b-[1px] bg-black bg-opacity-20">
      <div className="flex flex-col md:flex-row gap-x-10 gap-y-6">
        <div className="w-[90%] max-w-[400px]">
          <SearchBar onChange={handleSerach} autofocus />
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-4 w-[90%] max-w-[500px]">
          <p className="whitespace-nowrap px-2">Sort apps</p>
          <Dropdown items={sortOptions} initialValue={sortOptions[0]} onSelect={handleSort} />
        </div>
      </div>
    </div>
  );
}
