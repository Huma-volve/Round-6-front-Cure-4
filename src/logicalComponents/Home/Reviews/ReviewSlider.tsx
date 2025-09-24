import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import reviewStarIcon from "../../../assets/icons/Star.svg";

// -------- Types --------
export interface Review {
  id: number;
  name: string;
  avatar: string;
  review: string;
}

interface ReviewSliderProps {
  reviews: Review[];
}

export default function ReviewSlider({ reviews }: ReviewSliderProps) {
  const [activeIndex, setActiveIndex] = useState<number>(
    Math.floor(reviews.length / 2)
  );
  const [spaceBetween, setSpaceBetween] = useState<number>(
    getResponsiveSpaceBetween()
  );
  const [avatarSize, setAvatarSize] = useState<{
    active: number;
    inactive: number;
  }>(getResponsiveAvatarSize());

  function getResponsiveSpaceBetween(): number {
    const width = window.innerWidth;
    if (width < 500) return -70;
    if (width < 768) return -50;
    if (width < 1024) return -30;
    return -10;
  }

  function getResponsiveAvatarSize(): { active: number; inactive: number } {
    const width = window.innerWidth;
    if (width < 500) return { active: 100, inactive: 80 };
    if (width < 768) return { active: 110, inactive: 90 };
    return { active: 150, inactive: 130 };
  }

  useEffect(() => {
    const handleResize = () => {
      setSpaceBetween(getResponsiveSpaceBetween());
      setAvatarSize(getResponsiveAvatarSize());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Swiper
      effect="coverflow"
      initialSlide={activeIndex}
      grabCursor
      centeredSlides
      slidesPerView="auto"
      onSlideChange={(swiper: SwiperType) => setActiveIndex(swiper.realIndex)}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2.5,
        slideShadows: false,
      }}
      modules={[EffectCoverflow]}
      className="w-full max-w-3xl"
    >
      {reviews.map((review, index) => {
        const distance = Math.abs(activeIndex - index);
        const translateY = distance * 26;
        const scale = index === activeIndex ? 1 : 0.9;
        const zIndex = 100 - distance;
        const isActive = index === activeIndex;

        return (
          <SwiperSlide key={review.id} className="w-48">
            <div
              className="flex flex-col items-center justify-center transition-all duration-300 pb-4"
              style={{
                transform: `translateY(${translateY}px) scale(${scale})`,
                zIndex,
              }}
            >
              {/* Stars appear only for the active slide */}
              <div
                className={`flex justify-center mb-3 transition-opacity duration-300 ${
                  isActive ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
              >
                {[...Array(5)].map((_, i) => (
                  <img
                    loading="lazy"
                    key={i}
                    src={reviewStarIcon}
                    alt="Review Star"
                    className="w-5 h-5 mx-0.5"
                  />
                ))}
              </div>
              <blockquote
                className={`text-sm px-2 text-gray-700 mb-4 min-h-[60px] transition-opacity duration-2000 ${
                  isActive ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
              >
                &ldquo;{review.review}&rdquo;
              </blockquote>
              <img
                loading="lazy"
                src={review.avatar}
                alt={review.name}
                className="rounded-full object-cover border-4 border-white shadow-md transition-all duration-2000"
                style={{
                  width: isActive
                    ? `${avatarSize.active}px`
                    : `${avatarSize.inactive}px`,
                  height: isActive
                    ? `${avatarSize.active}px`
                    : `${avatarSize.inactive}px`,
                }}
              />
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
