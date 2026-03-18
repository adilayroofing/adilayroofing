"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const steps = [
  { src: "/images/project11-1.jpg", label: "Tear-Off & Prep", step: 1, pos: "", bg: "" },
  { src: "/images/project11-2.jpg", label: "In Progress", step: 2, pos: "", bg: "" },
  { src: "/images/project11-3.png", label: "Nearly Complete", step: 3, pos: "", bg: "" },
  { src: "/images/project11-4.png", label: "Finished Result", step: 4, pos: "!object-contain", bg: "bg-[#B5CCE0]" },
];

interface TransformationTimelineProps {
  useNextImage?: boolean;
}

export default function TransformationTimeline({ useNextImage = false }: TransformationTimelineProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="max-w-5xl mx-auto">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-brand-dark text-center mb-1">
        See the Transformation
      </h2>
      <p className="text-brand-gray text-sm md:text-base text-center mb-6 md:mb-8">
        A complete roof replacement on a large Victorian home — start to finish.
      </p>

      <div className="relative">
        {/* Progress line (desktop) */}
        <div className="hidden md:block absolute top-5 left-[12.5%] right-[12.5%] h-0.5 bg-brand-border z-0" />
        {isVisible && (
          <div className="hidden md:block absolute top-5 left-[12.5%] right-[12.5%] h-0.5 bg-brand-red z-0 origin-left animate-[growLine_1.5s_ease-out_0.3s_both]" />
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {steps.map((photo, idx) => (
            <div
              key={photo.step}
              className={`relative ${isVisible ? "opacity-0 animate-[fadeSlideUp_0.5s_ease-out_forwards]" : "opacity-0"}`}
              style={isVisible ? { animationDelay: `${idx * 0.2 + 0.3}s` } : undefined}
            >
              {/* Step dot (desktop) */}
              <div className="hidden md:flex w-10 h-10 rounded-full bg-brand-red text-white items-center justify-center font-bold text-sm mx-auto mb-3 relative z-10 shadow-md">
                {photo.step}
              </div>
              <div className={`rounded-sm overflow-hidden shadow-lg border border-brand-border ${photo.bg}`}>
                {useNextImage ? (
                  <Image
                    src={photo.src}
                    alt={`Step ${photo.step}: ${photo.label} — Victorian roof replacement project`}
                    width={400}
                    height={300}
                    className={`w-full h-40 md:h-48 object-cover ${photo.pos}`}
                  />
                ) : (
                  <img
                    src={photo.src}
                    alt={`Step ${photo.step}: ${photo.label} — Victorian roof replacement project`}
                    className={`w-full h-40 md:h-48 object-cover ${photo.pos}`}
                    loading="lazy"
                  />
                )}
              </div>
              <p className="text-center mt-2">
                <span className="md:hidden inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand-red text-white text-[10px] font-bold mr-1 align-middle">
                  {photo.step}
                </span>
                <span className="text-brand-dark font-semibold text-xs md:text-sm">{photo.label}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
