//@ts-ignore
import authVideo from "../../assets/videos/authVideo.mp4";
import { MdLock, MdOutlineAccountTree, MdOutlineArrowUpward, MdOutlineSync } from "react-icons/md";
import InformationCard from "../../components/general/InformationCard";
import ServiceOverview from "../../components/general/ServiceOverview";
import Hero from "../../components/general/Hero";
import Reviews from "../../components/general/Reviews";

export default function StartPage() {
  return (
    <div className="mb-[100px]">
      <Hero />
      <ServiceOverview />
      <Reviews />
      <ul className="flex flex-col px-4 gap-y-[100px]">
        <li>
          <InformationCard
            headline="Why Authecho?"
            text="Authecho is an advanced authentication service designed to enhance account management efficiency. By enabling users to sign in with a single account across all supported applications, Authecho simplifies the user experience while maintaining robust security protocols."
            icon={<MdOutlineAccountTree size={50} color="white" />}
          />
        </li>

        <li className="self-end">
          <InformationCard
            headline="Security First"
            text="Security is the top priority of Authecho. All user traffic is routed through secure proxy servers, enhancing protection against potential threats. Additionally, every user must verify their account with email verification to ensure authenticity and prevent unauthorized access. With advanced encryption, multi-factor authentication (MFA), and continuous monitoring, users can trust that their information is secure and their authentication experience is safe."
            icon={<MdLock size={50} color="white" />}
          />
        </li>

        <li>
          <InformationCard
            headline="Seamless Integration"
            text="Authecho offers easy integration options for developers. Our robust APIs and SDKs allow you to effortlessly incorporate our authentication service into your applications, providing a consistent and user-friendly experience without the need for extensive modifications."
            icon={<MdOutlineSync size={50} color="white" />}
          />
        </li>

        <li className="self-end">
          <InformationCard
            headline="Scalable Solutions"
            text="Designed to grow with your needs, Authecho provides scalable authentication solutions suitable for businesses of all sizes. Whether you're a startup or an enterprise, our service adapts to accommodate increasing user demands while maintaining high performance and reliability."
            icon={<MdOutlineArrowUpward size={50} color="white" />}
          />
        </li>
      </ul>
    </div>
  );
}
