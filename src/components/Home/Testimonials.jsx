"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import img1 from "../../../public/assets/testimonial/photo_2024-08-07_22-38-47.jpg"
import img2 from "../../../public/assets/testimonial/photo_2024-08-07_22-38-50.jpg"
import img3 from "../../../public/assets/testimonial/photo_2024-08-07_22-38-52.jpg"
import img4 from "../../../public/assets/testimonial/Screenshot 2024-08-07 at 22.40.51.png"
import img5 from "../../../public/assets/testimonial/Screenshot 2024-08-07 at 22.43.32.png"

export default function FeedbackCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const feedbackClients = [
    { index: 1, image: img1 },
    { index: 2, image: img2 },
    { index: 3, image: img3 },
    { index: 4, image: img4 },
    { index: 5, image: img5 },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => 
        prevSlide === feedbackClients.length - 1 ? 0 : prevSlide + 1
      );
    }, 5000); // 5 seconds interval

    return () => clearInterval(timer);
  }, [feedbackClients.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="bg-gradient-to-t from-white to-blue-200  px-6 py-12 " dir="rtl">
      <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">
        شهادات عملائنا
      </h1>
      <div className="max-w-2xl mx-auto relative">
        <div className="relative h-64 overflow-hidden">
          {feedbackClients.map((feedback, index) => (
            <div
              key={feedback.index}
              className={`absolute top-0 left-0 w-full h-full flex justify-center items-center transition-opacity duration-500 ${
                currentSlide === index ? "opacity-100" : "opacity-0"
              }`}
              style={{ 
                transform: `translateX(${(index - currentSlide) * 100}%)`,
                transition: 'transform 0.5s ease-in-out'
              }}
            >
              <Image
                src={feedback.image}
                alt={`Client ${feedback.index}`}
                width={500}
                height={500}
                className="rounded-xl "
              />
            </div>
          ))}
        </div>
        
        {/* Dots navigation */}
        <div className="flex justify-center mt-4 gap-2">
          {feedbackClients.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === index ? "bg-blue-600" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}