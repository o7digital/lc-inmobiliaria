"use client";
import { useEffect, useState } from "react";
import { DirectusProperty } from "@/types/directus";
import { buildDirectusAssetUrl } from "@/lib/directus";

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
  if (typeof imageField === 'string') return imageField;
  if (Array.isArray(imageField)) {
    const firstItem = imageField[0];
    if (firstItem?.directus_files_id?.id) {
      return firstItem.directus_files_id.id;
    }
  }
  if (typeof imageField === 'object' && imageField !== null) {
    if ('id' in imageField && imageField.id) return imageField.id;
    if ('directus_files_id' in imageField) {
      const filesId = imageField.directus_files_id;
      if (typeof filesId === 'string') return filesId;
      if (filesId && typeof filesId === 'object' && 'id' in filesId && filesId.id) return filesId.id;
    }
  }
  return null;
};

const getDirectusImageUrl = (property: DirectusProperty, width: number = 1200) => {
  if (property.images && property.images.length > 0) {
    const firstImage = property.images[0];
    if (firstImage?.directus_files_id?.id) {
      const imageUrl = buildDirectusAssetUrl(firstImage.directus_files_id.id);
      return imageUrl || "/assets/images/listing/img_large_07.jpg";
    }
  }
  const fileId = extractFileId(property.Image);
  if (fileId) {
    const imageUrl = buildDirectusAssetUrl(fileId);
    return imageUrl || "/assets/images/listing/img_large_07.jpg";
  }
  return "/assets/images/listing/img_large_07.jpg";
};

const ListingSixFeaturedDirectus = () => {
  const [properties, setProperties] = useState<DirectusProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/directus/properties`);
        if (!response.ok) throw new Error('Error al cargar las propiedades');
        const data = await response.json();
        setProperties(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

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
              <button className="btn btn-primary" onClick={() => window.location.reload()}>
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
        <div className="row">
          <div className="col-lg-8">
            <div className="ps-xxl-5">
              <h3 className="mb-10" style={{fontWeight:700, fontSize:'2.2rem', letterSpacing:'0.01em', lineHeight:'1.1', textTransform:'uppercase'}}>PROPIEDADES DESTACADAS</h3>
              <div className="listing-header-filter d-sm-flex justify-content-between align-items-center mb-40 lg-mb-30">
                <div className="d-flex align-items-center">
                  <span>Mostrando <strong>{properties.length}</strong> de <strong>{properties.length}</strong> resultados</span>
                  <button className="btn btn-outline-primary btn-sm ms-3" onClick={() => window.location.reload()} title="Sincronizar">
                    <i className="bi bi-arrow-clockwise me-1"></i>
                    Sincronizar
                  </button>
                </div>
              </div>
              <div className="row gx-xxl-25">
                {properties.map((property) => (
                  <div key={property.id} className="col-lg-4 col-sm-6 d-flex mb-50 lg-mb-30">
                    <div className="listing-card-one shadow4 border-20 h-100 w-100 d-flex flex-column">
                      <div className="img-gallery p-15">
                        <div className="position-relative overflow-hidden">
                          <div className="tag border-20 fw-500">
                            {property.Operation_type?.[0] === 'venta' ? 'VENTA' : 'RENTA'}
                          </div>
                          {property.Featured && (
                            <div className="feature-tag bg-primary text-white fw-500 fs-13">
                              DESTACADA
                            </div>
                          )}
                          <img 
                            src={getDirectusImageUrl(property)} 
                            alt={property.Title}
                            className="w-100 rounded-4"
                            style={{ height: '230px', objectFit: 'cover', display: 'block' }}
                          />
                        </div>
                      </div>
                      <div className="property-info p-25 d-flex flex-column flex-grow-1">
                        <span className="title tran3s d-block fw-500" style={{
                          cursor: 'default',
                          fontSize: '18px',
                          height: '2.5em',
                          lineHeight: '1.25em',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          marginBottom: '10px'
                        }}>
                          {property.Title}
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
                          {formatLocation(property)}
                        </div>
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <div className="d-flex align-items-center">
                            {property.Bedrooms && (
                              <div className="d-flex align-items-center me-3">
                                <i className="bi bi-house-door fs-18 me-1"></i>
                                <span className="fs-15">{property.Bedrooms}</span>
                              </div>
                            )}
                            {property.Bathrooms && (
                              <div className="d-flex align-items-center">
                                <i className="bi bi-droplet fs-18 me-1"></i>
                                <span className="fs-15">{property.Bathrooms}</span>
                              </div>
                            )}
                          </div>
                          <div>
                            <strong className="price fw-600 color-dark" style={{ fontSize: '17px' }}>
                              {formatPrice(property.Price, property.Currency)}
                            </strong>
                          </div>
                        </div>
                        <button 
                          className="btn btn-outline-dark btn-sm w-100 mt-auto"
                          style={{
                            borderRadius: '6px',
                            padding: '8px 16px',
                            fontSize: '14px',
                            fontWeight: '500'
                          }}
                        >
                          <i className="bi bi-images me-2"></i>
                          Ver fotos
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {properties.length === 0 && (
                <div className="text-center py-5">
                  <h4>No se encontraron propiedades</h4>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingSixFeaturedDirectus;
