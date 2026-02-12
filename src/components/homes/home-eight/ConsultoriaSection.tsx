"use client";

type Locale = "es" | "en";

const ServicesSection = ({ locale = "es" }: { locale?: Locale }) => {
  const isEnglish = locale === "en";

  return (
    <section id={isEnglish ? "services" : "servicios"} className="pt-120 pb-120 bg-light">
      <div className="container">
        <div className="row text-center">
          <div className="col-lg-12">
            <div className="title-one mb-50">
              <h2>{isEnglish ? "Services" : "Servicios"}</h2>
              <p>
                {isEnglish
                  ? "Comprehensive solutions to invest, buy, sell, or rent properties."
                  : "Soluciones integrales para invertir, comprar, vender o rentar propiedades."}
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="service-box p-4 bg-white shadow-sm rounded">
              <h5>{isEnglish ? "🏠 Sales and rentals" : "🏠 Venta y renta"}</h5>
              <p>{isEnglish ? "Residential and commercial properties." : "Propiedades residenciales y comerciales."}</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="service-box p-4 bg-white shadow-sm rounded">
              <h5>{isEnglish ? "📑 Legal guidance" : "📑 Asesoría legal"}</h5>
              <p>{isEnglish ? "Contracts, title deeds, and legal procedures." : "Contratos, escrituración y trámites oficiales."}</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="service-box p-4 bg-white shadow-sm rounded">
              <h5>{isEnglish ? "🤝 Partnerships" : "🤝 Alianzas"}</h5>
              <p>{isEnglish ? "Collaboration with trusted professionals." : "Colaboración con colegas de confianza."}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
