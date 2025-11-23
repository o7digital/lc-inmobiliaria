"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { toast } from 'react-toastify'
import footerLogo from "@/assets/images/logo/logo_06.svg"

const FooterThree = () => {
   const [showCookies, setShowCookies] = useState(true);
   const [email, setEmail] = useState("");

   const handleNewsletterSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      if (!email || !email.includes('@')) {
         toast.error('Por favor ingresa un correo electrónico válido', { position: 'top-center' });
         return;
      }

      try {
         // Aquí puedes agregar la lógica para guardar el email en tu base de datos
         // Por ahora, solo mostramos el mensaje de confirmación
         toast.success('¡Gracias! Te has inscrito correctamente a nuestro newsletter', { 
            position: 'top-center',
            autoClose: 5000
         });
         setEmail("");
      } catch (error) {
         toast.error('Hubo un error. Por favor intenta de nuevo', { position: 'top-center' });
      }
   };

   return (
      <>
         <div className="footer-three">
            <div className="container container-large">
               <div className="bg-wrapper position-relative z-1">
                  <div className="row">
                     {/* Logo seul */}
                     <div className="col-lg-12 mb-40 lg-mb-60">
                        <div className="footer-intro pe-xxl-5 pe-xl-3">
                           <div className="logo mb-20">
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
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Bottom Footer */}
               <div className="bottom-footer">
                  <p className="m0 text-center" style={{fontSize: '14px'}}>
                     Copyright ©2025 LC INMOBILIARIA. Todos los derechos reservados.
                  </p>
                  <div
                     className="mt-3"
                     style={{ fontSize: '12px', lineHeight: 1.6, color: '#666' }}
                  >
                     LC Inmobiliaria es una{" "}
                     <strong>agencia inmobiliaria en CDMX</strong> especializada en{" "}
                     <strong>venta y renta de propiedades</strong> residenciales y de lujo
                     en CDMX y Estado de México. Acompañamos a quienes buscan{" "}
                     <strong>inmobiliaria CDMX venta de casas</strong>,{" "}
                     <strong>venta de departamentos CDMX</strong> o{" "}
                     <strong>renta de departamentos CDMX</strong>, con presencia en zonas como
                     Polanco, Lomas de Chapultepec, Reforma, Interlomas, Santa Fe, Naucalpan,
                     Atizapán y Huixquilucan. Consulta nuestras{" "}
                     <Link href="/listing_06_directus" className="text-decoration-underline">
                        propiedades en venta y renta en CDMX
                     </Link>{" "}
                     y el Estado de México, así como nuestros{" "}
                     <Link href="/servicios" className="text-decoration-underline">
                        servicios inmobiliarios
                     </Link>{" "}
                     y{" "}
                     <Link href="/consultoria" className="text-decoration-underline">
                        consultoría estratégica para inversionistas
                     </Link>
                     .
                  </div>
                  <div
                     className="mt-2"
                     style={{ fontSize: '12px', lineHeight: 1.6, color: '#666' }}
                  >
                     Te orientamos sobre las{" "}
                     <strong>mejores zonas para vivir en CDMX</strong>, así como sobre el costo de
                     departamentos en Polanco, departamentos nuevos en CDMX, casas nuevas en Estado
                     de México y desarrollos inmobiliarios CDMX en preventa. Nuestro equipo comparte
                     contenido sobre{" "}
                     <strong>bienes raíces México</strong>, casas en México, departamentos en México,
                     vivir en CDMX, colonias seguras CDMX y costo de vida CDMX.
                     Conócenos mejor en la sección{" "}
                     <Link href="/quienes-somos" className="text-decoration-underline">
                        Quiénes Somos
                     </Link>
                     .
                  </div>
               </div>
            </div>
         </div>

         {/* Banner Cookies */}
         {showCookies && (
            <div 
               className="position-fixed w-100 bg-dark text-white p-3"
               style={{
                  bottom: 0,
                  left: 0,
                  zIndex: 1040
               }}
            >
               <div className="container">
                  <div className="row align-items-center">
                     <div className="col-md-8">
                        <div className="d-flex align-items-center">
                           <span className="me-2" style={{fontSize: '18px'}}>🍪</span>
                           <div>
                              <strong style={{fontSize: '16px'}}>Uso de Cookies</strong>
                              <p className="mb-0" style={{fontSize: '14px'}}>
                                 Utilizamos cookies para mejorar su experiencia en nuestro sitio web, analizar el tráfico y personalizar el contenido. Al continuar navegando, acepta nuestro uso de cookies según nuestra{' '}
                                 <Link href="/cookies" className="text-decoration-underline text-warning">Política de Cookies</Link>.
                              </p>
                           </div>
                        </div>
                     </div>
                     <div className="col-md-4 text-end">
                        <div className="d-flex gap-2 justify-content-end">
                           <button 
                              onClick={() => setShowCookies(false)}
                              className="btn btn-outline-light btn-sm"
                              style={{fontSize: '12px'}}
                           >
                              ✕ Rechazar
                           </button>
                           <button 
                              onClick={() => setShowCookies(false)}
                              className="btn btn-outline-warning btn-sm"
                              style={{fontSize: '12px'}}
                           >
                              ⚙️ Personalizar
                           </button>
                           <button 
                              onClick={() => setShowCookies(false)}
                              className="btn btn-warning btn-sm text-dark"
                              style={{fontSize: '12px'}}
                           >
                              ✓ Aceptar Todo
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
