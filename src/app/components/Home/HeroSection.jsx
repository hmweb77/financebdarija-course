"use client"
import { motion } from "framer-motion";
import Image from "next/image";

import FirstImage from "../../../assets/grow.jpg";
import { useEffect } from 'react';
import Link from "next/link";


const HeroSection = () => {
  useEffect(() => {
    // Dynamically load the Podia script after the component mounts
    const script = document.createElement('script');
    script.src = 'https://cdn.podia.com/embeds.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script if the component unmounts
      document.body.removeChild(script);
    };
  }, []);



  return (
    <motion.section
    id="about"
      className="overflow-hidden py-5 bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <div className="max-w-6xl mx-auto px-4" dir="rtl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <motion.div
            className="w-full"
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <Image
              src={FirstImage}
              alt="Podcast Image"
              className="rounded-lg"
            />
          </motion.div>
          <div className="space-y-4">
            <motion.h1
              className="text-3xl md:text-5xl font-bold text-gray-800"
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 2 }}
            >
              ما الذي يمكنكم توقعه على منصتنا؟
            </motion.h1>
            <motion.p
              className="text-base text-gray-600"
              initial={{ x: 200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 2 }}
            >
              مرحبًا بكم في منصتنا المتخصصة في الثقافة المالية، وجهتكم الشاملة
              لكل ما يتعلق بالمال والاستثمار والإدارة المالية. نسعى من خلال هذه
              المنصة إلى نشر الوعي المالي وتعزيز فهمكم للأسس والمفاهيم المالية
              التي تمكنكم من تحقيق النجاح والاستقرار المالي. تقدم لكم دورة
              FINANCEBDARIJA مزيدا من المعرفة ومعلومات حصرية، مسلطة الضوء على
              كل الجوانب بشرح مفصل وبلغة سلسة وواضحة. تساعدك الدورة على الفهم
              الجيد والاستيعاب التام، ولتمكنك من الانتقال بخطى واثقة من مستوى
              المبتدئ إلى مستوى الاحتراف في التمويل الشخصي دون الحاجة إلى البحث
              والتنقيب في متاهات المعلومات غير الموثوقة. حيث تجمع دورة
              FINANCEBDARIJA بين النصائح والإرشادات حول كيفية إدارة الميزانية
              الشخصية، الادخار، التخطيط المالي، وكيفية تحقيق الأهداف المالية.
              بالإضافة إلى ذلك، توفر الدورة دورات تفصيلية حول كيفية الاستثمار في
              بورصة الدار البيضاء، فهم آليات السوق، واستخدام الأدوات المالية
              لتحقيق عوائد مستدامة. إن دورة FINANCEBDARIJA طريقك المباشر نحو
              التفوق المالي.
            </motion.p>

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl inline-flex items-center"

            >
                <Link href="https://www.financebdarija.co/de5a4eed-711e-4d01-9af9-f90183388a54" data-podia-embed="link">
           ابدأ الآن
        </Link>
            
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
