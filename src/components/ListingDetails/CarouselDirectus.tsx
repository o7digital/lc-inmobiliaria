"use client";
import React from "react";
import Slider from "react-slick";
import { buildDirectusAssetUrl } from "@/lib/directus";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface CarouselDirectusProps {
  images: Array<{ directus_files_id: { id: string; filename_download?: string } }>;
}

const CarouselDirectus: React.FC<CarouselDirectusProps> = ({ images }) => {
  if (!images || images.length === 0) return null;

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  } as const;

  return (
    <div className="mb-4">
      <Slider {...settings}>
        {images.map((img, i) => {
          const id = img?.directus_files_id?.id;
          const alt = img?.directus_files_id?.filename_download || `photo-${i + 1}`;
          const src = id ? buildDirectusAssetUrl(id, 1200, 800) : "";
          return (
            <div key={id || i}>
              <img
                src={src}
                alt={alt}
                className="img-fluid rounded shadow"
                style={{ width: "100%", maxHeight: 520, objectFit: "cover" }}
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default CarouselDirectus;
