"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import footerLogo from "@/assets/images/logo/logo_06.svg"
import footerShape_1 from "@/assets/images/shape/shape_52.svg"

const FooterThree = () => {
   const [showPrivacy, setShowPrivacy] = useState(false);

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

                  {/* Legal */}
                  <div className="col-lg-3 col-md-6 mb-30">
                     <div className="footer-nav">
                        <h5 className="footer-title">Legal</h5>
                        <ul className="footer-nav-link style-none">
                           <li>
                              <button
                                 onClick={() => setShowPrivacy(!showPrivacy)}
                                 className="btn btn-link p-0"
                              >
                                 Aviso de Privacidad
                              </button>
                           </li>
                        </ul>
                     </div>
                  </div>

                  {/* Boletín */}
                  <div className="col-xl-6 col-lg-6 col-md-6 mb-30">
                     <h5 className="footer-title">Boletín</h5>
                     <p className="pt-5">Suscríbete y recibe noticias importantes regularmente</p>
                     <form onSubmit={(e) => e.preventDefault()} className="newsletter-form position-relative">
                        <input type="email" placeholder="Ingresa tu correo electrónico" />
                        <button className="fw-500 fs-16 text-white tran3s">Enviar</button>
                     </form>
                     <span className="fs-14 opacity-75">Solo enviamos correos interesantes y relevantes.</span>
                  </div>
               </div>

               {/* Contenido dinámico: Aviso de Privacidad + Cookies */}
               {showPrivacy && (
                  <div className="mt-4 p-4 border rounded bg-light text-dark">
                     <h4>Aviso de Privacidad</h4>
                     <p>
                        LC INMOBILIARIA es responsable del tratamiento de los datos personales que
                        usted nos proporcione, en cumplimiento con las siguientes normativas:
                     </p>
                     <ul>
                        <li>
                           <strong>México:</strong> Ley Federal de Protección de Datos Personales
                           en Posesión de los Particulares (LFPDPPP) y el ejercicio de los
                           Derechos ARCO (Acceso, Rectificación, Cancelación y Oposición).
                        </li>
                        <li>
                           <strong>Estados Unidos:</strong> California Consumer Privacy Act
                           (CCPA/CPRA), que le otorga derechos sobre el acceso, eliminación y
                           portabilidad de su información personal.
                        </li>
                        <li>
                           <strong>Unión Europea:</strong> Reglamento General de Protección de
                           Datos (RGPD), incluyendo los derechos de acceso, rectificación,
                           supresión, limitación, portabilidad y oposición.
                        </li>
                     </ul>
                     <p>
                        Los datos que recabamos serán utilizados únicamente para fines
                        relacionados con la prestación de servicios inmobiliarios, atención al
                        cliente, envío de información comercial y cumplimiento de obligaciones
                        legales. No compartimos su información con terceros sin su consentimiento
                        expreso, salvo por requerimiento de autoridad competente o mandato legal.
                     </p>
                     <p>
                        Usted puede ejercer en cualquier momento sus derechos ARCO, así como los
                        derechos reconocidos en CCPA y RGPD, escribiendo a{" "}
                        <a href="mailto:ventas@lcinmobiliaria.com.mx">
                           ventas@lcinmobiliaria.com.mx
                        </a>.
                     </p>

                     <h5 className="mt-3">Política de Cookies</h5>
                     <p>
                        Este sitio utiliza cookies propias y de terceros con el objetivo de
                        mejorar su experiencia de navegación, personalizar el contenido y analizar
                        el tráfico. Usted puede configurar su navegador para rechazar el uso de
                        cookies; sin embargo, algunas funcionalidades del sitio pueden no estar
                        disponibles. Al continuar navegando en nuestro sitio web, usted acepta el
                        uso de cookies conforme a la presente política.
                     </p>
                  </div>
               )}
            </div>

            {/* Bottom */}
            <div className="bottom-footer mt-4">
               <div className="d-md-flex justify-content-center justify-content-md-between align-items-center">
                  <ul className="style-none bottom-nav d-flex justify-content-center">
                     <li>
                        <button
                           onClick={() => setShowPrivacy(!showPrivacy)}
                           className="btn btn-link p-0"
                        >
                           Aviso de Privacidad
                        </button>
                     </li>
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
