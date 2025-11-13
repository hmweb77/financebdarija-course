"use client";
import React, { useState, useEffect } from "react";
import { collection, query, orderBy, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Search, Trash2, Star, Loader2, Mail, User } from "lucide-react";
import { motion } from "framer-motion";

const AdminReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("name"); // name or email
  const [stats, setStats] = useState({
    total: 0,
    averageRating: 0,
    byRating: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    filterReviews();
  }, [searchTerm, searchType, reviews]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, "bookReviews"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      
      const reviewsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
      }));

      setReviews(reviewsData);
      calculateStats(reviewsData);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (reviewsData) => {
    const total = reviewsData.length;
    const sum = reviewsData.reduce((acc, review) => acc + review.rating, 0);
    const average = total > 0 ? (sum / total).toFixed(1) : 0;
    
    const byRating = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    reviewsData.forEach(review => {
      byRating[review.rating]++;
    });

    setStats({ total, averageRating: average, byRating });
  };

  const filterReviews = () => {
    if (!searchTerm) {
      setFilteredReviews(reviews);
      return;
    }

    const filtered = reviews.filter(review => {
      const searchValue = searchType === "name" ? review.name : review.email;
      return searchValue.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setFilteredReviews(filtered);
  };

  const handleDelete = async (reviewId) => {
    if (!confirm("هل أنت متأكد من حذف هذا التقييم؟")) {
      return;
    }

    try {
      await deleteDoc(doc(db, "bookReviews", reviewId));
      const updatedReviews = reviews.filter(review => review.id !== reviewId);
      setReviews(updatedReviews);
      calculateStats(updatedReviews);
    } catch (error) {
      console.error("Error deleting review:", error);
      alert("حدث خطأ أثناء حذف التقييم");
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8" dir="rtl">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            إدارة التقييمات
          </h1>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">إجمالي التقييمات</p>
              <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">متوسط التقييم</p>
              <p className="text-3xl font-bold text-green-600">{stats.averageRating}</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4 col-span-2">
              <p className="text-sm text-gray-600 mb-2">توزيع التقييمات</p>
              <div className="space-y-1">
                {[5, 4, 3, 2, 1].map(rating => (
                  <div key={rating} className="flex items-center gap-2">
                    <span className="text-sm w-8">{rating} ⭐</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{
                          width: `${stats.total > 0 ? (stats.byRating[rating] / stats.total) * 100 : 0}%`
                        }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-8">{stats.byRating[rating]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Search Section */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={searchType === "name" ? "ابحث بالاسم..." : "ابحث بالبريد الإلكتروني..."}
                className="w-full border rounded-lg py-2 px-4 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setSearchType("name");
                  setSearchTerm("");
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                  searchType === "name"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <User className="w-4 h-4" />
                الاسم
              </button>
              <button
                onClick={() => {
                  setSearchType("email");
                  setSearchTerm("");
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                  searchType === "email"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <Mail className="w-4 h-4" />
                البريد
              </button>
            </div>
          </div>

          {/* Results count */}
          <p className="text-gray-600 mb-4">
            عرض {filteredReviews.length} من {reviews.length} تقييم
          </p>
        </div>

        {/* Reviews List */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <p className="text-gray-500 text-lg">لا توجد تقييمات</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredReviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {review.name}
                      </h3>
                      <div className="flex gap-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mb-1">{review.email}</p>
                    <p className="text-xs text-gray-400">
                      {review.createdAt?.toLocaleDateString('ar-MA', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="text-red-500 hover:text-red-700 transition-colors p-2"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                {review.comment && (
                  <p className="text-gray-700 bg-gray-50 rounded-lg p-4">
                    {review.comment}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReviewsPage;