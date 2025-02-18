import { HashLoader } from "react-spinners";
import useAdminStore from "../../hooks/useAdminStore";
import UserCard from "../../components/admin/users/UserCard";

export default function UsersPage() {
  const { status, overview } = useAdminStore();

  if (status === "loading") {
    return <HashLoader size={50} color="white" className="m-auto" />;
  }

  const users = overview.users || [];

  return (
    <div className="w-full">
      <ul className="flex flex-col gap-y-10 p-6 mt-28">
        {users.map((user) => {
          return (
            <li key={user.name} className="">
              <UserCard userData={user} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
