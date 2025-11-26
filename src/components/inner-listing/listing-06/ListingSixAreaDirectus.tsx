"use client";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { DirectusProperty } from "@/types/directus";
import { buildDirectusAssetUrl } from "@/lib/directus";

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

const formatLocation = (property: DirectusProperty) => {
  const parts = [property.Address, property.City, property.State].filter(Boolean);
  return parts.join(", ");
};

const formatPrice = (price: number | string, currency: string[] = ["MXN"]) => {
  const priceNum = typeof price === 'string' ? parseFloat(price) : price;
  const curr = Array.isArray(currency) ? currency[0] : currency;
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: curr || "MXN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(priceNum);
};

const extractFileId = (imageField: any): string | null => {
  if (!imageField) return null;
  
  if (typeof imageField === 'string') {
    return imageField;
  }
  
  if (Array.isArray(imageField)) {
    const firstItem = imageField[0];
    if (firstItem?.directus_files_id?.id) {
      return firstItem.directus_files_id.id;
    }
  }
  
  if (typeof imageField === 'object' && imageField !== null) {
    if ('id' in imageField && imageField.id) {
      return imageField.id;
    }
    
    if ('directus_files_id' in imageField) {
      const filesId = imageField.directus_files_id;
      if (typeof filesId === 'string') {
        return filesId;
      }
      if (filesId && typeof filesId === 'object' && 'id' in filesId && filesId.id) {
        return filesId.id;
      }
    }
  }
  
  return null;
};

const getDirectusImageUrl = (property: DirectusProperty, width: number = 1200) => {
  // Debug: Log pour vérifier les images
  console.log(`Property ${property.Title}:`, {
    images: property.images,
    Image: property.Image
  });
  
  // Priorité : nouvelles images > ancien champ Image > image par défaut
  if (property.images && property.images.length > 0) {
    const firstImage = property.images[0];
    if (firstImage?.directus_files_id?.id) {
      const imageUrl = buildDirectusAssetUrl(firstImage.directus_files_id.id);
      console.log(`Using new images system: ${imageUrl}`);
      return imageUrl || "/assets/images/listing/img_large_07.jpg";
    }
  }
  
  // Fallback sur l'ancien système Image
  const fileId = extractFileId(property.Image);
  if (fileId) {
    const imageUrl = buildDirectusAssetUrl(fileId);
    console.log(`Using legacy Image system: ${imageUrl}`);
    return imageUrl || "/assets/images/listing/img_large_07.jpg";
  }
  
  // Image par défaut
  console.log('Using fallback image');
  return "/assets/images/listing/img_large_07.jpg";
};

