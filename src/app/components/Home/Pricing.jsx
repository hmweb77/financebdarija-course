"use client";
import React from "react";
import { useEffect } from "react";
import img1 from "../../../assets/euro.jpg";
import img2 from "../../../assets/upp.png";
import img3 from "../../../assets/podcas.png";
import Image from "next/image";
import Link from "next/link";
export const PricingData = [
  {
    title: "بورصة الدار البيضاء",

    price: 99,
    description: [
      "دورات تفصيلية حول كيفية الاستثمار في بورصة ",
      " استخدام الأدوات المالية لتحقيق عوائد مستدامة",
      " فهم آليات السوق",
    ],
    Img: img2,
    link:"https://www.financebdarija.co/de5a4eed-711e-4d01-9af9-f90183388a54",
  },
  {
    title: "التمويل الشخصي",

    price: 40,
    description: [
      "نصائح حول كيفية إدارة الميزانية الشخصية و الادخار ",
      "كيفية تحقيق الأهداف المالية",
      "  إرشادات حول كيفيةالتخطيط المالي",
    ],
    Img: img1,
    link:"https://www.financebdarija.co/de5a4eed-711e-4d01-9af9-f90183388a54",
  },
  {
    title: "بودكاست ",
    price: 10,
    description: [
      "بودكاست خاص ب أصحاب بيتريون",
      "الجواب على جميع الأسئلة ديالكم على الخاص",
      "بودكاست للإستثمار بالبورصة المحلية أو العالمية",
    ],
    Img: img3,
    link:"https://www.financebdarija.co/de5a4eed-711e-4d01-9af9-f90183388a54",
  },
];

const PricingComponent = () => {
  useEffect(() => {

    const script = document.createElement("script");
    script.src = "https://cdn.podia.com/embeds.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
     
      document.body.removeChild(script);
    };
  }, []);
  return (
    <div id="service" className="bg-white py-10 px-5" dir="rtl">
      <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">
        العروض
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {PricingData.map((plan, index) => (
          <div key={index} className=" bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-center mb-4 flex items-center justify-center">
              <Image src={plan.Img} alt="Image" width={50} className="ml-2" />
              {plan.title}
            </h2>
            <p className="text-3xl text-center font-bold mb-4">${plan.price}</p>

            <hr className="my-4" />
            <ul className="text-sm mb-6">
              <li>✔ {plan.description[0]}</li>
              <li>✔{plan.description[1]}</li>
              <li>✔ {plan.description[2]}</li>
            </ul>
              <Link
                href={plan.link}
                data-podia-embed="link"
              >
            <button className="w-full bg-blue-500 text-white rounded-full py-2 px-4 hover:bg-blue-600">
                اشتراك
            </button>
              </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingComponent;
