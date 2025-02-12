import { IoArrowBackOutline } from "react-icons/io5";
import OutlineBtn from "../../components/btn/OutlineBtn";
import { useNavigate, useParams } from "react-router";

export default function ControlledAppTrafficPage() {
  const navigate = useNavigate();
  const { appname } = useParams();

  const redirectToCreatedAppsDetialsPage = (): void => {
    navigate(`/account/myapps/${appname}`);
  };

  return (
    <div>
      <div className="p-4">
        <OutlineBtn
          btnText="Go back"
          onClick={redirectToCreatedAppsDetialsPage}
          icon={<IoArrowBackOutline size={24} />}
        />
      </div>
      <div>traffic page</div>
    </div>
  );
}
