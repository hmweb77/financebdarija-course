"use client"
import { motion } from "framer-motion";
import Image from "next/image";
// import { useTranslation } from 'next-i18next';
import FirstImage from "/public/assets/profile.jpg";
import { useRouter } from "next/router";


const HeroSection = () => {
  //   const { t, i18n } = useTranslation('common');
  const router = useRouter();
  //   const isArabic = i18n.language === 'ar';

  return (
    <motion.section
      className="overflow-hidden py-5 bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <div className="max-w-6xl mx-auto px-8" dir="rtl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
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
          <div className="space-y-20">
            <motion.h1
              className="text-3xl md:text-5xl font-bold text-main"
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 2 }}
            >
              ما الذي يمكنكم توقعه على منصتنا؟
            </motion.h1>
            <motion.p
              className="text-base leading-8 text-gray-600"
              initial={{ x: 200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 2 }}
            >
              تعرف على خبيرنا المتمرس و كبير محللي إدارة المخاطر الذي يمتلك أكثر
              من عشر سنوات من الخبرة في سوق الأسهم الأمريكية و في سوق
              الأسهم المغربية. معروف بمحتواه الرائع على مواقع التواصل الاجتماعي
              حول المواضيع المتعلقة بالثقافة المالية، يشاركك معرفته القيمة
              ليزودك بالأدوات اللازمة لاتخاذ قرارات استثمارية مستنيرة وواثقة.
              <br></br>
              انضم إلينا وحول مستقبلك المالي مع الخبرة الموثوقة والرؤى العملية.
            </motion.p>

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl inline-flex items-center"
              onClick={() => router.push("/")}
            >
              ابدأ الآن
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
