"use client";
import { useEffect, useState } from "react";

type EBProperty = {
  public_id: string;
  title: string;
  location?: string;
  title_image_thumb?: string;
  operations?: { type?: "rent" | "sale"; formatted_amount?: string }[];
  public_url?: string; // <- URL navegable en EasyBroker
};

const ListingSixArea = () => {
  const [properties, setProperties] = useState<EBProperty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/properties")
      .then((res) => res.json())
      .then((data) => {
        setProperties(data?.content || []);
      })
      .catch((err) => {
        console.error("Error cargando propiedades:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="property-listing-six pt-200 xl-pt-150 pb-200 xl-pb-120">
      <div className="container">
        <h2 className="mb-40 text-center">Propiedades disponibles</h2>

        {loading && <p className="text-center">Cargando propiedades...</p>}
        {!loading && properties.length === 0 && (
          <p className="text-center">No se encontraron propiedades.</p>
        )}

        <div className="row">
          {properties.map((prop) => {
            const url =
              prop.public_url ||
              (prop.public_id
                ? `https://www.easybroker.com/property/${prop.public_id}`
                : "#");

            return (
              <div key={prop.public_id} className="col-md-4 mb-4">
                <div className="property-card p-3 bg-white shadow-sm rounded h-100 d-flex flex-column">
                  <img
                    src={prop.title_image_thumb || "/images/default-property.jpg"}
                    alt={prop.title}
                    className="img-fluid mb-3 rounded"
                  />
                  <h5 className="mb-1">{prop.title}</h5>
                  <p className="mb-2">{prop.location}</p>
                  <p className="mb-3">
                    <strong>
                      {prop.operations?.[0]?.formatted_amount ||
                        "Precio no disponible"}
                    </strong>
                  </p>

                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-one mt-auto d-block text-center"
                  >
                    Ver detalles
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ListingSixArea;
