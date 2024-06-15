"use client";

import Star from "../../../assets/starFeedback.svg";
import Image from "next/image";
export default function Feedback() {
  const feedbackClients = [
    {
      index: 1,
      nameC: " فاطمة الزهراء العلوي",
      description:
        "“كانت دورة مفاهيم وتعاريف حول البورصة ممتازة! تعلمت الكثير عن كيفية الاستثمار في بورصة الدار البيضاء وفهمت أهمية تحليل الشركات. أنصح بهذه الدورة لأي شخص يرغب في البدء في الاستثمار ”",
    },
    {
      index: 2,
      nameC: "يوسف بنعيسى",
      description:
        "“الدورة قدمت لي نظرة شاملة عن البورصة وأساليب الشراء والبيع. الآن لدي ثقة أكبر في اتخاذ قرارات الاستثمار الخاصة بي. كانت واضحة ومبسطة  ”",
    },
    {
      index: 3,
      nameC: "أمينة الهلالي",
      description:
        "“أنا ممتنة جداً لهذه الدورة، فقد ساعدتني على فهم العديد من المصطلحات والمفاهيم المتعلقة بالبورصة. المعلومات كانت مفيدة جداً ومرتبة بشكل جيد. أشعر الآن أنني مستعدة لاتخاذ خطواتي الأولى في سوق الأسهم.        ”",
    },
  ];

  return (
    <section className="bg-white px-6 py-24 sm:py-32 lg:px-8 " dir="rtl">
              <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">شهادات عملائنا</h1>
      {feedbackClients.map((feedback) => (
        <figure className="mx-auto max-w-2xl">
          <blockquote className="mt-10 text-xl font-semibold leading-8 tracking-tight text-gray-900 sm:text-2xl sm:leading-9">
            <p>{feedback.description}</p>
          </blockquote>
          <figcaption className="mt-10 flex items-center gap-x-6">
            <div className="text-sm leading-6">
              <div className="font-semibold text-gray-900">
                {feedback.nameC}
              </div>
              <Image src={Star} alt="star" className="w-153 h-27" />
            </div>
          </figcaption>
        </figure>
      ))}
    </section>
  );
}
