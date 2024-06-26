import { Carousel } from "@material-tailwind/react";

import FeaturedEventCard from "./FeaturedEventCard";

export default function FeaturedCarousel() {
  return (
    <Carousel
      className="w-full h-96 md:h-[540px] hidden md:flex overflow-hidden"
      prevArrow={() => {}}
      nextArrow={() => {}}
      autoplay
      autoplayDelay={5000}
      transition={{
        type: "spring",
        duration: 1,
      }}
      loop
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-6 sm:bottom-12 md:bottom-16 left-2/4 z-50 flex -translate-x-2/4 gap-2 bg-black px-3 py-1.5 rounded-xl">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-2 cursor-pointer rounded-full transition-all content-[''] ${
                activeIndex === i ? "w-2 bg-green-header" : "w-2 bg-gray-100"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >
      {/* eslint-disable-next-line no-unused-vars */}
      {Array.from({ length: 2 }).map((_) => (
        <FeaturedEventCard key={crypto.randomUUID()} />
      ))}
    </Carousel>
  );
}
