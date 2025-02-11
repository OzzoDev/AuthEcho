import useAuthStore from "../../hooks/useAuthStore";
import { ConnectResource } from "../../types/types";
import DangerBtn from "../btn/DangerBtn";
import ToggleBtn from "../btn/ToggleBtn";
import DescriptiveInput from "../utils/DescriptiveInput";

interface Props {
  resource: ConnectResource;
  addResource: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    resourceID: number
  ) => void;
  toggleResourceVisibility: (resourceID: number) => void;
  deleteResource: (resourceID: number) => void;
}

export default function ResourceInput({
  resource,
  addResource,
  toggleResourceVisibility,
  deleteResource,
}: Props) {
  const { username } = useAuthStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    addResource(e, resource.id);
  };

  return (
    <div className="flex flex-col gap-y-6 py-4 px-6 bg-gray-800">
      <div className="flex flex-col md:flex-row gap-6 w-full">
        <DescriptiveInput
          labelText="Name"
          name="name"
          placeholder={"eg. Github, Jira"}
          onChange={handleChange}
        />
        <DescriptiveInput
          labelText="Resource"
          name="resource"
          placeholder={`eg. https://github.com/${username}/app`}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col md:flex-row justify-end gap-6">
        <ToggleBtn btnText="Is public" onClick={() => toggleResourceVisibility(resource.id)} />
        <DangerBtn btnText="Remove Resource" onClick={() => deleteResource(resource.id)} />
      </div>
    </div>
  );
}
