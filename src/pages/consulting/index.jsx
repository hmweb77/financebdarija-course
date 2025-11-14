"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, DollarSign, ChevronRight, Calendar, X, CheckCircle, Users, Shield, TrendingUp } from "lucide-react";

const ConsultingPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const benefits = [
    {
      icon: Users,
      title: "استشارة شخصية",
      description: "جلسة فردية مخصصة لاحتياجاتك المالية الخاصة",
    },
    {
      icon: TrendingUp,
      title: "خطة استثمارية",
      description: "استراتيجية مالية مصممة خصيصاً لأهدافك",
    },
    {
      icon: Shield,
      title: "سرية تامة",
      description: "معلوماتك المالية محمية بأعلى معايير الأمان",
    },
  ];

  const preparationItems = [
    "قائمة بأهدافك المالية قصيرة وطويلة المدى",
    "معلومات عن وضعك المالي الحالي",
    "الأسئلة التي ترغب في مناقشتها مع المستشار",
    "تفاصيل عن خبرتك في الاستثمار",
  ];

  return (
    <div
      dir="rtl"
      className="min-h-screen relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-blue-50"
    >
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-10 right-10 w-64 h-64 border-4 border-white rounded-full"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute bottom-10 left-10 w-96 h-96 border-4 border-white rounded-full"
          />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <motion.div variants={itemVariants} className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              احجز جلسة استشارية شخصية
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              احصل على إرشادات مالية احترافية لتحقيق أهدافك الاستثمارية
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Main Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        {/* Pricing Card - Large and Centered */}
        <motion.div
          variants={itemVariants}
          className="max-w-2xl mx-auto mb-16"
        >
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-8 text-white text-center">
              <div className="flex items-center justify-center mb-4">
                <Calendar className="w-12 h-12" />
              </div>
              <h2 className="text-3xl font-bold mb-2">جلسة استشارية خاصة</h2>
              <p className="text-emerald-100">استثمر في مستقبلك المالي</p>
            </div>

            <div className="p-8">
              {/* Price */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <DollarSign className="w-10 h-10 text-emerald-600" />
                  <span className="text-6xl font-bold text-gray-800">150</span>
                </div>
                <p className="text-gray-600">للجلسة الواحدة</p>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-center p-4 bg-gray-50 rounded-xl"
                >
                  <Clock className="w-6 h-6 text-emerald-600 ml-3 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">جلسة مدتها 60 دقيقة</span>
                </motion.div>
                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-center p-4 bg-gray-50 rounded-xl"
                >
                  <Users className="w-6 h-6 text-emerald-600 ml-3 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">استشارة فردية مخصصة</span>
                </motion.div>
                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-center p-4 bg-gray-50 rounded-xl"
                >
                  <Shield className="w-6 h-6 text-emerald-600 ml-3 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">سرية كاملة ومضمونة</span>
                </motion.div>
              </div>

              {/* CTA Button */}
              <motion.button
                onClick={() => setIsFormOpen(true)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-4 px-8 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
              >
                <span>احجز موعدك الآن</span>
                <ChevronRight className="w-6 h-6 group-hover:translate-x-[-4px] transition-transform" />
              </motion.button>
            </div>
          </div>
        </motion.div>

       
          

        {/* Preparation Section */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12"
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              ما يجب تحضيره قبل الجلسة
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {preparationItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  whileHover={{ x: 10 }}
                  className="flex items-start bg-white rounded-xl p-4 shadow-md"
                >
                  <CheckCircle className="w-6 h-6 text-green-500 ml-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600 mb-6">
            هل أنت مستعد لاتخاذ الخطوة التالية نحو النجاح المالي؟
          </p>
          <motion.button
            onClick={() => setIsFormOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-12 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
          >
            ابدأ الآن
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFormOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-4 md:inset-8 lg:inset-16 bg-white rounded-3xl shadow-2xl z-50 overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-6 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white">
                  نموذج حجز الاستشارة
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsFormOpen(false)}
                  className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Modal Content - Form */}
              <div className="flex-1 overflow-auto p-4 bg-gray-50">
                <iframe
                  src="https://docs.google.com/forms/d/e/1FAIpQLSfGhYZ5wrysuzlRJIL45rAljOp778InuAaDHNC9rb1_JRKUlw/viewform?embedded=true"
                  width="100%"
                  height="100%"
                  className="border-0 w-full min-h-[600px]"
                  title="Consulting Booking Form"
                >
                  Loading…
                </iframe>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ConsultingPage;