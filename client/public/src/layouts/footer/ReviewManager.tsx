import { useState } from "react";
import ReviewStar from "./ReviewStar";
import DescriptiveInputWhite from "../../components/utils/DescriptiveInputWhite";
import OutlineBtn from "../../components/btn/OutlineBtn";
import { EMOJI_MAP } from "../../constants/contants";
import useAccountApi from "../../hooks/useAccountApi";
import useAuthStore from "../../hooks/useAuthStore";

export default function ReviewManager() {
  const { updateHasReviewed } = useAuthStore();
  const { callApi: review } = useAccountApi("POST", "REVIEW");
  const [selectedValue, setSelectedValue] = useState<number>(-1);
  const [reviewData, setReviewData] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleReviewChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { value } = e.target;
    error && setError("");
    setReviewData(value);
  };

  const handleSubmitReview = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (selectedValue === -1) {
      setError("Select a rating");
      return;
    }

    const response = await review(false, { review: reviewData, rating: selectedValue });

    if (response) {
      updateHasReviewed(true);
    } else {
      setError("Error reviewing, please try again later");
    }
  };

  const emoji = EMOJI_MAP[String(selectedValue)];

  return (
    <div className="flex flex-col items-center gap-y-8">
      <ul className="flex self-start gap-x-4 py-4">
        {Array.from({ length: 5 }, (_, index) => {
          return (
            <ReviewStar
              key={index}
              value={index}
              selectedValue={selectedValue}
              onClick={() => setSelectedValue(index)}
            />
          );
        })}
      </ul>
      {error && <p className="text-lg text-red-400 w-full">{error}</p>}
      <form onSubmit={handleSubmitReview} className="flex flex-col gap-y-8 mb-16 w-full">
        <DescriptiveInputWhite
          labelText="Leave a Review"
          type="textarea"
          value={reviewData}
          minLength={50}
          maxLength={500}
          onChange={handleReviewChange}>
          <p>
            We sincerely value your feedback and invite you to share your thoughts on Authecho's
            services. Your insights are crucial in helping us enhance our offerings and better serve
            you.
            <span className="text-red-400">
              &nbsp; Please ensure that your review contains a minimum of 50 characters and does not
              exceed a maximum of 500 characters. Additionally, each account is permitted only one
              review, so please be thoughtful in your response.
            </span>
          </p>
        </DescriptiveInputWhite>
        <OutlineBtn
          type="submit"
          btnText="Submit Review"
          icon={<p className="text-lg">{emoji}</p>}
        />
      </form>
    </div>
  );
}
