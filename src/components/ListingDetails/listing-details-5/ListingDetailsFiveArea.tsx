"use client"

import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import HeaderTwo from "@/layouts/headers/HeaderTwo"
import FooterThree from "@/layouts/footers/FooterThree"
import { DirectusProperty } from "@/services/directusService"
import { buildDirectusAssetUrl } from "@/lib/directus"
import { SiteLocale, localeNumberFormatMap } from "@/types/siteLocale";

type GalleryItem = { url: string; alt?: string | null }

const priceOnRequestMap: Record<SiteLocale, string> = {
  es: "Precio a consultar",
  en: "Price upon request",
  fr: "Prix sur demande",
  it: "Prezzo su richiesta",
  de: "Preis auf Anfrage",
};

const operationLabelMap: Record<SiteLocale, { sale: string; rent: string }> = {
  es: { sale: "EN VENTA", rent: "EN RENTA" },
  en: { sale: "FOR SALE", rent: "FOR RENT" },
  fr: { sale: "A VENDRE", rent: "A LOUER" },
  it: { sale: "IN VENDITA", rent: "IN AFFITTO" },
  de: { sale: "ZU VERKAUFEN", rent: "ZU MIETEN" },
};

const formatPrice = (price?: number | string, currency?: string[], locale: SiteLocale = "es") => {
  if (price === undefined || price === null) {
    return priceOnRequestMap[locale]
  }
  const num = typeof price === "string" ? Number(price) : price
  const curr = currency && currency.length ? currency[0] : "MXN"
  const numberLocale = localeNumberFormatMap[locale]
  return new Intl.NumberFormat(numberLocale, { style: "currency", currency: curr, maximumFractionDigits: 0 }).format(num)
}

const formatOperationLabel = (operation: string | undefined, locale: SiteLocale = "es") => {
  if (!operation) return operationLabelMap[locale].sale
  const normalized = operation
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim()

  if (["venta", "sale", "sell", "comprar", "buy"].includes(normalized)) {
    return operationLabelMap[locale].sale
  }
  if (["renta", "rent", "alquiler", "lease", "leasing"].includes(normalized)) {
    return operationLabelMap[locale].rent
  }
  return operation
}

const getGallery = (property: DirectusProperty): GalleryItem[] => {
  const urls: GalleryItem[] = []
  const anyProp = property as any
  const imageField = anyProp.Image || anyProp.mainImage
  if (imageField) {
    const img = imageField as any
    if (typeof img === "string") urls.push({ url: img })
    else if (img.directus_files_id?.id) urls.push({ url: buildDirectusAssetUrl(img.directus_files_id.id) || img.directus_files_id.id })
  }
  const galleryArr = anyProp.images || anyProp.gallery || anyProp.Gallery
  if (Array.isArray(galleryArr)) {
    galleryArr.forEach((img: any) => {
      const id = img?.directus_files_id?.id
      if (id) urls.push({ url: buildDirectusAssetUrl(id) || id })
    })
  }
  return urls.filter((g) => g.url)
}

