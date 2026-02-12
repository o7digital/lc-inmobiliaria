"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import footerLogo from "@/assets/images/logo/logo_06.svg"

type Locale = "es" | "en";

type FooterThreeProps = {
   locale?: Locale;
};

const FooterThree = ({ locale = "es" }: FooterThreeProps) => {
   const [showCookies, setShowCookies] = useState(() => {
      if (typeof window === "undefined") return true;
      return localStorage.getItem("lc-cookie-consent") !== "accepted";
   });

   const isEnglish = locale === "en";
   const homeHref = isEnglish ? "/en" : "/";
   const propertiesHref = isEnglish ? "/en/properties" : "/listing_06_directus";
   const servicesHref = isEnglish ? "/en/services" : "/servicios";
   const consultingHref = isEnglish ? "/en/consulting" : "/consultoria";
   const aboutHref = isEnglish ? "/en/about-us" : "/quienes-somos";
   const cookiesHref = isEnglish ? "/en/cookies-policy" : "/cookies";

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
                     {isEnglish
                        ? "Copyright ©2025 LC INMOBILIARIA. All rights reserved."
                        : "Copyright ©2025 LC INMOBILIARIA. Todos los derechos reservados."}
                  </p>

                  {!isEnglish && (
                     <>
                        <div className="mt-3" style={{ fontSize: "12px", lineHeight: 1.6, color: "#666" }}>
                           LC Inmobiliaria es una <strong>agencia inmobiliaria en CDMX</strong> especializada en{" "}
                           <strong>venta y renta de propiedades</strong> residenciales y de lujo en CDMX y Estado de
                           México. Acompañamos a quienes buscan <strong>inmobiliaria CDMX venta de casas</strong>,{" "}
                           <strong>venta de departamentos CDMX</strong> o <strong>renta de departamentos CDMX</strong>, con
                           presencia en zonas como Polanco, Lomas de Chapultepec, Reforma, Interlomas, Santa Fe,
                           Naucalpan, Atizapán y Huixquilucan. Consulta nuestras{" "}
                           <Link href={propertiesHref} className="text-decoration-underline">
                              propiedades en venta y renta en CDMX
                           </Link>{" "}
                           y el Estado de México, así como nuestros{" "}
                           <Link href={servicesHref} className="text-decoration-underline">
                              servicios inmobiliarios
                           </Link>{" "}
                           y{" "}
                           <Link href={consultingHref} className="text-decoration-underline">
                              consultoría estratégica para inversionistas
                           </Link>
                           .
                        </div>
                        <div className="mt-2" style={{ fontSize: "12px", lineHeight: 1.6, color: "#666" }}>
                           Te orientamos sobre las <strong>mejores zonas para vivir en CDMX</strong>, así como sobre el
                           costo de departamentos en Polanco, departamentos nuevos en CDMX, casas nuevas en Estado de
                           México y desarrollos inmobiliarios CDMX en preventa. Nuestro equipo comparte contenido
                           sobre <strong>bienes raíces México</strong>, casas en México, departamentos en México, vivir
                           en CDMX, colonias seguras CDMX y costo de vida CDMX. Conócenos mejor en la sección{" "}
                           <Link href={aboutHref} className="text-decoration-underline">
                              Quiénes Somos
                           </Link>
                           .
                        </div>
                     </>
                  )}

                  {isEnglish && (
                     <>
                        <div className="mt-3" style={{ fontSize: "12px", lineHeight: 1.6, color: "#666" }}>
                           LC Inmobiliaria is a <strong>real estate agency in Mexico City</strong> specialized in{" "}
                           <strong>residential and luxury property sales and rentals</strong> across Mexico City and the
                           State of Mexico. We support clients looking to buy, sell, or rent homes and apartments in
                           key areas such as Polanco, Lomas de Chapultepec, Reforma, Interlomas, Santa Fe, Naucalpan,
                           Atizapan, and Huixquilucan. Explore our{" "}
                           <Link href={propertiesHref} className="text-decoration-underline">
                              properties for sale and rent
                           </Link>{" "}
                           and discover our{" "}
                           <Link href={servicesHref} className="text-decoration-underline">
                              real estate services
                           </Link>{" "}
                           and{" "}
                           <Link href={consultingHref} className="text-decoration-underline">
                              strategic consulting for investors
                           </Link>
                           .
                        </div>
                        <div className="mt-2" style={{ fontSize: "12px", lineHeight: 1.6, color: "#666" }}>
                           We also guide clients on the <strong>best neighborhoods to live in Mexico City</strong>,
                           price ranges by area, and pre-sale real estate opportunities. Learn more about our team and
                           background in the{" "}
                           <Link href={aboutHref} className="text-decoration-underline">
                              About Us
                           </Link>{" "}
                           section.
                        </div>
                     </>
                  )}
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
                                 {isEnglish ? "Cookie Usage" : "Uso de Cookies"}
                              </strong>
                              <p className="mb-0" style={{ fontSize: "14px" }}>
                                 {isEnglish ? (
                                    <>
                                       We use cookies to improve your experience, analyze traffic, and personalize
                                       content. By continuing to browse, you accept our cookie usage according to our{" "}
                                       <Link href={cookiesHref} className="text-decoration-underline text-warning">
                                          Cookies Policy
                                       </Link>
                                       .
                                    </>
                                 ) : (
                                    <>
                                       Utilizamos cookies para mejorar su experiencia en nuestro sitio web, analizar
                                       el tráfico y personalizar el contenido. Al continuar navegando, acepta nuestro
                                       uso de cookies según nuestra{" "}
                                       <Link href={cookiesHref} className="text-decoration-underline text-warning">
                                          Política de Cookies
                                       </Link>
                                       .
                                    </>
                                 )}
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
                              {isEnglish ? "✕ Reject" : "✕ Rechazar"}
                           </button>
                           <button
                              onClick={() => {
                                 localStorage.setItem("lc-cookie-consent", "accepted");
                                 setShowCookies(false);
                              }}
                              className="btn btn-warning btn-sm text-dark"
                              style={{ fontSize: "12px" }}
                           >
                              {isEnglish ? "✓ Accept All" : "✓ Aceptar Todo"}
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
