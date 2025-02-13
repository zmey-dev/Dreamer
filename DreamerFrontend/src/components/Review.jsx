import React, { useEffect, useState } from "react";
import { Star, StarHalf, Trash2 } from "lucide-react";
import { ReviewCard } from "./ReviewCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllReviews } from "../store/slices/reviewSlice";

function Review() {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.review.reviews);

  useEffect(() => {
    dispatch(getAllReviews());
  }, [dispatch]);

  const handleDelete = (id) => {};

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Client Reviews</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Here's what clients and colleagues have to say about my work and
            collaboration experience.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Review;
