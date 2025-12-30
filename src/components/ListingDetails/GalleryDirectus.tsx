"use client";
import React, { useState } from "react";
import { buildDirectusAssetUrl } from "@/lib/directus";

interface GalleryDirectusProps {
  images: Array<{ directus_files_id: { id: string; filename_download?: string } }>;
}

const getDirectusImageUrl = (id: string) =>
  buildDirectusAssetUrl(id, 900, 600);

const GalleryDirectus: React.FC<GalleryDirectusProps> = ({ images }) => {
  const [selected, setSelected] = useState(0);
  if (!images || images.length === 0) return null;

  return (
    <div className="mb-4">
      <div className="text-center mb-3">
        <img
          src={getDirectusImageUrl(images[selected].directus_files_id.id)}
          alt={images[selected].directus_files_id.filename_download || `photo-${selected+1}`}
          className="img-fluid rounded shadow"
          style={{ maxHeight: 420, objectFit: "cover" }}
        />
      </div>
      <div className="d-flex flex-wrap gap-2 justify-content-center">
        {images.map((img, i) => (
          <img
            key={img.directus_files_id.id}
            src={getDirectusImageUrl(img.directus_files_id.id)}
            alt={img.directus_files_id.filename_download || `thumb-${i+1}`}
            className={`rounded border ${i === selected ? "border-primary" : "border-light"}`}
            style={{ width: 90, height: 60, objectFit: "cover", cursor: "pointer" }}
            onClick={() => setSelected(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default GalleryDirectus;
