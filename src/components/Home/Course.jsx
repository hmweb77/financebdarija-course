import Image from "next/image";
import arrow from "../../../public/assets/yal.png";
import Link from "next/link";
const directory = {
  " مفاهيم و تعاريف حول البورصة": [
    { id: 1, name: "مقدمة" },
    { id: 2, name: "فهرس المحور الأول" },
    { id: 3, name: "لماذا نستثمر فى بورصة الدارالبيضاء" },
    { id: 4, name: "تاريخ البورصة " },
    { id: 5, name: "مفاهيم و تعاريف مصطلحات ببورصة الدارالبيضاء" },
    { id: 6, name: "القطاعات الموجودة بالبورصة" },
    { id: 7, name: "تاريخ فتح حساب التداول" },
    { id: 8, name: "أنواع المستثمرين" },
    { id: 9, name: "طرق شراء و بيع الأسهم" },
  ],
  "تحليل الشركات ببورصة الدارالبيضاء": [
    { id: 10, name: "أنواع تحليل الأسواق المالية " },
    { id: 11, name: "تحليل فني للأسهم " },
    { id: 12, name: "تحليل أساسي لشركات " },
    { id: 13, name: "تأثيرات الإقتصادية " },
  ],
  "استراتيجية الاستثمار في البورصة": [
    { id: 14, name: "التنويع في المحفظة الاستثمارية" },
    { id: 15, name: "أنواع الشركات" },
  ],
};

export default function Course() {
  return (
    <div className="flex flex-col py-8 items-center bg-blue-300 " dir="rtl">
      <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">
        ما الذي ستتعلمه في الدورة
      </h1>
      <nav className="overflow-y-auto w-full " aria-label="Directory">
        {Object.keys(directory).map((letter) => (
          <div
            key={letter}
            className="relative w-full max-w-2xl mx-auto bg-white"
          >
            <div className="border-b-gray-200 border-t-gray-100 bg-blue-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white">
              <h3>{letter}</h3>
            </div>
            <ul role="list">
              {directory[letter].map((person) => (
                <li key={person.name} className="flex gap-x-4 px-3 py-5">
                  <div className="min-w-0">
                    <p className="text-sm text-gray-900">{person.name}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
      <Image className="mt-4  " src={arrow} alt="arrow" />
      <Link href="https://www.financebdarija.co/de5a4eed-711e-4d01-9af9-f90183388a54" target="blank">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-6 px-24 mt-4 rounded-xl">
          ابدأ الآن
        </button>
      </Link>
    </div>
  );
}
