"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star, MessageSquarePlus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createReview } from "../../_actions/Landlord/PostComment";

type Rprop = {
  propertyId: string;
};

type ReviewFormInputs = {
  comment: string;
  rating: number;
};

const ReviewBTN = ({ propertyId }: Rprop) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ReviewFormInputs>({
    defaultValues: {
      comment: "",
      rating: 0,
    },
  });

  const currentRating = watch("rating");

  const onSubmit = async (data: ReviewFormInputs) => {
    if (data.rating === 0) {
      toast.error("Please select a star rating.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        propertyId,
        comment: data.comment,
        rating: Number(data.rating),
      };

      const res = await createReview(payload);

      if (res?.success || res?.ok) {
        toast.success(res?.message || "Review submitted successfully!");
        reset();
        setIsOpen(false);
      } else {
        toast.error(res?.message || "Failed to submit review.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        size="sm"
        className="w-full h-10 bg-white hover:bg-slate-50 text-slate-700 font-medium text-sm border border-slate-200 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
        onClick={() => setIsOpen(true)}
      >
        <MessageSquarePlus className="h-2 w-2 text-emerald-600" />
        <span>Leave a Comment</span>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Write a Review</DialogTitle>
            <DialogDescription>
              Share your experience about this property to help others.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-4">
            {/* Rating Section */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Rating</Label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="focus:outline-none transition-colors"
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() =>
                      setValue("rating", star, { shouldValidate: true })
                    }
                  >
                    <Star
                      className={`h-7 w-7 ${
                        star <= (hoveredRating || currentRating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
              {errors.rating && (
                <p className="text-xs text-red-500 mt-1">Rating is required.</p>
              )}
            </div>

            {/* Comment Section */}
            <div className="space-y-2">
              <Label htmlFor="comment" className="text-sm font-medium">
                Comment
              </Label>
              <Textarea
                id="comment"
                placeholder="The apartment was clean, spacious, and the landlord was very helpful. Highly recommended!"
                className="resize-none h-28"
                disabled={loading}
                {...register("comment", {
                  required: "Please write a comment.",
                  minLength: {
                    value: 10,
                    message: "Comment must be at least 10 characters.",
                  },
                })}
              />
              {errors.comment && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.comment.message}
                </p>
              )}
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Review"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReviewBTN;
