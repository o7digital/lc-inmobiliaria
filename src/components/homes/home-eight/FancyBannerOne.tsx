import { SiteLocale } from "@/types/siteLocale";

const FancyBannerOne = ({ locale = "es" }: { locale?: SiteLocale }) => {
   const roleMap: Record<SiteLocale, string> = {
      es: "Fundadora y CEO de LC Inmobiliaria",
      en: "Founder and CEO of LC Inmobiliaria",
      fr: "Fondatrice et CEO de LC Inmobiliaria",
      it: "Fondatrice e CEO di LC Inmobiliaria",
      de: "Gruenderin und CEO von LC Inmobiliaria",
   };
   const quoteMap: Record<SiteLocale, string> = {
      es: "\"Seguimos un proceso para ofrecer a nuestros inversionistas las mejores oportunidades.\"",
      en: "\"We follow a clear process to offer our investors the best opportunities.\"",
      fr: "\"Nous suivons une methode claire pour offrir les meilleures opportunites aux investisseurs.\"",
      it: "\"Seguiamo un processo chiaro per offrire le migliori opportunita ai nostri investitori.\"",
      de: "\"Wir folgen einem klaren Prozess, um Investoren die besten Chancen zu bieten.\"",
   };

   return (
      <div className="fancy-banner-nine mt-110 lg-mt-80">
         <div className="container container-large">
            <div className="row align-items-center">
               <div className="col-lg-4">
                  <div className="d-flex align-items-center md-mb-30">
                     <img
                        src="/assets/images/agent/lourdes.jpeg"
                        alt="Lourdes Cazares"
                        className="rounded-circle avatar flex-shrink-0"
                        style={{ width: 100, height: 100, border: "2px solid #e0e0e0", objectFit: "cover", objectPosition: "center" }}
                        aria-hidden="true"
                     />
                     <div className="ps-3 text">
                        <h6 className="fs-22">Lourdes Cazares</h6>
                        <span className="fs-20">{roleMap[locale]}</span>
                     </div>
                  </div>
               </div>
               <div className="col-xxl-7 col-lg-8">
                  <blockquote>{quoteMap[locale]}</blockquote>
               </div>
            </div>
         </div>
      </div>
   )
}

export default FancyBannerOne
