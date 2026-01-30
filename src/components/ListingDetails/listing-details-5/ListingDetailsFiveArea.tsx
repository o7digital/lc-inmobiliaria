"use client"

import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import HeaderTwo from "@/layouts/headers/HeaderTwo"
import FooterThree from "@/layouts/footers/FooterThree"
import { DirectusProperty } from "@/services/directusService"
import { buildDirectusAssetUrl } from "@/lib/directus"

type GalleryItem = { url: string; alt?: string | null }

const formatPrice = (price?: number | string, currency?: string[]) => {
  if (price === undefined || price === null) return "Precio a consultar"
  const num = typeof price === "string" ? Number(price) : price
  const curr = currency && currency.length ? currency[0] : "MXN"
  return new Intl.NumberFormat("es-MX", { style: "currency", currency: curr, maximumFractionDigits: 0 }).format(num)
}

const getGallery = (property: DirectusProperty): GalleryItem[] => {
  const urls: GalleryItem[] = []
  if (property.Image) {
    const img = property.Image as any
    if (typeof img === "string") urls.push({ url: img })
    else if (img.directus_files_id?.id) urls.push({ url: buildDirectusAssetUrl(img.directus_files_id.id) || img.directus_files_id.id })
  }
  if (Array.isArray(property.images)) {
    property.images.forEach((img: any) => {
      const id = img?.directus_files_id?.id
      if (id) urls.push({ url: buildDirectusAssetUrl(id) || id })
    })
  }
  return urls.filter((g) => g.url)
}

const ListingDetailsFiveArea = () => {
  const search = useSearchParams()
  const slug = search.get("slug") || search.get("id")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [property, setProperty] = useState<DirectusProperty | null>(null)

  useEffect(() => {
    if (!slug) return
    const load = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch(`/api/directus/properties?slug=${encodeURIComponent(slug)}`)
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
  }, [slug])

  const gallery = useMemo(() => (property ? getGallery(property) : []), [property])
  const mainImage = gallery[0]?.url || "/assets/images/listing/img_large_07.jpg"

  return (
    <div className="main-page-wrapper">
      <HeaderTwo style_1={false} style_2={true} />

      <div className="listing-details-one theme-details-one mt-80 pb-120">
        <div className="container">
          {loading && <p className="pt-80 text-center">Cargando propiedad...</p>}
          {error && !loading && <p className="pt-80 text-center text-danger">No se pudo cargar: {error}</p>}
          {!loading && !error && property && (
            <>
              <div className="row g-3 mb-40">
                <div className="col-lg-8">
                  <div className="position-relative">
                    <Image src={mainImage} alt={property.Title || "Propiedad"} width={1200} height={800} className="w-100 rounded-4" style={{ objectFit: "cover", maxHeight: 520 }} unoptimized />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="row g-3">
                    {gallery.slice(1, 4).map((img, idx) => (
                      <div key={idx} className="col-12">
                        <Image src={img.url} alt={img.alt || property.Title || "Propiedad"} width={700} height={350} className="w-100 rounded-4" style={{ objectFit: "cover", height: 170 }} unoptimized />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-xl-8">
                  <h1 className="mb-10">{property.Title}</h1>
                  <p className="fs-18 text-muted mb-20">{[property.Address, property.City, property.State, property.Country].filter(Boolean).join(", ")}</p>
                  <div className="d-flex flex-wrap align-items-center gap-4 mb-30">
                    <span className="badge bg-dark text-white px-3 py-2 text-uppercase">{property.Operation_type?.[0] || "EN VENTA"}</span>
                    <strong className="fs-32">{formatPrice(property.Price, property.Currency)}</strong>
                  </div>

                  <div className="property-feature-list position-relative z-2 mt-10 mb-40">
                    <div className="dark-bg ps-4 pe-4 pt-25 pb-25 rounded-4">
                      <div className="row text-white text-center gy-3">
                        <div className="col-6 col-md-3">
                          <div className="fs-14 text-white-50">Area</div>
                          <div className="fs-18 fw-500">{property.Construccion_area || "—"} m²</div>
                        </div>
                        <div className="col-6 col-md-3">
                          <div className="fs-14 text-white-50">Beds</div>
                          <div className="fs-18 fw-500">{property.Bedrooms ?? "—"}</div>
                        </div>
                        <div className="col-6 col-md-3">
                          <div className="fs-14 text-white-50">Baths</div>
                          <div className="fs-18 fw-500">{property.Bathrooms ?? "—"}</div>
                        </div>
                        <div className="col-6 col-md-3">
                          <div className="fs-14 text-white-50">Parking</div>
                          <div className="fs-18 fw-500">{property.Parking_spaces ?? "—"}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {property.Descripcion && (
                    <>
                      <h4 className="mb-15">Descripción</h4>
                      <p className="lh-lg mb-30">{property.Descripcion}</p>
                    </>
                  )}

                  {property.Amenidades && property.Amenidades.length > 0 && (
                    <>
                      <h4 className="mb-15">Amenidades</h4>
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
                      <h5 className="mb-10">Contacto</h5>
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

      <FooterThree />
    </div>
  )
}

export default ListingDetailsFiveArea
