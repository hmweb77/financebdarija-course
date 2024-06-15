import React from "react";
import img1 from "../../../public/assets/euro.jpg";
import img2 from "../../../public/assets/upp.png";
import img3 from "../../../public/assets/podcas.png";
import Image from "next/image";
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
  },
];

const PricingComponent = () => {
  return (
    <div className="bg-white py-10 px-5" dir="rtl">
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
            <button className="w-full bg-blue-500 text-white rounded-full py-2 px-4 hover:bg-blue-600">
              اشتراك
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingComponent;
