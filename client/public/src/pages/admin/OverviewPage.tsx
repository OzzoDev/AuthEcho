import { GoInbox, GoArrowRight } from "react-icons/go";
import { HashLoader } from "react-spinners";
import OutlineBtn from "../../components/btn/OutlineBtn";
import DataCard from "../../components/utils/DataCard";
import { useNavigate } from "react-router";
import useAdminStore from "../../hooks/useAdminStore";
import { LuFlag } from "react-icons/lu";
import { IoBarChartOutline } from "react-icons/io5";
import { PiUsersThreeBold } from "react-icons/pi";

export default function OverviewPage() {
  const navigate = useNavigate();
  const { status, overview } = useAdminStore(true);

  if (status === "loading") {
    return <HashLoader size={50} color="white" className="m-auto" />;
  }

  const userCount = String(overview.users ? overview.users.length : 0);
  const appsCount = String(overview.apps ? overview.apps.length : 0);
  const usersToday = String(overview.userCountToday || 0);
  const unResolvedIssues = String(overview.unResolvedIssues || 0);

  return (
    <div className="flex flex-wrap justify-center p-20 gap-20  w-full">
      <DataCard data={userCount} label="Connected Users" icon={<PiUsersThreeBold size={24} />}>
        <p className="text-gray-300">
          This metric represents the total number of users who are currently connected to Authecho.
          These users have created accounts and initiated the use of Authecho's services, either as
          developers aiming to build highly scalable applications with integrated authentication or
          as end-users benefiting from the comprehensive account management features provided by
          Authecho.
        </p>
        <div className="mt-auto">
          <OutlineBtn
            btnText="See More"
            onClick={() => navigate("users")}
            icon={<GoArrowRight size={24} />}
          />
        </div>
      </DataCard>

      <DataCard data={appsCount} label="Connected Applications" icon={<GoInbox size={24} />}>
        <p className="text-gray-300">
          This figure indicates the number of applications that have been successfully integrated
          with Authecho. Various developers seek to leverage the Authecho SDK to facilitate rapid
          and scalable development, thereby delivering user-friendly platforms that feature
          centralized account management for streamlined access control.
        </p>
        <div className="mt-auto">
          <OutlineBtn
            btnText="See More"
            onClick={() => navigate("apps")}
            icon={<GoArrowRight size={24} />}
          />
        </div>
      </DataCard>

      <DataCard
        data={usersToday}
        label="User Activity Today"
        icon={<IoBarChartOutline size={24} />}>
        <p className="text-gray-300">
          This visualization reflects the number of authenticated users who have engaged with
          Authecho today. This includes developers managing their applications by updating metadata
          and analyzing app traffic, as well as users interacting with Authecho to perform
          account-related tasks, such as updating their user profiles.
        </p>
        <div className="mt-auto">
          <OutlineBtn
            btnText="See More"
            onClick={() => navigate("traffic")}
            icon={<GoArrowRight size={24} />}
          />
        </div>
      </DataCard>

      <DataCard data={unResolvedIssues} label="Unresolved Issues" icon={<LuFlag size={24} />}>
        <p className="text-gray-300">
          This section highlights the issues reported by users that remain unresolved or under
          review. It is imperative that these issues are addressed promptly to ensure a positive
          user experience and maintain the integrity of the Authecho platform.
        </p>
        <div className="mt-auto">
          <OutlineBtn
            btnText="See More"
            onClick={() => navigate("reportedissues")}
            icon={<GoArrowRight size={24} />}
          />
        </div>
      </DataCard>
    </div>
  );
}
