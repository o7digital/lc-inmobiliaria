"use client"
import Image from "next/image"
import Link from "next/link"
import footerLogo from "@/assets/images/logo/logo_06.svg"
import footerShape_1 from "@/assets/images/shape/shape_52.svg"

const FooterThree = () => {
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
                           <li><Link href="/terms">Términos & Condiciones</Link></li>
                           <li><Link href="/cookie">Cookie</Link></li>
                           <li><Link href="/privacy">Política de Privacidad</Link></li>
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
            <div className="bottom-footer">
               <div className="d-md-flex justify-content-center justify-content-md-between align-items-center">
                  <ul className="style-none bottom-nav d-flex justify-content-center">
                     <li><Link href="/faq">Privacidad y Términos</Link></li>
                     <li><Link href="/contact">Contáctanos</Link></li>
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
