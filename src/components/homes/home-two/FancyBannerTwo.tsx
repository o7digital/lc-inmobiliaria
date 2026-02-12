import Image from "next/image"
import fancyShape from "@/assets/images/shape/shape_30.svg"
import Link from "next/link"
import { SiteLocale, getLocalePrefix } from "@/types/siteLocale";

const FancyBannerTwo = ({ locale = "es" }: { locale?: SiteLocale }) => {
   const localePrefix = getLocalePrefix(locale);
   const contactHref = locale === "es" ? "/contact" : `${localePrefix}/contact`;
   const textMap: Record<SiteLocale, { title: string; button: string }> = {
      es: { title: "¿Tienes alguna consulta? No dudes en contactarnos.", button: "ENVIAR MENSAJE" },
      en: { title: "Have any questions? Do not hesitate to contact us.", button: "SEND MESSAGE" },
      fr: { title: "Une question ? N'hesitez pas a nous contacter.", button: "ENVOYER UN MESSAGE" },
      it: { title: "Hai domande? Non esitare a contattarci.", button: "INVIA MESSAGGIO" },
      de: { title: "Fragen? Kontaktieren Sie uns gerne.", button: "NACHRICHT SENDEN" },
   };
   const copy = textMap[locale];

   return (
      <div className="fancy-banner-five position-relative z-1 pt-90 lg-pt-70 pb-110 lg-pb-70 mt-170 xl-mt-120">
         <div className="container">
            <div className="row">
               <div className="col-xl-8 m-auto text-center">
                  <div className="title-one mb-40 lg-mb-20">
                     <h2 className="font-garamond fs-xl text-white">
                        {copy.title}
                     </h2>
                  </div>
                  <Link href={contactHref} className="btn-nine text-uppercase">
                     <span>{copy.button}</span>
                  </Link>
               </div>
            </div>
         </div>
         <Image src={fancyShape} alt="" className="lazy-img shapes shape_01" />
      </div>
   )
}

export default FancyBannerTwo
