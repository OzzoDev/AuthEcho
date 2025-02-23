import { HashLoader } from "react-spinners";
import useAdminStore from "../../hooks/useAdminStore";
import UserCard from "../../components/admin/users/UserCard";
import { PiUsersThreeBold } from "react-icons/pi";
import { calcPageCount, formatLargeNumber, showOnPagination } from "../../utils/utils";
import Paginator from "../../components/utils/Paginator";
import { useEffect, useState } from "react";
import { PaginatedPage, UserData } from "../../types/types";
import SearchBarFlat from "../../components/utils/SearchBarFlat";

const ITEMS_PER_PAGE = 10;

export default function UsersPage() {
  const { status, overview } = useAdminStore();
  const [users, setUsers] = useState<UserData[]>([]);
  const [page, setPage] = useState<PaginatedPage>({ current: 1, latest: 1, pageCount: 1 });

  useEffect(() => {
    const storedUsers = overview.users;
    if (storedUsers) {
      setUsers(storedUsers);
    }
  }, [overview, setUsers]);

  const handleSearch = (query: string): void => {
    const filteredUsers: UserData[] = users.map((user) => {
      return {
        ...user,
        isVisible:
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          user.email.toLowerCase().includes(query.toLowerCase()),
      };
    });

    setUsers(filteredUsers);

    setPage((prev) => ({
      ...prev,
      current: query ? 1 : prev.latest,
      pageCount: calcPageCount(filteredUsers, ITEMS_PER_PAGE),
    }));
  };

  const handlePagination = (_: unknown, value: number): void => {
    setPage((prev) => ({ ...prev, current: value, latest: value }));
  };

  if (status === "loading") {
    return <HashLoader size={50} color="white" className="m-auto" />;
  }

  if (users.length === 0) {
    return (
      <h2 className="text-2xl font-semibold text-cyan-300 ml-[20px] pt-[30px] pb-[60px]">
        No users connected
      </h2>
    );
  }

  const filteredUsers = [...users]
    .filter((user) => user.isVisible)
    .filter((_, index) => showOnPagination(index, page.current, ITEMS_PER_PAGE));

  const paginate = users.length > ITEMS_PER_PAGE && filteredUsers.length > 0;

  return (
    <div className="w-full">
      <div className="flex gap-x-2 items-center p-4">
        <PiUsersThreeBold size={24} />
        <p className="text-gray-400">
          Users&nbsp;
          <span className="text-cyan-300 font-semibold">{formatLargeNumber(users.length)}</span>
        </p>
      </div>
      <div className="flex flex-col gap-y-6 p-4">
        <SearchBarFlat onChange={handleSearch} />
        {paginate && (
          <div className="flex justify-center py-6">
            <Paginator onChange={handlePagination} count={page.pageCount} />
          </div>
        )}
      </div>
      {filteredUsers.length === 0 ? (
        <h2 className="text-2xl font-semibold text-cyan-300 ml-[20px] pt-[30px] pb-[60px]">
          No matching user
        </h2>
      ) : (
        <ul className="flex flex-col gap-y-24 p-6 my-12">
          {filteredUsers.map((user) => {
            return (
              <li key={user.name}>
                <UserCard userData={user} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
