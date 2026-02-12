"use client"
import Image from "next/image"
import { useState, useRef } from "react"
import { toast } from 'react-toastify'
import emailjs from '@emailjs/browser'

import titleShape from "@/assets/images/shape/title_shape_06.svg";
import featureThumb from "@/assets/images/assets/screen_12.png";
import Link from "next/link";

type Locale = "es" | "en";

const BLockFeatureFour = ({ locale = "es" }: { locale?: Locale }) => {
   const [email, setEmail] = useState("");
   const formRef = useRef<HTMLFormElement>(null);
   const isEnglish = locale === "en";
   const contactHref = isEnglish ? "/en/contact" : "/contact";

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      if (!email || !email.includes('@')) {
         toast.error(
            isEnglish
               ? "Please enter a valid email address"
               : "Por favor ingresa un correo electrónico válido",
            { position: 'top-center' },
         );
         return;
      }

      if (formRef.current) {
         try {
            await emailjs.sendForm(
               'service_070078r', 
               'template_lojvsvb', 
               formRef.current, 
               'mtLgOuG25NnIwGeKm'
            );
            
            toast.success(
               isEnglish
                  ? "Thank you! We received your details. We will contact you soon."
                  : "¡Gracias! Hemos tomado tus datos. Te contactaremos pronto.",
               {
               position: 'top-center',
               autoClose: 5000
               },
            );
            setEmail("");
         } catch (error) {
            toast.error(
               isEnglish ? "There was an error. Please try again." : "Hubo un error. Por favor intenta de nuevo",
               { position: 'top-center' },
            );
            console.error('Error:', error);
         }
      }
   };

   return (
      <div className="block-feature-four mt-170 xl-mt-130 md-mt-40">
         <div className="container">
            <div className="row">
               <div className="col-lg-6 d-flex order-lg-last">
                  <div className="ps-xxl-5 ms-xl-4 pt-100 xl-pt-80 pb-45 w-100 h-100 wow fadeInRight">
                     <div className="title-one mb-60 lg-mb-40">
                        <div className="upper-title">{isEnglish ? "APPRAISALS" : "AVALUOS"}</div>
                        <h3>
                           {isEnglish ? "Property " : "Avaluos "}
                           <span>
                              {isEnglish ? "appraisals" : "realizados"}
                              <Image src={titleShape} alt="" className="lazy-img" />
                           </span>
                           {isEnglish ? " for your asset." : " de su propriedad."}
                        </h3>
                        <p className="fs-24 color-dark">
                           {isEnglish
                              ? "Evaluate your property and access the real estate market with confidence."
                              : "Evalua tu Propriedad y accede al mercado Inmobiliario con Seguridad y Vsion."}
                        </p>
                     </div>
                     <form ref={formRef} onSubmit={handleSubmit} className="me-xl-4">
                        <input 
                           type="email" 
                           name="user_email"
                           placeholder="Your Email Address..." 
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           required
                        />
                        <input
                           type="hidden"
                           name="message"
                           value={isEnglish ? "Property appraisal request" : "Solicitud de avalúo de propiedad"}
                        />
                        <input
                           type="hidden"
                           name="user_name"
                           value={isEnglish ? "Client interested in appraisal" : "Cliente interesado en avalúo"}
                        />
                        <button type="submit">{isEnglish ? "Get started" : "Find out"}</button>
                     </form>
                     <div className="fs-16 mt-10 opacity-75">
                        {isEnglish ? "*For accurate information please " : "*Para informacion precisa por favor "}
                        <Link href={contactHref} className="fst-italic color-dark text-decoration-underline">
                           {isEnglish ? "contact us." : "contactanos."}
                        </Link>
                     </div>
                  </div>
               </div>

               <div className="col-lg-6 d-flex">
                  <div className="img-gallery position-relative z-1 w-100 h-100 me-lg-5 wow fadeInLeft">
                     <div className="img-bg" style={{ backgroundImage: `url(/assets/images/media/img_11.jpg)` }}></div>
                     <div className="card-one">
                        <div className="text text-center z-1">
                           <h6>{isEnglish ? "Appraisals from:" : "Su Avaluo desde:"}</h6>
                           <h3>$2900.00</h3>
                        </div>
                        <Image src={featureThumb} alt="" className="lazy-img w-100" />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default BLockFeatureFour
