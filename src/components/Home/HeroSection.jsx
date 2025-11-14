"use client";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import FirstImage from "/public/assets/profile.jpg";
import { 
  TrendingUp, 
  BarChart3, 
  LineChart, 
  Sparkles, 
  ChevronRight,
  Award,
  Target,
  Zap
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HeroSection = () => {
  const router = useRouter();
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const paragraphRef = useRef(null);
  const buttonRef = useRef(null);
  const floatingIconsRef = useRef([]);
  const glowRef = useRef(null);
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, 200]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 1], [1, 0]), springConfig);
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5], [1, 0.8]), springConfig);

  // Mouse move effect for parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX - innerWidth / 2) / innerWidth;
      const y = (clientY - innerHeight / 2) / innerHeight;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image animation with 3D effect
      gsap.fromTo(
        imageRef.current,
        {
          opacity: 0,
          scale: 0.5,
          rotationY: -90,
          transformOrigin: "center center",
        },
        {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
          },
        }
      );

      // Title animation with split text effect
      gsap.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 100,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.3,
        }
      );

      // Paragraph animation with stagger
      const paragraphWords = paragraphRef.current.querySelectorAll(".word");
      gsap.fromTo(
        paragraphWords,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.02,
          ease: "power2.out",
          delay: 0.6,
        }
      );

      // Button animation with bounce
      gsap.fromTo(
        buttonRef.current,
        {
          opacity: 0,
          scale: 0,
          rotation: -180,
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1,
          ease: "elastic.out(1, 0.5)",
          delay: 1,
        }
      );

      // Floating icons animation
      floatingIconsRef.current.forEach((icon, index) => {
        if (icon) {
          gsap.to(icon, {
            y: "random(-30, 30)",
            x: "random(-20, 20)",
            rotation: "random(-15, 15)",
            duration: "random(2, 4)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.2,
          });
        }
      });

      // Glow effect animation
      gsap.to(glowRef.current, {
        scale: 1.5,
        opacity: 0.3,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Magnetic button effect
  const handleMouseMove = (e) => {
    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(button, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)",
    });
  };

  // Split text into words for animation
  const text = `تعرّف على خبيرنا المتمرّس وكبير محلّلي إدارة المخاطر، الذي يمتلك أكثر من عشر سنوات من الخبرة في سوق الأسهم الأمريكية وفي سوق الأسهم المغربية. معروف بمحتواه المميز على مواقع التواصل الاجتماعي حول المواضيع المرتبطة بالثقافة المالية، حيث يشاركك معرفته القيّمة ليمكّنك من امتلاك الأدوات اللازمة لاتخاذ قرارات استثمارية مستنيرة وواثقة.
  انضم إلينا وابدأ في بناء مستقبلك المالي مع خبرة موثوقة ورؤى عملية.`;
  
  
  const words = text.split(" ");

  const floatingIcons = [
    { Icon: TrendingUp, color: "text-blue-500", position: "top-10 right-10" },
    { Icon: BarChart3, color: "text-green-500", position: "top-32 right-32" },
    { Icon: LineChart, color: "text-purple-500", position: "bottom-20 right-20" },
    { Icon: Award, color: "text-yellow-500", position: "top-20 left-20" },
    { Icon: Target, color: "text-red-500", position: "bottom-32 left-32" },
    { Icon: Zap, color: "text-orange-500", position: "top-40 left-40" },
  ];

  return (
    <motion.section
      ref={sectionRef}
      className="relative overflow-hidden py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen flex items-center"
      style={{ opacity, scale }}
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 via-transparent to-indigo-100/50">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Floating Icons */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          ref={(el) => (floatingIconsRef.current[index] = el)}
          className={`absolute ${item.position} opacity-20 hidden lg:block`}
          style={{
            x: mousePosition.x * (index % 2 === 0 ? 20 : -20),
            y: mousePosition.y * (index % 2 === 0 ? 20 : -20),
          }}
        >
          <item.Icon className={`w-16 h-16 ${item.color}`} />
        </motion.div>
      ))}

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10" dir="rtl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Section */}
          <motion.div
            className="relative w-full"
            style={{
              y: useTransform(scrollYProgress, [0, 1], [0, 100]),
              x: mousePosition.x * 30,
              rotateY: mousePosition.x * 10,
            }}
          >
            {/* Glow Effect Behind Image */}
            <div
              ref={glowRef}
              className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl blur-3xl opacity-20"
            />
            
          

            <motion.div
              ref={imageRef}
              className="relative rounded-3xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.05, rotateZ: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Animated Border */}
              <motion.div
                className="absolute inset-0 rounded-3xl"
                animate={{
                  background: [
                    "linear-gradient(0deg, #3b82f6, #8b5cf6)",
                    "linear-gradient(90deg, #8b5cf6, #ec4899)",
                    "linear-gradient(180deg, #ec4899, #3b82f6)",
                    "linear-gradient(270deg, #3b82f6, #8b5cf6)",
                    "linear-gradient(360deg, #8b5cf6, #3b82f6)",
                  ],
                }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{ padding: "4px" }}
              >
                <div className="w-full h-full bg-white rounded-3xl" />
              </motion.div>

              <div className="relative z-10 p-2">
                <Image
                  src={FirstImage}
                  alt="خبير مالي"
                  className="rounded-2xl w-full h-auto"
                  priority
                />
              </div>

              {/* Shine Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
                animate={{ 
                  x: ["-100%", "200%"],
                  opacity: [0, 0.3, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            {/* Decorative Elements */}
            <motion.div
              className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full blur-2xl opacity-30"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>

          {/* Content Section */}
          <motion.div 
            className="space-y-8"
            style={{
              x: mousePosition.x * -20,
              y: mousePosition.y * -20,
            }}
          >
            {/* Title */}
            <motion.div className="relative">
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl blur-2xl"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [0.95, 1.05, 0.95],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <h1
                ref={titleRef}
                className="relative text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent leading-tight"
              >
                هل أنت مستعد لرفع مستوى معرفتك المالية؟
              </h1>
            </motion.div>

            {/* Paragraph */}
            <div ref={paragraphRef} className="text-lg leading-relaxed text-gray-700">
              {words.map((word, index) => (
                <span
                  key={index}
                  className="word inline-block mr-2 opacity-0"
                >
                  {word}
                </span>
              ))}
            </div>



            {/* CTA Button */}
            <motion.button
              ref={buttonRef}
              onClick={() => router.push("/courses")}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-5 px-10 rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Button Glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={{
                  scale: [1, 1.5, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {/* Shine Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
                animate={{
                  translateX: ["0%", "200%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              />

              <span className="relative flex items-center justify-center gap-3 text-xl">
                <span>ابدأ الآن</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.div>
              </span>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Particle Effect */}
      {/* <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-500 rounded-full opacity-20"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, -20, null],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div> */}
    </motion.section>
  );
};

export default HeroSection;