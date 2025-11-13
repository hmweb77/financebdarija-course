"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import ReviewModal from "../../components/book/ReviewModal";

const VerifyPage = () => {
  const router = useRouter();
  const { token } = router.query;
  const [status, setStatus] = useState("loading");
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [message, setMessage] = useState("");
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    if (token) {
      verifyToken();
    }
  }, [token]);

  const verifyToken = async () => {
    try {
      console.log("Verifying token from frontend:", token);
      
      const response = await fetch("/api/book/verify-token", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ token }),
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error("Response is not JSON, got:", contentType);
        const text = await response.text();
        console.error("Response body:", text.substring(0, 500));
        throw new Error("Server returned invalid response. Please try again or contact support.");
      }

      const data = await response.json();
      console.log("Response data:", data);

      if (!response.ok) {
        throw new Error(data.error || "Invalid token");
      }

      setEmail(data.email);
      setName(data.name);
      setStatus("success");
      setMessage("تم التحقق من بريدك الإلكتروني بنجاح!");
      setTimeout(() => {
        setShowReviewModal(true);
      }, 1500);
    } catch (error) {
      console.error("Verification error:", error);
      setStatus("error");
      setMessage(error.message || "الرابط غير صالح أو منتهي الصلاحية");
    }
  };

  const handleReviewSubmitted = () => {
    setShowReviewModal(false);
    router.push("/book");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center"
        dir="rtl"
      >
        {status === "loading" && (
          <div>
            <Loader2 className="w-16 h-16 text-blue-500 animate-spin mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              جاري التحقق...
            </h2>
            <p className="text-gray-600">
              الرجاء الانتظار بينما نتحقق من بريدك الإلكتروني
            </p>
          </div>
        )}

        {status === "success" && (
          <div>
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              تم التحقق بنجاح!
            </h2>
            <p className="text-gray-600">{message}</p>
            <p className="text-gray-500 text-sm mt-4">
              سيتم فتح نموذج التقييم تلقائياً...
            </p>
          </div>
        )}

        {status === "error" && (
          <div>
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              حدث خطأ
            </h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <button
              onClick={() => router.push("/book")}
              className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
            >
              العودة إلى الصفحة الرئيسية
            </button>
          </div>
        )}
      </motion.div>

      <ReviewModal
        isOpen={showReviewModal}
        onClose={() => {
          setShowReviewModal(false);
          router.push("/book");
        }}
        email={email}
        name={name}
        onSubmit={handleReviewSubmitted}
      />
    </div>
  );
};

export default VerifyPage;