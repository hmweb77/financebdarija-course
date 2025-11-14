"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Send, AlertCircle, Loader2, BookOpen, CheckCircle } from "lucide-react";
import { collection, addDoc, serverTimestamp, query, orderBy, limit, getDocs, startAfter } from "firebase/firestore";
import { db } from "@/lib/firebase";

const VALID_TOKEN = "FINANCE777COMMENT";

export default function BookCommentsPage() {
  const router = useRouter();
  const { token } = router.query;

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    rating: 0,
    comment: "",
  });
  const [hoveredRating, setHoveredRating] = useState(0);

  // Reviews state
  const [reviews, setReviews] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(true);

  // Status state
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  // Check token validity
  const [isValidToken, setIsValidToken] = useState(false);

  useEffect(() => {
    if (token) {
      if (token === VALID_TOKEN) {
        setIsValidToken(true);
        fetchReviews();
      } else {
        setIsValidToken(false);
        setStatus({
          loading: false,
          success: false,
          error: "Lien invalide. Veuillez vérifier votre URL.",
        });
      }
    }
  }, [token]);

  const fetchReviews = async (loadMore = false) => {
    try {
      setLoadingReviews(true);
      let q;

      if (loadMore && lastVisible) {
        q = query(
          collection(db, "bookReviews"),
          orderBy("createdAt", "desc"),
          startAfter(lastVisible),
          limit(6)
        );
      } else {
        q = query(
          collection(db, "bookReviews"),
          orderBy("createdAt", "desc"),
          limit(6)
        );
      }

      const querySnapshot = await getDocs(q);
      const reviewsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
      }));

      if (loadMore) {
        setReviews((prev) => [...prev, ...reviewsData]);
      } else {
        setReviews(reviewsData);
      }

      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
      setHasMore(querySnapshot.docs.length === 6);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoadingReviews(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.rating === 0) {
      setStatus({
        loading: false,
        success: false,
        error: "الرجاء اختيار تقييم",
      });
      return;
    }

    if (formData.comment.trim().length < 10) {
      setStatus({
        loading: false,
        success: false,
        error: "يجب أن يكون التعليق 10 أحرف على الأقل",
      });
      return;
    }

    setStatus({ loading: true, success: false, error: null });

    try {
      await addDoc(collection(db, "bookReviews"), {
        name: formData.name.trim(),
        rating: formData.rating,
        comment: formData.comment.trim(),
        createdAt: serverTimestamp(),
      });

      setStatus({ loading: false, success: true, error: null });

      // Reset form
      setFormData({ name: "", rating: 0, comment: "" });

      // Refresh reviews
      fetchReviews();

      // Clear success message after 3 seconds
      setTimeout(() => {
        setStatus({ loading: false, success: false, error: null });
      }, 3000);
    } catch (error) {
      console.error("Error submitting review:", error);
      setStatus({
        loading: false,
        success: false,
        error: "حدث خطأ أثناء إضافة التقييم. الرجاء المحاولة مرة أخرى",
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRatingClick = (rating) => {
    setFormData({
      ...formData,
      rating,
    });
  };

  const renderStars = (rating, interactive = false, size = "w-5 h-5") => {
    return [...Array(5)].map((_, index) => {
      const starRating = index + 1;
      return interactive ? (
        <motion.button
          key={starRating}
          type="button"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onMouseEnter={() => setHoveredRating(starRating)}
          onMouseLeave={() => setHoveredRating(0)}
          onClick={() => handleRatingClick(starRating)}
          disabled={status.loading}
          className="focus:outline-none disabled:cursor-not-allowed"
        >
          <Star
            className={`${size} transition-all ${
              starRating <= (hoveredRating || formData.rating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300 hover:text-yellow-200"
            }`}
          />
        </motion.button>
      ) : (
        <Star
          key={index}
          className={`${size} ${
            index < rating
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
          }`}
        />
      );
    });
  };

  // Invalid token view
  if (token && !isValidToken) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
          dir="rtl"
        >
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            رابط غير صالح
          </h2>
          <p className="text-gray-600">
            الرجاء التحقق من الرابط والمحاولة مرة أخرى
          </p>
        </motion.div>
      </div>
    );
  }

  // Loading token check
  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#002144] via-[#003366] to-[#002144] py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
         
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            شارك رأيك في الكتاب
          </h1>
          <p className="text-white/90 text-lg">
            نحن نقدر رأيك ويساعد تقييمك القراء الآخرين
          </p>
        </motion.div>

        {/* Review Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl p-8 mb-8"
          dir="rtl"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            أضف تقييمك
          </h2>

          <AnimatePresence>
            {status.success && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3"
              >
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <p className="text-green-800 text-sm">
                  تم إضافة تقييمك بنجاح! شكراً لمشاركتك
                </p>
              </motion.div>
            )}

            {status.error && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-red-800 text-sm">{status.error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                الاسم *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="اسمك الكامل"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#48A9FE] focus:border-[#48A9FE] outline-none transition-all"
                required
                disabled={status.loading}
              />
            </div>

            {/* Rating Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                التقييم *
              </label>
              <div className="flex items-center gap-2">
                {renderStars(formData.rating, true, "w-10 h-10")}
                {formData.rating > 0 && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mr-3 text-lg font-semibold text-gray-700"
                  >
                    {formData.rating}/5
                  </motion.span>
                )}
              </div>
            </div>

            {/* Comment Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                التعليق *
              </label>
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                placeholder="شارك تجربتك مع الكتاب..."
                rows="6"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#48A9FE] focus:border-[#48A9FE] outline-none transition-all resize-vertical"
                required
                disabled={status.loading}
              />
              <p className="text-sm text-gray-500 mt-2">
                الحد الأدنى 10 أحرف
              </p>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: status.loading ? 1 : 1.02 }}
              whileTap={{ scale: status.loading ? 1 : 0.98 }}
              type="submit"
              disabled={status.loading}
              className="w-full bg-gradient-to-r from-[#48A9FE] to-[#002144] text-white px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-3 hover:shadow-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status.loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>جاري الإرسال...</span>
                </>
              ) : (
                <>
                  <span>إرسال التقييم</span>
                  <Send className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Reviews List */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl p-8"
          dir="rtl"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            التقييمات ({reviews.length})
          </h2>

          {loadingReviews && reviews.length === 0 ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
          ) : reviews.length === 0 ? (
            <p className="text-center text-gray-500 py-12">
              لا توجد تقييمات بعد. كن أول من يقيم!
            </p>
          ) : (
            <div className="space-y-6">
              {reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-200 pb-6 last:border-0"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-lg">{review.name}</h4>
                      <div className="flex gap-1 mt-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <span className="text-gray-500 text-sm">
                      {review.createdAt?.toLocaleDateString("ar-MA")}
                    </span>
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {review.comment}
                  </p>
                </motion.div>
              ))}
            </div>
          )} */}

          {/* Load More Button */}
          {/* {hasMore && reviews.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => fetchReviews(true)}
              disabled={loadingReviews}
              className="mt-8 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-full font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loadingReviews ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  جاري التحميل...
                </>
              ) : (
                "تحميل المزيد"
              )}
            </motion.button>
          )}
        </motion.div> */}
      </div>
    </div>
  );
}