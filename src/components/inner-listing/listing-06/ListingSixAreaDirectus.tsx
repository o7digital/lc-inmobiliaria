"use client";
import { ChangeEvent, useEffect, useMemo, useState } from "react";

const initialFilterState = {
  type: "",
  location: "",
  minPrice: "",
  maxPrice: "",
  operation: "",
};

const normalizeText = (value?: string) => {
  if (!value) return "";
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
};

type DatoProperty = {
  id: string | number;
  Title: string;
  Slug?: string;
  Address?: string;
  City?: string;
  State?: string;
  Country?: string;
  Price?: number | string;
  Currency?: string[];
  Bedrooms?: number;
  Bathrooms?: number;
  Parking_spaces?: number;
  Featured?: boolean;
  Property_type?: string[];
  Operation_type?: string[];
  Image?: string;
  images?: { directus_files_id?: { id?: string } }[];
};

const formatLocation = (property: DatoProperty) => {
  const parts = [property.Address, property.City, property.State].filter(Boolean);
  return parts.join(", ");
};

const formatPrice = (price: number | string = 0, currency: string[] = ["MXN"]) => {
  const priceNum = typeof price === 'string' ? parseFloat(price) : price;
  const curr = Array.isArray(currency) ? currency[0] : currency;
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: curr || "MXN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(priceNum);
};

const getImageUrl = (property: DatoProperty) => {
  if (property.Image && typeof property.Image === "string") return property.Image;
  const first = property.images?.[0]?.directus_files_id?.id;
  if (first) return first;
  return "/assets/images/listing/img_large_07.jpg";
};

