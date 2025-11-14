"use client";
import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Globe, BookOpen, CheckCircle } from "lucide-react";

const CoursesPage = () => {
  const courses = [
    {
      id: 1,
      title: "دورة بورصة الدار البيضاء",
      titleEn: "Casablanca Stock Market Course",
      price: "99$",
      description: "تعلم كيفية الاستثمار في بورصة الدار البيضاء من الصفر إلى الاحتراف",
      features: [
        "مفاهيم وتعاريف حول البورصة",
        "تحليل الشركات ببورصة الدار البيضاء",
        "استراتيجية الاستثمار في البورصة",
        "دعم مباشر من الخبراء",
      ],
      icon: TrendingUp,
      color: "from-blue-500 to-blue-600",
      link: "https://www.financebdarija.co/de5a4eed-711e-4d01-9af9-f90183388a54",
    },
    {
      id: 2,
      title: "دورة البورصة الأمريكية",
      titleEn: "US Stock Market Course",
      price: "99$",
      description: "احترف التداول في أكبر أسواق المال العالمية - البورصة الأمريكية",
      features: [
        "فهم سوق الأسهم الأمريكي",
        "استراتيجيات التداول المتقدمة",
        "تحليل فني وأساسي للأسهم",
        "إدارة المخاطر والمحافظ",
      ],
      icon: Globe,
      color: "from-indigo-500 to-indigo-600",
      link: "https://www.financebdarija.co/77390c82-3b09-453f-9a67-8680b9c9cac0", // Replace this with your actual US course link
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50" dir="rtl">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16"
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            الدورات التدريبية
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            اختر الدورة المناسبة لك وابدأ رحلتك نحو الحرية المالية
          </p>
        </div>
      </motion.div>

      {/* Courses Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 py-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {courses.map((course) => {
            const IconComponent = course.icon;
            return (
              <motion.div
                key={course.id}
                variants={cardVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
              >
                {/* Course Header with Gradient */}
                <div className={`bg-gradient-to-r ${course.color} p-8 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <IconComponent className="w-12 h-12" />
                    <div className="text-3xl font-bold">{course.price}</div>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">
                    {course.title}
                  </h2>
                  <p className="text-sm opacity-90">{course.titleEn}</p>
                </div>

                {/* Course Content */}
                <div className="p-8">
                  <p className="text-gray-700 text-lg mb-6">
                    {course.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      ما ستتعلمه:
                    </h3>
                    {course.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <motion.a
                    href={course.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`block w-full bg-gradient-to-r ${course.color} text-white text-center py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all`}
                  >
                    سجل الآن
                  </motion.a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            لماذا تختار دوراتنا؟
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="text-4xl mb-2">🎓</div>
              <h4 className="font-semibold text-gray-800 mb-2">محتوى عالي الجودة</h4>
              <p className="text-gray-600 text-sm">
                محتوى شامل ومحدث باستمرار
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">👨‍🏫</div>
              <h4 className="font-semibold text-gray-800 mb-2">خبراء متخصصون</h4>
              <p className="text-gray-600 text-sm">
                تعلم من خبراء بسنوات من الخبرة
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">💬</div>
              <h4 className="font-semibold text-gray-800 mb-2">دعم مستمر</h4>
              <p className="text-gray-600 text-sm">
                احصل على إجابات لجميع أسئلتك
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CoursesPage;