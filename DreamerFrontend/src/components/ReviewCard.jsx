import { Star, StarHalf, Trash2 } from "lucide-react";

import { useSelector } from "react-redux";

export const ReviewCard = ({ review, handleDelete }) => {
  const auth = useSelector((state) => state.auth.user);

  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          className="text-yellow-400 fill-current"
          size={20}
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half"
          className="text-yellow-400 fill-current"
          size={20}
        />
      );
    }

    return stars;
  };

  return (
    <div
      key={review.id}
      className="bg-gray-800 rounded-xl p-6 shadow-lg transform hover:scale-[1.02] transition-transform duration-300 relative group"
    >
      {(auth.role === "executive" || auth.id === review.reviewer_id) && (
        <button
          onClick={() => handleDelete(review.id)}
          className="absolute top-4 right-4 text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <Trash2 size={20} />
        </button>
      )}
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">
                {review?.reviewer?.name ||
                  review?.reviewee?.name ||
                  review?.project?.name ||
                  "************"}
              </h3>
            </div>
            <div className="flex items-center gap-0.5">
              {renderRating(review.rating)}
            </div>
          </div>
          <div className="mt-4">
            <p className="text-gray-300 leading-relaxed">{review.content}</p>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            {new Date(review.updated_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
