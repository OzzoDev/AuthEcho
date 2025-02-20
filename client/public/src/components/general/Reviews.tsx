import { useEffect, useState } from "react";
import { FetchStatus, Review } from "../../types/types";
import useApi from "../../hooks/useApi";
import { HashLoader } from "react-spinners";
import ReviewCard from "./ReviewCard";

export default function Reviews() {
  const { fetchData: getReviews } = useApi("GET", "GETREVIEWS");
  const [apiStatus, setApiStatus] = useState<FetchStatus>("idle");
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    (async () => {
      setApiStatus("loading");
      const response = await getReviews();

      const fetchedReviews = response?.data.reviews;
      if (fetchedReviews) {
        setReviews(fetchedReviews);
        setApiStatus("success");
      } else {
        setApiStatus("error");
      }
    })();
  }, [setReviews]);

  if (apiStatus === "loading") {
    <HashLoader size={50} color="white" className="m-auto" />;
  }

  return (
    <ul className="flex flex-wrap justify-center gap-32 mb-[120px] p-12 bg-slate-800">
      {reviews.map((review, index) => {
        return <ReviewCard key={index} review={review} />;
      })}
    </ul>
  );
}
