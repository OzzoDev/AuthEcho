import { useRef } from "react";
import { ROUTES } from "./previewHelper";
import SecondarBtn from "../components/btn/SecondaryBtn";

export default function GettingStarted() {
  const setUpSectionRef = useRef<HTMLDivElement | null>(null);

  const scrollToSetup = () => {
    if (setUpSectionRef.current) {
      const sectionTop = setUpSectionRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: sectionTop - 400,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex flex-col items-center">
      <p className="text-center max-w-[800px] px-8 mb-[100px] mt-[50px] text-red-600 font-semibold">
        Important Notice: If you are accessing this page via Vite on port 5174, please ensure that
        you use the reverse proxy server at http://localhost:3002 by default, or the URL/port
        specified when connecting the app. This is necessary to interact effectively with the
        Authecho API.
      </p>
      <SecondarBtn btnText="Go to set up" onClick={scrollToSetup} />
      <p className="text-center text-xl text-sky-400 font-semibold my-[80px] max-w-[90%]">
        Welcome onboard to Authecho's seamless and extensive SDK for developing fast and secure
        applications
      </p>
      <div>
        <p className="text-center text-2xl mb-8">What is the Authecho SDK?</p>
        <div className="flex gap-8 flex-col md:flex-row w-90% max-w-[1000px] px-8 mb-[100px]">
          <p>
            By choosing to develop your next application using Authecho's SDK, you are equipped with
            a comprehensive boilerplate of prebuilt components and layouts, seamlessly integrated
            with backend communication. The Authecho development experience is specifically designed
            to simplify and enhance the accessibility of creating cutting-edge applications, thereby
            reducing complexity for developers. Notably, it facilitates role-based frontend routing
            and integrates universal account management, effectively alleviating these concerns from
            the developer's responsibilities.
          </p>

          <p>
            The Authecho SDK includes boilerplate code for configuring your custom backend server
            based on your specific needs. Additionally, it features a prebuilt reverse proxy server
            that enhances security by minimizing direct exposure of backend communications on the
            frontend. This reverse proxy also efficiently manages frontend traffic by serving and
            forwarding requests to the frontend application.
          </p>

          <p>
            The primary objectives of implementing this reverse proxy are twofold: to bolster
            security and to enable the use of first-party cookies. By routing all API calls through
            the same origin as the client, the necessity for third-party cookies is eliminated,
            thereby significantly improving user experience. This approach not only enhances the
            security posture of your application but also streamlines the authentication and session
            management processes, ensuring a more cohesive and user-friendly experience.
          </p>
        </div>
      </div>
      <ul className="flex flex-col space-y-4 w-90% max-w-[1000px] px-8 mb-[100px]">
        {ROUTES.map((route) => {
          return (
            <li key={route.desc}>
              {route.role && <p className="text-red-600 font-semibold">{route.role}</p>}
              <div className="flex space-x-4">
                <p
                  className={`min-w-[60px] max-w-[80px] ${
                    route.role ? "text-orange-500" : "text-green-600"
                  }`}>
                  {route.path}
                </p>
                <p className="text-left text-gray-400">{route.desc}</p>
              </div>
            </li>
          );
        })}
      </ul>
      <div
        ref={setUpSectionRef}
        className="flex flex-col items-center w-90% max-w-[800px] mb-[100px] mx-8 rounded-[20px] px-12 pb-8 shadow-white-l">
        <p className="text-xl font-medium my-8 ">How to Begin Development with the Authecho SDK</p>
        <ol className="flex flex-col space-y-4 list-decimal">
          <li>
            Clear the <span className="text-gray-400">/authecho_sdk_preview</span> folder, as it is
            solely utilized for previewing documentation. 🗑️
          </li>
          <li>
            Remove the <span className="text-gray-400">&lt;Preview&gt;</span> component and its
            corresponding import statement from the
            <span className="text-gray-400"> HomePage.tsx</span> file located in the
            <span className="text-gray-400"> /pages</span> directory. 🎯
          </li>
          <li>
            Ensure that you have correctly added the required
            <span className="text-green-500"> AUTHECHO_API_KEY</span>,
            <span className="text-green-500"> APP_NAME</span>, and configured the
            <span className="text-green-500"> PORT</span> in the
            <span className="text-gray-400"> client/.env</span> file to match the values you
            specified when connecting your application. Please note that the
            <span className="text-green-500"> PORT</span> configuration is only necessary during the
            development phase and is not required in a production environment. 🔓
          </li>
          <li>
            Proceed with confidence! You are fully prepared to start developing with Authecho. 🥳✨
          </li>
        </ol>
      </div>
    </div>
  );
}
