"use client"
import Image from "next/image"
import { useState, useRef } from "react"
import { toast } from 'react-toastify'
import emailjs from '@emailjs/browser'

import titleShape from "@/assets/images/shape/title_shape_06.svg";
import featureThumb from "@/assets/images/assets/screen_12.png";
import Link from "next/link";
import { SiteLocale, getLocalePrefix } from "@/types/siteLocale";

const BLockFeatureFour = ({ locale = "es" }: { locale?: SiteLocale }) => {
   const [email, setEmail] = useState("");
   const formRef = useRef<HTMLFormElement>(null);
   const localePrefix = getLocalePrefix(locale);
   const contactHref = locale === "es" ? "/contact" : `${localePrefix}/contact`;
   const copyMap = {
      es: {
         invalidEmail: "Por favor ingresa un correo electrónico válido",
         success: "¡Gracias! Hemos tomado tus datos. Te contactaremos pronto.",
         error: "Hubo un error. Por favor intenta de nuevo",
         upperTitle: "AVALUOS",
         h3Prefix: "Avaluos ",
         h3Highlight: "realizados",
         h3Suffix: " de su propriedad.",
         description: "Evalua tu Propriedad y accede al mercado Inmobiliario con Seguridad y Vsion.",
         hiddenMessage: "Solicitud de avalúo de propiedad",
         hiddenName: "Cliente interesado en avalúo",
         button: "Find out",
         contactPrefix: "*Para informacion precisa por favor ",
         contactLink: "contactanos.",
         appraisalsFrom: "Su Avaluo desde:",
      },
      en: {
         invalidEmail: "Please enter a valid email address",
         success: "Thank you! We received your details. We will contact you soon.",
         error: "There was an error. Please try again.",
         upperTitle: "APPRAISALS",
         h3Prefix: "Property ",
         h3Highlight: "appraisals",
         h3Suffix: " for your asset.",
         description: "Evaluate your property and access the real estate market with confidence.",
         hiddenMessage: "Property appraisal request",
         hiddenName: "Client interested in appraisal",
         button: "Get started",
         contactPrefix: "*For accurate information please ",
         contactLink: "contact us.",
         appraisalsFrom: "Appraisals from:",
      },
      fr: {
         invalidEmail: "Veuillez saisir une adresse e-mail valide",
         success: "Merci ! Nous avons bien recu vos informations.",
         error: "Une erreur est survenue. Veuillez reessayer.",
         upperTitle: "ESTIMATIONS",
         h3Prefix: "Estimations ",
         h3Highlight: "immobilieres",
         h3Suffix: " pour votre bien.",
         description: "Evaluez votre bien et accedez au marche immobilier en toute confiance.",
         hiddenMessage: "Demande d'estimation immobiliere",
         hiddenName: "Client interesse par une estimation",
         button: "Commencer",
         contactPrefix: "*Pour une information precise, ",
         contactLink: "contactez-nous.",
         appraisalsFrom: "Estimation a partir de:",
      },
      it: {
         invalidEmail: "Inserisci un indirizzo email valido",
         success: "Grazie! Abbiamo ricevuto i tuoi dati.",
         error: "Si e verificato un errore. Riprova.",
         upperTitle: "VALUTAZIONI",
         h3Prefix: "Valutazioni ",
         h3Highlight: "immobiliari",
         h3Suffix: " per il tuo immobile.",
         description: "Valuta la tua proprieta e accedi al mercato immobiliare in sicurezza.",
         hiddenMessage: "Richiesta di valutazione immobiliare",
         hiddenName: "Cliente interessato alla valutazione",
         button: "Inizia",
         contactPrefix: "*Per informazioni precise, ",
         contactLink: "contattaci.",
         appraisalsFrom: "Valutazioni da:",
      },
      de: {
         invalidEmail: "Bitte geben Sie eine gueltige E-Mail-Adresse ein",
         success: "Vielen Dank! Wir haben Ihre Daten erhalten.",
         error: "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.",
         upperTitle: "BEWERTUNGEN",
         h3Prefix: "Immobilien-",
         h3Highlight: "bewertung",
         h3Suffix: " fuer Ihre Immobilie.",
         description: "Bewerten Sie Ihre Immobilie und treten Sie sicher in den Markt ein.",
         hiddenMessage: "Anfrage fuer Immobilienbewertung",
         hiddenName: "Kunde mit Interesse an Bewertung",
         button: "Starten",
         contactPrefix: "*Fuer genaue Informationen ",
         contactLink: "kontaktieren Sie uns.",
         appraisalsFrom: "Bewertung ab:",
      },
   } as const;
   const copy = copyMap[locale];

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      if (!email || !email.includes('@')) {
         toast.error(copy.invalidEmail, { position: 'top-center' });
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
            
            toast.success(copy.success, {
               position: 'top-center',
               autoClose: 5000
            });
            setEmail("");
         } catch (error) {
            toast.error(copy.error, { position: 'top-center' });
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
                        <div className="upper-title">{copy.upperTitle}</div>
                        <h3>
                           {copy.h3Prefix}
                           <span>
                              {copy.h3Highlight}
                              <Image src={titleShape} alt="" className="lazy-img" />
                           </span>
                           {copy.h3Suffix}
                        </h3>
                        <p className="fs-24 color-dark">{copy.description}</p>
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
                           value={copy.hiddenMessage}
                        />
                        <input
                           type="hidden"
                           name="user_name"
                           value={copy.hiddenName}
                        />
                        <button type="submit">{copy.button}</button>
                     </form>
                     <div className="fs-16 mt-10 opacity-75">
                        {copy.contactPrefix}
                        <Link href={contactHref} className="fst-italic color-dark text-decoration-underline">
                           {copy.contactLink}
                        </Link>
                     </div>
                  </div>
               </div>

               <div className="col-lg-6 d-flex">
                  <div className="img-gallery position-relative z-1 w-100 h-100 me-lg-5 wow fadeInLeft">
                     <div className="img-bg" style={{ backgroundImage: `url(/assets/images/media/img_11.jpg)` }}></div>
                     <div className="card-one">
                        <div className="text text-center z-1">
                           <h6>{copy.appraisalsFrom}</h6>
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
