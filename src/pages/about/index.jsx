"use client"

import React from 'react';
import { Award, Users, Clock } from 'lucide-react';
import imgHer from "/public/assets/profile.jpg"
import Image from 'next/image';
import HappyClient from '@/components/Home/HappyClients';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white" dir="rtl">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Profile Section */}
          <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
            <div className="w-48 h-48 rounded-full overflow-hidden bg-gray-100">
              <Image 
                src={imgHer}
                width={100}
                height={100}
                alt="Financial Advisor" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 text-center md:text-right">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">تعرف على خبيرنا المالي</h1>
              <p className="text-gray-600 leading-relaxed">
                تعرف على خبيرنا المتمرس و كبير محللي إدارة المخاطر الذي يمتلك أكثر من عشر سنوات من الخبرة في سوق الأسهم الأمريكية وأربع سنوات في سوق الأسهم المغربية. معروف بمحتواه الرائع على مواقع التواصل الاجتماعي حول المواضيع المتعلقة بالثقافة المالية، يشاركك معرفته القيمة ليزودك بالأدوات اللازمة لاتخاذ قرارات استثمارية مستنيرة وواثقة. انضم إلينا وحول مستقبلك المالي مع الخبرة الموثوقة والرؤى العملية
              </p>
            </div>
          </div>
          <HappyClient/>
          {/* Expertise Section */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <Clock className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">خبرة واسعة</h2>
                  <p className="text-gray-600">
                    أكثر من عشر سنوات من الخبرة في سوق الأسهم الأمريكية وأربع سنوات في سوق الأسهم المغربية
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Award className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">محلل متمرس</h2>
                  <p className="text-gray-600">
                    كبير محللي إدارة المخاطر مع سجل حافل في تقديم تحليلات دقيقة وتوصيات موثوقة
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Users className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">تواجد قوي</h2>
                  <p className="text-gray-600">
                    معروف بمحتواه الرائع على مواقع التواصل الاجتماعي حول المواضيع المتعلقة بالثقافة المالية
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AboutPage;