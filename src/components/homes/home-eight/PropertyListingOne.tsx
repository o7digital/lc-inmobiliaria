"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { buildDirectusAssetUrl, buildDirectusUrl, getDirectusBaseUrl } from "@/lib/directus";

type DirectusImageField =
  | string
  | {
      id?: string;
      directus_files_id?: string | { id?: string };
    }
  | {
      directus_files_id?: {
        id?: string;
      };
    }[]
  | null;

type DirectusProperty = {
  id: number | string;
  Title: string;
  Address?: string;
  Operation_type?: string[];
  Price?: number | string;
  Bedrooms?: number;
  Bathrooms?: number;
  Featured?: boolean;
  Image?: DirectusImageField;
  images?: Array<{
    directus_files_id: {
      id: string;
      filename_download: string;
      type: string;
    };
  }>;
};

type FeaturedProperty = {
  id: string;
  title: string;
  address: string;
  operation: string;
  priceLabel: string;
  bedrooms?: number;
  bathrooms?: number;
  imageUrl?: string;
};

const fallbackImage = "/assets/images/media/img_01.jpg";

const normalizeOperationLabel = (operation?: string) => {
  if (!operation) return "Venta / Renta";
  const normalized = operation.trim().toLowerCase();
  if (["sale", "venta"].includes(normalized)) return "Venta";
  if (["rent", "renta", "leasing"].includes(normalized)) return "Renta";
  return operation;
};

const formatPrice = (price?: number | string) => {
  if (typeof price === "number" && !Number.isNaN(price)) {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      maximumFractionDigits: 0,
    }).format(price);
  }

  if (typeof price === "string") {
    const numeric = Number(price);
    if (!Number.isNaN(numeric)) {
      return formatPrice(numeric);
    }
  }

  return "Consultar";
};

const extractFileId = (image?: DirectusImageField): string | null => {
  if (!image) return null;
  if (typeof image === "string") return image;

  if (Array.isArray(image)) {
    for (const item of image) {
      const candidate = extractFileId(item as DirectusImageField);
      if (candidate) return candidate;
    }
    return null;
  }

  if (typeof image === "object") {
    if (image.directus_files_id) {
      const file = image.directus_files_id;
      if (typeof file === "string") return file;
      if (typeof file?.id === "string") return file.id;
    }
    if (typeof image.id === "string") return image.id;
  }

  return null;
};

const mapDirectusProperty = (property: DirectusProperty): FeaturedProperty => {
  // Priorité : nouvelles images > ancien champ Image > fallback
  let imageUrl = fallbackImage;
  
  if (property.images && property.images.length > 0) {
    // Utiliser la première image du nouveau système
    const firstImage = property.images[0];
    if (firstImage?.directus_files_id?.id) {
      imageUrl = buildDirectusAssetUrl(firstImage.directus_files_id.id) || fallbackImage;
    }
  } else {
    // Fallback sur l'ancien système Image
    const fileId = extractFileId(property.Image);
    imageUrl = buildDirectusAssetUrl(fileId ?? undefined) || fallbackImage;
  }
  
  // Operation_type est un tableau, on prend le premier élément
  const operationType = Array.isArray(property.Operation_type) && property.Operation_type.length > 0 
    ? property.Operation_type[0] 
    : undefined;

  return {
    id: String(property.id),
    title: property.Title || "Propiedad sin título",
    address: property.Address || "Dirección no disponible",
    operation: normalizeOperationLabel(operationType),
    priceLabel: formatPrice(property.Price),
    bedrooms: property.Bedrooms,
    bathrooms: property.Bathrooms,
    imageUrl,
  };
};

const PropertyListingOne = () => {
  const [properties, setProperties] = useState<FeaturedProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const directusBaseUrl = useMemo(() => getDirectusBaseUrl(), []);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProperties = async () => {
      try {
        // Utiliser notre API Next.js qui gère l'authentification
        const response = await fetch('/api/directus/properties?featured=true&limit=6', { 
          signal: controller.signal 
        });
        
        if (!response.ok) {
          throw new Error(`Error API ${response.status}`);
        }

        const data = await response.json();
        const properties = Array.isArray(data) ? data : [];
        
        // Filtrer seulement les propriétés Featured=true
        const featuredProperties = properties.filter(prop => prop.Featured === true);
        
        setProperties(featuredProperties.map(mapDirectusProperty));
      } catch (fetchError: any) {
        if (fetchError.name === "AbortError") return;
        console.error("Error cargando propiedades:", fetchError);
        setError("No se pudieron cargar las propiedades destacadas.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();

    return () => controller.abort();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <p className="fs-20">Cargando propiedades...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-5">
        <p className="fs-20 text-danger">{error}</p>
      </div>
    );
  }

  if (!properties.length) {
    return (
      <div className="text-center py-5">
        <p className="fs-20">No hay propiedades destacadas aún.</p>
      </div>
    );
  }

  return (
    <div className="property-listing-one mt-170 xl-mt-120">
      <div className="container container-large">
        <div className="position-relative">
          <div className="title-one text-center mb-25 lg-mb-10 wow fadeInUp">
            <h3>Propiedades Destacadas</h3>
            <p className="fs-22 mt-xs">
              Explora las propiedades más atractivas en venta y renta.
            </p>
            <button 
              className="btn btn-outline-primary btn-sm mt-2" 
              onClick={() => window.location.reload()}
              title="Actualizar propiedades"
            >
              <i className="bi bi-arrow-clockwise me-1"></i>
              Sincronizar
            </button>
          </div>

          <div className="row gx-xxl-5">
            {properties.map((item) => (
              <div
                key={item.id}
                className="col-lg-4 col-md-6 mt-40 wow fadeInUp"
                data-wow-delay="0.1s"
              >
                <div className="listing-card-one shadow4 border-20 h-100 d-flex flex-column">
                  <div className="img-gallery p-15">
                    <div className="position-relative overflow-hidden">
                      <div className="tag border-20 fw-500">
                        {item.operation.toUpperCase()}
                      </div>
                      <div className="feature-tag bg-primary text-white fw-500 fs-13">
                        DESTACADA
                      </div>
                      <img 
                        src={item.imageUrl || fallbackImage}
                        alt={item.title}
                        className="w-100 rounded-4"
                        style={{ 
                          height: '230px', 
                          objectFit: 'cover',
                          display: 'block'
                        }}
                      />
                    </div>
                  </div>
                  <div className="property-info p-25 d-flex flex-column flex-grow-1">
                    <span className="title tran3s d-block" style={{ 
                      cursor: 'default',
                      height: '3.6em',
                      lineHeight: '1.4em',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      marginBottom: '8px'
                    }}>
                      {item.title}
                    </span>
                    <div className="address fs-15 mb-3" style={{ 
                      height: '3em',
                      lineHeight: '1.5em',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      <i className="bi bi-geo-alt me-1"></i>
                      {item.address}
                    </div>
                    <ul className="style-none feature d-flex align-items-center justify-content-between mt-auto pt-2">
                      <li className="d-flex align-items-center">
                        <i className="bi bi-house-door me-2 fs-20"></i>
                        <span className="fs-16">{item.bedrooms ?? "-"} rec</span>
                      </li>
                      <li className="d-flex align-items-center">
                        <i className="bi bi-droplet me-2 fs-20"></i>
                        <span className="fs-16">{item.bathrooms ?? "-"} baños</span>
                      </li>
                      <li>
                        <strong className="color-dark fw-500 fs-20">{item.priceLabel}</strong>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bloc 'Ver todas las propiedades' supprimé à la demande */}
        </div>
      </div>
    </div>
  );
};

export default PropertyListingOne;
