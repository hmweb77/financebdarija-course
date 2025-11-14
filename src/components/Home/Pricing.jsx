"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import img1 from "../../../public/assets/FinancePlan.png";
import img2 from "../../../public/assets/Screenshot 2025-11-14 at 21.44.15.png";
import img4 from "../../../public/assets/bourseUS.png";
import img3 from "../../../public/assets/podcastS.png";

export const PricingData = [
  {
    id: 1,
    title: "بورصة الدار البيضاء",
    titleEn: "Casablanca Stock Market",
    price: 99,
    description: "دورة شاملة للاستثمار في السوق المحلي",
    features: [
      "دورات تفصيلية حول كيفية الاستثمار في بورصة الدار البيضاء",
      "استخدام الأدوات المالية لتحقيق عوائد مستدامة",
      "فهم آليات السوق والتحليل الفني",
    ],
    Img: img2,
    color: "from-blue-500 to-blue-600",
    href: "https://www.financebdarija.co/de5a4eed-711e-4d01-9af9-f90183388a54",
    featured: false,
  },
  {
    id: 2,
    title: "الاستشارات الشخصية",
    titleEn: "Personal Consulting",
    price: 150,
    description: "جلسات استشارية مخصصة لأهدافك المالية",
    features: [
      "نصائح حول كيفية إدارة الميزانية الشخصية والادخار",
      "كيفية تحقيق الأهداف المالية قصيرة وطويلة المدى",
      "إرشادات حول كيفية التخطيط المالي الاستراتيجي",
    ],
    Img: img1,
    color: "from-emerald-500 to-emerald-600",
    href: "/consulting",
    featured: true,
  },
  {
    id: 3,
    title: "البورصة الأمريكية",
    titleEn: "US Stock Market",
    price: 99,
    description: "احترف التداول في أكبر سوق مالي عالمي",
    features: [
      "دورة شاملة للاستثمار في الأسهم الأمريكية",
      "استراتيجيات التداول في السوق الأمريكي",
      "تحليل الشركات العالمية واختيار الأسهم المناسبة",
    ],
    Img: img4,
    color: "from-indigo-500 to-indigo-600",
    href: "https://www.financebdarija.co/77390c82-3b09-453f-9a67-8680b9c9cac0",
    featured: false,
  },
  {
    id: 4,
    title: "بودكاست حصري",
    titleEn: "Exclusive Podcast",
    price: 19,
    description: "محتوى حصري للمشتركين في بيتريون",
    features: [
      "بودكاست خاص بأصحاب بيتريون مع محتوى حصري",
      "الجواب على جميع الأسئلة ديالكم على الخاص",
      "بودكاست للاستثمار بالبورصة المحلية أو العالمية",
    ],
    Img: img3,
    color: "from-purple-500 to-purple-600",
    href: "https://www.patreon.com/moroccan_financial_show",
    featured: false,
  },
];

const PricingComponent = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
    <div className="bg-gradient-to-b from-white to-blue-50 py-16 px-5" dir="rtl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          العروض
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          اختر الباقة المناسبة لك وابدأ رحلتك نحو النجاح المالي
        </p>
      </motion.div>

      {/* Pricing Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {PricingData.map((plan) => {
          const isExternal = plan.href.startsWith("http");

          return (
            <motion.div
              key={plan.id}
              variants={cardVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="relative"
            >
              <Link
                href={plan.href}
                target={isExternal ? "_blank" : "_self"}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="block h-full"
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-2xl">
                  {/* Card Header with Large Centered Image */}
                  <div className="relative w-full h-64 bg-gradient-to-br from-gray-50 to-gray-100">
                    <Image
                      src={plan.Img}
                      alt={plan.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-grow flex flex-col">
                    {/* Title */}
                    <div className="text-center mb-4">
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        {plan.title}
                      </h2>
                      <p className="text-sm text-gray-500">{plan.titleEn}</p>
                    </div>

                    {/* Description */}
                    <p className="text-center text-sm text-gray-600 mb-6">
                      {plan.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-3 mb-6 flex-grow">
                      {plan.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index + 0.3 }}
                          className="flex items-start gap-2"
                        >
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700 leading-snug">
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full bg-gradient-to-r ${plan.color} text-white rounded-xl py-3 px-6 font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group`}
                    >
                      <span>اشترك الآن</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-[-4px] transition-transform" />
                    </motion.button>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default PricingComponent;