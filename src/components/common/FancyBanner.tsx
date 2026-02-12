"use client"
import Image from "next/image"
import Link from "next/link"
import titleShape from "@/assets/images/shape/title_shape_06.svg"
import { SiteLocale } from "@/types/siteLocale";

const FancyBanner = ({ style, locale = "es" }: { style?: boolean; locale?: SiteLocale }) => {
   const copyMap: Record<SiteLocale, { headingStart: string; headingHighlight: string; headingEnd: string; emailPlaceholder: string; button: string; agentText: string; loginText: string }> = {
      es: {
         headingStart: "Comienza tu ",
         headingHighlight: "viaje",
         headingEnd: " en bienes raíces.",
         emailPlaceholder: "Correo electrónico",
         button: "Comenzar",
         agentText: "¿Ya eres agente? ",
         loginText: "Iniciar sesión.",
      },
      en: {
         headingStart: "Start your ",
         headingHighlight: "real estate journey",
         headingEnd: ".",
         emailPlaceholder: "Email address",
         button: "Start",
         agentText: "Already an agent? ",
         loginText: "Log in.",
      },
      fr: {
         headingStart: "Commencez votre ",
         headingHighlight: "parcours immobilier",
         headingEnd: ".",
         emailPlaceholder: "Adresse e-mail",
         button: "Demarrer",
         agentText: "Deja agent ? ",
         loginText: "Se connecter.",
      },
      it: {
         headingStart: "Inizia il tuo ",
         headingHighlight: "percorso immobiliare",
         headingEnd: ".",
         emailPlaceholder: "Email",
         button: "Inizia",
         agentText: "Sei gia agente? ",
         loginText: "Accedi.",
      },
      de: {
         headingStart: "Starten Sie Ihre ",
         headingHighlight: "Immobilienreise",
         headingEnd: ".",
         emailPlaceholder: "E-Mail-Adresse",
         button: "Starten",
         agentText: "Bereits Makler? ",
         loginText: "Anmelden.",
      },
   };
   const copy = copyMap[locale];

   return (
      <div className="fancy-banner-two position-relative z-1 pt-90 lg-pt-50 pb-90 lg-pb-50">
         <div className="container">
            <div className="row align-items-center">
               <div className="col-lg-6">
                  <div className="title-one text-center text-lg-start md-mb-40 pe-xl-5">
                     <h3 className="text-white m0">
                        {copy.headingStart}
                        <span>
                           {copy.headingHighlight}
                           {style ? "" : <Image src={titleShape} alt="" className="lazy-img" />}
                        </span>
                        {copy.headingEnd}
                     </h3>
                  </div>
               </div>
               <div className="col-lg-6">
                  <div className="form-wrapper me-auto ms-auto me-lg-0">
                     <form onSubmit={(e) => e.preventDefault()}>
                        <input
                           type="email"
                           placeholder={copy.emailPlaceholder}
                           className={style ? "rounded-0" : ""}
                        />
                        <button className={style ? "rounded-0" : ""}>
                           {copy.button}
                        </button>
                     </form>
                     <div className="fs-16 mt-10 text-white">
                        {copy.agentText}
                        <Link href="#" data-bs-toggle="modal" data-bs-target="#loginModal">
                           {copy.loginText}
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default FancyBanner
