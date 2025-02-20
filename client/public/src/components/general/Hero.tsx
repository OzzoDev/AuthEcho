//@ts-ignore
import authVideo from "../../assets/videos/authVideo.mp4";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import TimerCounter from "../utils/TimerCounter";
import PrimaryBtn from "../../components/btn/PrimaryBtn";
import { MdArrowForward } from "react-icons/md";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReversing, setIsReversing] = useState<boolean>(false);
  const navigate = useNavigate();

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

  return (
    <div className="grow w-screen h-screen isolate mt-[-65px]">
      <div className="flex flex-col items-center justify-center h-full w-screen space-y-20 px-8 text-center bg-black bg-opacity-80">
        <h1 className="text-7xl text-cyan-100">Welcome to Authecho</h1>
        <h2 className="text-2xl max-w-[1000px] text-sky-200">
          Simplifying account management powering over&nbsp;
          {<TimerCounter min={0} max={200} delay={1000} />} applications for&nbsp;
          {<TimerCounter min={100} max={2000} delay={200} />} users and counting. Experience the
          effectiveness of Authecho and join the echo today!
        </h2>
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