const ListingSixAreaDirectus = () => {
  const [properties, setProperties] = useState<DatoProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState(initialFilterState);
  const [sortBy, setSortBy] = useState("newest");

  // Fetch properties from Directus
  useEffect(() => {
    const fetchProperties = async () => {
      const fallbackProps: DatoProperty[] = [
        {
          id: "fallback-1",
          Title: "Departamento muestra",
          Address: "CDMX, Zona Centro",
          City: "Ciudad de México",
          State: "CDMX",
          Price: 2950000,
          Bedrooms: 2,
          Bathrooms: 2,
          Parking_spaces: 1,
          Featured: true,
          Image: "/assets/images/listing/img_large_07.jpg",
        },
        {
          id: "fallback-2",
          Title: "Casa de ejemplo",
          Address: "Naucalpan",
          City: "Naucalpan",
          State: "Edo. Méx.",
          Price: 4150000,
          Bedrooms: 3,
          Bathrooms: 2,
          Parking_spaces: 2,
          Featured: true,
          Image: "/assets/images/listing/img_large_08.jpg",
        },
        {
          id: "fallback-3",
          Title: "Loft ilustrativo",
          Address: "Polanco",
          City: "Ciudad de México",
          State: "CDMX",
          Price: 5350000,
          Bedrooms: 2,
          Bathrooms: 2,
          Parking_spaces: 1,
          Featured: true,
          Image: "/assets/images/listing/img_large_09.jpg",
        },
      ];

      try {
        setLoading(true);
        const searchParams = new URLSearchParams();
        
        if (filters.operation) {
          searchParams.append('operation_type', filters.operation);
        }
        if (filters.type) {
          searchParams.append('property_type', filters.type);
        }
        if (filters.location) {
          searchParams.append('city', filters.location);
        }
        if (filters.minPrice) {
          searchParams.append('min_price', filters.minPrice);
        }
        if (filters.maxPrice) {
          searchParams.append('max_price', filters.maxPrice);
        }

        const url = `/api/directus/properties${searchParams.toString() ? '?' + searchParams.toString() : ''}`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Error al cargar las propiedades');
        }

        const data = await response.json();
        const featured = Array.isArray(data) ? data.filter((p: any) => p.Featured === true) : [];
        setProperties(featured.length ? featured : fallbackProps);
      } catch (err) {
        setProperties(fallbackProps);
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [filters]);

  // Obtenir valores únicos para los filtros
  const uniquePropertyTypes = useMemo(() => {
    const types = properties.flatMap(p => p.Property_type || []).filter(Boolean);
    return [...new Set(types)];
  }, [properties]);

  const uniqueOperationTypes = useMemo(() => {
    const operations = properties.flatMap(p => p.Operation_type || []).filter(Boolean);
    return [...new Set(operations)];
  }, [properties]);

  const uniqueCities = useMemo(() => {
    const cities = properties.map(p => p.City).filter(Boolean);
    return [...new Set(cities)];
  }, [properties]);

  // Función para manejar cambios en filtros
  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setFilters(initialFilterState);
  };

  // Filtrar y ordenar propiedades
  const filteredAndSortedProperties = useMemo(() => {
    let filtered = [...properties];

    // Ordenar según sortBy
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => {
          const priceA = typeof a.Price === 'string' ? parseFloat(a.Price) : a.Price;
          const priceB = typeof b.Price === 'string' ? parseFloat(b.Price) : b.Price;
          return (priceA ?? 0) - (priceB ?? 0);
        });
        break;
      case "price-high":
        filtered.sort((a, b) => {
          const priceA = typeof a.Price === 'string' ? parseFloat(a.Price) : a.Price;
          const priceB = typeof b.Price === 'string' ? parseFloat(b.Price) : b.Price;
          return (priceB ?? 0) - (priceA ?? 0);
        });
        break;
      case "newest":
      default:
        // Mantener orden original (más recientes primero)
        break;
    }

    return filtered;
  }, [properties, sortBy]);

  if (loading) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-3">Cargando propiedades...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 text-center py-5">
            <div className="alert alert-danger">
              <h4>Error al cargar las propiedades</h4>
              <p>{error}</p>
              <button 
                className="btn btn-primary"
                onClick={() => window.location.reload()}
              >
                Reintentar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="property-listing-six featured-section pt-110 lg-pt-80 pb-180 xl-pb-120 lg-pb-80">
      <div className="container container-large">
        <div>
          <div className="featured-header mb-40 lg-mb-30">
            <div>
              <p className="eyebrow text-uppercase mb-1">Destacadas</p>
              <h3 className="featured-title">PROPIEDADES DESTACADAS</h3>
              <div className="featured-subtitle">
                Mostrando <strong>{filteredAndSortedProperties.length}</strong> de{" "}
                <strong>{properties.length}</strong> resultados
              </div>
            </div>
            <div className="d-flex align-items-center gap-3">
              <button 
                className="btn btn-outline-primary btn-sm featured-sync" 
                onClick={() => window.location.reload()}
                title="Sincronizar con Directus"
              >
                <i className="bi bi-arrow-clockwise me-1"></i>
                Sincronizar
              </button>
              <div className="short-filter d-flex align-items-center">
                <div className="fs-16 me-2">Ordenar por:</div>
                <select 
                  className="nice-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Más recientes</option>
                  <option value="price-low">Precio: menor a mayor</option>
                  <option value="price-high">Precio: mayor a menor</option>
                </select>
              </div>
            </div>
          </div>

          <div className="row gx-4 gy-4">
            {filteredAndSortedProperties.map((property) => {
              const operation = property.Operation_type?.[0]?.toLowerCase?.();

              return (
                <div key={property.id} className="col-lg-4 col-md-6 col-sm-12">
                  <div className="featured-card h-100">
                    <div className="featured-card__image">
                      {property.Featured && (
                        <span className="featured-card__ribbon">DESTACADA</span>
                      )}
                      {operation && (
                        <span className="featured-card__operation">
                          {operation === 'venta' ? 'VENTA' : 'RENTA'}
                        </span>
                      )}
                      <a href={`/property-directus/${property.id}`} aria-label={`Voir les détails de ${property.Title}`}>
                        <img 
                          src={getImageUrl(property)} 
                          alt={property.Title}
                        />
                      </a>
                    </div>
                    <div className="featured-card__body d-flex flex-column">
                      <h5 className="featured-card__title">
                        <a href={`/property-directus/${property.id}`}>{property.Title}</a>
                      </h5>
                      <div className="featured-card__location">
                        <i className="bi bi-geo-alt-fill me-2"></i>
                        <span className="text-truncate">{formatLocation(property)}</span>
                      </div>
                      <div className="mt-auto d-flex align-items-center justify-content-between gap-2">
                        <div className="featured-card__price">{formatPrice(property.Price, property.Currency)}</div>
                        <div className="featured-card__meta">
                          {typeof property.Bedrooms === 'number' && (
                            <div className="featured-card__meta-item">
                              <i className="bi bi-door-closed-fill me-1"></i>
                              <span>{property.Bedrooms}</span>
                            </div>
                          )}
                          {typeof property.Bathrooms === 'number' && (
                            <div className="featured-card__meta-item">
                              <i className="bi bi-droplet-fill me-1"></i>
                              <span>{property.Bathrooms}</span>
                            </div>
                          )}
                          {typeof property.Parking_spaces === 'number' && (
                            <div className="featured-card__meta-item">
                              <i className="bi bi-car-front-fill me-1"></i>
                              <span>{property.Parking_spaces}</span>
                            </div>
                          )}
                        </div>
                        <a className="btn btn-sm btn-primary" href={`/property-directus/${property.id}`}>
                          Détails
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredAndSortedProperties.length === 0 && (
            <div className="text-center py-5">
              <h4>No se encontraron propiedades</h4>
              <p>Intenta ajustar tus filtros de búsqueda</p>
              <button 
                className="btn btn-primary"
                onClick={clearFilters}
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingSixAreaDirectus;
