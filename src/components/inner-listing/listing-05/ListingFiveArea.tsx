"use client"

import { useEffect, useMemo, useState, ChangeEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import ReactPaginate from "react-paginate"
import NiceSelect from "@/ui/NiceSelect"
import UseShortedProperty from "@/hooks/useShortedProperty"
import DropdownOne from "@/components/search-dropdown/inner-dropdown/DropdownOne"
import { buildDirectusAssetUrl } from "@/lib/directus"

import icon from "@/assets/images/icon/icon_46.svg"
import featureIcon_1 from "@/assets/images/icon/icon_32.svg"
import featureIcon_2 from "@/assets/images/icon/icon_33.svg"
import featureIcon_3 from "@/assets/images/icon/icon_34.svg"

const ListingFiveArea = () => {
  const itemsPerPage = 6
  const page = "listing_2"

  // Dataset demo (fallback)
  const {
    handleBathroomChange,
    handleBedroomChange,
    handleSearchChange,
    handlePriceChange,
    maxPrice,
    priceValue,
    resetFilters,
    selectedAmenities,
    handleAmenityChange,
    handleLocationChange,
    handleStatusChange,
    handleTypeChange,
  } = UseShortedProperty({ itemsPerPage, page })

  // === DatoCMS fetch ===
  const [datoProps, setDatoProps] = useState<any[]>([])
  const [datoLoading, setDatoLoading] = useState(false)
  const [datoError, setDatoError] = useState<string | null>(null)
  const [datoOffset, setDatoOffset] = useState(0)
  const [keyword, setKeyword] = useState("")
  const [locationFilter, setLocationFilter] = useState("")
  const [typeFilter, setTypeFilter] = useState("")

  // Préremplir depuis la recherche de la home (sessionStorage)
  useEffect(() => {
    if (typeof window === "undefined") return
    const storedType = sessionStorage.getItem("search:type") || ""
    const storedLocation = sessionStorage.getItem("search:location") || ""
    const storedKeyword = sessionStorage.getItem("search:keyword") || ""

    if (storedType) setTypeFilter(storedType)
    if (storedLocation) setLocationFilter(storedLocation)
    if (storedKeyword) setKeyword(storedKeyword)
  }, [])

  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
    handleSearchChange(e)

    if (typeof window !== "undefined") {
      sessionStorage.setItem("search:keyword", e.target.value)
    }
  }

  const handleLocationFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setLocationFilter(e.target.value)
    handleLocationChange(e)

    if (typeof window !== "undefined") {
      sessionStorage.setItem("search:location", e.target.value)
    }
  }

  const handleTypeFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTypeFilter(e.target.value)
    handleStatusChange(e)

    if (typeof window !== "undefined") {
      sessionStorage.setItem("search:type", e.target.value)
    }
  }

  useEffect(() => {
    const fetchDato = async () => {
      try {
        setDatoLoading(true)
        setDatoError(null)
        const res = await fetch("/api/directus/properties")
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        setDatoProps(Array.isArray(data) ? data : [])
      } catch (err) {
        setDatoError(err instanceof Error ? err.message : "Error desconocido")
        setDatoProps([])
      } finally {
        setDatoLoading(false)
      }
    }
    fetchDato()
  }, [])

  const normalizeText = (value: string) =>
    value
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .toLowerCase()
      .trim()

  const TYPE_SYNONYMS: Record<string, string[]> = {
    "comprar-departamentos": ["departamento", "departamentos", "depto", "aparta"],
    "rentar-departamentos": ["departamento", "departamentos", "depto", "aparta"],
    "comprar-casas": ["casa", "casas", "house"],
    "rentar-casas": ["casa", "casas", "house"],
    "comprar-oficinas": ["oficina", "oficinas", "office"],
    "rentar-oficinas": ["oficina", "oficinas", "office"],
    "comprar-terrenos": ["terreno", "lote", "lot"],
    "vender-terrenos": ["terreno", "lote", "lot"],
  }

  const OP_SYNONYMS: Record<string, string[]> = {
    "comprar-departamentos": ["venta", "comprar", "sell", "sale"],
    "comprar-casas": ["venta", "comprar", "sell", "sale"],
    "comprar-oficinas": ["venta", "comprar", "sell", "sale"],
    "comprar-terrenos": ["venta", "comprar", "sell", "sale"],
    "vender-terrenos": ["venta", "vender", "sell", "sale"],
    "rentar-departamentos": ["renta", "alquiler", "rent"],
    "rentar-casas": ["renta", "alquiler", "rent"],
    "rentar-oficinas": ["renta", "alquiler", "rent"],
  }

  const filteredDato = useMemo(() => {
    const k = normalizeText(keyword)
    const loc = normalizeText(locationFilter)
    const typeSynonyms = TYPE_SYNONYMS[typeFilter] || []
    const opSynonyms = OP_SYNONYMS[typeFilter] || []

    return datoProps.filter((p) => {
      const haystackParts = [
        p.Title,
        p.Address,
        p.City,
        p.State,
        p.Descripcion,
        ...(p.Property_type || []),
        ...(p.Operation_type || []),
      ]
        .filter(Boolean)
        .map((v: string) => normalizeText(String(v)))

      if (k) {
        const hasKeyword = haystackParts.some((part: string) => part.includes(k))
        if (!hasKeyword) return false
      }

      if (loc) {
        const inCity = normalizeText(String(p.City || "")).includes(loc)
        const inState = normalizeText(String(p.State || "")).includes(loc)
        if (!inCity && !inState) return false
      }

      if (typeFilter) {
        const candidates: string[] = typeSynonyms.length ? typeSynonyms : [normalizeText(typeFilter)]
        const propertyTypes: string[] = (p.Property_type || []).map((t: string) => normalizeText(t))
        const operationTypes: string[] = (p.Operation_type || []).map((t: string) => normalizeText(t))
        const textFallback = `${normalizeText(p.Title || "")} ${normalizeText(p.Descripcion || "")}`

        const hasPropertyTypes = propertyTypes.length > 0
        const hasOperationTypes = operationTypes.length > 0

        const matchProperty =
          !hasPropertyTypes || // si pas de données, ne pas bloquer l'affichage
          propertyTypes.some((t: string) => candidates.some((c: string) => t.includes(c))) ||
          candidates.some((c: string) => textFallback.includes(c))

        const matchOperation =
          opSynonyms.length === 0 ||
          !hasOperationTypes || // si pas de données, ne pas bloquer l'affichage
          operationTypes.some((t: string) => opSynonyms.some((c: string) => t.includes(c))) ||
          opSynonyms.some((c: string) => textFallback.includes(c))

        if (!matchProperty || !matchOperation) return false
      }

      return true
    })
  }, [datoProps, keyword, locationFilter, typeFilter])

  const datoPageCount = useMemo(
    () => Math.max(1, Math.ceil(filteredDato.length / itemsPerPage)),
    [filteredDato, itemsPerPage]
  )

  const datoCurrentItems = useMemo(() => {
    const end = datoOffset + itemsPerPage
    return filteredDato.slice(datoOffset, end)
  }, [datoOffset, filteredDato, itemsPerPage])

  useEffect(() => {
    setDatoOffset(0)
  }, [keyword, locationFilter, typeFilter])

  const getDatoImage = (item: any) => {
    const imgField = item.Image || item.main_image
    if (typeof imgField === "string") return imgField
    if (imgField?.directus_files_id?.id) {
      return buildDirectusAssetUrl(imgField.directus_files_id.id) || imgField.directus_files_id.id
    }
    if (Array.isArray(imgField) && imgField[0]?.directus_files_id?.id) {
      return buildDirectusAssetUrl(imgField[0].directus_files_id.id) || imgField[0].directus_files_id.id
    }
    if (item.images && item.images[0]?.directus_files_id?.id) {
      return buildDirectusAssetUrl(item.images[0].directus_files_id.id) || item.images[0].directus_files_id.id
    }
    return "/assets/images/listing/img_large_07.jpg"
  }

  const formatPrice = (price: number | string | undefined, currency?: string[] | null) => {
    if (!price && price !== 0) return "Precio a consultar"
    const num = typeof price === "string" ? Number(price) : price
    const curr = Array.isArray(currency) && currency.length ? currency[0] : "MXN"
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: curr,
      maximumFractionDigits: 0,
    }).format(num || 0)
  }

  const handleResetFilter = () => {
    resetFilters()
    setKeyword("")
    setLocationFilter("")
    setTypeFilter("")

    if (typeof window !== "undefined") {
      sessionStorage.removeItem("search:type")
      sessionStorage.removeItem("search:location")
      sessionStorage.removeItem("search:keyword")
    }
  }

  return (
    <div className="property-listing-six pt-200 xl-pt-150 pb-200 xl-pb-120">
      <div className="container container-large">
        <div className="row">
          <div className="col-lg-8">
            <div className="ps-xxl-5">
              <div className="listing-header-filter d-sm-flex justify-content-between align-items-center mb-40 lg-mb-30">
                <div>
                  <>
                    Mostrando{" "}
                    <span className="color-dark fw-500">
                      {filteredDato.length === 0 ? 0 : datoOffset + 1}–{Math.min(datoOffset + datoCurrentItems.length, filteredDato.length)}
                    </span>{" "}
                    de <span className="color-dark fw-500">{filteredDato.length}</span> resultados
                  </>
                </div>
                <div className="d-flex align-items-center xs-mt-20">
                  <div className="short-filter d-flex align-items-center">
                    <div className="fs-16 me-2">Ordenar por:</div>
                    <NiceSelect
                      className="nice-select rounded-0"
                      options={[
                        { value: "newest", text: "Más recientes" },
                        { value: "best_seller", text: "Más vendidos" },
                        { value: "best_match", text: "Mejor coincidencia" },
                        { value: "price_low", text: "Precio menor" },
                        { value: "price_high", text: "Precio mayor" },
                      ]}
                      defaultCurrent={0}
                      onChange={handleTypeChange}
                      name=""
                      placeholder=""
                    />
                  </div>
                  <Link
                    href="/listing_06"
                    className="tran3s layout-change rounded-circle ms-auto ms-sm-3"
                    data-bs-toggle="tooltip"
                    title="Switch To List View"
                  >
                    <i className="fa-regular fa-bars"></i>
                  </Link>
                </div>
              </div>

              {datoLoading && (
                <div className="py-5 text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                  </div>
                  <p className="mt-3 mb-0">Cargando propiedades desde DatoCMS...</p>
                </div>
              )}

              {datoError && !datoLoading && (
                <div className="alert alert-warning">
                  No pudimos cargar DatoCMS ({datoError}). Intenta recargar la página.
                </div>
              )}

              <div className="row gx-xxl-5">
                {datoCurrentItems.map((item: any) => (
                  <div key={item.id} className="col-md-6 d-flex mb-50 wow fadeInUp" data-wow-delay={item.data_delay_time}>
                    <div className="listing-card-one style-two shadow-none h-100 w-100">
                      <div className="img-gallery">
                        <div className="position-relative overflow-hidden">
                          <div className="tag fw-500">{item.Operation_type?.[0] || "EN VENTA"}</div>
                          <Link href="#" className="fav-btn tran3s">
                            <i className="fa-light fa-heart"></i>
                          </Link>
                          {true ? (
                            <Link href={`/listing_details_05?slug=${encodeURIComponent(item.Slug || item.id)}&id=${encodeURIComponent(item.id)}`}>
                              <Image
                                src={getDatoImage(item)}
                                alt={item.Title || "Propiedad"}
                                width={900}
                                height={600}
                                className="w-100"
                                style={{ objectFit: "cover", height: 260 }}
                                unoptimized
                              />
                            </Link>
                          ) : (
                            <div id={`carousel${item.carousel}`} className="carousel slide">
                              <div className="carousel-indicators">
                                <button
                                  type="button"
                                  data-bs-target={`#carousel${item.carousel}`}
                                  data-bs-slide-to="0"
                                  className="active"
                                  aria-current="true"
                                  aria-label="Slide 1"
                                ></button>
                                <button type="button" data-bs-target={`#carousel${item.carousel}`} data-bs-slide-to="1" aria-label="Slide 2"></button>
                                <button type="button" data-bs-target={`#carousel${item.carousel}`} data-bs-slide-to="2" aria-label="Slide 3"></button>
                              </div>
                              <div className="carousel-inner">
                                {item.carousel_thumb.map((thumb: any, i: any) => (
                                  <div key={i} className={`carousel-item ${thumb.active}`} data-bs-interval="1000000">
                                    <Link href={`/listing_details_05?id=${item.id}`} className="d-block">
                                      <Image src={thumb.img} className="w-100" alt="..." />
                                    </Link>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="property-info pt-20">
                        <Link
                          href={`/listing_details_05?slug=${encodeURIComponent(item.Slug || item.id)}&id=${encodeURIComponent(item.id)}`}
                          className="title tran3s d-inline-block"
                        >
                          {item.Title}
                        </Link>
                        <div className="address">
                          {[item.Address, item.City, item.State].filter(Boolean).join(", ")}
                        </div>
                        <ul className="style-none feature d-flex flex-wrap align-items-center justify-content-between pb-15 pt-5">
                          <li className="d-flex align-items-center">
                            <Image src={featureIcon_1} alt="" className="lazy-img icon me-2" />
                            <span className="fs-16">
                              <span className="color-dark">{item.Construccion_area || "—"}</span>{" "}
                              {"m²"}
                            </span>
                          </li>
                          <li className="d-flex align-items-center">
                            <Image src={featureIcon_2} alt="" className="lazy-img icon me-2" />
                            <span className="fs-16">
                              <span className="color-dark">{item.Bedrooms || "—"}</span> bed
                            </span>
                          </li>
                          <li className="d-flex align-items-center">
                            <Image src={featureIcon_3} alt="" className="lazy-img icon me-2" />
                            <span className="fs-16">
                              <span className="color-dark">{item.Bathrooms || "—"}</span> bath
                            </span>
                          </li>
                        </ul>
                        <div className="pl-footer top-border bottom-border d-flex align-items-center justify-content-between">
                          <strong className="price fw-500 color-dark">
                            {formatPrice(item.Price, item.Currency)}
                          </strong>
                          <Link
                            href={`/listing_details_05?slug=${encodeURIComponent(item.Slug || item.id)}&id=${encodeURIComponent(item.id)}`}
                            className="btn-four"
                          >
                            <i className="bi bi-arrow-up-right"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <ReactPaginate
                breakLabel="..."
                nextLabel={<Image src={icon} alt="" className="ms-2" />}
                onPageChange={(e) => {
                  const newOffset = e.selected * itemsPerPage
                  setDatoOffset(newOffset)
                }}
                pageRangeDisplayed={datoPageCount}
                pageCount={datoPageCount}
                previousLabel={<Image src={icon} alt="" className="ms-2" />}
                renderOnZeroPageCount={null}
                className="pagination-one square d-flex align-items-center justify-content-center justify-content-sm-start style-none pt-60 lg-pt-30"
              />
            </div>
          </div>

          <div className="col-lg-4 order-lg-first">
            <div className="advance-search-panel dot-bg md-mt-80">
              <div className="main-bg rounded-0">
                <DropdownOne
                  handleSearchChange={handleKeywordChange}
                  handleBedroomChange={handleBedroomChange}
                  handleBathroomChange={handleBathroomChange}
                  handlePriceChange={handlePriceChange}
                  maxPrice={maxPrice}
                  priceValue={priceValue}
                  handleResetFilter={handleResetFilter}
                  selectedAmenities={selectedAmenities}
                  handleAmenityChange={handleAmenityChange}
                  handleLocationChange={handleLocationFilterChange}
                  handleStatusChange={handleStatusChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListingFiveArea
