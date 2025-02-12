import { useEffect, useMemo, useState } from "react";
import { IoMdClose } from "react-icons/io";
import SearchSuggestor from "../utils/SearchSuggestor";
import { UserAlias } from "../../types/types";
import OutlineCyanBtn from "../btn/OutlineCyanBtn";
import useApi from "../../hooks/useApi";
import useAuthStore from "../../hooks/useAuthStore";

interface Props {
  admins: string[];
  setAdmins: (admins: string[]) => void;
}

export default function AdminManager({ admins, setAdmins }: Props) {
  const { username } = useAuthStore();
  const { fetchData: getUserAlias } = useApi("GET", "GETUSERALIAS");
  const [users, setUsers] = useState<UserAlias[]>([]);

  useEffect(() => {
    (async () => {
      const response = await getUserAlias();
      if (response && response.data.userAlias) {
        const userAlias = response.data.userAlias.filter((alias) => alias.name !== username);
        setUsers(userAlias);
      }
    })();
  }, []);

  const availableUsers: string[] = useMemo(() => {
    return [...users]
      .filter((availableUser) => !admins.includes(availableUser.name))
      .map((availableUser) => `${availableUser.name}, ${availableUser.email}`);
  }, [users, admins]);

  const addAdmin = (admin: string) => {
    if (admins.length >= 10) return;
    const adminUsername = admin.split(",")[0].trim();
    const updatedAdmins = [...new Set([...admins, adminUsername])];
    setAdmins(updatedAdmins);
  };

  const deleteAdmin = (admin: string): void => {
    const filteredAdmins = [...admins].filter((ad) => ad !== admin);
    setAdmins(filteredAdmins);
  };

  return (
    <div className="flex flex-col">
      <label></label>
      <SearchSuggestor data={availableUsers} select={addAdmin} />
      <ul className="flex flex-wrap gap-2 p-4">
        {admins.map((admin) => {
          return (
            <OutlineCyanBtn
              key={admin}
              btnText={admin}
              fontSize="sm"
              onClick={() => deleteAdmin(admin)}
              icon={<IoMdClose size={24} color="cyan" />}
            />
          );
        })}
      </ul>
      <p className="text-gray-400">
        You have the option to add your colleagues as administrators to your application, which
        grants them elevated access rights. This means they will possess the authority to modify and
        edit the metadata associated with the application, thereby facilitating collaborative
        management and oversight.
        <span className="text-red-400">
          &nbsp; Please note that you may add a maximum of 10 admins.
        </span>
      </p>
    </div>
  );
}
