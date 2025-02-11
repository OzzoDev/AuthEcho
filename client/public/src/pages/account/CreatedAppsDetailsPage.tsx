import OutlineBtn from "../../components/btn/OutlineBtn";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router";

export default function CreatedAppsDetailsPage() {
  const navigate = useNavigate();

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
      <p>Created apps details page</p>
    </div>
  );
}