const ListingDetailsFiveArea = ({ locale = "es" }: { locale?: SiteLocale }) => {
  const labelsMap: Record<SiteLocale, {
    loadingProperty: string;
    couldNotLoad: string;
    property: string;
    area: string;
    beds: string;
    baths: string;
    parking: string;
    description: string;
    amenities: string;
    contact: string;
    gallery: string;
  }> = {
    es: {
      loadingProperty: "Cargando propiedad...",
      couldNotLoad: "No se pudo cargar",
      property: "Propiedad",
      area: "Area",
      beds: "Recamaras",
      baths: "Banos",
      parking: "Estacionamiento",
      description: "Descripción",
      amenities: "Amenidades",
      contact: "Contacto",
      gallery: "Galería",
    },
    en: {
      loadingProperty: "Loading property...",
      couldNotLoad: "Could not load property",
      property: "Property",
      area: "Area",
      beds: "Beds",
      baths: "Baths",
      parking: "Parking",
      description: "Description",
      amenities: "Amenities",
      contact: "Contact",
      gallery: "Gallery",
    },
    fr: {
      loadingProperty: "Chargement de la propriete...",
      couldNotLoad: "Impossible de charger la propriete",
      property: "Propriete",
      area: "Surface",
      beds: "Chambres",
      baths: "Salles de bain",
      parking: "Parking",
      description: "Description",
      amenities: "Equipements",
      contact: "Contact",
      gallery: "Galerie",
    },
    it: {
      loadingProperty: "Caricamento immobile...",
      couldNotLoad: "Impossibile caricare l'immobile",
      property: "Immobile",
      area: "Area",
      beds: "Camere",
      baths: "Bagni",
      parking: "Parcheggio",
      description: "Descrizione",
      amenities: "Servizi",
      contact: "Contatto",
      gallery: "Galleria",
    },
    de: {
      loadingProperty: "Immobilie wird geladen...",
      couldNotLoad: "Immobilie konnte nicht geladen werden",
      property: "Immobilie",
      area: "Flaeche",
      beds: "Schlafzimmer",
      baths: "Badezimmer",
      parking: "Parken",
      description: "Beschreibung",
      amenities: "Ausstattung",
      contact: "Kontakt",
      gallery: "Galerie",
    },
  };
  const labels = labelsMap[locale];
  const search = useSearchParams()
  const slug = search?.get("slug") || undefined
  const idParam = search?.get("id") || undefined
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [property, setProperty] = useState<DirectusProperty | null>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!slug && !idParam) return
    const load = async () => {
      try {
        setLoading(true)
        setError(null)
        setProperty(null)
        const query = new URLSearchParams()
        if (slug) query.set("slug", slug)
        if (idParam) query.set("id", idParam)
        const res = await fetch(`/api/directus/properties?${query.toString()}`)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        setProperty(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido")
        setProperty(null)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [slug, idParam])

  const gallery = useMemo(() => (property ? getGallery(property) : []), [property])
  const mainImage = gallery[0]?.url || "/assets/images/listing/img_large_07.jpg"
  const openLightbox = (idx: number) => {
    setActiveIndex(idx)
    setLightboxOpen(true)
  }
  const closeLightbox = () => setLightboxOpen(false)
  const nextImage = () => setActiveIndex((prev) => (gallery.length ? (prev + 1) % gallery.length : prev))
  const prevImage = () => setActiveIndex((prev) => (gallery.length ? (prev - 1 + gallery.length) % gallery.length : prev))

  return (
    <div className="main-page-wrapper" key={slug || idParam || "detalle"}>
      <HeaderTwo style_1={false} style_2={true} locale={locale} />

      <div className="listing-details-one theme-details-one mt-80 pb-120">
        <div className="container">
          {loading && (
            <p className="pt-80 text-center">
              {labels.loadingProperty}
            </p>
          )}
          {error && !loading && (
            <p className="pt-80 text-center text-danger">
              {`${labels.couldNotLoad}: ${error}`}
            </p>
          )}
          {!loading && !error && property && (
            <>
              <div className="mb-30">
                <div className="position-relative">
                  <Image
                    src={mainImage}
                    alt={property.Title || labels.property}
                    width={1400}
                    height={800}
                    className="w-100 rounded-4"
                    style={{ objectFit: "cover", maxHeight: 540, cursor: "zoom-in" }}
                    unoptimized
                    onClick={() => openLightbox(0)}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-xl-8">
                  <h1 className="mb-10">{property.Title}</h1>
                  <p className="fs-18 text-muted mb-20">{[property.Address, property.City, property.State, property.Country].filter(Boolean).join(", ")}</p>
                  <div className="d-flex flex-wrap align-items-center gap-4 mb-30">
                    <span className="badge bg-dark text-white px-3 py-2 text-uppercase">
                      {formatOperationLabel(property.Operation_type?.[0], locale)}
                    </span>
                    <strong className="fs-32">{formatPrice(property.Price, property.Currency, locale)}</strong>
                  </div>

                  <div className="property-feature-list position-relative z-2 mt-10 mb-40">
                    <div className="dark-bg ps-4 pe-4 pt-25 pb-25 rounded-4">
                      <div className="row text-white text-center gy-3">
                        <div className="col-6 col-md-3">
                          <div className="fs-14 text-white-50">{labels.area}</div>
                          <div className="fs-18 fw-500">{property.Construccion_area || "—"} m²</div>
                        </div>
                        <div className="col-6 col-md-3">
                          <div className="fs-14 text-white-50">{labels.beds}</div>
                          <div className="fs-18 fw-500">{property.Bedrooms ?? "—"}</div>
                        </div>
                        <div className="col-6 col-md-3">
                          <div className="fs-14 text-white-50">{labels.baths}</div>
                          <div className="fs-18 fw-500">{property.Bathrooms ?? "—"}</div>
                        </div>
                        <div className="col-6 col-md-3">
                          <div className="fs-14 text-white-50">{labels.parking}</div>
                          <div className="fs-18 fw-500">{property.Parking_spaces ?? "—"}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {property.Descripcion && (
                    <>
                      <h4 className="mb-15">{labels.description}</h4>
                      <p className="lh-lg mb-30">{property.Descripcion}</p>
                    </>
                  )}

                  {property.Amenidades && property.Amenidades.length > 0 && (
                    <>
                      <h4 className="mb-15">{labels.amenities}</h4>
                      <ul className="style-none d-flex flex-wrap gap-2">
                        {property.Amenidades.map((a, i) => (
                          <li key={i} className="badge bg-light text-dark border">{a}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>

                <div className="col-xl-4">
                  <div className="card border-0 shadow-sm rounded-4">
                    <div className="card-body">
                      <h5 className="mb-10">{labels.contact}</h5>
                      <p className="mb-2">Tel: +52 123 456 7890</p>
                      <p className="mb-0">Email: info@lc-inmobiliaria.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {lightboxOpen && gallery.length > 0 && (
        <div
          className="lightbox-overlay"
          onClick={closeLightbox}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.9)",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "1400px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 60px",
              boxSizing: "border-box",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={prevImage}
              style={{
                position: "absolute",
                left: 10,
                background: "rgba(0,0,0,0.6)",
                color: "#fff",
                border: "none",
                borderRadius: "50%",
                width: 48,
                height: 48,
                fontSize: 24,
                cursor: "pointer",
              }}
            >
              ‹
            </button>
            <Image
              src={gallery[activeIndex]?.url || mainImage}
              alt={property?.Title || labels.gallery}
              width={1400}
              height={900}
              unoptimized
              style={{ maxHeight: "80vh", width: "auto", height: "auto", objectFit: "contain" }}
            />
            <button
              onClick={nextImage}
              style={{
                position: "absolute",
                right: 10,
                background: "rgba(0,0,0,0.6)",
                color: "#fff",
                border: "none",
                borderRadius: "50%",
                width: 48,
                height: 48,
                fontSize: 24,
                cursor: "pointer",
              }}
            >
              ›
            </button>
            <button
              onClick={closeLightbox}
              style={{
                position: "absolute",
                top: 10,
                right: 60,
                background: "rgba(0,0,0,0.6)",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                padding: "10px 14px",
                fontSize: 16,
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </div>

          <div
            style={{
              display: "flex",
              gap: 8,
              padding: "6px 12px",
              background: "rgba(0,0,0,0.65)",
              borderRadius: 12,
              maxWidth: "92vw",
              overflowX: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {gallery.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setActiveIndex(idx)}
                style={{
                  width: 90,
                  height: 64,
                  borderRadius: 10,
                  overflow: "hidden",
                  border: idx === activeIndex ? "2px solid #fff" : "1px solid rgba(255,255,255,0.2)",
                  cursor: "pointer",
                  flex: "0 0 auto",
                }}
              >
                <Image
                  src={img.url}
                  alt={img.alt || property?.Title || "thumb"}
                  width={90}
                  height={64}
                  unoptimized
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <FooterThree locale={locale} />
    </div>
  )
}

export default ListingDetailsFiveArea
