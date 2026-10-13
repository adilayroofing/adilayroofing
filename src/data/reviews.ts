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
  /** Short line lifted word-for-word from the review, shown bold above it */
  highlight?: string;
  /** Reviewer's Google profile photo URL */
  photo?: string;
  /** Owner picked it to show next to the call-to-action buttons */
  featured?: boolean;
}

export const fallbackReviews: Review[] = [
  {
    date: "2026-10-13",
    stars: 5,
    name: "Ashley Curreri",
    quote:
      "We used Adilay after experiencing a leak from the roof underneath our roof deck during one of the big rain storms this summer. His team provided a detailed invoice, took apart the roof deck, re-did our roof and reassembled the roof deck in addition to installing new capping around the perimeter all for a reasonable price. His team was very kind and took care to not make a big mess. The project went longer than anticipated but I’m not surprised as roof deck assembly/disassembly requires a lot of work. My husband and I were very satisfied with their work and will likely use them for future roofing needs, would recommend",
    highlight: "Very satisfied with their work",
    photo: "https://lh3.googleusercontent.com/a-/ALV-UjVy7gG9S_iZ45_Yon7YzpwA3GaHpNOtkIfjlE4Pn9Y7QlH-F8iI=s128-c0x00000000-cc-rp-mo",
  },
  {
    date: "2026-09-08",
    stars: 5,
    name: "Manoj Prasad",
    quote:
      "I would highly recommend Adilay Roofing. Excellent communication from beginning to end of the job. Pictures taken at the start during and after completion of the job.",
    highlight: "Excellent communication from beginning to end of the job.",
    photo: "https://lh3.googleusercontent.com/a/ACg8ocLo10j1rKKouMvaoIVETerM9Cmx4XytfCRNbrQX9n74jrogEA=s128-c0x00000000-cc-rp-mo",
  },
  {
    date: "2026-09-01",
    stars: 5,
    name: "Jessica R.D.",
    quote:
      "Adilay Roofing was exceptional in our recent roof repair. We had years of wear and tear and then winter storms which did more damage. After a very responsive and efficient assessment of my roof, I received a detailed statement of work. I asked several questions which they answered each one, and then they were are able to start the work that same week. Their work was thorough and incredibly fast given the amount of work that was required. The team was professional and very amicable and respectful. Thank you to Nissim and the entire team. I highly recommend Adilay Roofing.",
    highlight: "Adilay Roofing was exceptional",
    photo: "https://lh3.googleusercontent.com/a/ACg8ocJeHPS5nhWq6-dNBoO5gC6l_kJTwnO7_Zg_VoXnqBOlVF27XA=s128-c0x00000000-cc-rp-mo",
  },
  {
    date: "2026-08-25",
    stars: 5,
    name: "Denise Mackey",
    quote:
      "My daughter had her roof replaced in Overbrook Park by Adilay Roofing. The customer service from Nissan was great. His proposal was clear and easy to understand. The price was reasonable to us. The workers arrived on schedule and the work was completed on the same day. We would recommend this company to our friends and family.",
    highlight: "The work was completed on the same day.",
    photo: "https://lh3.googleusercontent.com/a/ACg8ocLzKLVlg0-ypjEWf6VNkv8I9NYQy-vItS3UxIdzszs24CKFEA=s128-c0x00000000-cc-rp-mo",
  },
  {
    date: "2026-08-18",
    stars: 5,
    name: "Michael Illgas",
    quote:
      "Very responsive and did a really good job.",
    photo: "https://lh3.googleusercontent.com/a/ACg8ocKE8iAilS2NMHB9CqcM_sWKIg15bO95eLJ9VbEjetx1OsYf_g=s128-c0x00000000-cc-rp-mo",
  },
  {
    date: "2026-08-11",
    stars: 5,
    name: "MB",
    quote:
      "Adilay did a great job repairing my South Philly rowhome roof. It was a complex job with an intermittent leak and a roof deck and pilot house. Nissim and his team deconstructed my deck, applied a new membrane, and rebuilt the deck. I'm happy with the results. So far during a major downpour the leak hasn't recurred, and I'm hopeful it's fixed for good. Other roofers would not do this work end to end -- some wanted to deconstruct the deck but not rebuild it, others ghosted me. Adilay's prices were reasonable, they worked quickly with an attention to detail, and offered a solid warranty. They were communicative and courteous. I will try to update this review if the leak returns.",
    highlight: "Other roofers would not do this work end to end",
    photo: "https://lh3.googleusercontent.com/a/ACg8ocKShecCTdtT5QWEljHc0oTpLu1lrdR8rpevQQqxhMG1dVRp5w=s128-c0x00000000-cc-rp-mo",
  },
  {
    date: "2026-08-11",
    stars: 5,
    name: "Denna Martin",
    quote:
      "I can’t say enough great things about Adilay Roofing LLC… From the very beginning, the owner Nissim Erez, made me feel like I was dealing with someone who genuinely cared about helping me not someone who was simply trying to make money. He took the time to explain everything, answered all of my questions, and most importantly, eased my anxiety by putting my best interest first. His honesty, professionalism, and integrity truly stood out. In an industry where it can be difficult to know who you can trust, Adilay Roofing LLC gave me complete peace of mind. The quality of their work was excellent! The team was professional, and my roof looks amazing! If you’re looking for a roofing company in the Overbrook area that is honest, trustworthy, affordable, professional, and truly cares about its customers, I highly recommend Adilay Roofing LLC. They earned my trust and my highest recommendation!",
    highlight: "Adilay Roofing LLC gave me complete peace of mind.",
    photo: "https://lh3.googleusercontent.com/a/ACg8ocJKdjA_2q1c2O8J8fWCgncqs6N9lmAScsDnRDFxC1gcod03bg=s128-c0x00000000-cc-rp-mo",
    featured: true,
  },
  {
    date: "2026-08-02",
    stars: 5,
    name: "Mattan Orbach",
    quote:
      "Recently called Adilay Roofing to repair a leaking roof at my home in Bala Cynwyd and I couldn’t be happier with this experience. They were on time, honest, professional, and incredibly kind! Nissim, the owner, took the time to explain exactly what needed to be done to make my roof safe and keep it in excellent condition for many years. He genuinely cares about doing the job right. I highly recommend Adilay Roofing.",
    highlight: "He genuinely cares about doing the job right.",
    photo: "https://lh3.googleusercontent.com/a/ACg8ocJSlDGTwI-STGGOaZPU9ztK8uUU5LpaLOcdCDQU4LwwMDyp3w=s128-c0x00000000-cc-rp-mo",
    featured: true,
  },
  {
    date: "2026-07-28",
    stars: 5,
    name: "Adam Meisel",
    quote:
      "Called these guys after noticing an issue with my roof and honestly expected the usual runaround — quotes weeks out, endless scheduling. Nope. They had someone out and the whole thing fixed just a few days after my first call. Fast, professional, and no hassle. Would recommend to anyone who doesn’t want their roof problem dragging on. Five stars.",
    highlight: "Fast, professional, and no hassle.",
    photo: "https://lh3.googleusercontent.com/a-/ALV-UjVlcTbKxnpxb5NWEWXIUpX7PwUm9js4xthv26v73_wh4cP8ZGzQ=s128-c0x00000000-cc-rp-mo",
  },
  {
    date: "2026-07-19",
    stars: 5,
    name: "CGB",
    quote:
      "Nissim did a great job - he was quick, honest and fair with his pricing.  He’s now my go-to guy for anything related to roof issues.",
    highlight: "He’s now my go-to guy for anything related to roof issues.",
    photo: "https://lh3.googleusercontent.com/a/ACg8ocIvIFnLK_-yUwD_w67D-fxMpTMbvC1jrQG5XO0LxJiTLaMe1Q=s128-c0x00000000-cc-rp-mo",
  },
  {
    date: "2026-07-14",
    stars: 5,
    name: "Beverly Colquitt",
    quote:
      "As a single woman of color and home owner in Philadelphia, I have had my share of good and bad interactions with roofing companies. However Adilay has proven to be the BEST! When my roof began leaking @ 1 am in the morning ; I was horrified and immediately contacted Adilay and they responded. Within hours they arrived and stopped the leak and subsequently repaired the roof in two days.They kept me informed throughout the entire process addressing any questions/concerns that I had. They turned an emergency situation into a manageable one with ease. KUDOS TO ADILAY!",
    highlight: "Adilay has proven to be the BEST!",
    photo: "https://lh3.googleusercontent.com/a/ACg8ocKau8PeIsG5SWP-fMoopUq3IW3BGOFzi6JSMU7n4dE1X5Id9w=s128-c0x00000000-cc-rp-mo",
    featured: true,
  },
  {
    date: "2026-06-22",
    stars: 5,
    name: "Abby Houff",
    quote:
      "Nissim and his entire team were incredibly responsive and did great work on both the front of our house with window capping and on the roof of our house! We couldn't be more grateful for their hard work as we are first time homebuyers and they mentioned they do work in all of Philadelphia and surrounding areas of PA including Germantown! Thank you again to the team!",
    highlight: "Incredibly responsive and did great work",
    photo: "https://lh3.googleusercontent.com/a-/ALV-UjXQTfbWBEAbFwKaL4cOrffTlAWeHQhN4u58V1WaUnNn1K8w9manNQ=s128-c0x00000000-cc-rp-mo",
  },
  {
    date: "2026-05-22",
    stars: 5,
    name: "Ben Bristow",
    quote:
      "Great working with Adilay and will continue working with them. Honest and trustworthy, quick to get the job done, and they go above and beyond to do it right and do it well. They don't just get the work done, they make it look good!",
    highlight: "They don't just get the work done, they make it look good!",
    photo: "https://lh3.googleusercontent.com/a-/ALV-UjU1aSkhYTv9UQh7i-39CQzE2YRn1WAGKOKyjJ0FUP-MBu4L58im=s128-c0x00000000-cc-rp-mo",
  },
  {
    date: "2026-05-11",
    stars: 5,
    name: "Sugar Bear",
    quote:
      "I live in the Philadelphia area and I recently hired Adilay Roofing & Siding for a roof leak affecting the back bedroom of my home. They provided the most thorough assessment of the problem, clearly explained the cause of the leak, and offered a practical, well-thought-out solution. The crew arrived on time, completed the work within the promised schedule, and kept the area clean throughout the process. The repair and shingle replacement were done with care and attention to detail, and the results look great.",
    highlight: "The most thorough assessment of the problem",
    photo: "https://lh3.googleusercontent.com/a-/ALV-UjVy4wskMU6zqS0wbDgoZ4NF1A0v1-o51fc2GvgD2jhC92hzVO4=s128-c0x00000000-cc-rp-mo",
  },
  {
    date: "2026-04-12",
    stars: 5,
    name: "Paul Schumacher",
    quote:
      "High quality and professional. From estimate to completion, competent and knowledgeable helpful and considerate workers. Our roof top was re-conditioned (fiberglass, paint and stucco, and patched flooring replacement) better than new, and priced competitively or better-than others. Communication could improve, but even this does not impact the thoughtful quality of work this team provides.",
    highlight: "Better than new, and priced competitively",
    photo: "https://lh3.googleusercontent.com/a-/ALV-UjUelFCqPaNpU6ntxXRd1m5bPcWgCyMSxYl6aCMvGnBxCrjQXzVZ=s128-c0x00000000-cc-rp-mo",
  },
  {
    date: "2026-02-03",
    stars: 5,
    name: "Nick Maloy",
    quote:
      "Nisu and his team were very easy to work with. They took care of exactly what I was asking for — maintenance on the main flat roof and fixing faulty fiberglass on the deck. Adilay Roofing were very quick to respond and arrange a visit for the estimate, which was priced well and did not include things I didn't need. I would recommend Adilay Roofing for residential roofing!",
    highlight: "Priced well and did not include things I didn't need",
    photo: "https://lh3.googleusercontent.com/a/ACg8ocJ05dVLXOvxHJkSc8OHOEMVfInc4LMEnqDGsYSRsV4EmLhTKg=s128-c0x00000000-cc-rp-mo",
  },
  {
    date: "2025-12-03",
    stars: 5,
    name: "Gul Agha",
    quote:
      "Did a great job with the roof fantastic work I appreciate all the help. Would recommend for anyone else to also select their services! I'm very happy!",
    highlight: "Did a great job with the roof",
    photo: "https://lh3.googleusercontent.com/a/ACg8ocJ7H8L-CZvSsb4qDmqZC2Yr5TUx8mhktUSsvwsJB7ouGE0IFg=s128-c0x00000000-cc-rp-mo",
  },
  {
    date: "2025-11-03",
    stars: 5,
    name: "Cathy Williams",
    quote:
      "It's a delight to give a positive review. Nissim Erez, Owner is a professional, honest and easy to communicate with. His crew is skilled and gave a full day performance each day they worked. They completed each project with quality workmanship. I'm a satisfied customer and will refer Adilay company to my family, friends and neighbors.",
    highlight: "It's a delight to give a positive review.",
    photo: "https://lh3.googleusercontent.com/a/ACg8ocLaCjpO4MrJo9LTtnILIvxP76671_QuUgYLSRQ8wuoGFvUK2A=s128-c0x00000000-cc-rp-mo",
  },
  {
    date: "2025-09-03",
    stars: 5,
    name: "Donna Sirchio",
    quote:
      "Great guys, did an amazing job, gave me a fair price, stayed within promised quote. Even added some nice touches I wasn't expecting. I highly recommend Adilay!!",
    highlight: "Even added some nice touches I wasn't expecting.",
    photo: "https://lh3.googleusercontent.com/a/ACg8ocKpIZ_iUmUW2dbJafegHR6PGrFTQ0T1Lq8tq1f7iIHsaVZ3jA=s128-c0x00000000-cc-rp-mo",
  },
  {
    date: "2025-09-03",
    stars: 5,
    name: "Rob Lehr",
    quote:
      "This house had been plagued with roof leaks for years. I got a few quotes from different roofers all within budget. Adilay Roofing was the only one that left nothing to chance. Their experience showed first in their quote and then in their workmanship. They removed a leaking metal roof that was installed over cedar shingles probably 100 years ago. They installed plywood on the entire roof, ice barrier, underlayment and then a 50 year shingle, better than expected. They also reroofed two low slope roofs and the front porch roof, more than expected! The entire job was done in 2 days, everything cleaned up and in order. They even painted the terra cotta chimneys and replaced some downspouts on the gutters, these things were not in the quote and they did not charge for this work or the materials. They made sure everything was 100%. Everyone involved in this was truly professional and respectful. The end result… Better than expected!",
    highlight: "Adilay Roofing was the only one that left nothing to chance.",
    photo: "https://lh3.googleusercontent.com/a-/ALV-UjUJGd2MGXk2yMlMWAHycEcc-gQ6kZNrBOtsdARURcpkmAA4WVOt0w=s128-c0x00000000-cc-rp-mo",
    featured: true,
  },
  {
    date: "2025-09-03",
    stars: 5,
    name: "Cyrus Sirchio",
    quote:
      "Very professional company. Would recommend. Adilay just completed the roof on my parent's house. Flat torch down and shingled the A frame. They also threw in gutters and painted the chimneys along with installing very nice flashing. Showed up on time. Completed the job as scheduled. Very nice workers.",
    highlight: "Showed up on time. Completed the job as scheduled.",
    photo: "https://lh3.googleusercontent.com/a/ACg8ocJhj0vQYP-Ih0WqRv9FIaBuPaOfD1rIJ8lDijWHYeLfjq6nng=s128-c0x00000000-cc-rp-mo",
  },
  {
    date: "2025-08-03",
    stars: 5,
    name: "Ira Zeitlin",
    quote:
      "Excellent work. Great crew. I highly recommend them.",
    photo: "https://lh3.googleusercontent.com/a/ACg8ocIxlpEv-Jl1brRN8knCpn1zhbQhDCoAvwxUVobbudOXd2xYaQ=s128-c0x00000000-cc-rp-mo",
  },
  {
    date: "2025-07-03",
    stars: 5,
    name: "Lyonie Johnson",
    quote:
      "Adilay Roofing did an outstanding job on four roofs, siding and a back deck for us! From start to finish, they were professional, on time, and detail-oriented. The work was top-quality clean lines, solid materials, and everything was done right the first time. And the best part? Their price beat every other company I reached out to. We got multiple quotes, and Adilay came in with the most competitive rate without sacrificing quality. I truly appreciate their honesty, Expertise, and great customer service. If you're looking for roofing or deck work, Adilay Roofing is the one to call. Highly recommended!",
    highlight: "Their price beat every other company I reached out to.",
    photo: "https://lh3.googleusercontent.com/a/ACg8ocK2TspnEi_xO8bRC8ilVMs9zzpdlf3tQJ_Ukuay5EjFbiQd_A=s128-c0x00000000-cc-rp-mo",
    featured: true,
  },
  {
    date: "2025-07-02",
    stars: 5,
    name: "Mr CIMA",
    quote:
      "I recently had a flat roof installed on my property by a company owned by Nissan and Israel, and I'm pleased with how everything turned out. From the beginning, they were professional, easy to communicate with, and took the time to explain the process clearly. The quality of the workmanship is solid — everything looks neat, and the finish is clean. They were respectful of my property, worked efficiently, and completed the job in the timeframe they promised. What stood out most was how approachable and helpful Nissan and Israel were throughout. Any questions I had were answered without hesitation, and they made sure I was satisfied with the work before wrapping up. Overall, I'd recommend them to anyone looking for reliable and honest roofing professionals. A good experience, and I'm glad I chose them for the job.",
    highlight: "Reliable and honest roofing professionals",
    photo: "https://lh3.googleusercontent.com/a/ACg8ocKiG8heunxQSa9ETsUVqz4RXFRLfS-_taZglQSssY956vL0Nw=s128-c0x00000000-cc-rp-mo",
  },
  {
    date: "2025-07-01",
    stars: 5,
    name: "Nikki Talarico",
    quote:
      "Adilay roofing was highly recommended to us by a friend. We had a persistent major leak coming in from shoddy siding and roof work done by another contractor. They came out quickly to look at the issue, sent a professional and detailed proposal with clear scope of work and costs, and were attentive to our questions and to schedule. They were extremely thorough and professional through the whole process, bringing all of the tools and materials needed to complete the job. We are happy to say we no longer have a leak, and will continue to use them for any additional roofing or siding needs! Thank you!",
    highlight: "We are happy to say we no longer have a leak",
    photo: "https://lh3.googleusercontent.com/a-/ALV-UjXhScM6PhYuAUfNEKLemIsROXgAQQfLH8zgNwurzeTZq8REwiqx=s128-c0x00000000-cc-rp-mo",
  },
  {
    date: "2025-06-30",
    stars: 5,
    name: "Matthew Kollar",
    quote:
      "Outstanding. I'd highly recommend Adilay Roofing to anyone in need of roofing services. From communication to pricing to execution, everything was flawless. The entire team was professional and went above and beyond to deliver quality at a fair price. The team was unbelievably punctual to boot and completed the job within 48 hours of my issue arising. A+. Highly Recommend!",
    highlight: "From communication to pricing to execution, everything was flawless.",
    photo: "https://lh3.googleusercontent.com/a-/ALV-UjWhoonylgDuGE2JicFiZE-dgskL2O9i0-tNJwYWcbWCoCthBfy0tg=s128-c0x00000000-cc-rp-mo",
    featured: true,
  },
  {
    date: "2025-06-29",
    stars: 5,
    name: "13serez",
    quote:
      "I recently had the pleasure of working with Nissim and his team at Adilay Roofing for some roofing repairs, and I couldn't be happier with the results! From the initial consultation to the final inspection, the entire process was smooth and professional. Nissim took the time to explain the necessary repairs and provided a detailed estimate, ensuring I understood every step. The crew was punctual, respectful of my property, and worked diligently to complete the job on time. Their attention to detail and commitment to quality workmanship truly set them apart. Not only does my roof look fantastic, but I also feel confident knowing it's been repaired to last. I highly recommend Adilay Roofing for anyone in need of roofing services. Thank you, Nissim for your outstanding work!",
    highlight: "I couldn't be happier with the results!",
    photo: "https://lh3.googleusercontent.com/a/ACg8ocIHRYn1xQ_kb0JEHGPUP5gfXBZnaIeblgpVO4AExCOGTd8fKQ=s128-c0x00000000-cc-rp-mo",
  },
  {
    date: "2025-06-28",
    stars: 5,
    name: "Tina Quinones",
    quote:
      "Very honest, reliable with competitive pricing. The guys are very friendly. I totally recommend this company.",
    highlight: "Very honest, reliable with competitive pricing.",
    photo: "https://lh3.googleusercontent.com/a/ACg8ocKI88o5PjxQ7NXPvE9U13cRXCeVcZY-1gVNRZK1an0zc0BzJg=s128-c0x00000000-cc-rp-mo",
  },
  {
    date: "2025-06-27",
    stars: 5,
    name: "Yoni Nitzan",
    quote:
      "I used Adilay Roofing for my house. They did a very good job. The service was excellent!!! Highly recommended.",
    highlight: "The service was excellent!!!",
    photo: "https://lh3.googleusercontent.com/a-/ALV-UjXHxBx76Pz3_II_Kr6KOxfQ5Pg9I-iKyn4Ch2SJ0FzEJYjvGszg=s128-c0x00000000-cc-rp-mo",
  },
  {
    date: "2025-06-26",
    stars: 5,
    name: "Zion C",
    quote:
      "Nissan was very polite and knowledgeable about what he's doing. He was present the entire time and was able to answer any question or concern we had. I really appreciate his hard work and flexibility with our request. This is how a business should be and I would thank him by referral and recommend this business.",
    highlight: "This is how a business should be",
    photo: "https://lh3.googleusercontent.com/a-/ALV-UjW8Si3B0NBc-SH_Zqho3FW7UdweuPb9eW97M_iNJDHxSusJEvQ=s128-c0x00000000-cc-rp-mo",
  },
  {
    date: "2025-06-25",
    stars: 5,
    name: "Richard",
    quote:
      "We had a wonderful experience with Adilay Roofing LLC. Their word was word. Started on time. Finished on time. And guess what they even threw in some freebies which of course made us happy. We recommend them very highly.",
    highlight: "Their word was word.",
    photo: "https://lh3.googleusercontent.com/a/ACg8ocKHAxX0X4ScDGwe48tfHxjVASZXVkMVt1mQrufUElJohaTPrw=s128-c0x00000000-cc-rp-mo",
  },
  {
    date: "2025-06-24",
    stars: 5,
    name: "Guy Assaf",
    quote:
      "Amazing service, will definitely use them again in the future.",
    photo: "https://lh3.googleusercontent.com/a/ACg8ocKcM91R2qfED4cO-0hUzkOttWrQj8FvP63yPR44uM6Mw527yQ=s128-c0x00000000-cc-rp-mo",
  },
  {
    date: "2025-06-23",
    stars: 5,
    name: "Anat Aslati",
    quote:
      "I received professional and reliable service, highly recommend.",
    photo: "https://lh3.googleusercontent.com/a/ACg8ocIjfGKN2zrF9M4earVAchTBRJkp92t6hTG0nCSRYVXujacVfg=s128-c0x00000000-cc-rp-mo",
  },
  {
    date: "2025-06-22",
    stars: 5,
    name: "Tal B.",
    quote:
      "Did an amazing job with everything. The estimate and how he explained the work, the installation and clean up after work was done. Good customer service.",
    highlight: "Did an amazing job with everything.",
    photo: "https://lh3.googleusercontent.com/a-/ALV-UjWAPDaiRmzSlEx1bsMcetuo8O7wOSC0NZw2zAoFRJ6ze_NzMGgB=s128-c0x00000000-cc-rp-mo",
  },
  {
    date: "2025-06-21",
    stars: 5,
    name: "Mikhal Sarfaty",
    quote:
      "Highly recommend! Fast service, great customer service and excellent work done.",
    photo: "https://lh3.googleusercontent.com/a/ACg8ocLlq2X-MI_uM6ynkr_2XDviuXKeELIWI2qjR5gGfCMjhe3F5g=s128-c0x00000000-cc-rp-mo",
  },
  {
    date: "2025-06-20",
    stars: 5,
    name: "Maya Peer",
    quote:
      "Company is very reliable!! Great service, quick response. Would use again.",
    photo: "https://lh3.googleusercontent.com/a/ACg8ocIc94d1soLDNAq8hvZnNvU8l0Wnu2gC8znEmGRaTkwRKt2nbA=s128-c0x00000000-cc-rp-mo",
  },
  {
    date: "2025-06-19",
    stars: 5,
    name: "Philadelphia Housing Connection",
    quote:
      "I called Adilay Roofing to repair my leaking roof. They came on time and were honest and kind. I am so happy that it was repaired before the weather got worse. No more leaks and now I can sleep without worries. I strongly recommend Adilay Roofing to all my family and friends.",
    highlight: "No more leaks and now I can sleep without worries.",
    photo: "https://lh3.googleusercontent.com/a/ACg8ocI9oSeGbMhjhM44FTp5E6oGx39tvp7Hai9Ix4-OJITKdkdC8w=s128-c0x00000000-cc-rp-mo",
  },
  {
    date: "2025-06-18",
    stars: 5,
    name: "Joel Saez",
    quote:
      "This is good people, hard workers and they completed the job on time. Real organized and good housekeeping. They do a perfect job. I recommend!",
    highlight: "They do a perfect job.",
    photo: "https://lh3.googleusercontent.com/a/ACg8ocKmZnWnemeENuXW5hTNlZ_srH1Elo-fbZQjsSDxihAiehonrvFQ=s128-c0x00000000-cc-rp-mo",
  },
  {
    date: "2025-06-17",
    stars: 5,
    name: "Carmen Diaz-Alers",
    quote:
      "I would like to highly recommend Adilay Roofing for any home improvement needs. I would rate their work a 10 out of 10. Adilay Roofing completed renovations in our dining room and bathroom with exceptional skills and professionalism. In our dining room he installed raw floors, painted the space, and set up our lighting fixtures, all of which resulted in a phenomenal transformation. He is consistently punctual, eager to complete the work, and demonstrates a high level of craftsmanship. In our bathroom remodel, they efficiently gutted the space and every detail was incredibly beautiful and flawlessly installed all the new fixtures. Overall, Adilay Roofing are outstanding professionals who exceeded our expectations in every way, and I would highly recommend them to anyone seeking quality, reliable home improvement services.",
    highlight: "I would rate their work a 10 out of 10.",
    photo: "https://lh3.googleusercontent.com/a-/ALV-UjVo1n_ev2uh8DJoBcJoF8lIVg-DKCrKyPYRLAKSpO6FHJXGTWIy=s128-c0x00000000-cc-rp-mo",
  },
  {
    date: "2025-06-16",
    stars: 5,
    name: "Nelson Perez",
    quote:
      "I want to express my sincere gratitude to Adilay Roofing for the excellent roofing work they performed on my home. From the first contact, their professionalism, dedication, and attention to detail were evident. Israel proved to be a tireless worker, committed to quality, and providing an exceptional level of customer service. The work was carried out impeccably, meeting the highest industry standards. From the initial assessment to the completion of the project, Israel demonstrated in-depth knowledge and experience in roofing, ensuring a long-lasting, high-quality result. Furthermore, their communication was clear and consistent, providing complete transparency at every stage of the process. I recommend Israel's roofing business to anyone who needs quality services, performed with professionalism and responsibility. For all the above, I give your company a well-deserved 5-star rating. Thank you, Adilay Roofing, for an outstanding job!",
    highlight: "Their communication was clear and consistent",
    photo: "https://lh3.googleusercontent.com/a/ACg8ocILfXlQ3vdfFGVfb8Y303yELEpSUAlQLgPVZ16uEyUYtzq0ug=s128-c0x00000000-cc-rp-mo",
  },
  {
    date: "2025-06-15",
    stars: 5,
    name: "Erica Delahoy",
    quote:
      "I called Adilay Roofing to repair my roof. They came quickly to give me my quote. Once I got their quote, and approved it (they gave a great price), they got to work quickly. Everything was done very well and precisely and the workers were very kind and professional. I highly recommend them to anyone looking for roof repairs!",
    highlight: "Everything was done very well and precisely",
    photo: "https://lh3.googleusercontent.com/a/ACg8ocKfZytf8hsQBRQ1h4qZ-FHE2Ujs0Na4G2xXgg-XuRBhzvXQAg=s128-c0x00000000-cc-rp-mo",
  },
  {
    date: "2025-06-14",
    stars: 5,
    name: "S Monge",
    quote:
      "Adilay Roofing gave a great price to fix my roof. They were professional and explained what the procedure required with no hidden fees or cutting corners. I will definitely recommend to my friends and family.",
    highlight: "No hidden fees or cutting corners",
    photo: "https://lh3.googleusercontent.com/a-/ALV-UjV7WAD76bhqAmLPPPv6eY6LLt4lJMWTxzr5MGGNq1-oBp2kQHq7=s128-c0x00000000-cc-rp-mo",
  },
  {
    date: "2025-06-13",
    stars: 5,
    name: "Shay Hazan",
    quote:
      "I would like to say that this is the best contractor I ever worked with. Everything that was promised was on time. They didn't miss a day. My roof looks so good right now. Ready for the winter!",
    highlight: "The best contractor I ever worked with",
    photo: "https://lh3.googleusercontent.com/a/ACg8ocIvQ4AIHRY0Xe9cP6_vK06kuDIAcUEtqepPzEApp5CbM7I2Bg=s128-c0x00000000-cc-rp-mo",
  },
  {
    date: "2025-06-12",
    stars: 5,
    name: "Noah Orbach",
    quote:
      "I had amazing experience from start to finish. They really went above and beyond to ensure my roofing needs were met. Will definitely recommend them to friends and family. Thank you for such a wonderful experience.",
    highlight: "They really went above and beyond",
    photo: "https://lh3.googleusercontent.com/a/ACg8ocL1nA5Zx8--wnrad__nu8tMMMJunOFkFWH_aSmhpuAD9-ZS4Q=s128-c0x00000000-cc-rp-mo",
  },
  {
    date: "2025-06-11",
    stars: 5,
    name: "Mike Wolberg",
    quote:
      "Adilay Roofing — I had a great experience with amazing service & job. Professionals, top of the line!!",
    highlight: "Professionals, top of the line!!",
  },
  {
    date: "2025-06-10",
    stars: 5,
    name: "Ben Chordekar",
    quote:
      "Professional team. Did great job. Thank you.",
    photo: "https://lh3.googleusercontent.com/a-/ALV-UjV5Te7mQjH8Zy8-KfjkeZwrsQ-BpsUV-KTB6e9AFl4DpM4_U1I17A=s128-c0x00000000-cc-rp-mo",
  },
  {
    date: "2025-06-09",
    stars: 5,
    name: "Tom Weber",
    quote:
      "I chose Adilay Roofing from all the other companies because they gave me a good price. They came on time and were very professional.",
    highlight: "They came on time and were very professional.",
    photo: "https://lh3.googleusercontent.com/a-/ALV-UjUcgQzBw46jBSFpfBw7Ocw520eOD892YH3YhXG7TuodcgZRTDVEAQ=s128-c0x00000000-cc-rp-mo",
  },
  {
    date: "2025-06-08",
    stars: 5,
    name: "Shy Peled",
    quote:
      "Great service! Amazing price! Will definitely use again in the future.",
    photo: "https://lh3.googleusercontent.com/a-/ALV-UjXNU8HjerC4Bd3V9cdajiD9TXa6IDKlf-zPtG5Z4N7Z_GRZ7BMS=s128-c0x00000000-cc-rp-mo",
  },
  {
    date: "2025-06-07",
    stars: 5,
    name: "Moshe Weiner",
    quote:
      "The best company out there. We had great experience with three properties.",
    photo: "https://lh3.googleusercontent.com/a/ACg8ocKGOeJaxVOzUK-vftDnAD53aEwoLLa6_Qb2KFdBehBVAm1mIw=s128-c0x00000000-cc-rp-mo",
  },
  {
    date: "2025-06-06",
    stars: 5,
    name: "Yafit Abermen",
    quote:
      "Thank you Adilay Roofing for great professional job on my roof. Fair price, highly recommended.",
    highlight: "Fair price, highly recommended.",
    photo: "https://lh3.googleusercontent.com/a/ACg8ocL5QTgEdy_f-fUXMUQ2BSJd0woH3_szm1QzE_ovJRwV69eM1w=s128-c0x00000000-cc-rp-mo",
  },
  {
    date: "2025-06-05",
    stars: 5,
    name: "Juan Claudio",
    quote:
      "Adilay Roofing was very professional. They gave me the best price for my roof and I will definitely recommend them to all my relatives.",
    highlight: "They gave me the best price for my roof",
    photo: "https://lh3.googleusercontent.com/a/ACg8ocKJunOyRVQRXcn6RymfH8xYqv4SM2-Kf6r0rBCgcMY01LiMfyI=s128-c0x00000000-cc-rp-mo",
  },
  {
    date: "2025-06-04",
    stars: 5,
    name: "Alex Molinski",
    quote:
      "I've had a pleasure working with Adilay Roofing. This is a very professional, honest and reliable crew. I would highly recommend them!!",
    highlight: "A very professional, honest and reliable crew",
    photo: "https://lh3.googleusercontent.com/a-/ALV-UjURcPqbetO3clJX_e9k5icSIG8yOiXJrIyDwpQ5j0VpBawxMf21=s128-c0x00000000-cc-rp-mo",
  },
  {
    date: "2025-06-03",
    stars: 5,
    name: "Eliran Azaria",
    quote:
      "Excellent Company! Very professional team. A friend of ours highly recommended them to us and we are so pleased with our new roof. The roofers were on time and did a fantastic job. The job was complete in one day. I would recommend the company to family and friends when they need a new roof. I received several quotes and this company beat every quote.",
    highlight: "The job was complete in one day.",
    photo: "https://lh3.googleusercontent.com/a/ACg8ocK2m5NQbBxuRI8rbBiP7PvjskxFP05TricTGMKUg_tKKfH2vA=s128-c0x00000000-cc-rp-mo",
  },
  {
    date: "2025-06-02",
    stars: 5,
    name: "Avi Biton",
    quote:
      "Highly recommend! Did my office roof and the results are amazing.",
    photo: "https://lh3.googleusercontent.com/a-/ALV-UjVdQQmxEjhEPmUAeiRanbB5wIY0G9KWobddjYc3RZvDFLySUHQv8w=s128-c0x00000000-cc-rp-mo",
  },
  {
    date: "2025-06-01",
    stars: 5,
    name: "Or Aharon",
    quote:
      "Best in the business! Highly recommend!",
    photo: "https://lh3.googleusercontent.com/a-/ALV-UjXHW_cRMZh9sAXm9LDDt1pBcWf2ljf0XcwfgJsfzVefLgX_QT_y5A=s128-c0x00000000-cc-rp-mo",
  },
  {
    date: "2025-05-31",
    stars: 5,
    name: "Kfir Nissim",
    quote:
      "Great job and price!",
    photo: "https://lh3.googleusercontent.com/a-/ALV-UjW4j5GoAcwQJsshFhK1Kf0K0aGHg_D3dzNjUqUf6BnMn0GuEade=s128-c0x00000000-cc-rp-mo",
  },
];

/** Google's aggregate numbers, used until the daily job has written fresh ones. */
export const fallbackReviewStats = { rating: 4.9, count: 61 };
