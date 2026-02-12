"use client";
import { SiteLocale } from "@/types/siteLocale";

const AboutSection = ({ locale = "es" }: { locale?: SiteLocale }) => {
  const isNonSpanish = locale !== "es";
  const titleMap: Record<SiteLocale, string> = {
    es: "Quiénes Somos",
    en: "About Us",
    fr: "A Propos",
    it: "Chi Siamo",
    de: "Uber Uns",
  };

  const descriptionMap: Record<SiteLocale, JSX.Element> = {
    es: (
      <>
        En <strong>LC Inmobiliaria</strong> ofrecemos un servicio basado en la confianza, la experiencia y la transparencia. Nuestra fundadora,
        <strong> Ma. de Lourdes Cázares Arce</strong>, cuenta con más de 20 años de trayectoria en el sector inmobiliario.
      </>
    ),
    en: (
      <>
        At <strong>LC Inmobiliaria</strong>, we provide a service built on trust, experience, and transparency. Our founder,
        <strong> Ma. de Lourdes Cazares Arce</strong>, has more than 20 years of experience in the real estate sector.
      </>
    ),
    fr: (
      <>
        Chez <strong>LC Inmobiliaria</strong>, nous offrons un service base sur la confiance, l'experience et la transparence. Notre fondatrice,
        <strong> Ma. de Lourdes Cazares Arce</strong>, possede plus de 20 ans d'experience dans l'immobilier.
      </>
    ),
    it: (
      <>
        In <strong>LC Inmobiliaria</strong>, offriamo un servizio basato su fiducia, esperienza e trasparenza. La nostra fondatrice,
        <strong> Ma. de Lourdes Cazares Arce</strong>, ha oltre 20 anni di esperienza nel settore immobiliare.
      </>
    ),
    de: (
      <>
        Bei <strong>LC Inmobiliaria</strong> bieten wir einen Service auf Basis von Vertrauen, Erfahrung und Transparenz. Unsere Gruenderin,
        <strong> Ma. de Lourdes Cazares Arce</strong>, verfuegt ueber mehr als 20 Jahre Erfahrung im Immobiliensektor.
      </>
    ),
  };

  const bulletMap: Record<SiteLocale, string[]> = {
    es: [
      "Confianza y cercanía en cada trato",
      "Trámites claros y transparentes",
      "Experiencia comprobada de más de 20 años",
      "Resultados exitosos para nuestros clientes",
    ],
    en: [
      "Trust and close support in every transaction",
      "Clear and transparent processes",
      "More than 20 years of proven experience",
      "Successful results for our clients",
    ],
    fr: [
      "Confiance et accompagnement dans chaque transaction",
      "Processus clairs et transparents",
      "Plus de 20 ans d'experience prouvee",
      "Resultats solides pour nos clients",
    ],
    it: [
      "Fiducia e supporto in ogni operazione",
      "Processi chiari e trasparenti",
      "Oltre 20 anni di esperienza comprovata",
      "Risultati concreti per i nostri clienti",
    ],
    de: [
      "Vertrauen und enge Begleitung in jeder Transaktion",
      "Klare und transparente Prozesse",
      "Mehr als 20 Jahre nachgewiesene Erfahrung",
      "Erfolgreiche Ergebnisse fuer unsere Kunden",
    ],
  };

  return (
    <section id={isNonSpanish ? "about-us" : "quienes-somos"} className="pt-120 pb-120 bg-white">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="title-one text-center mb-40">
              <h2>{titleMap[locale]}</h2>
              <p>{descriptionMap[locale]}</p>
            </div>
            <ul className="list-style-one">
              {bulletMap[locale].map((bullet, index) => (
                <li key={index}>{bullet}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
