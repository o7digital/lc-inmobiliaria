"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import footerLogo from "@/assets/images/logo/logo_06.svg"
import footerShape_1 from "@/assets/images/shape/shape_52.svg"

const FooterThree = () => {
   const [activeModal, setActiveModal] = useState<string | null>(null);

   const openModal = (modal: string) => setActiveModal(modal);
   const closeModal = () => setActiveModal(null);

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
                           <li><button onClick={() => openModal("privacy")} className="btn btn-link p-0">Aviso de Privacidad</button></li>
                           <li><button onClick={() => openModal("terms")} className="btn btn-link p-0">Términos y Condiciones</button></li>
                           <li><button onClick={() => openModal("cookies")} className="btn btn-link p-0">Política de Cookies</button></li>
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
            </div>

            {/* Bottom */}
            <div className="bottom-footer mt-4">
               <div className="d-md-flex justify-content-center justify-content-md-between align-items-center">
                  <ul className="style-none bottom-nav d-flex justify-content-center">
                     <li>
                        <button onClick={() => openModal("privacy")} className="btn btn-link p-0">
                           Aviso de Privacidad
                        </button>
                     </li>
                     <li>
                        <button onClick={() => openModal("terms")} className="btn btn-link p-0">
                           Términos y Condiciones
                        </button>
                     </li>
                     <li>
                        <button onClick={() => openModal("cookies")} className="btn btn-link p-0">
                           Política de Cookies
                        </button>
                     </li>
                  </ul>
                  <p className="mb-15 text-center text-lg-start fs-16 order-md-first">
                     Copyright ©2025 LC Inmobiliaria. Todos los derechos reservados.
                  </p>
               </div>
            </div>
         </div>

         {/* MODALS */}
         {activeModal && (
            <div className="modal-overlay">
               <div className="modal-content">
                  <button onClick={closeModal} className="modal-close">✕</button>

                  {activeModal === "privacy" && (
                     <>
                        <h3>Aviso de Privacidad</h3>
                        <p>
                           LC INMOBILIARIA es responsable del tratamiento de los datos personales en cumplimiento con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (México), la CCPA (EE.UU.) y el RGPD (UE).
                           Puede ejercer sus derechos ARCO escribiendo a <a href="mailto:ventas@lcinmobiliaria.com.mx">ventas@lcinmobiliaria.com.mx</a>.
                        </p>
                     </>
                  )}

                  {activeModal === "terms" && (
                     <>
                        <h3>Términos y Condiciones</h3>
                        <p>
                           El acceso y uso del sitio web de LC INMOBILIARIA implica la aceptación de estos Términos y Condiciones. 
                           El sitio tiene como finalidad proporcionar información sobre servicios inmobiliarios y propiedades en venta o renta.
                        </p>
                        <p>
                           Todos los contenidos son propiedad exclusiva de LC INMOBILIARIA y están protegidos por leyes de propiedad intelectual. 
                           El usuario se compromete a usar el sitio solo para fines lícitos. LC INMOBILIARIA no garantiza que el sitio esté libre de errores o interrupciones y no será responsable de daños derivados de su uso.
                        </p>
                     </>
                  )}

                  {activeModal === "cookies" && (
                     <>
                        <h3>Política de Cookies</h3>
                        <p>
                           Este sitio utiliza cookies para mejorar la experiencia del usuario, analizar tráfico y personalizar contenido. 
                           Al navegar en este sitio, usted acepta el uso de cookies conforme a esta política.
                        </p>
                        <p>
                           Tipos de cookies: técnicas (funcionamiento), de análisis (medición de tráfico), de personalización (preferencias) y publicitarias (anuncios relevantes). 
                           Puede configurar su navegador para bloquear cookies, pero algunas funciones pueden verse afectadas.
                        </p>
                     </>
                  )}
               </div>
            </div>
         )}
      </div>
   )
}

export default FooterThree
