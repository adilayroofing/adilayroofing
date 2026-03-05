"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { company } from "@/data/company";

interface Testimonial {
  stars: number;
  quote: string;
  name: string;
  timeAgo: string;
}

// All real Google Reviews for Adilay Roofing LLC — Philadelphia, PA
const testimonials: Testimonial[] = [
  {
    stars: 5,
    quote:
      "Nisu and his team were very easy to work with. They took care of exactly what I was asking for — maintenance on the main flat roof and fixing faulty fiberglass on the deck. Adilay Roofing were very quick to respond and arrange a visit for the estimate, which was priced well and did not include things I didn't need. I would recommend Adilay Roofing for residential roofing!",
    name: "Nick Maloy",
    timeAgo: "2 weeks ago",
  },
  {
    stars: 5,
    quote:
      "This house had been plagued with roof leaks for years. I got a few quotes from different roofers all within budget. Adilay Roofing was the only one that left nothing to chance. Their experience showed first in their quote and then in their workmanship. They removed a leaking metal roof that was installed over cedar shingles probably 100 years ago. They installed plywood on the entire roof, ice barrier, underlayment and then a 50 year shingle, better than expected. They also reroofed two low slope roofs and the front porch roof, more than expected! The entire job was done in 2 days, everything cleaned up and in order. They even painted the terra cotta chimneys and replaced some downspouts on the gutters, these things were not in the quote and they did not charge for this work or the materials. They made sure everything was 100%. Everyone involved in this was truly professional and respectful. The end result… Better than expected!",
    name: "Rob Lehr",
    timeAgo: "6 months ago",
  },
  {
    stars: 5,
    quote:
      "It's a delight to give a positive review. Nissim Erez, Owner is a professional, honest and easy to communicate with. His crew is skilled and gave a full day performance each day they worked. They completed each project with quality workmanship. I'm a satisfied customer and will refer Adilay company to my family, friends and neighbors.",
    name: "Cathy Williams",
    timeAgo: "4 months ago",
  },
  {
    stars: 5,
    quote:
      "Did a great job with the roof fantastic work I appreciate all the help. Would recommend for anyone else to also select their services! I'm very happy!",
    name: "Gul Agha",
    timeAgo: "3 months ago",
  },
  {
    stars: 5,
    quote:
      "Great guys, did an amazing job, gave me a fair price, stayed within promised quote. Even added some nice touches I wasn't expecting. I highly recommend Adilay!!",
    name: "Donna Sirchio",
    timeAgo: "6 months ago",
  },
  {
    stars: 5,
    quote:
      "Very professional company. Would recommend. Adilay just completed the roof on my parent's house. Flat torch down and shingled the A frame. They also threw in gutters and painted the chimneys along with installing very nice flashing. Showed up on time. Completed the job as scheduled. Very nice workers.",
    name: "Cyrus Sirchio",
    timeAgo: "6 months ago",
  },
  {
    stars: 5,
    quote:
      "Outstanding. I'd highly recommend Adilay Roofing to anyone in need of roofing services. From communication to pricing to execution, everything was flawless. The entire team was professional and went above and beyond to deliver quality at a fair price. The team was unbelievably punctual to boot and completed the job within 48 hours of my issue arising. A+. Highly Recommend!",
    name: "Matthew Kollar",
    timeAgo: "10 months ago",
  },
  {
    stars: 5,
    quote:
      "Adilay roofing was highly recommended to us by a friend. We had a persistent major leak coming in from shoddy siding and roof work done by another contractor. They came out quickly to look at the issue, sent a professional and detailed proposal with clear scope of work and costs, and were attentive to our questions and to schedule. They were extremely thorough and professional through the whole process, bringing all of the tools and materials needed to complete the job. We are happy to say we no longer have a leak, and will continue to use them for any additional roofing or siding needs! Thank you!",
    name: "Nikki Talarico",
    timeAgo: "9 months ago",
  },
  {
    stars: 5,
    quote:
      "Adilay Roofing did an outstanding job on four roofs, siding and a back deck for us! From start to finish, they were professional, on time, and detail-oriented. The work was top-quality clean lines, solid materials, and everything was done right the first time. And the best part? Their price beat every other company I reached out to. We got multiple quotes, and Adilay came in with the most competitive rate without sacrificing quality. I truly appreciate their honesty, Expertise, and great customer service. If you're looking for roofing or deck work, Adilay Roofing is the one to call. Highly recommended!",
    name: "Lyonie Johnson",
    timeAgo: "8 months ago",
  },
  {
    stars: 5,
    quote:
      "I recently had a flat roof installed on my property by a company owned by Nissan and Israel, and I'm pleased with how everything turned out. From the beginning, they were professional, easy to communicate with, and took the time to explain the process clearly. The quality of the workmanship is solid — everything looks neat, and the finish is clean. They were respectful of my property, worked efficiently, and completed the job in the timeframe they promised. What stood out most was how approachable and helpful Nissan and Israel were throughout. Any questions I had were answered without hesitation, and they made sure I was satisfied with the work before wrapping up. Overall, I'd recommend them to anyone looking for reliable and honest roofing professionals. A good experience, and I'm glad I chose them for the job.",
    name: "Mr CIMA",
    timeAgo: "8 months ago",
  },
  {
    stars: 5,
    quote:
      "I called Adilay Roofing to repair my roof. They came quickly to give me my quote. Once I got their quote, and approved it (they gave a great price), they got to work quickly. Everything was done very well and precisely and the workers were very kind and professional. I highly recommend them to anyone looking for roof repairs!",
    name: "Erica Delahoy",
    timeAgo: "a year ago",
  },
  {
    stars: 5,
    quote:
      "I recently had the pleasure of working with Nissim and his team at Adilay Roofing for some roofing repairs, and I couldn't be happier with the results! From the initial consultation to the final inspection, the entire process was smooth and professional. Nissim took the time to explain the necessary repairs and provided a detailed estimate, ensuring I understood every step. The crew was punctual, respectful of my property, and worked diligently to complete the job on time. Their attention to detail and commitment to quality workmanship truly set them apart. Not only does my roof look fantastic, but I also feel confident knowing it's been repaired to last. I highly recommend Adilay Roofing for anyone in need of roofing services. Thank you, Nissim for your outstanding work!",
    name: "13serez",
    timeAgo: "11 months ago",
  },
  {
    stars: 5,
    quote:
      "Nissan was very polite and knowledgeable about what he's doing. He was present the entire time and was able to answer any question or concern we had. I really appreciate his hard work and flexibility with our request. This is how a business should be and I would thank him by referral and recommend this business.",
    name: "Zion C",
    timeAgo: "11 months ago",
  },
  {
    stars: 5,
    quote:
      "Adilay Roofing gave a great price to fix my roof. They were professional and explained what the procedure required with no hidden fees or cutting corners. I will definitely recommend to my friends and family.",
    name: "S Monge",
    timeAgo: "a year ago",
  },
  {
    stars: 5,
    quote:
      "I would like to highly recommend Adilay Roofing for any home improvement needs. I would rate their work a 10 out of 10. Adilay Roofing completed renovations in our dining room and bathroom with exceptional skills and professionalism. In our dining room he installed raw floors, painted the space, and set up our lighting fixtures, all of which resulted in a phenomenal transformation. He is consistently punctual, eager to complete the work, and demonstrates a high level of craftsmanship. In our bathroom remodel, they efficiently gutted the space and every detail was incredibly beautiful and flawlessly installed all the new fixtures. Overall, Adilay Roofing are outstanding professionals who exceeded our expectations in every way, and I would highly recommend them to anyone seeking quality, reliable home improvement services.",
    name: "Carmen Diaz-Alers",
    timeAgo: "a year ago",
  },
  {
    stars: 5,
    quote:
      "Excellent Company! Very professional team. A friend of ours highly recommended them to us and we are so pleased with our new roof. The roofers were on time and did a fantastic job. The job was complete in one day. I would recommend the company to family and friends when they need a new roof. I received several quotes and this company beat every quote.",
    name: "Eliran Azaria",
    timeAgo: "a year ago",
  },
  {
    stars: 5,
    quote:
      "We had a wonderful experience with Adilay Roofing LLC. Their word was word. Started on time. Finished on time. And guess what they even threw in some freebies which of course made us happy. We recommend them very highly.",
    name: "Richard",
    timeAgo: "a year ago",
  },
  {
    stars: 5,
    quote:
      "I called Adilay Roofing to repair my leaking roof. They came on time and were honest and kind. I am so happy that it was repaired before the weather got worse. No more leaks and now I can sleep without worries. I strongly recommend Adilay Roofing to all my family and friends.",
    name: "Philadelphia Housing Connection",
    timeAgo: "a year ago",
  },
  {
    stars: 5,
    quote:
      "I had amazing experience from start to finish. They really went above and beyond to ensure my roofing needs were met. Will definitely recommend them to friends and family. Thank you for such a wonderful experience.",
    name: "Noah Orbach",
    timeAgo: "a year ago",
  },
  {
    stars: 5,
    quote:
      "Did an amazing job with everything. The estimate and how he explained the work, the installation and clean up after work was done. Good customer service.",
    name: "Tal B.",
    timeAgo: "a year ago",
  },
  {
    stars: 5,
    quote:
      "I've had a pleasure working with Adilay Roofing. This is a very professional, honest and reliable crew. I would highly recommend them!!",
    name: "Alex Molinski",
    timeAgo: "a year ago",
  },
  {
    stars: 5,
    quote:
      "Adilay Roofing was very professional. They gave me the best price for my roof and I will definitely recommend them to all my relatives.",
    name: "Juan Claudio",
    timeAgo: "a year ago",
  },
  {
    stars: 5,
    quote: "Excellent work. Great crew. I highly recommend them.",
    name: "Ira Zeitlin",
    timeAgo: "7 months ago",
  },
  {
    stars: 5,
    quote:
      "I would like to say that this is the best contractor I ever worked with. Everything that was promised was on time. They didn't miss a day. My roof looks so good right now. Ready for the winter!",
    name: "Shay Hazan",
    timeAgo: "a year ago",
  },
  {
    stars: 5,
    quote:
      "I used Adilay Roofing for my house. They did a very good job. The service was excellent!!! Highly recommended.",
    name: "Yoni Nitzan",
    timeAgo: "11 months ago",
  },
  {
    stars: 5,
    quote:
      "I chose Adilay Roofing from all the other companies because they gave me a good price. They came on time and were very professional.",
    name: "Tom Weber",
    timeAgo: "a year ago",
  },
  {
    stars: 5,
    quote:
      "Very honest, reliable with competitive pricing. The guys are very friendly. I totally recommend this company.",
    name: "Tina Quinones",
    timeAgo: "11 months ago",
  },
  {
    stars: 5,
    quote: "Great service! Amazing price! Will definitely use again in the future.",
    name: "Shy Peled",
    timeAgo: "a year ago",
  },
  {
    stars: 5,
    quote:
      "Thank you Adilay Roofing for great professional job on my roof. Fair price, highly recommended.",
    name: "Yafit Abermen",
    timeAgo: "a year ago",
  },
  {
    stars: 5,
    quote:
      "Company is very reliable!! Great service, quick response. Would use again.",
    name: "Maya Peer",
    timeAgo: "a year ago",
  },
  {
    stars: 5,
    quote:
      "Adilay Roofing — I had a great experience with amazing service & job. Professionals, top of the line!!",
    name: "Mike Wolberg",
    timeAgo: "a year ago",
  },
  {
    stars: 5,
    quote:
      "This is good people, hard workers and they completed the job on time. Real organized and good housekeeping. They do a perfect job. I recommend!",
    name: "Joel Saez",
    timeAgo: "a year ago",
  },
  {
    stars: 5,
    quote: "Highly recommend! Did my office roof and the results are amazing.",
    name: "Avi Biton",
    timeAgo: "a year ago",
  },
  {
    stars: 5,
    quote:
      "Highly recommend! Fast service, great customer service and excellent work done.",
    name: "Mikhal Sarfaty",
    timeAgo: "a year ago",
  },
  {
    stars: 5,
    quote: "I received professional and reliable service, highly recommend.",
    name: "Anat Aslati",
    timeAgo: "a year ago",
  },
  {
    stars: 5,
    quote:
      "The best company out there. We had great experience with three properties.",
    name: "Moshe Weiner",
    timeAgo: "a year ago",
  },
  {
    stars: 5,
    quote: "Amazing service, will definitely use them again in the future.",
    name: "Guy Assaf",
    timeAgo: "a year ago",
  },
  {
    stars: 5,
    quote: "Professional team. Did great job. Thank you.",
    name: "Ben Chordekar",
    timeAgo: "a year ago",
  },
  {
    stars: 5,
    quote: "Best in the business! Highly recommend!",
    name: "Or Aharon",
    timeAgo: "a year ago",
  },
  {
    stars: 5,
    quote: "Great job and price!",
    name: "Kfir Nissim",
    timeAgo: "a year ago",
  },
  {
    stars: 5,
    quote:
      "I want to express my sincere gratitude to Adilay Roofing for the excellent roofing work they performed on my home. From the first contact, their professionalism, dedication, and attention to detail were evident. Israel proved to be a tireless worker, committed to quality, and providing an exceptional level of customer service. The work was carried out impeccably, meeting the highest industry standards. From the initial assessment to the completion of the project, Israel demonstrated in-depth knowledge and experience in roofing, ensuring a long-lasting, high-quality result. Furthermore, their communication was clear and consistent, providing complete transparency at every stage of the process. I recommend Israel's roofing business to anyone who needs quality services, performed with professionalism and responsibility. For all the above, I give your company a well-deserved 5-star rating. Thank you, Adilay Roofing, for an outstanding job!",
    name: "Nelson Perez",
    timeAgo: "a year ago",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 md:w-4 md:h-4 ${
            i < count ? "text-brand-star" : "text-brand-border"
          }`}
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function GoogleIcon({ className = "w-4 h-4 md:w-5 md:h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

/* ── Review card (single) ── */
/* Mobile: full text, no Read More (cards are stacked 1-col so plenty of width) */
/* Desktop: Read More on long reviews (3-col grid, cards are narrower) */
const LONG_THRESHOLD = 180;

function ReviewCard({ review }: { review: Testimonial }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.quote.length > LONG_THRESHOLD;
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxH, setMaxH] = useState<string>("5.6em");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function check() { setIsMobile(window.innerWidth < 768); }
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Recalculate max-height when expanded state changes
  useEffect(() => {
    if (!contentRef.current) return;
    if (expanded) {
      setMaxH(`${contentRef.current.scrollHeight}px`);
    } else {
      setMaxH("5.6em");
    }
  }, [expanded]);

  // On mobile: always show full text. On desktop: clamp long reviews.
  const shouldClamp = isLong && !isMobile;

  return (
    <div className="bg-white rounded-sm p-4 md:p-6 shadow-sm border border-brand-border flex flex-col h-full">
      {/* Top: Google + time */}
      <div className="flex items-center justify-between mb-2">
        <GoogleIcon className="w-4 h-4" />
        <span className="text-[10px] md:text-xs text-brand-gray">{review.timeAgo}</span>
      </div>

      {/* Stars */}
      <StarRating count={review.stars} />

      {/* Quote */}
      <blockquote className="mt-2 md:mt-3 flex-1">
        <div
          ref={contentRef}
          className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
          style={{ maxHeight: shouldClamp ? maxH : "none" }}
        >
          <p className="text-brand-dark leading-relaxed text-xs md:text-sm">
            &ldquo;{review.quote}&rdquo;
          </p>
        </div>

        {shouldClamp && (
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="text-brand-red hover:text-brand-red-dark text-[11px] md:text-xs font-semibold mt-1 transition-colors cursor-pointer"
          >
            {expanded ? "Read Less" : "Read More"}
          </button>
        )}
      </blockquote>

      {/* Attribution */}
      <div className="mt-3 pt-2 md:pt-3 border-t border-brand-border flex items-center gap-2">
        <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center font-bold text-xs md:text-sm flex-shrink-0">
          {review.name.charAt(0).toUpperCase()}
        </div>
        <p className="font-bold text-brand-dark text-xs md:text-sm truncate">
          {review.name}
        </p>
      </div>
    </div>
  );
}

/* ── Hook: responsive perPage ── */
function usePerPage() {
  const [perPage, setPerPage] = useState(3);

  useEffect(() => {
    function update() {
      setPerPage(window.innerWidth < 768 ? 2 : 3);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return perPage;
}

/* ── Main component ── */
export default function TestimonialsSection() {
  const perPage = usePerPage();
  const [page, setPage] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const [slideDir, setSlideDir] = useState<"left" | "right">("left");

  const total = testimonials.length;
  const totalPages = Math.ceil(total / perPage);

  // Clamp page when perPage changes (e.g. resize)
  useEffect(() => {
    setPage((prev) => Math.min(prev, totalPages - 1));
  }, [totalPages]);

  const goTo = useCallback(
    (p: number) => {
      setPage(((p % totalPages) + totalPages) % totalPages);
    },
    [totalPages]
  );

  const animatedGo = useCallback(
    (p: number, dir: "left" | "right") => {
      setSlideDir(dir);
      setAnimating(true);
      // Quick fade-out, then swap page, then fade-in
      setTimeout(() => {
        goTo(p);
        setAnimating(false);
      }, 150);
    },
    [goTo]
  );

  const goNext = useCallback(() => animatedGo(page + 1, "left"), [page, animatedGo]);
  const goPrev = useCallback(() => animatedGo(page - 1, "right"), [page, animatedGo]);

  /* No auto-play — only manual navigation via swipe or arrows */

  /* Touch / swipe */
  const minSwipeDistance = 50;

  function onTouchStart(e: React.TouchEvent) {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }

  function onTouchMove(e: React.TouchEvent) {
    setTouchEnd(e.targetTouches[0].clientX);
  }

  function onTouchEnd() {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (Math.abs(distance) >= minSwipeDistance) {
      if (distance > 0) goNext();
      else goPrev();
    }
    setTouchStart(null);
    setTouchEnd(null);
  }

  /* Current visible slice */
  const startIdx = page * perPage;
  const visible = testimonials.slice(startIdx, startIdx + perPage);

  return (
    <section className="section-padding bg-brand-light">
      <div className="container-wide mx-auto">
        {/* Heading */}
        <div className="text-center mb-6 md:mb-10">
          <h2 className="section-heading">What Our Customers Say</h2>
          <div className="flex items-center justify-center gap-2 mt-3 md:mt-4">
            <GoogleIcon />
            <span className="text-brand-dark font-bold text-sm md:text-base">5.0</span>
            <StarRating count={5} />
            <span className="text-brand-gray text-xs md:text-sm">
              ({total} reviews)
            </span>
          </div>

          {/* Navigation arrows + counter — right under the stars */}
          <div className="flex items-center justify-center gap-4 mt-4 md:mt-5">
            <button
              type="button"
              onClick={goPrev}
              className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-brand-border flex items-center justify-center text-brand-gray hover:text-brand-dark hover:border-brand-dark transition-colors cursor-pointer"
              aria-label="Previous reviews"
            >
              <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            <span className="text-xs md:text-sm text-brand-gray font-medium">
              {page + 1} / {totalPages}
            </span>

            <button
              type="button"
              onClick={goNext}
              className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-brand-border flex items-center justify-center text-brand-gray hover:text-brand-dark hover:border-brand-dark transition-colors cursor-pointer"
              aria-label="Next reviews"
            >
              <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>

          {/* Swipe hint (mobile) */}
          <p className="text-brand-gray text-xs mt-1.5 md:hidden">
            Swipe to see more reviews
          </p>
        </div>

        {/* Cards grid with slide animation */}
        <div
          className="select-none overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 transition-all duration-200 ease-out"
            style={{
              opacity: animating ? 0 : 1,
              transform: animating
                ? `translateX(${slideDir === "left" ? "-12px" : "12px"})`
                : "translateX(0)",
            }}
          >
            {visible.map((review, i) => (
              <ReviewCard key={startIdx + i} review={review} />
            ))}
          </div>
        </div>

        {/* Google Reviews Link */}
        <div className="text-center mt-6 md:mt-10">
          <Link
            href={company.googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-brand-red font-bold hover:text-brand-red-dark transition-colors text-sm md:text-base"
          >
            See All Reviews on Google
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
