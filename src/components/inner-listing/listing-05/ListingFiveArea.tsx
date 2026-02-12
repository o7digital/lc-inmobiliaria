"use client"

import { useEffect, useMemo, useState, ChangeEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import ReactPaginate from "react-paginate"
import NiceSelect from "@/ui/NiceSelect"
import UseShortedProperty from "@/hooks/useShortedProperty"
import DropdownOne from "@/components/search-dropdown/inner-dropdown/DropdownOne"
import { buildDirectusAssetUrl } from "@/lib/directus"
import { SiteLocale, getLocalePrefix, localeNumberFormatMap } from "@/types/siteLocale";

import icon from "@/assets/images/icon/icon_46.svg"
import featureIcon_1 from "@/assets/images/icon/icon_32.svg"
import featureIcon_2 from "@/assets/images/icon/icon_33.svg"
import featureIcon_3 from "@/assets/images/icon/icon_34.svg"

const ListingFiveArea = ({ locale = "es" }: { locale?: SiteLocale }) => {
  const localePrefix = getLocalePrefix(locale)
  const listViewHref = locale === "es" ? "/listing_06" : `${localePrefix}/properties`
  const detailsBasePath = locale === "es" ? "/listing_details_05" : `${localePrefix}/property-details`
  const labelsMap: Record<SiteLocale, {
    showing: string;
    of: string;
    results: string;
    sortBy: string;
    newest: string;
    bestSellers: string;
    bestMatch: string;
    lowestPrice: string;
    highestPrice: string;
    switchToListView: string;
    loading: string;
    loadingProperties: string;
    loadErrorPrefix: string;
    loadErrorSuffix: string;
    property: string;
    bed: string;
    bath: string;
    priceOnRequest: string;
    forSale: string;
    forRent: string;
  }> = {
    es: {
      showing: "Mostrando",
      of: "de",
      results: "resultados",
      sortBy: "Ordenar por:",
      newest: "Más recientes",
      bestSellers: "Más vendidos",
      bestMatch: "Mejor coincidencia",
      lowestPrice: "Precio menor",
      highestPrice: "Precio mayor",
      switchToListView: "Cambiar a vista de lista",
      loading: "Cargando...",
      loadingProperties: "Cargando propiedades desde DatoCMS...",
      loadErrorPrefix: "No pudimos cargar DatoCMS",
      loadErrorSuffix: "Intenta recargar la página.",
      property: "Propiedad",
      bed: "rec",
      bath: "baño",
      priceOnRequest: "Precio a consultar",
      forSale: "EN VENTA",
      forRent: "EN RENTA",
    },
    en: {
      showing: "Showing",
      of: "of",
      results: "results",
      sortBy: "Sort by:",
      newest: "Newest",
      bestSellers: "Best sellers",
      bestMatch: "Best match",
      lowestPrice: "Lowest price",
      highestPrice: "Highest price",
      switchToListView: "Switch to list view",
      loading: "Loading...",
      loadingProperties: "Loading properties from DatoCMS...",
      loadErrorPrefix: "We could not load DatoCMS",
      loadErrorSuffix: "Please refresh the page.",
      property: "Property",
      bed: "bed",
      bath: "bath",
      priceOnRequest: "Price upon request",
      forSale: "FOR SALE",
      forRent: "FOR RENT",
    },
    fr: {
      showing: "Affichage",
      of: "sur",
      results: "resultats",
      sortBy: "Trier par :",
      newest: "Plus recents",
      bestSellers: "Meilleures ventes",
      bestMatch: "Meilleure correspondance",
      lowestPrice: "Prix le plus bas",
      highestPrice: "Prix le plus eleve",
      switchToListView: "Passer en vue liste",
      loading: "Chargement...",
      loadingProperties: "Chargement des proprietes depuis DatoCMS...",
      loadErrorPrefix: "Impossible de charger DatoCMS",
      loadErrorSuffix: "Veuillez recharger la page.",
      property: "Propriete",
      bed: "ch",
      bath: "sdb",
      priceOnRequest: "Prix sur demande",
      forSale: "A VENDRE",
      forRent: "A LOUER",
    },
    it: {
      showing: "Visualizzazione",
      of: "di",
      results: "risultati",
      sortBy: "Ordina per:",
      newest: "Piu recenti",
      bestSellers: "Piu richiesti",
      bestMatch: "Migliore corrispondenza",
      lowestPrice: "Prezzo minimo",
      highestPrice: "Prezzo massimo",
      switchToListView: "Passa alla vista elenco",
      loading: "Caricamento...",
      loadingProperties: "Caricamento immobili da DatoCMS...",
      loadErrorPrefix: "Impossibile caricare DatoCMS",
      loadErrorSuffix: "Ricarica la pagina.",
      property: "Immobile",
      bed: "cam",
      bath: "bagni",
      priceOnRequest: "Prezzo su richiesta",
      forSale: "IN VENDITA",
      forRent: "IN AFFITTO",
    },
    de: {
      showing: "Anzeige",
      of: "von",
      results: "Ergebnissen",
      sortBy: "Sortieren nach:",
      newest: "Neueste",
      bestSellers: "Top-Angebote",
      bestMatch: "Beste Uebereinstimmung",
      lowestPrice: "Niedrigster Preis",
      highestPrice: "Hoechster Preis",
      switchToListView: "Zur Listenansicht wechseln",
      loading: "Laden...",
      loadingProperties: "Immobilien werden aus DatoCMS geladen...",
      loadErrorPrefix: "DatoCMS konnte nicht geladen werden",
      loadErrorSuffix: "Bitte Seite neu laden.",
      property: "Immobilie",
      bed: "Zi",
      bath: "Bad",
      priceOnRequest: "Preis auf Anfrage",
      forSale: "ZU VERKAUFEN",
      forRent: "ZU MIETEN",
    },
  }
  const labels = labelsMap[locale]
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
    const activated = sessionStorage.getItem("search:activated") === "1"
    if (!activated) {
      // pas de recherche poussée depuis la home, on laisse tout vide
      sessionStorage.removeItem("search:type")
      sessionStorage.removeItem("search:location")
      sessionStorage.removeItem("search:keyword")
      return
    }

    const storedType = sessionStorage.getItem("search:type") || ""
    const storedLocation = sessionStorage.getItem("search:location") || ""
    const storedKeyword = sessionStorage.getItem("search:keyword") || ""

    setTypeFilter(storedType)
    setLocationFilter(storedLocation)
    setKeyword(storedKeyword)

    // consommer le flag pour les visites suivantes
    sessionStorage.removeItem("search:activated")
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
        const primaryUrl = "/api/directus/properties"
        const fallbackUrl = "https://lc-inmobiliaria.vercel.app/api/directus/properties"

        const doFetch = async (url: string) => {
          const res = await fetch(url)
          if (!res.ok) throw new Error(`HTTP ${res.status}`)
          return res.json()
        }

        let data: any[] = []
        try {
          data = await doFetch(primaryUrl)
        } catch (e) {
          console.warn("Primary fetch failed, trying fallback", e)
        }

        if (!Array.isArray(data) || data.length === 0) {
          try {
            const fallbackData = await doFetch(fallbackUrl)
            if (Array.isArray(fallbackData)) data = fallbackData
          } catch (e2) {
            console.warn("Fallback fetch failed", e2)
          }
        }

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
    "buy-apartments": ["departamento", "departamentos", "depto", "aparta", "apartment"],
    "rent-apartments": ["departamento", "departamentos", "depto", "aparta", "apartment"],
    "buy-houses": ["casa", "casas", "house"],
    "rent-houses": ["casa", "casas", "house"],
    "buy-offices": ["oficina", "oficinas", "office"],
    "rent-offices": ["oficina", "oficinas", "office"],
    "buy-land": ["terreno", "lote", "land", "lot"],
    "sell-land": ["terreno", "lote", "land", "lot"],
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
    "buy-apartments": ["venta", "comprar", "sell", "sale", "buy"],
    "buy-houses": ["venta", "comprar", "sell", "sale", "buy"],
    "buy-offices": ["venta", "comprar", "sell", "sale", "buy"],
    "buy-land": ["venta", "comprar", "sell", "sale", "buy"],
    "sell-land": ["venta", "vender", "sell", "sale"],
    "rent-apartments": ["renta", "alquiler", "rent"],
    "rent-houses": ["renta", "alquiler", "rent"],
    "rent-offices": ["renta", "alquiler", "rent"],
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
    if (!price && price !== 0) return labels.priceOnRequest
    const num = typeof price === "string" ? Number(price) : price
    const curr = Array.isArray(currency) && currency.length ? currency[0] : "MXN"
    return new Intl.NumberFormat(localeNumberFormatMap[locale], {
      style: "currency",
      currency: curr,
      maximumFractionDigits: 0,
    }).format(num || 0)
  }

  const formatOperationLabel = (operation?: string) => {
    if (!operation) return labels.forSale

    const normalized = normalizeText(operation)
    if (["venta", "sale", "sell", "comprar", "buy"].includes(normalized)) {
      return labels.forSale
    }
    if (["renta", "rent", "alquiler", "lease", "leasing"].includes(normalized)) {
      return labels.forRent
    }
    return operation
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
                    {labels.showing}{" "}
                    <span className="color-dark fw-500">
                      {filteredDato.length === 0 ? 0 : datoOffset + 1}–{Math.min(datoOffset + datoCurrentItems.length, filteredDato.length)}
                    </span>{" "}
                    {labels.of} <span className="color-dark fw-500">{filteredDato.length}</span>{" "}
                    {labels.results}
                  </>
                </div>
                <div className="d-flex align-items-center xs-mt-20">
                  <div className="short-filter d-flex align-items-center">
                    <div className="fs-16 me-2">{labels.sortBy}</div>
                    <NiceSelect
                      className="nice-select rounded-0"
                      options={[
                        { value: "newest", text: labels.newest },
                        { value: "best_seller", text: labels.bestSellers },
                        { value: "best_match", text: labels.bestMatch },
                        { value: "price_low", text: labels.lowestPrice },
                        { value: "price_high", text: labels.highestPrice },
                      ]}
                      defaultCurrent={0}
                      onChange={handleTypeChange}
                      name=""
                      placeholder=""
                    />
                  </div>
                  <Link
                    href={listViewHref}
                    className="tran3s layout-change rounded-circle ms-auto ms-sm-3"
                    data-bs-toggle="tooltip"
                    title={labels.switchToListView}
                  >
                    <i className="fa-regular fa-bars"></i>
                  </Link>
                </div>
              </div>

              {datoLoading && (
                <div className="py-5 text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">{labels.loading}</span>
                  </div>
                  <p className="mt-3 mb-0">{labels.loadingProperties}</p>
                </div>
              )}

              {datoError && !datoLoading && (
                <div className="alert alert-warning">
                  {`${labels.loadErrorPrefix} (${datoError}). ${labels.loadErrorSuffix}`}
                </div>
              )}

              <div className="row gx-xxl-5">
                {datoCurrentItems.map((item: any) => (
                  <div key={item.id} className="col-md-6 d-flex mb-50 wow fadeInUp" data-wow-delay={item.data_delay_time}>
                    <div className="listing-card-one style-two shadow-none h-100 w-100">
                      <div className="img-gallery">
                        <div className="position-relative overflow-hidden">
                          <div className="tag fw-500">{formatOperationLabel(item.Operation_type?.[0])}</div>
                          <Link href="#" className="fav-btn tran3s">
                            <i className="fa-light fa-heart"></i>
                          </Link>
                          {true ? (
                            <Link href={`${detailsBasePath}?slug=${encodeURIComponent(item.Slug || item.id)}&id=${encodeURIComponent(item.id)}`}>
                              <Image
                                src={getDatoImage(item)}
                                alt={item.Title || labels.property}
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
                                    <Link href={`${detailsBasePath}?id=${item.id}`} className="d-block">
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
                          href={`${detailsBasePath}?slug=${encodeURIComponent(item.Slug || item.id)}&id=${encodeURIComponent(item.id)}`}
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
                              <span className="color-dark">{item.Bedrooms || "—"}</span>{" "}
                              {labels.bed}
                            </span>
                          </li>
                          <li className="d-flex align-items-center">
                            <Image src={featureIcon_3} alt="" className="lazy-img icon me-2" />
                            <span className="fs-16">
                              <span className="color-dark">{item.Bathrooms || "—"}</span>{" "}
                              {labels.bath}
                            </span>
                          </li>
                        </ul>
                        <div className="pl-footer top-border bottom-border d-flex align-items-center justify-content-between">
                          <strong className="price fw-500 color-dark">
                            {formatPrice(item.Price, item.Currency)}
                          </strong>
                          <Link
                            href={`${detailsBasePath}?slug=${encodeURIComponent(item.Slug || item.id)}&id=${encodeURIComponent(item.id)}`}
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
                  locale={locale}
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
                  handleStatusChange={handleTypeFilterChange}
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
