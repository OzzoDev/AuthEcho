//@ts-ignore
import authVideo from "../../assets/videos/authVideo.mp4";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import TimerCounter from "../TimerCounter";

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
    <div className="hero">
      <div className="hero-intro-wrapper">
        <h1 className="hero-headline">Welcome to Authecho</h1>
        <h2 className="hero-subline">
          Simplifying account management powering over{" "}
          {<TimerCounter min={0} max={200} delay={1000} />} applications for{" "}
          {<TimerCounter min={100} max={2000} delay={200} />} users and counting. Experience the
          effectiveness of Authecho and join the echo today!
        </h2>
        <button className="hero-btn btn btn-primary" onClick={() => navigate("/signup")}>
          Get Started
        </button>
      </div>
      <video ref={videoRef} className="hero-video" autoPlay loop muted playsInline>
        <source src={authVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
