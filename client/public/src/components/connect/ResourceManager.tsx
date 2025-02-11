import { useEffect, useState } from "react";
import { ConnectResource } from "../../types/types";
import ResourceInput from "./ResourceInput";
import { GoPlus } from "react-icons/go";
import { generateID } from "../../utils/utils";
import OutlineBtn from "../btn/OutlineBtn";

interface Props {
  handleAddResources: (resources: ConnectResource[]) => void;
}

export default function ResourceManager({ handleAddResources }: Props) {
  const [resources, setResources] = useState<ConnectResource[]>([]);

  useEffect(() => {
    handleAddResources(resources);
  }, [resources]);

  const createResourceObject = (): void => {
    if (resources.length >= 10) return;

    setResources((prev) => [
      ...prev,
      {
        id: generateID([...prev].map((res) => res.id)),
        name: "",
        resource: "",
        visibility: "private",
      },
    ]);
  };

  const addResource = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    resourceID: number
  ): void => {
    const { name, value } = e.target;

    const updatedResources: ConnectResource[] = [...resources].map((resource) => {
      if (resource.id === resourceID) {
        return { ...resource, [name]: value };
      }
      return resource;
    });

    setResources(updatedResources);
  };

  const toggleResourceVisibility = (resourceID: number) => {
    const updatedResources: ConnectResource[] = [...resources].map((resource) => {
      if (resource.id === resourceID) {
        return {
          ...resource,
          visibility: resource.visibility === "private" ? "public" : "private",
        };
      }
      return resource;
    });

    setResources(updatedResources);
  };

  const deleteResource = (resourceID: number): void => {
    const filteredResources = [...resources].filter((resource) => resource.id !== resourceID);
    setResources(filteredResources);
  };

  return (
    <div className="flex flex-col gap-y-6 my-10">
      <div className="flex justify-between items-center">
        <label className="text-lg text-cyan-200">Resources</label>
        <OutlineBtn
          btnText="New Resource"
          fontSize="sm"
          onClick={createResourceObject}
          icon={<GoPlus size={24} />}
        />
      </div>
      <ul className="flex flex-col gap-y-4">
        {resources.map((resource) => {
          return (
            <li key={resource.id}>
              <ResourceInput
                resource={resource}
                addResource={addResource}
                toggleResourceVisibility={toggleResourceVisibility}
                deleteResource={deleteResource}
              />
            </li>
          );
        })}
      </ul>
      <p>
        You can enhance your workflow by adding various resources, which will assist you as a
        developer in organizing and maintaining essential links in a centralized location. Examples
        of such links include platforms like GitHub, Figma, and Jira, which are pivotal for
        collaborative projects and resource management.You may choose to keep these resources either
        private or public, thereby controlling whether users can view them.
        <span className="text-red-400">
          &nbsp; Please note that you may include a maximum of 10 resources for each connected
          application.
        </span>
      </p>
    </div>
  );
}
