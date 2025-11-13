'use client';

import React from 'react';

import { motion } from 'framer-motion';

const ContactPage = () => {
  
 

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
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          نحن سعداء بالتواصل معك! سواء كان لديك سؤال، ملاحظات، أو استفسار حول الأعمال، الشراكات، أو الرعاية، يمكنك التواصل معنا عبر البريد الإلكتروني
</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <div className="max-w-3xl mx-auto">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLScLeIM4Ao8EHYRgS9-ojsyx-H2zxsXn6kg6DRedHaXR8sOnvQ/viewform?embedded=true"
              width="100%"
              height="987"
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

export default ContactPage;