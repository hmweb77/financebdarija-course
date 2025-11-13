"use client";
import React from "react";
import { motion } from "framer-motion";
import { Clock, DollarSign, ChevronRight } from "lucide-react";

const ConsultingPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const floatingAnimation = {
    y: [-10, 10],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen relative overflow-hidden bg-gradient-to-b from-white to-blue-300"
    >
      {/* Main Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="lg:flex items-start justify-between gap-12">
            <motion.div variants={itemVariants} className="lg:w-1/2">
              <motion.h1
                className="text-4xl font-bold text-gray-800 mb-6"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                احجز جلسة استشارية شخصية
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="text-lg text-gray-700 mb-8"
              >
                إحجز موعدًا لجلسة استشارية تتناسب مع جدولك الزمني عبر منصتنا
              </motion.p>

              {/* Pricing Card */}
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="bg-white/90 backdrop-blur rounded-lg shadow-2xl p-6 mb-8 transition-all duration-300 hover:shadow-2xl"
              >
                <div className="flex items-center mb-4">
                  <motion.div
                    animate={floatingAnimation}
                    className="flex items-center"
                  >
                    <DollarSign className="w-8 h-8 text-blue-600 mr-2" />
                    <span className="text-2xl font-bold text-blue-600">
                      100
                    </span>
                  </motion.div>
                  <span className="text-gray-600 ml-3">للجلسة</span>
                </div>
                <div className="space-y-4">
                  <motion.div
                    className="flex items-center"
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Clock className="w-5 h-5 text-gray-400 ml-3" />
                    <span className="text-gray-600">
                      جلسة استشارية لمدة 60 دقيقة
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="lg:w-1/2 mt-12 lg:mt-0"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-blue-600 rounded-lg p-8 text-white sticky top-24 transition-all duration-300 shadow-lg"
              >
                <h2 className="text-2xl font-bold mb-6">ما يجب تحضيره</h2>
                <ul className="space-y-4">
                  {[
                    "قائمة بأهدافك المالية",
                    "الأسئلة التي ترغب في مناقشتها مع المستشار",
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.2 }}
                      whileHover={{ x: 10 }}
                    >
                      <ChevronRight className="w-5 h-5 mt-1 ml-3" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </div>

          {/* Google Form */}
          <motion.div
            variants={itemVariants}
            className="bg-white/90 backdrop-blur rounded-lg shadow-xl p-6 flex justify-center items-center mx-auto mt-12"
          >
            <div className="w-full max-w-3xl mx-auto">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSfGhYZ5wrysuzlRJIL45rAljOp778InuAaDHNC9rb1_JRKUlw/viewform?embedded=true"
                width="100%"
                height="1500"
                className="border-0 w-full"
                title="Consulting Booking Form"
              >
                Loading…
              </iframe>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ConsultingPage;
