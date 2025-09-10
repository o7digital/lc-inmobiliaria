"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import footerLogo from "@/assets/images/logo/logo_06.svg"
import footerShape_1 from "@/assets/images/shape/shape_52.svg"

const FooterThree = () => {
   const [activeSection, setActiveSection] = useState<string | null>(null);

   const toggleSection = (section: string) => {
      setActiveSection(activeSection === section ? null : section);
   };

   return (
      <div className="footer-three">
         <div className="container container-large">
            <div className="bg-wrapper position-relative z-1">
               <div className="row">
                  {/* Logo + Redes Sociales */}
                  <div className="col-xl-3 mb-40 lg-mb-60">
                     <div className="footer-intro pe-xxl-5 pe-xl-3">
                        <div className="logo mb-15">
                           <Link href="/">
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
                           {/* TikTok pendiente */}
                        </ul>
                        <Image src={footerShape_1} alt="" className="lazy-img ms-auto d-none d-xl-block" />
                     </div>
                  </div>

                  {/* Links */}
                  <div className="col-lg-2 col-md-6 mb-30">
                     <div className="footer-nav">
                        <h5 className="footer-title">Links</h5>
                        <ul className="footer-nav-link style-none">
                           <li><Link href="/">Inicio</Link></li>
                        </ul>
                     </div>
                  </div>

                  {/* Propiedades */}
                  <div className="col-lg-2 col-md-6 mb-30">
                     <div className="footer-nav">
                        <h5 className="footer-title">Propiedades</h5>
                        <ul className="footer-nav-link style-none">
                           <li><Link href="/properties">Ver Propiedades</Link></li>
                        </ul>
                     </div>
                  </div>

                  {/* Legal */}
                  <div className="col-lg-2 col-md-6 mb-30">
                     <div className="footer-nav">
                        <h5 className="footer-title">Legal</h5>
                        <ul className="footer-nav-link style-none">
                           <li><button onClick={() => toggleSection("privacy")} className="btn btn-link p-0">Aviso de Privacidad</button></li>
                           <li><button onClick={() => toggleSection("terms")} className="btn btn-link p-0">Términos y Condiciones</button></li>
                           <li><button onClick={() => toggleSection("cookies")} className="btn btn-link p-0">Política de Cookies</button></li>
                        </ul>
                     </div>
                  </div>

                  {/* Boletín */}
                  <div className="col-xl-3 col-lg-4 col-md-6 mb-30">
                     <h5 className="footer-title">Boletín</h5>
                     <p className="pt-5">Suscríbete y recibe noticias importantes regularmente</p>
                     <form onSubmit={(e) => e.preventDefault()} className="newsletter-form position-relative">
                        <input type="email" placeholder="Ingresa tu correo electrónico" />
                        <button className="fw-500 fs-16 text-white tran3s">Enviar</button>
                     </form>
                     <span className="fs-14 opacity-75">Solo enviamos correos interesantes y relevantes.</span>
                  </div>
               </div>

               {/* Contenido dinámico de legal */}
               {activeSection === "privacy" && (
                  <div className="mt-4 p-4 border rounded bg-light text-dark">
                     <h4>Aviso de Privacidad</h4>
                     <p>
                        LC INMOBILIARIA es responsable del tratamiento de los datos personales en cumplimiento con la Ley 
                        Federal de Protección de Datos Personales en Posesión de los Particulares (México), la CCPA (USA) y 
                        el RGPD (UE). Usted puede ejercer sus derechos ARCO escribiendo a{" "}
                        <a href="mailto:ventas@lcinmobiliaria.com.mx">ventas@lcinmobiliaria.com.mx</a>.
                     </p>
                  </div>
               )}
               {activeSection === "terms" && (
                  <div className="mt-4 p-4 border rounded bg-light text-dark">
                     <h4>Términos y Condiciones</h4>
                     <p>
                        El acceso y uso del sitio implica la aceptación de estos términos. Todo el contenido del sitio es 
                        propiedad de LC INMOBILIARIA y no podrá ser reproducido sin autorización. LC INMOBILIARIA no se hace 
                        responsable por el contenido de enlaces externos ni garantiza que la información esté libre de errores. 
                        Este aviso se rige por las leyes de México, complementado con CCPA (USA) y RGPD (UE).
                     </p>
                  </div>
               )}
               {activeSection === "cookies" && (
                  <div className="mt-4 p-4 border rounded bg-light text-dark">
                     <h4>Política de Cookies</h4>
                     <p>
                        Este sitio utiliza cookies para mejorar la experiencia del usuario, analizar tráfico y personalizar 
                        contenido. Usted puede configurar su navegador para rechazar cookies, sin embargo algunas funciones 
                        del sitio pueden no estar disponibles. Al continuar navegando, acepta el uso de cookies de LC INMOBILIARIA.
                     </p>
                  </div>
               )}
            </div>

            {/* Bottom */}
            <div className="bottom-footer mt-4">
               <div className="d-md-flex justify-content-center justify-content-md-between align-items-center">
                  <ul className="style-none bottom-nav d-flex justify-content-center">
                     <li><button onClick={() => toggleSection("privacy")} className="btn btn-link p-0">Aviso de Privacidad</button></li>
                     <li><button onClick={() => toggleSection("terms")} className="btn btn-link p-0">Términos y Condiciones</button></li>
                     <li><button onClick={() => toggleSection("cookies")} className="btn btn-link p-0">Política de Cookies</button></li>
                  </ul>
                  <p className="mb-15 text-center text-lg-start fs-16 order-md-first">
                     Copyright ©2025 LC Inmobiliaria. Todos los derechos reservados.
                  </p>
               </div>
            </div>
         </div>
      </div>
   )
}

export default FooterThree
