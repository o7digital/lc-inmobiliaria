"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import footerLogo from "@/assets/images/logo/logo_06.svg"
import { SiteLocale, getLocalePrefix } from "@/types/siteLocale";

type FooterThreeProps = {
   locale?: SiteLocale;
};

const FooterThree = ({ locale = "es" }: FooterThreeProps) => {
   const [showCookies, setShowCookies] = useState(() => {
      if (typeof window === "undefined") return true;
      return localStorage.getItem("lc-cookie-consent") !== "accepted";
   });

   const localePrefix = getLocalePrefix(locale);
   const homeHref = localePrefix || "/";
   const propertiesHref = locale === "es" ? "/listing_06_directus" : `${localePrefix}/properties`;
   const servicesHref = locale === "es" ? "/servicios" : `${localePrefix}/services`;
   const consultingHref = locale === "es" ? "/consultoria" : `${localePrefix}/consulting`;
   const aboutHref = locale === "es" ? "/quienes-somos" : `${localePrefix}/about-us`;
   const cookiesHref = locale === "es" ? "/cookies" : `${localePrefix}/cookies-policy`;

   const cookieTitleMap: Record<SiteLocale, string> = {
      es: "Uso de Cookies",
      en: "Cookie Usage",
      fr: "Utilisation des Cookies",
      it: "Uso dei Cookie",
      de: "Cookie-Nutzung",
   };

   const cookiePolicyLabelMap: Record<SiteLocale, string> = {
      es: "Política de Cookies",
      en: "Cookies Policy",
      fr: "Politique de Cookies",
      it: "Politica dei Cookie",
      de: "Cookie-Richtlinie",
   };

   const rejectLabelMap: Record<SiteLocale, string> = {
      es: "✕ Rechazar",
      en: "✕ Reject",
      fr: "✕ Refuser",
      it: "✕ Rifiuta",
      de: "✕ Ablehnen",
   };

   const acceptLabelMap: Record<SiteLocale, string> = {
      es: "✓ Aceptar Todo",
      en: "✓ Accept All",
      fr: "✓ Tout Accepter",
      it: "✓ Accetta Tutto",
      de: "✓ Alle Akzeptieren",
   };

   const copyrightMap: Record<SiteLocale, string> = {
      es: "Copyright ©2025 LC INMOBILIARIA. Todos los derechos reservados.",
      en: "Copyright ©2025 LC INMOBILIARIA. All rights reserved.",
      fr: "Copyright ©2025 LC INMOBILIARIA. Tous droits reserves.",
      it: "Copyright ©2025 LC INMOBILIARIA. Tutti i diritti riservati.",
      de: "Copyright ©2025 LC INMOBILIARIA. Alle Rechte vorbehalten.",
   };

   const cookieDescription = {
      es: "Utilizamos cookies para mejorar su experiencia en nuestro sitio web, analizar el tráfico y personalizar el contenido. Al continuar navegando, acepta nuestro uso de cookies según nuestra",
      en: "We use cookies to improve your experience, analyze traffic, and personalize content. By continuing to browse, you accept our cookie usage according to our",
      fr: "Nous utilisons des cookies pour ameliorer votre experience, analyser le trafic et personnaliser le contenu. En continuant, vous acceptez notre utilisation des cookies selon notre",
      it: "Utilizziamo i cookie per migliorare la tua esperienza, analizzare il traffico e personalizzare i contenuti. Continuando la navigazione, accetti il nostro uso dei cookie secondo la nostra",
      de: "Wir verwenden Cookies, um Ihr Erlebnis zu verbessern, den Traffic zu analysieren und Inhalte zu personalisieren. Wenn Sie weiter surfen, akzeptieren Sie unsere Cookie-Nutzung gemaess unserer",
   }[locale];

   const renderFooterCopy = () => {
      if (locale === "es") {
         return (
            <>
               <div className="mt-3" style={{ fontSize: "12px", lineHeight: 1.6, color: "#666" }}>
                  LC Inmobiliaria es una <strong>agencia inmobiliaria en CDMX</strong> especializada en{" "}
                  <strong>venta y renta de propiedades</strong> residenciales y de lujo en CDMX y Estado de Mexico.
                  Consulta nuestras{" "}
                  <Link href={propertiesHref} className="text-decoration-underline">
                     propiedades en venta y renta
                  </Link>{" "}
                  y conoce nuestros{" "}
                  <Link href={servicesHref} className="text-decoration-underline">
                     servicios inmobiliarios
                  </Link>{" "}
                  y{" "}
                  <Link href={consultingHref} className="text-decoration-underline">
                     consultoria para inversionistas
                  </Link>
                  .
               </div>
               <div className="mt-2" style={{ fontSize: "12px", lineHeight: 1.6, color: "#666" }}>
                  Te ayudamos a encontrar las mejores zonas para vivir en CDMX y Estado de Mexico.
                  Conocenos mejor en{" "}
                  <Link href={aboutHref} className="text-decoration-underline">
                     Quienes Somos
                  </Link>
                  .
               </div>
            </>
         );
      }

      if (locale === "fr") {
         return (
            <>
               <div className="mt-3" style={{ fontSize: "12px", lineHeight: 1.6, color: "#666" }}>
                  LC Inmobiliaria est une <strong>agence immobiliere a Mexico</strong> specialisee dans la vente et
                  la location de biens residentiels et haut de gamme. Decouvrez nos{" "}
                  <Link href={propertiesHref} className="text-decoration-underline">
                     proprietes
                  </Link>{" "}
                  ainsi que nos{" "}
                  <Link href={servicesHref} className="text-decoration-underline">
                     services immobiliers
                  </Link>{" "}
                  et notre{" "}
                  <Link href={consultingHref} className="text-decoration-underline">
                     conseil strategique
                  </Link>
                  .
               </div>
               <div className="mt-2" style={{ fontSize: "12px", lineHeight: 1.6, color: "#666" }}>
                  En savoir plus dans la section{" "}
                  <Link href={aboutHref} className="text-decoration-underline">
                     A Propos
                  </Link>
                  .
               </div>
            </>
         );
      }

      if (locale === "it") {
         return (
            <>
               <div className="mt-3" style={{ fontSize: "12px", lineHeight: 1.6, color: "#666" }}>
                  LC Inmobiliaria e una <strong>agenzia immobiliare a Citta del Messico</strong> specializzata nella
                  compravendita e locazione di immobili residenziali e di lusso. Scopri le nostre{" "}
                  <Link href={propertiesHref} className="text-decoration-underline">
                     proprieta
                  </Link>{" "}
                  e i nostri{" "}
                  <Link href={servicesHref} className="text-decoration-underline">
                     servizi immobiliari
                  </Link>{" "}
                  con consulenza{" "}
                  <Link href={consultingHref} className="text-decoration-underline">
                     strategica per investitori
                  </Link>
                  .
               </div>
               <div className="mt-2" style={{ fontSize: "12px", lineHeight: 1.6, color: "#666" }}>
                  Maggiori informazioni nella sezione{" "}
                  <Link href={aboutHref} className="text-decoration-underline">
                     Chi Siamo
                  </Link>
                  .
               </div>
            </>
         );
      }

      if (locale === "de") {
         return (
            <>
               <div className="mt-3" style={{ fontSize: "12px", lineHeight: 1.6, color: "#666" }}>
                  LC Inmobiliaria ist eine <strong>Immobilienagentur in Mexiko-Stadt</strong> mit Fokus auf Verkauf
                  und Vermietung von Wohn- und Luxusimmobilien. Entdecken Sie unsere{" "}
                  <Link href={propertiesHref} className="text-decoration-underline">
                     Immobilien
                  </Link>{" "}
                  sowie unsere{" "}
                  <Link href={servicesHref} className="text-decoration-underline">
                     Immobilienservices
                  </Link>{" "}
                  und{" "}
                  <Link href={consultingHref} className="text-decoration-underline">
                     strategische Beratung
                  </Link>
                  .
               </div>
               <div className="mt-2" style={{ fontSize: "12px", lineHeight: 1.6, color: "#666" }}>
                  Mehr uber uns unter{" "}
                  <Link href={aboutHref} className="text-decoration-underline">
                     Uber Uns
                  </Link>
                  .
               </div>
            </>
         );
      }

      return (
         <>
            <div className="mt-3" style={{ fontSize: "12px", lineHeight: 1.6, color: "#666" }}>
               LC Inmobiliaria is a <strong>real estate agency in Mexico City</strong> specialized in residential and
               luxury properties. Explore our{" "}
               <Link href={propertiesHref} className="text-decoration-underline">
                  properties for sale and rent
               </Link>{" "}
               and discover our{" "}
               <Link href={servicesHref} className="text-decoration-underline">
                  real estate services
               </Link>{" "}
               and{" "}
               <Link href={consultingHref} className="text-decoration-underline">
                  strategic consulting
               </Link>
               .
            </div>
            <div className="mt-2" style={{ fontSize: "12px", lineHeight: 1.6, color: "#666" }}>
               Learn more in{" "}
               <Link href={aboutHref} className="text-decoration-underline">
                  About Us
               </Link>
               .
            </div>
         </>
      );
   };

   return (
      <>
         <div className="footer-three">
            <div className="container container-large">
               <div className="bg-wrapper position-relative z-1">
                  <div className="row">
                     <div className="col-lg-12 mb-40 lg-mb-60">
                        <div className="footer-intro pe-xxl-5 pe-xl-3">
                           <div className="logo mb-20">
                              <Link href={homeHref}>
                                 <Image src={footerLogo} alt="LC Inmobiliaria" />
                              </Link>
                           </div>
                           <ul className="style-none d-flex align-items-center social-icon">
                              <li>
                                 <Link href="https://www.facebook.com/share/194twPujV3/?mibextid=wwXIfr" target="_blank">
                                    <i className="fa-brands fa-facebook-f"></i>
                                 </Link>
                              </li>
                              <li>
                                 <Link href="https://www.instagram.com/lcinmobiliaria.mx?igsh=MW82MG5qc29jaHNmOA==" target="_blank">
                                    <i className="fa-brands fa-instagram"></i>
                                 </Link>
                              </li>
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="bottom-footer">
                  <p className="m0 text-center" style={{ fontSize: "14px" }}>
                     {copyrightMap[locale]}
                  </p>
                  {renderFooterCopy()}
               </div>
            </div>
         </div>

         {showCookies && (
            <div
               className="position-fixed w-100 bg-dark text-white p-3"
               style={{
                  bottom: 0,
                  left: 0,
                  zIndex: 1040,
               }}
            >
               <div className="container">
                  <div className="row align-items-center">
                     <div className="col-md-8">
                        <div className="d-flex align-items-center">
                           <span className="me-2" style={{ fontSize: "18px" }}>🍪</span>
                           <div>
                              <strong style={{ fontSize: "16px" }}>
                                 {cookieTitleMap[locale]}
                              </strong>
                              <p className="mb-0" style={{ fontSize: "14px" }}>
                                 {cookieDescription}{" "}
                                 <Link href={cookiesHref} className="text-decoration-underline text-warning">
                                    {cookiePolicyLabelMap[locale]}
                                 </Link>
                                 .
                              </p>
                           </div>
                        </div>
                     </div>
                     <div className="col-md-4 text-end">
                        <div className="d-flex gap-2 justify-content-end">
                           <button
                              onClick={() => {
                                 localStorage.setItem("lc-cookie-consent", "rejected");
                                 setShowCookies(false);
                              }}
                              className="btn btn-outline-light btn-sm"
                              style={{ fontSize: "12px" }}
                           >
                              {rejectLabelMap[locale]}
                           </button>
                           <button
                              onClick={() => {
                                 localStorage.setItem("lc-cookie-consent", "accepted");
                                 setShowCookies(false);
                              }}
                              className="btn btn-warning btn-sm text-dark"
                              style={{ fontSize: "12px" }}
                           >
                              {acceptLabelMap[locale]}
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </>
   )
}

export default FooterThree
