import { AuthechoApp } from "../../../types/types";
import { IoSettingsOutline } from "react-icons/io5";
import SecondaryBtn from "../../btn/SecondaryBtn";
import { capitalize, joinWithAnd, removeAllWhitespaces } from "../../../utils/utils";
import { useNavigate } from "react-router";
import AppCardData from "./AppCardData";
import { APP_STATUS_MAP } from "../../../constants/contants";
import { PiUsersThree } from "react-icons/pi";
import useAuthStore from "../../../hooks/useAuthStore";

interface Props {
  app: AuthechoApp;
  detailsPath: "myapps" | "administeredapps";
  isManageable?: boolean;
}

export default function AppCard({ app, detailsPath, isManageable = true }: Props) {
  const navigate = useNavigate();
  const { username } = useAuthStore();
  const creator = app.creator === username ? "You" : app.creator;
  const admins = joinWithAnd(app.admins.map((admin) => (admin === username ? "You" : admin)));

  const redirectToDetailsPage = (): void => {
    isManageable &&
      navigate(`/account/${detailsPath}/${removeAllWhitespaces(app.name.toLowerCase())}`);
  };

  const appStatus = APP_STATUS_MAP[app.status];

  return (
    <div className="flex flex-col-reverse lg:flex-row justify-between gap-x-10 py-4 px-8">
      <div className="flex flex-col gap-y-8">
        <div className="flex flex-col gap-y-2 w-full">
          <AppCardData desciption="Name" data={app.name} />
          <AppCardData desciption="Origin" data={app.origin} isLink />
          <AppCardData desciption="Creator" data={creator} />
          <AppCardData desciption="Admins" data={admins} />
          <AppCardData desciption="Description" data={app.description} />
          {app.isFrozen && <p className="text-red-500">App is frozen</p>}
        </div>
        <ul className="flex flex-col gap-y-2 w-full">
          {app.resources.map((resource) => {
            return (
              <li key={resource.id} className="flex flex-col md:flex-row gap-x-6">
                <p
                  className="text-sky-300 whitespace-nowrap"
                  title={
                    resource.visibility === "public"
                      ? "This resource is publicly accessible."
                      : "This resource is restricted to application administrators and the creator."
                  }>
                  {resource.visibility === "public" ? "🔓" : "🔒"} {resource.name}
                </p>
                <a
                  href={resource.resource}
                  className="text-sky-200 transition-all duration-300 hover:text-sky-500 underline break-all">
                  {resource.resource}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex flex-col-reverse md:flex-row lg:flex-col justify-between items-center gap-y-4 md:gap-y-0 mb-8 lg:mb-0 w-full lg:w-auto">
        <div className="flex flex-col items-center md:items-start lg:items-end gap-y-2">
          <div className="relative">
            <div
              style={{ backgroundColor: appStatus.color }}
              className="absolute top-[-5px] right-[-10px] w-[8px] h-[8px] rounded-full"
            />
            <AppCardData
              desciption="Status"
              data={`${appStatus.icon} ${capitalize(app.status)}`}
              noWrap
            />
          </div>
          <span className="flex gap-x-2">
            {app.users}
            <PiUsersThree size={26} />
          </span>
        </div>
        {isManageable && (
          <SecondaryBtn
            btnText="Manage app"
            onClick={redirectToDetailsPage}
            icon={<IoSettingsOutline size={24} />}
          />
        )}
      </div>
    </div>
  );
}
