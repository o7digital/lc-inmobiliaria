"use client"
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SiteLocale } from "@/types/siteLocale";

interface FormData {
   user_name: string;
   user_email: string;
   message: string;
}

const schema = yup
   .object({
      user_name: yup.string().required().label("Name"),
      user_email: yup.string().required().email().label("Email"),
      message: yup.string().required().label("Message"),
   })
   .required();

const ContactForm = ({ locale = "es" }: { locale?: SiteLocale }) => {
   const copyMap: Record<SiteLocale, { sent: string; title: string; name: string; namePlaceholder: string; email: string; emailPlaceholder: string; messagePlaceholder: string; button: string }> = {
      es: {
         sent: "Mensaje enviado correctamente",
         title: "Enviar Mensaje",
         name: "Nombre*",
         namePlaceholder: "Tu Nombre*",
         email: "Correo Electrónico*",
         emailPlaceholder: "Tu Correo Electrónico*",
         messagePlaceholder: "Tu mensaje*",
         button: "Enviar Mensaje",
      },
      en: {
         sent: "Message sent successfully",
         title: "Send Message",
         name: "Name*",
         namePlaceholder: "Your Name*",
         email: "Email*",
         emailPlaceholder: "Your Email*",
         messagePlaceholder: "Your message*",
         button: "Send Message",
      },
      fr: {
         sent: "Message envoye avec succes",
         title: "Envoyer un Message",
         name: "Nom*",
         namePlaceholder: "Votre nom*",
         email: "E-mail*",
         emailPlaceholder: "Votre e-mail*",
         messagePlaceholder: "Votre message*",
         button: "Envoyer",
      },
      it: {
         sent: "Messaggio inviato con successo",
         title: "Invia Messaggio",
         name: "Nome*",
         namePlaceholder: "Il tuo nome*",
         email: "Email*",
         emailPlaceholder: "La tua email*",
         messagePlaceholder: "Il tuo messaggio*",
         button: "Invia Messaggio",
      },
      de: {
         sent: "Nachricht erfolgreich gesendet",
         title: "Nachricht senden",
         name: "Name*",
         namePlaceholder: "Ihr Name*",
         email: "E-Mail*",
         emailPlaceholder: "Ihre E-Mail*",
         messagePlaceholder: "Ihre Nachricht*",
         button: "Nachricht senden",
      },
   };
   const copy = copyMap[locale];
   const { register, handleSubmit, reset, formState: { errors }, } = useForm<FormData>({
      resolver: yupResolver(schema),
   });

   const form = useRef<HTMLFormElement>(null);

   const sendEmail = (_data: FormData) => {
      if (form.current) {
         emailjs.sendForm("service_070078r", "template_lojvsvb", form.current, "mtLgOuG25NnIwGeKm")
            .then((result) => {
               toast(copy.sent, {
                  position: "top-center",
               });
               reset();
               console.log(result.text);
            }, (error) => {
               console.log(error.text);
            });
      } else {
         console.error("Form reference is null");
      }
   };

   return (
      <form ref={form} onSubmit={handleSubmit(sendEmail)}>
         <h3>{copy.title}</h3>
         <div className="messages"></div>
         <div className="row controls">
            <div className="col-12">
               <div className="input-group-meta form-group mb-30">
                  <label htmlFor="">{copy.name}</label>
                  <input
                     type="text"
                     {...register("user_name")}
                     name="user_name"
                     placeholder={copy.namePlaceholder}
                  />
                  <p className="form_error">{errors.user_name?.message}</p>
               </div>
            </div>
            <div className="col-12">
               <div className="input-group-meta form-group mb-40">
                  <label htmlFor="">{copy.email}</label>
                  <input
                     type="email"
                     {...register("user_email")}
                     placeholder={copy.emailPlaceholder}
                     name="user_email"
                  />
                  <p className="form_error">{errors.user_email?.message}</p>
               </div>
            </div>
            <div className="col-12">
               <div className="input-group-meta form-group mb-35">
                  <textarea
                     {...register("message")}
                     placeholder={copy.messagePlaceholder}
                     rows={6}
                  ></textarea>
                  <p className="form_error">{errors.message?.message}</p>
               </div>
            </div>
            <div className="col-12">
               <button type="submit" className="btn-nine text-uppercase rounded-3 fw-normal w-100">
                  {copy.button}
               </button>
            </div>
         </div>
      </form>
   )
}

export default ContactForm
