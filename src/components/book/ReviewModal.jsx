"use client";
import React, { useState, useEffect } from "react";
import { X, Star, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

const ReviewModal = ({ isOpen, onClose, email, name: initialName, onSubmit }) => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Set initial name when modal opens
  useEffect(() => {
    if (initialName) {
      setName(initialName);
    }
  }, [initialName, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      setError("الرجاء اختيار تقييم");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await addDoc(collection(db, "bookReviews"), {
        email,
        name,
        rating,
        comment,
        createdAt: serverTimestamp(),
      });

      // Reset form
      setName("");
      setRating(0);
      setComment("");
      onSubmit();
    } catch (error) {
      console.error("Error submitting review:", error);
      setError("حدث خطأ أثناء إضافة التقييم. الرجاء المحاولة مرة أخرى");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setName(initialName || "");
    setRating(0);
    setComment("");
    setError("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6" dir="rtl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  أضف تقييمك
                </h2>
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    الاسم
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    dir="ltr"
                    className="w-full border rounded-lg py-2 px-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-left"
                    placeholder="Your Name"
                    disabled={loading}
                    style={{ textAlign: 'left' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    التقييم
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="transition-transform hover:scale-110"
                        disabled={loading}
                      >
                        <Star
                          className={`w-8 h-8 ${
                            star <= (hoverRating || rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  {rating > 0 && (
                    <p className="text-sm text-gray-600 mt-2">
                      لقد اخترت {rating} {rating === 1 ? "نجمة" : "نجوم"}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    التعليق (اختياري)
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    className="w-full border rounded-lg py-2 px-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="شارك رأيك حول الكتاب..."
                    disabled={loading}
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-sm">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      جاري الإرسال...
                    </>
                  ) : (
                    "إرسال التقييم"
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ReviewModal;