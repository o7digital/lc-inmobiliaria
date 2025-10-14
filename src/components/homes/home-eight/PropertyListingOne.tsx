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
                <div className="listing-card-four overflow-hidden d-flex align-items-end position-relative z-1">
                  <div className="property-image-container">
                    <div
                      className="bg-img"
                      style={{
                        backgroundImage: `url(${item.imageUrl || fallbackImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        height: "380px",
                        width: "100%",
                      }}
                    />
                  </div>

                  <div className="property-info tran3s w-100 p-20 bg-white position-absolute bottom-0">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="pe-3">
                        <h4 className="title fw-500 tran4s">{item.title}</h4>
                        <div className="address tran4s">{item.address}</div>
                      </div>
                      <span className="btn-four inverse disabled">
                        <span>Ver más</span>{" "}
                        <i className="bi bi-arrow-up-right" />
                      </span>
                    </div>

                    <ul className="style-none feature d-flex flex-wrap align-items-center justify-content-between mt-3">
                      <li>
                        <strong className="color-dark fw-500">
                          {item.bedrooms ?? "-"}
                        </strong>
                        <span className="fs-16">Recámaras</span>
                      </li>
                      <li>
                        <strong className="color-dark fw-500">
                          {item.bathrooms ?? "-"}
                        </strong>
                        <span className="fs-16">Baños</span>
                      </li>
                      <li>
                        <strong className="color-dark fw-500">{item.priceLabel}</strong>
                        <span className="fs-16">{item.operation}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-100 md-mt-60">
            <Link href="/listing_06" className="btn-eight">
              <span>Ver todas las propiedades</span>{" "}
              <i className="bi bi-arrow-up-right"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyListingOne;
