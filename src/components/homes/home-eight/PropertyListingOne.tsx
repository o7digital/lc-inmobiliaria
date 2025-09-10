import Link from "next/link";

interface Property {
  id: number;
  public_id: string;
  title: string;
  location: string;
  operations: {
    type: string;
    prices: { amount: number; currency: string }[];
  }[];
  property_images: { url: string }[];
  property_info: { feature: string; total_feature: string }[];
}

interface Props {
  properties: Property[];
}

const PropertyListingOne = ({ properties }: Props) => {
  return (
    <div className="property-listing-one mt-170 xl-mt-120">
      <div className="container container-large">
        <div className="position-relative">
          <div className="title-one text-center mb-25 lg-mb-10 wow fadeInUp">
            <h3>Propiedades Destacadas</h3>
            <p className="fs-22 mt-xs">Explora propiedades en venta y renta.</p>
          </div>

          <div className="row gx-xxl-5">
            {properties.map((item) => (
              <div
                key={item.id}
                className="col-lg-4 col-md-6 mt-40 wow fadeInUp"
              >
                <div className="listing-card-four overflow-hidden d-flex align-items-end position-relative z-1">
                  {/* tag traducido */}
                  <div className="tag fw-500">
                    {item.operations[0]?.type === "rent"
                      ? "Renta"
                      : item.operations[0]?.type === "sale"
                      ? "Venta"
                      : ""}
                  </div>

                  <div className="property-info tran3s w-100">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="pe-3">
                        <h4 className="title fw-500 tran4s">{item.title}</h4>
                        <div className="address tran4s">{item.location}</div>
                      </div>
                      {/* Botón ver más: abre EasyBroker */}
                      <Link
                        href={`https://www.easybroker.com/property/${item.public_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-four inverse"
                      >
                        <span>Ver más</span>{" "}
                        <i className="bi bi-arrow-up-right"></i>
                      </Link>
                    </div>

                    <div className="pl-footer tran4s">
                      <ul className="style-none feature d-flex flex-wrap align-items-center justify-content-between">
                        {item.property_info?.map((info, i) => (
                          <li key={i}>
                            <strong className="color-dark fw-500">
                              {info.total_feature}
                            </strong>
                            <span className="fs-16">
                              {info.feature === "bed"
                                ? "Recámaras"
                                : info.feature === "bath"
                                ? "Baños"
                                : info.feature === "kitchen"
                                ? "Cocina"
                                : info.feature === "sqft"
                                ? "m²"
                                : info.feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-100 md-mt-60">
            <Link href="/properties" className="btn-eight">
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
