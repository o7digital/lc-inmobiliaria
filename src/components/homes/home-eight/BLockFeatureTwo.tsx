import Image from "next/image"
import feature_data from "@/data/home-data/FeatureData"
import { SiteLocale } from "@/types/siteLocale";

const BLockFeatureTwo = ({ locale = "es" }: { locale?: SiteLocale }) => {
   const nonSpanishCopy: Record<Exclude<SiteLocale, "es">, { heading: string; subheading: string; cards: { title: string; desc: string }[] }> = {
      en: {
         heading: "Why choose LC Inmobiliaria?",
         subheading: "Your trusted real estate partner in every transaction.",
         cards: [
            { title: "Experience", desc: "More than 10 years in the real estate market, with expert guidance at every step." },
            { title: "Personalized Guidance", desc: "We support you from search to closing with close, personalized assistance." },
            { title: "Wide Coverage", desc: "Strong presence in major metro areas with a high-quality property portfolio." },
         ],
      },
      fr: {
         heading: "Pourquoi choisir LC Inmobiliaria ?",
         subheading: "Votre partenaire immobilier de confiance pour chaque transaction.",
         cards: [
            { title: "Experience", desc: "Plus de 10 ans sur le marche immobilier avec un accompagnement expert." },
            { title: "Conseil Personnalise", desc: "Nous vous accompagnons de la recherche a la signature." },
            { title: "Couverture Etendue", desc: "Presence dans les principales zones metropolitaines." },
         ],
      },
      it: {
         heading: "Perche scegliere LC Inmobiliaria?",
         subheading: "Il tuo partner immobiliare di fiducia in ogni transazione.",
         cards: [
            { title: "Esperienza", desc: "Oltre 10 anni nel mercato immobiliare con consulenza esperta." },
            { title: "Consulenza Personalizzata", desc: "Ti seguiamo dalla ricerca fino alla firma." },
            { title: "Ampia Copertura", desc: "Presenza nelle principali aree metropolitane." },
         ],
      },
      de: {
         heading: "Warum LC Inmobiliaria?",
         subheading: "Ihr vertrauensvoller Immobilienpartner bei jeder Transaktion.",
         cards: [
            { title: "Erfahrung", desc: "Mehr als 10 Jahre Immobilienerfahrung mit kompetenter Beratung." },
            { title: "Personliche Beratung", desc: "Wir begleiten Sie von der Suche bis zum Abschluss." },
            { title: "Breite Abdeckung", desc: "Praesenz in den wichtigsten Metropolregionen." },
         ],
      },
   };

   const cards = feature_data
      .filter((items) => items.page === "home_6_feature_1")
      .map((item, index) => {
         if (locale === "es") return item;
         const localeCopy = nonSpanishCopy[locale];
         return {
            ...item,
            title: localeCopy.cards[index]?.title || item.title,
            desc: localeCopy.cards[index]?.desc || item.desc,
         };
      });

   return (
      <div className="block-feature-fourteen pt-120 xl-pt-100 pb-140 xl-pb-100 mt-170 xl-mt-120">
         <div className="container container-large">
            <div className="title-one text-center wow fadeInUp">
               <h3 className="text-white">
                  {locale === "es" ? "¿Por qué elegir LC Inmobiliaria?" : nonSpanishCopy[locale].heading}
               </h3>
               <p className="fs-24 mt-xs text-white">
                  {locale === "es"
                     ? "Tu socio inmobiliario de confianza en cada transacción."
                     : nonSpanishCopy[locale].subheading}
               </p>
            </div>

            <div className="card-bg-wrapper wow fadeInUp mt-70 lg-mt-50">
               <div className="row">
                  {cards.map((item) => (
                     <div key={item.id} className="col-lg-4">
                        <div className="card-style-eight mt-45 wow fadeInUp">
                           <div className="d-flex align-items-start pe-xxl-5">
                              <Image src={item.icon ? item.icon : ""} alt="" className="lazy-img icon" />
                              <div className="text">
                                 <h5 className="text-white">{item.title}</h5>
                                 <p>{item.desc}</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   )
}

export default BLockFeatureTwo
