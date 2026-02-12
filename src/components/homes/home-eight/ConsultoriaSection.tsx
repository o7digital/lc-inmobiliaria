"use client";
import { SiteLocale } from "@/types/siteLocale";

const ServicesSection = ({ locale = "es" }: { locale?: SiteLocale }) => {
  const isNonSpanish = locale !== "es";
  const copyMap = {
    es: {
      title: "Servicios",
      subtitle: "Soluciones integrales para invertir, comprar, vender o rentar propiedades.",
      card1Title: "🏠 Venta y renta",
      card1Desc: "Propiedades residenciales y comerciales.",
      card2Title: "📑 Asesoría legal",
      card2Desc: "Contratos, escrituración y trámites oficiales.",
      card3Title: "🤝 Alianzas",
      card3Desc: "Colaboración con colegas de confianza.",
    },
    en: {
      title: "Services",
      subtitle: "Comprehensive solutions to invest, buy, sell, or rent properties.",
      card1Title: "🏠 Sales and rentals",
      card1Desc: "Residential and commercial properties.",
      card2Title: "📑 Legal guidance",
      card2Desc: "Contracts, title deeds, and legal procedures.",
      card3Title: "🤝 Partnerships",
      card3Desc: "Collaboration with trusted professionals.",
    },
    fr: {
      title: "Services",
      subtitle: "Solutions completes pour investir, acheter, vendre ou louer.",
      card1Title: "🏠 Vente et location",
      card1Desc: "Biens residentiels et commerciaux.",
      card2Title: "📑 Conseil juridique",
      card2Desc: "Contrats, actes et procedures officielles.",
      card3Title: "🤝 Partenariats",
      card3Desc: "Collaboration avec des professionnels de confiance.",
    },
    it: {
      title: "Servizi",
      subtitle: "Soluzioni complete per investire, comprare, vendere o affittare immobili.",
      card1Title: "🏠 Vendita e affitto",
      card1Desc: "Immobili residenziali e commerciali.",
      card2Title: "📑 Consulenza legale",
      card2Desc: "Contratti, rogiti e pratiche ufficiali.",
      card3Title: "🤝 Partnership",
      card3Desc: "Collaborazione con professionisti affidabili.",
    },
    de: {
      title: "Dienstleistungen",
      subtitle: "Ganzheitliche Loesungen zum Investieren, Kaufen, Verkaufen oder Vermieten.",
      card1Title: "🏠 Verkauf und Vermietung",
      card1Desc: "Wohn- und Gewerbeimmobilien.",
      card2Title: "📑 Rechtliche Beratung",
      card2Desc: "Vertraege, Notarunterlagen und offizielle Prozesse.",
      card3Title: "🤝 Partnerschaften",
      card3Desc: "Zusammenarbeit mit vertrauenswuerdigen Kollegen.",
    },
  } as const;
  const copy = copyMap[locale];

  return (
    <section id={isNonSpanish ? "services" : "servicios"} className="pt-120 pb-120 bg-light">
      <div className="container">
        <div className="row text-center">
          <div className="col-lg-12">
            <div className="title-one mb-50">
              <h2>{copy.title}</h2>
              <p>{copy.subtitle}</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="service-box p-4 bg-white shadow-sm rounded">
              <h5>{copy.card1Title}</h5>
              <p>{copy.card1Desc}</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="service-box p-4 bg-white shadow-sm rounded">
              <h5>{copy.card2Title}</h5>
              <p>{copy.card2Desc}</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="service-box p-4 bg-white shadow-sm rounded">
              <h5>{copy.card3Title}</h5>
              <p>{copy.card3Desc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
