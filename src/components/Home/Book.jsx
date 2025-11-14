"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, ChevronDown, Loader2 } from "lucide-react";
import { collection, query, orderBy, limit, getDocs, startAfter } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image from "next/image";

const BookSection = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  const books = {
    arabic: {
      title: "اصنع ثروتك",
      price: "200 DH",
      description: "دليل عملي بالعربية لفهم مبادئ الحرية المالية، الاستثمار الذكي، وكيفية بناء ثروة مستدامة لتناسب واقع الشباب العربي",
      preorderLink: "https://docs.google.com/forms/d/e/1FAIpQLSfT8yy5lDc4BsNZzO1KHgtDaTeW5qx2P2Lh86DwhboFXYNcfA/viewform",
      image: "/assets/bookAR.png"
    },
    french: {
      title: "Construis ta Richesse",
      price: "200 DH",
      description: "Un guide pratique en français pour comprendre la liberté financière, investir intelligemment et bâtir une richesse durable adaptée à la nouvelle génération",
      preorderLink: "https://docs.google.com/forms/d/e/1FAIpQLSfT8yy5lDc4BsNZzO1KHgtDaTeW5qx2P2Lh86DwhboFXYNcfA/viewform",
      image: "/assets/bookFR.png"
    },
    english: {
      title: "Build Your Wealth",
      price: "200 DH",
      description: "A practical guide in English to mastering financial freedom, smart investing, and creating long-term sustainable wealth for the new generation",
      preorderLink: "https://docs.google.com/forms/d/e/1FAIpQLSfT8yy5lDc4BsNZzO1KHgtDaTeW5qx2P2Lh86DwhboFXYNcfA/viewform",
      image: "/assets/bookEN.png"
    }
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
      setHasMore(querySnapshot.docs.length === 6);
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
    

      {/* Books Section - Morocco Pre-order */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-blue-600 mb-10 text-center">
        اكتشف نسخ متعددة من كتاب "اصنع ثروتك"
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {Object.entries(books).map(([key, book]) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="flex flex-col bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Cover */}
              <div className="relative w-full aspect-[3/4] bg-gray-100">
                <Image
                  src={book.image}
                  alt={book.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 260px, 80vw"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6 text-center">
                <h3 className="text-2xl font-bold mb-2 text-gray-900">
                  {book.title}
                </h3>
                <p className="text-3xl font-extrabold text-blue-600 mb-3">
                  {book.price}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                  {book.description}
                </p>
                <a
                  href={book.preorderLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto block w-full bg-blue-500 hover:bg-blue-600 text-white text-center py-3 px-6 rounded-full font-semibold transition-colors"
                >
                  اطلب مسبقاً
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      

        {/* Reviews Section - NO ADD BUTTON */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-blue-600 mb-2">التقييمات</h2>
            <div className="flex items-center gap-2">
              <div className="flex">
                {renderStars(Math.round(Number(averageRating) || 0))}
              </div>
              <span className="text-xl font-semibold">
                {averageRating || "0.0"}
              </span>
              <span className="text-gray-600">({totalReviews} تقييم)</span>
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-6">
            {loading && reviews.length === 0 ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
              </div>
            ) : reviews.length === 0 ? (
              <p className="text-center text-gray-500 py-12">لا توجد تقييمات بعد</p>
            ) : (
              reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
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
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  جاري التحميل...
                </>
              ) : (
                <>
                  تحميل المزيد
                  <ChevronDown className="w-5 h-5" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookSection;