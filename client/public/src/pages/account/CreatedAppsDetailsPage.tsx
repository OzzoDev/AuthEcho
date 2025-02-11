import OutlineBtn from "../../components/btn/OutlineBtn";
import { IoArrowBackOutline } from "react-icons/io5";
import { Navigate, useNavigate, useParams } from "react-router";
import useMangeAppStore from "../../hooks/useManageAppStore";
import AppCard from "../../components/account/createdApps/AppCard";

export default function CreatedAppsDetailsPage() {
  const navigate = useNavigate();
  const { appname } = useParams();
  const { getApp } = useMangeAppStore();

  const app = getApp(appname);

  if (!app) {
    return <Navigate to="/account/myapps" />;
  }

  const redirectToCreatedAppsPage = (): void => {
    navigate("/account/myapps");
  };

  return (
    <div>
      <OutlineBtn
        btnText="Go back"
        onClick={redirectToCreatedAppsPage}
        icon={<IoArrowBackOutline size={24} />}
      />
      <AppCard app={app} />
    </div>
  );
}
