//@ts-ignore
import authVideo from "../../assets/videos/authVideo.mp4";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import TimerCounter from "../utils/TimerCounter";
import PrimaryBtn from "../../components/btn/PrimaryBtn";
import { MdArrowForward } from "react-icons/md";
import { AppDataCounts } from "../../types/types";
import useApi from "../../hooks/useApi";

export default function Hero() {
  const navigate = useNavigate();
  const { fetchData: getCounts } = useApi("GET", "GETCOUNTS");
  const [isReversing, setIsReversing] = useState<boolean>(false);
  const [appDataCounts, setAppDataCounts] = useState<AppDataCounts>({ userCount: 0, appCount: 0 });
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    (async () => {
      const response = await getCounts();

      const userCount = response?.data.userCount;
      const appCount = response?.data.appCount;
      if (userCount && appCount) {
        setAppDataCounts({ userCount, appCount });
      }
    })();
  }, [setAppDataCounts]);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      video.playbackRate = 0.5;

      const playVideo = () => {
        video.play();
      };

      playVideo();

      const handleEnded = () => {
        setIsReversing(true);
        video.playbackRate = -0.5;
        playVideo();
      };

      const handleTimeUpdate = () => {
        if (isReversing && video.currentTime <= 0) {
          setIsReversing(false);
          video.playbackRate = 0.5;
          playVideo();
        }
      };

      video.addEventListener("ended", handleEnded);
      video.addEventListener("timeupdate", handleTimeUpdate);

      return () => {
        video.removeEventListener("ended", handleEnded);
        video.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, [isReversing]);

  const renderCounts = appDataCounts.userCount > 100 && appDataCounts.appCount > 20;

  const userCountMin = Math.round(appDataCounts.userCount * 0.1);
  const userCountMax = appDataCounts.userCount;
  const appCountMin = Math.round(appDataCounts.appCount * 0.3);
  const appCountMax = appDataCounts.appCount;

  return (
    <div className="grow w-screen h-screen isolate mt-[-65px]">
      <div className="flex flex-col items-center justify-center h-full w-screen space-y-20 px-8 text-center bg-black bg-opacity-80">
        <h1 className="text-5xl md:text-7xl text-cyan-100">Welcome to Authecho</h1>
        {renderCounts ? (
          <h2 className="text-2xl max-w-[1000px] text-sky-200">
            Simplifying account management powering over
            {
              <span className="mx-2 px-4 rounded-xl bg-sky-700 bg-opacity-50">
                <TimerCounter min={appCountMin} max={appCountMax} delay={1000} />
              </span>
            }
            applications for
            {
              <span className="mx-2 px-4 rounded-xl bg-sky-700 bg-opacity-50">
                <TimerCounter min={userCountMin} max={userCountMax} delay={600} />
              </span>
            }
            users and counting. Experience the effectiveness of Authecho and join the echo today!
            <span className="text-cyan-500 font-semibold">&nbsp;One Account, All Access</span>
          </h2>
        ) : (
          <h2 className="text-2xl max-w-[1000px] text-sky-200">
            Enhance your account management experience with Authecho. Discover its powerful
            effectiveness and join the echo today!
            <span className="text-cyan-500 font-semibold">&nbsp;One Account, All Access</span>
          </h2>
        )}
        <PrimaryBtn
          btnText="Get Started"
          fontSize="2xl"
          onClick={() => navigate("/signup")}
          icon={<MdArrowForward size={30} />}
        />
      </div>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 w-[110vw] h-[100vh] opacity-100 object-cover z-[-1]">
        <source src={authVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