const ListingSixAreaDirectus = () => {
  const [properties, setProperties] = useState<DirectusProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState(initialFilterState);
  const [sortBy, setSortBy] = useState("newest");

  // Fetch properties from Directus
  useEffect(() => {
    const fetchProperties = async () => {
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
  // Filtrer uniquement les propriétés Featured
  const featured = Array.isArray(data) ? data.filter((p: any) => p.Featured === true) : [];
  setProperties(featured);
      } catch (err) {
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
          return priceA - priceB;
        });
        break;
      case "price-high":
        filtered.sort((a, b) => {
          const priceA = typeof a.Price === 'string' ? parseFloat(a.Price) : a.Price;
          const priceB = typeof b.Price === 'string' ? parseFloat(b.Price) : b.Price;
          return priceB - priceA;
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
    <div className="property-listing-six bg-pink-two pt-110 lg-pt-80 pb-180 xl-pb-120 lg-pb-80">
      <div className="container container-large">
        <div>
          <h3 className="mb-10" style={{fontWeight:700, fontSize:'2.2rem', letterSpacing:'0.01em', lineHeight:'1.1', textTransform:'uppercase'}}>PROPRIEDADES DESTACADAS</h3>
          <div className="listing-header-filter d-sm-flex justify-content-between align-items-center mb-40 lg-mb-30">
            <div className="d-flex align-items-center">
              <span>Mostrando <strong>{filteredAndSortedProperties.length}</strong> de <strong>{properties.length}</strong> resultados</span>
              <button 
                className="btn btn-outline-primary btn-sm ms-3" 
                onClick={() => window.location.reload()}
                title="Sincronizar con Directus"
              >
                <i className="bi bi-arrow-clockwise me-1"></i>
                Sincronizar
              </button>
            </div>
            <div className="d-flex align-items-center xs-mt-20">
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
            {filteredAndSortedProperties.map((property) => (
              <div key={property.id} className="col-lg-4 col-md-6 col-sm-12">
                <div className="property-card-modern h-100">
                  <div className="position-relative overflow-hidden" style={{borderRadius: '12px 12px 0 0'}}>
                    <div className="position-absolute top-0 start-0 w-100 d-flex justify-content-between align-items-start p-3" style={{zIndex: 2}}>
                      <span 
                        className="badge text-uppercase fw-bold px-3 py-2"
                        style={{
                          background: property.Operation_type?.[0] === 'venta' ? '#0d6efd' : '#198754',
                          color: 'white',
                          fontSize: '11px',
                          letterSpacing: '0.5px'
                        }}
                      >
                        {property.Operation_type?.[0] === 'venta' ? 'EN VENTA' : 'EN RENTA'}
                      </span>
                      {property.Featured && (
                        <span 
                          className="badge bg-warning text-dark fw-bold px-3 py-2"
                          style={{fontSize: '11px', letterSpacing: '0.5px'}}
                        >
                          DESTACADA
                        </span>
                      )}
                    </div>
                    <img 
                      src={getDirectusImageUrl(property)} 
                      alt={property.Title}
                      className="w-100"
                      style={{ 
                        height: '280px', 
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  </div>
                  <div className="p-4 bg-white" style={{borderRadius: '0 0 12px 12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}}>
                    <h5 
                      className="mb-3" 
                      style={{
                        fontSize: '18px',
                        fontWeight: 600,
                        color: '#1a1a1a',
                        lineHeight: '1.4',
                        minHeight: '50px',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {property.Title}
                    </h5>
                    <div 
                      className="d-flex align-items-center mb-3"
                      style={{color: '#6c757d', fontSize: '14px'}}
                    >
                      <i className="bi bi-geo-alt-fill me-2" style={{color: '#dc3545'}}></i>
                      <span className="text-truncate">{formatLocation(property)}</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center pt-3" style={{borderTop: '1px solid #e9ecef'}}>
                      <div>
                        <div style={{fontSize: '11px', color: '#6c757d', marginBottom: '4px'}}>
                          Precio
                        </div>
                        <div 
                          style={{
                            fontSize: '22px',
                            fontWeight: 700,
                            color: '#0d6efd'
                          }}
                        >
                          {formatPrice(property.Price, property.Currency)}
                        </div>
                      </div>
                      <div className="d-flex gap-3">
                        {property.Bedrooms && (
                          <div className="text-center">
                            <i className="bi bi-door-closed-fill d-block mb-1" style={{fontSize: '20px', color: '#495057'}}></i>
                            <span style={{fontSize: '13px', fontWeight: 600, color: '#212529'}}>{property.Bedrooms}</span>
                          </div>
                        )}
                        {property.Bathrooms && (
                          <div className="text-center">
                            <i className="bi bi-droplet-fill d-block mb-1" style={{fontSize: '20px', color: '#495057'}}></i>
                            <span style={{fontSize: '13px', fontWeight: 600, color: '#212529'}}>{property.Bathrooms}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <button 
                      className="btn w-100 mt-3"
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '14px',
                        padding: '10px',
                        border: 'none',
                        borderRadius: '8px',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      Ver fotos <i className="bi bi-images ms-2"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
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
