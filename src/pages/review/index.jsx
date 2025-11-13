"use client";

import React from "react";

import { motion } from "framer-motion";

const ReviewtPage = () => {


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            تواصل معنا
          </h1>
         
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <div className="max-w-3xl mx-auto">
            <iframe
              src="https://tally.so/embed/n9JNz1?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
              width="100%"
              height="1500"
              className="border-0"
              title="Contact Form"
            >
              Loading...
            </iframe>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ReviewtPage;
