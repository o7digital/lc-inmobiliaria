"use client"
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface FormData {
   user_name: string;
   user_email: string;
   message: string;
}

type Locale = "es" | "en";

const schema = yup
   .object({
      user_name: yup.string().required().label("Name"),
      user_email: yup.string().required().email().label("Email"),
      message: yup.string().required().label("Message"),
   })
   .required();

const ContactForm = ({ locale = "es" }: { locale?: Locale }) => {
   const isEnglish = locale === "en";
   const { register, handleSubmit, reset, formState: { errors }, } = useForm<FormData>({
      resolver: yupResolver(schema),
   });

   const form = useRef<HTMLFormElement>(null);

   const sendEmail = (_data: FormData) => {
      if (form.current) {
         emailjs.sendForm("service_070078r", "template_lojvsvb", form.current, "mtLgOuG25NnIwGeKm")
            .then((result) => {
               toast(isEnglish ? "Message sent successfully" : "Mensaje enviado correctamente", {
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
         <h3>{isEnglish ? "Send Message" : "Enviar Mensaje"}</h3>
         <div className="messages"></div>
         <div className="row controls">
            <div className="col-12">
               <div className="input-group-meta form-group mb-30">
                  <label htmlFor="">{isEnglish ? "Name*" : "Nombre*"}</label>
                  <input
                     type="text"
                     {...register("user_name")}
                     name="user_name"
                     placeholder={isEnglish ? "Your Name*" : "Tu Nombre*"}
                  />
                  <p className="form_error">{errors.user_name?.message}</p>
               </div>
            </div>
            <div className="col-12">
               <div className="input-group-meta form-group mb-40">
                  <label htmlFor="">{isEnglish ? "Email*" : "Correo Electrónico*"}</label>
                  <input
                     type="email"
                     {...register("user_email")}
                     placeholder={isEnglish ? "Your Email*" : "Tu Correo Electrónico*"}
                     name="user_email"
                  />
                  <p className="form_error">{errors.user_email?.message}</p>
               </div>
            </div>
            <div className="col-12">
               <div className="input-group-meta form-group mb-35">
                  <textarea
                     {...register("message")}
                     placeholder={isEnglish ? "Your message*" : "Tu mensaje*"}
                     rows={6}
                  ></textarea>
                  <p className="form_error">{errors.message?.message}</p>
               </div>
            </div>
            <div className="col-12">
               <button type="submit" className="btn-nine text-uppercase rounded-3 fw-normal w-100">
                  {isEnglish ? "Send Message" : "Enviar Mensaje"}
               </button>
            </div>
         </div>
      </form>
   )
}

export default ContactForm
