import { useEffect, useState } from "react";
import { IoIosSearch, IoMdClose } from "react-icons/io";
import OutlineBtn from "../btn/OutlineBtn";

interface Props {
  handleAddAdmins: (admins: string[]) => void;
}

export default function AdminManager({ handleAddAdmins }: Props) {
  const [admins, setAdmins] = useState<string[]>(["ad1", "ad2", "ad3", "ad4"]);

  useEffect(() => {
    handleAddAdmins(admins);
  }, [admins]);

  const deleteAdmin = (admin: string): void => {
    const filteredAdmins = [...admins].filter((ad) => ad !== admin);
    setAdmins(filteredAdmins);
  };

  return (
    <div className="flex flex-col">
      <label></label>
      <div className="flex items-center gap-x-4 pb-[1px] border-b-[1px]">
        <IoIosSearch size={24} />
        <input type="text" className="w-full bg-transparent border-0 outline-none" />
      </div>
      <ul className="flex flex-wrap gap-2 p-4">
        {admins.map((admin) => {
          return (
            <OutlineBtn
              key={admin}
              btnText={admin}
              fontSize="sm"
              onClick={() => deleteAdmin(admin)}
              icon={<IoMdClose size={24} />}
            />
          );
        })}
      </ul>
      <p>
        You have the option to add your colleagues as administrators to your application, which
        grants them elevated access rights. This means they will possess the authority to modify and
        edit the metadata associated with the application, thereby facilitating collaborative
        management and oversight.
      </p>
    </div>
  );
}
