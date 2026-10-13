/**
 * Fallback copy of the approved Google reviews shown on the site.
 *
 * The live list comes from the "Reviews" tab of the leads Google Sheet
 * (see src/lib/reviews.ts) — this file is only used if the sheet can't be
 * read. Dates are approximate for older reviews (derived from Google's
 * "X ago" labels as of 2026-07-03); exact where Google returned them.
 */

export interface Review {
  /** Publish date, YYYY-MM-DD */
  date: string;
  stars: number;
  name: string;
  quote: string;
}

export const fallbackReviews: Review[] = [
  {
    date: "2026-06-22",
    stars: 5,
    name: "Abby Houff",
    quote:
      "Nissim and his entire team were incredibly responsive and did great work on both the front of our house with window capping and on the roof of our house! We couldn't be more grateful for their hard work as we are first time homebuyers and they mentioned they do work in all of Philadelphia and surrounding areas of PA including Germantown! Thank you again to the team!",
  },
  {
    date: "2026-05-22",
    stars: 5,
    name: "Ben Bristow",
    quote:
      "Great working with Adilay and will continue working with them. Honest and trustworthy, quick to get the job done, and they go above and beyond to do it right and do it well. They don't just get the work done, they make it look good!",
  },
  {
    date: "2026-05-11",
    stars: 5,
    name: "Sugar Bear",
    quote:
      "I live in the Philadelphia area and I recently hired Adilay Roofing & Siding for a roof leak affecting the back bedroom of my home. They provided the most thorough assessment of the problem, clearly explained the cause of the leak, and offered a practical, well-thought-out solution. The crew arrived on time, completed the work within the promised schedule, and kept the area clean throughout the process. The repair and shingle replacement were done with care and attention to detail, and the results look great.",
  },
  {
    date: "2026-04-12",
    stars: 5,
    name: "Paul Schumacher",
    quote:
      "High quality and professional. From estimate to completion, competent and knowledgeable helpful and considerate workers. Our roof top was re-conditioned (fiberglass, paint and stucco, and patched flooring replacement) better than new, and priced competitively or better-than others. Communication could improve, but even this does not impact the thoughtful quality of work this team provides.",
  },
  {
    date: "2026-02-03",
    stars: 5,
    name: "Nick Maloy",
    quote:
      "Nisu and his team were very easy to work with. They took care of exactly what I was asking for — maintenance on the main flat roof and fixing faulty fiberglass on the deck. Adilay Roofing were very quick to respond and arrange a visit for the estimate, which was priced well and did not include things I didn't need. I would recommend Adilay Roofing for residential roofing!",
  },
  {
    date: "2025-12-03",
    stars: 5,
    name: "Gul Agha",
    quote:
      "Did a great job with the roof fantastic work I appreciate all the help. Would recommend for anyone else to also select their services! I'm very happy!",
  },
  {
    date: "2025-11-03",
    stars: 5,
    name: "Cathy Williams",
    quote:
      "It's a delight to give a positive review. Nissim Erez, Owner is a professional, honest and easy to communicate with. His crew is skilled and gave a full day performance each day they worked. They completed each project with quality workmanship. I'm a satisfied customer and will refer Adilay company to my family, friends and neighbors.",
  },
  {
    date: "2025-09-03",
    stars: 5,
    name: "Donna Sirchio",
    quote:
      "Great guys, did an amazing job, gave me a fair price, stayed within promised quote. Even added some nice touches I wasn't expecting. I highly recommend Adilay!!",
  },
  {
    date: "2025-09-03",
    stars: 5,
    name: "Rob Lehr",
    quote:
      "This house had been plagued with roof leaks for years. I got a few quotes from different roofers all within budget. Adilay Roofing was the only one that left nothing to chance. Their experience showed first in their quote and then in their workmanship. They removed a leaking metal roof that was installed over cedar shingles probably 100 years ago. They installed plywood on the entire roof, ice barrier, underlayment and then a 50 year shingle, better than expected. They also reroofed two low slope roofs and the front porch roof, more than expected! The entire job was done in 2 days, everything cleaned up and in order. They even painted the terra cotta chimneys and replaced some downspouts on the gutters, these things were not in the quote and they did not charge for this work or the materials. They made sure everything was 100%. Everyone involved in this was truly professional and respectful. The end result… Better than expected!",
  },
  {
    date: "2025-09-03",
    stars: 5,
    name: "Cyrus Sirchio",
    quote:
      "Very professional company. Would recommend. Adilay just completed the roof on my parent's house. Flat torch down and shingled the A frame. They also threw in gutters and painted the chimneys along with installing very nice flashing. Showed up on time. Completed the job as scheduled. Very nice workers.",
  },
  {
    date: "2025-08-03",
    stars: 5,
    name: "Ira Zeitlin",
    quote:
      "Excellent work. Great crew. I highly recommend them.",
  },
  {
    date: "2025-07-03",
    stars: 5,
    name: "Lyonie Johnson",
    quote:
      "Adilay Roofing did an outstanding job on four roofs, siding and a back deck for us! From start to finish, they were professional, on time, and detail-oriented. The work was top-quality clean lines, solid materials, and everything was done right the first time. And the best part? Their price beat every other company I reached out to. We got multiple quotes, and Adilay came in with the most competitive rate without sacrificing quality. I truly appreciate their honesty, Expertise, and great customer service. If you're looking for roofing or deck work, Adilay Roofing is the one to call. Highly recommended!",
  },
  {
    date: "2025-07-02",
    stars: 5,
    name: "Mr CIMA",
    quote:
      "I recently had a flat roof installed on my property by a company owned by Nissan and Israel, and I'm pleased with how everything turned out. From the beginning, they were professional, easy to communicate with, and took the time to explain the process clearly. The quality of the workmanship is solid — everything looks neat, and the finish is clean. They were respectful of my property, worked efficiently, and completed the job in the timeframe they promised. What stood out most was how approachable and helpful Nissan and Israel were throughout. Any questions I had were answered without hesitation, and they made sure I was satisfied with the work before wrapping up. Overall, I'd recommend them to anyone looking for reliable and honest roofing professionals. A good experience, and I'm glad I chose them for the job.",
  },
  {
    date: "2025-07-01",
    stars: 5,
    name: "Nikki Talarico",
    quote:
      "Adilay roofing was highly recommended to us by a friend. We had a persistent major leak coming in from shoddy siding and roof work done by another contractor. They came out quickly to look at the issue, sent a professional and detailed proposal with clear scope of work and costs, and were attentive to our questions and to schedule. They were extremely thorough and professional through the whole process, bringing all of the tools and materials needed to complete the job. We are happy to say we no longer have a leak, and will continue to use them for any additional roofing or siding needs! Thank you!",
  },
  {
    date: "2025-06-30",
    stars: 5,
    name: "Matthew Kollar",
    quote:
      "Outstanding. I'd highly recommend Adilay Roofing to anyone in need of roofing services. From communication to pricing to execution, everything was flawless. The entire team was professional and went above and beyond to deliver quality at a fair price. The team was unbelievably punctual to boot and completed the job within 48 hours of my issue arising. A+. Highly Recommend!",
  },
  {
    date: "2025-06-29",
    stars: 5,
    name: "13serez",
    quote:
      "I recently had the pleasure of working with Nissim and his team at Adilay Roofing for some roofing repairs, and I couldn't be happier with the results! From the initial consultation to the final inspection, the entire process was smooth and professional. Nissim took the time to explain the necessary repairs and provided a detailed estimate, ensuring I understood every step. The crew was punctual, respectful of my property, and worked diligently to complete the job on time. Their attention to detail and commitment to quality workmanship truly set them apart. Not only does my roof look fantastic, but I also feel confident knowing it's been repaired to last. I highly recommend Adilay Roofing for anyone in need of roofing services. Thank you, Nissim for your outstanding work!",
  },
  {
    date: "2025-06-28",
    stars: 5,
    name: "Tina Quinones",
    quote:
      "Very honest, reliable with competitive pricing. The guys are very friendly. I totally recommend this company.",
  },
  {
    date: "2025-06-27",
    stars: 5,
    name: "Yoni Nitzan",
    quote:
      "I used Adilay Roofing for my house. They did a very good job. The service was excellent!!! Highly recommended.",
  },
  {
    date: "2025-06-26",
    stars: 5,
    name: "Zion C",
    quote:
      "Nissan was very polite and knowledgeable about what he's doing. He was present the entire time and was able to answer any question or concern we had. I really appreciate his hard work and flexibility with our request. This is how a business should be and I would thank him by referral and recommend this business.",
  },
  {
    date: "2025-06-25",
    stars: 5,
    name: "Richard",
    quote:
      "We had a wonderful experience with Adilay Roofing LLC. Their word was word. Started on time. Finished on time. And guess what they even threw in some freebies which of course made us happy. We recommend them very highly.",
  },
  {
    date: "2025-06-24",
    stars: 5,
    name: "Guy Assaf",
    quote:
      "Amazing service, will definitely use them again in the future.",
  },
  {
    date: "2025-06-23",
    stars: 5,
    name: "Anat Aslati",
    quote:
      "I received professional and reliable service, highly recommend.",
  },
  {
    date: "2025-06-22",
    stars: 5,
    name: "Tal B.",
    quote:
      "Did an amazing job with everything. The estimate and how he explained the work, the installation and clean up after work was done. Good customer service.",
  },
  {
    date: "2025-06-21",
    stars: 5,
    name: "Mikhal Sarfaty",
    quote:
      "Highly recommend! Fast service, great customer service and excellent work done.",
  },
  {
    date: "2025-06-20",
    stars: 5,
    name: "Maya Peer",
    quote:
      "Company is very reliable!! Great service, quick response. Would use again.",
  },
  {
    date: "2025-06-19",
    stars: 5,
    name: "Philadelphia Housing Connection",
    quote:
      "I called Adilay Roofing to repair my leaking roof. They came on time and were honest and kind. I am so happy that it was repaired before the weather got worse. No more leaks and now I can sleep without worries. I strongly recommend Adilay Roofing to all my family and friends.",
  },
  {
    date: "2025-06-18",
    stars: 5,
    name: "Joel Saez",
    quote:
      "This is good people, hard workers and they completed the job on time. Real organized and good housekeeping. They do a perfect job. I recommend!",
  },
  {
    date: "2025-06-17",
    stars: 5,
    name: "Carmen Diaz-Alers",
    quote:
      "I would like to highly recommend Adilay Roofing for any home improvement needs. I would rate their work a 10 out of 10. Adilay Roofing completed renovations in our dining room and bathroom with exceptional skills and professionalism. In our dining room he installed raw floors, painted the space, and set up our lighting fixtures, all of which resulted in a phenomenal transformation. He is consistently punctual, eager to complete the work, and demonstrates a high level of craftsmanship. In our bathroom remodel, they efficiently gutted the space and every detail was incredibly beautiful and flawlessly installed all the new fixtures. Overall, Adilay Roofing are outstanding professionals who exceeded our expectations in every way, and I would highly recommend them to anyone seeking quality, reliable home improvement services.",
  },
  {
    date: "2025-06-16",
    stars: 5,
    name: "Nelson Perez",
    quote:
      "I want to express my sincere gratitude to Adilay Roofing for the excellent roofing work they performed on my home. From the first contact, their professionalism, dedication, and attention to detail were evident. Israel proved to be a tireless worker, committed to quality, and providing an exceptional level of customer service. The work was carried out impeccably, meeting the highest industry standards. From the initial assessment to the completion of the project, Israel demonstrated in-depth knowledge and experience in roofing, ensuring a long-lasting, high-quality result. Furthermore, their communication was clear and consistent, providing complete transparency at every stage of the process. I recommend Israel's roofing business to anyone who needs quality services, performed with professionalism and responsibility. For all the above, I give your company a well-deserved 5-star rating. Thank you, Adilay Roofing, for an outstanding job!",
  },
  {
    date: "2025-06-15",
    stars: 5,
    name: "Erica Delahoy",
    quote:
      "I called Adilay Roofing to repair my roof. They came quickly to give me my quote. Once I got their quote, and approved it (they gave a great price), they got to work quickly. Everything was done very well and precisely and the workers were very kind and professional. I highly recommend them to anyone looking for roof repairs!",
  },
  {
    date: "2025-06-14",
    stars: 5,
    name: "S Monge",
    quote:
      "Adilay Roofing gave a great price to fix my roof. They were professional and explained what the procedure required with no hidden fees or cutting corners. I will definitely recommend to my friends and family.",
  },
  {
    date: "2025-06-13",
    stars: 5,
    name: "Shay Hazan",
    quote:
      "I would like to say that this is the best contractor I ever worked with. Everything that was promised was on time. They didn't miss a day. My roof looks so good right now. Ready for the winter!",
  },
  {
    date: "2025-06-12",
    stars: 5,
    name: "Noah Orbach",
    quote:
      "I had amazing experience from start to finish. They really went above and beyond to ensure my roofing needs were met. Will definitely recommend them to friends and family. Thank you for such a wonderful experience.",
  },
  {
    date: "2025-06-11",
    stars: 5,
    name: "Mike Wolberg",
    quote:
      "Adilay Roofing — I had a great experience with amazing service & job. Professionals, top of the line!!",
  },
  {
    date: "2025-06-10",
    stars: 5,
    name: "Ben Chordekar",
    quote:
      "Professional team. Did great job. Thank you.",
  },
  {
    date: "2025-06-09",
    stars: 5,
    name: "Tom Weber",
    quote:
      "I chose Adilay Roofing from all the other companies because they gave me a good price. They came on time and were very professional.",
  },
  {
    date: "2025-06-08",
    stars: 5,
    name: "Shy Peled",
    quote:
      "Great service! Amazing price! Will definitely use again in the future.",
  },
  {
    date: "2025-06-07",
    stars: 5,
    name: "Moshe Weiner",
    quote:
      "The best company out there. We had great experience with three properties.",
  },
  {
    date: "2025-06-06",
    stars: 5,
    name: "Yafit Abermen",
    quote:
      "Thank you Adilay Roofing for great professional job on my roof. Fair price, highly recommended.",
  },
  {
    date: "2025-06-05",
    stars: 5,
    name: "Juan Claudio",
    quote:
      "Adilay Roofing was very professional. They gave me the best price for my roof and I will definitely recommend them to all my relatives.",
  },
  {
    date: "2025-06-04",
    stars: 5,
    name: "Alex Molinski",
    quote:
      "I've had a pleasure working with Adilay Roofing. This is a very professional, honest and reliable crew. I would highly recommend them!!",
  },
  {
    date: "2025-06-03",
    stars: 5,
    name: "Eliran Azaria",
    quote:
      "Excellent Company! Very professional team. A friend of ours highly recommended them to us and we are so pleased with our new roof. The roofers were on time and did a fantastic job. The job was complete in one day. I would recommend the company to family and friends when they need a new roof. I received several quotes and this company beat every quote.",
  },
  {
    date: "2025-06-02",
    stars: 5,
    name: "Avi Biton",
    quote:
      "Highly recommend! Did my office roof and the results are amazing.",
  },
  {
    date: "2025-06-01",
    stars: 5,
    name: "Or Aharon",
    quote:
      "Best in the business! Highly recommend!",
  },
  {
    date: "2025-05-31",
    stars: 5,
    name: "Kfir Nissim",
    quote:
      "Great job and price!",
  },
];

/** Google's aggregate numbers, used until the daily job has written fresh ones. */
export const fallbackReviewStats = { rating: 4.9, count: 61 };
