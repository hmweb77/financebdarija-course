"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, ChevronDown } from "lucide-react";
import Image from "next/image";
import { collection, addDoc, query, orderBy, limit, getDocs, startAfter } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ReviewModal from "@/components/Book/ReviewModal";
import EmailVerificationModal from "@/components/Book/EmailVerificationModal";

const BookPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  const books = {
    arabic: {
      title: "اصنع ثروتك",
      price: "200 DH",
      description: "دليل عملي بالعربية لفهم مبادئ الحرية المالية، الاستثمار الذكي، وكيفية بناء ثروة مستدامة لتناسب واقع الشباب العربي",
      preorderLink: "#", // Add your actual link
      image: "/assets/book-arabic.png" // Update with actual image path
    },
    french: {
      title: "Construis ta Richesse",
      price: "200 DH",
      description: "Un guide pratique en français pour comprendre la liberté financière, investir intelligemment et bâtir une richesse durable adaptée à la nouvelle génération",
      preorderLink: "#", // Add your actual link
      image: "/assets/book-french.png" // Update with actual image path
    },
    english: {
      title: "Build Your Wealth",
      price: "200 DH",
      description: "A practical guide in English to mastering financial freedom, smart investing, and creating long-term sustainable wealth for the new generation",
      preorderLink: "#", // Add your actual link
      image: "/assets/book-english.png" // Update with actual image path
    }
  };

  const amazonLinks = {
    arabic: "#", // Add actual Amazon link
    french: "#", // Add actual Amazon link
    english: "#" // Add actual Amazon link
  };

  useEffect(() => {
    fetchReviews();
    calculateAverageRating();
  }, []);

  const fetchReviews = async (loadMore = false) => {
    try {
      setLoading(true);
      let q;
      
      if (loadMore && lastVisible) {
        q = query(
          collection(db, "bookReviews"),
          orderBy("createdAt", "desc"),
          startAfter(lastVisible),
          limit(3)
        );
      } else {
        q = query(
          collection(db, "bookReviews"),
          orderBy("createdAt", "desc"),
          limit(3)
        );
      }

      const querySnapshot = await getDocs(q);
      const reviewsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()
      }));

      if (loadMore) {
        setReviews(prev => [...prev, ...reviewsData]);
      } else {
        setReviews(reviewsData);
      }

      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
      setHasMore(querySnapshot.docs.length === 3);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateAverageRating = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "bookReviews"));
      const allReviews = querySnapshot.docs.map(doc => doc.data());
      
      if (allReviews.length > 0) {
        const sum = allReviews.reduce((acc, review) => acc + review.rating, 0);
        setAverageRating((sum / allReviews.length).toFixed(1));
        setTotalReviews(allReviews.length);
      }
    } catch (error) {
      console.error("Error calculating average:", error);
    }
  };

  const handleEmailVerified = (email) => {
    setVerifiedEmail(email);
    setShowEmailModal(false);
    setShowReviewModal(true);
  };

  const handleReviewSubmitted = () => {
    setShowReviewModal(false);
    setVerifiedEmail(null);
    fetchReviews();
    calculateAverageRating();
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-100" dir="rtl">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-blue-500 text-white py-12"
      >
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            اكتشف نسخ متعددة من كتاب "اصنع ثروتك"
          </h1>
          <p className="text-xl text-center">
            لمساعدتك على تحقيق الحرية المالية بلغتك المفضلة
          </p>
        </div>
      </motion.div>

      {/* Books Section - Morocco Pre-order */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">
          الطلب المسبق - المغرب
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {Object.entries(books).map(([key, book]) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
            >
              <div className="relative h-64 bg-gray-200">
                {/* Book cover image placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-400 text-lg">{book.title}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{book.title}</h3>
                <p className="text-3xl font-bold text-blue-600 mb-4">{book.price}</p>
                <p className="text-gray-600 mb-6">{book.description}</p>
                <a
                  href={book.preorderLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-blue-500 hover:bg-blue-600 text-white text-center py-3 px-6 rounded-lg font-semibold transition-colors"
                >
                  اطلب مسبقاً
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Amazon Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">
            اطلب من أمازون
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href={amazonLinks.arabic}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white py-4 px-6 rounded-lg font-semibold transition-colors"
            >
              اصنع ثروتك - Amazon
            </a>
            <a
              href={amazonLinks.french}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white py-4 px-6 rounded-lg font-semibold transition-colors"
            >
              Construis ta Richesse - Amazon
            </a>
            <a
              href={amazonLinks.english}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white py-4 px-6 rounded-lg font-semibold transition-colors"
            >
              Build Your Wealth - Amazon
            </a>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-blue-600">التقييمات</h2>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex">{renderStars(Math.round(averageRating))}</div>
                <span className="text-xl font-semibold">{averageRating}</span>
                <span className="text-gray-600">({totalReviews} تقييم)</span>
              </div>
            </div>
            <button
              onClick={() => setShowEmailModal(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
            >
              أضف تقييمك
            </button>
          </div>

          {/* Reviews List */}
          <div className="space-y-6">
            {loading && reviews.length === 0 ? (
              <p className="text-center text-gray-500">جاري التحميل...</p>
            ) : reviews.length === 0 ? (
              <p className="text-center text-gray-500">لا توجد تقييمات بعد</p>
            ) : (
              reviews.map((review) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
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
                      {review.createdAt?.toLocaleDateString('ar-MA')}
                    </span>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </motion.div>
              ))
            )}
          </div>

          {/* Load More Button */}
          {hasMore && reviews.length > 0 && (
            <button
              onClick={() => fetchReviews(true)}
              disabled={loading}
              className="mt-6 w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold transition-colors disabled:opacity-50"
            >
              {loading ? "جاري التحميل..." : "تحميل المزيد"}
              <ChevronDown className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Modals */}
      <EmailVerificationModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        onVerified={handleEmailVerified}
      />
      <ReviewModal
        isOpen={showReviewModal}
        onClose={() => {
          setShowReviewModal(false);
          setVerifiedEmail(null);
        }}
        email={verifiedEmail}
        onSubmit={handleReviewSubmitted}
      />
    </div>
  );
};

export default BookPage;