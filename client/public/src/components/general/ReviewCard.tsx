import { Review } from "../../types/types";

interface Props {
  review: Review;
}

export default function ReviewCard({ review }: Props) {
  return (
    <div className="flex flex-col gap-y-6 w-[90%] max-w-[500px]">
      <div className="flex gap-x-4">
        <p className="text-gray-300 text-xl font-semibold">{review.user}</p>
        <ul className="flex gap-x-2">
          {Array.from({ length: review.rating }, (_, index) => {
            return <p key={review.user + index}>⭐</p>;
          })}
        </ul>
      </div>
      <p className="italic text-sky-200 text-lg">-"{review.review}"</p>
    </div>
  );
}
