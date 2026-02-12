import ContactForm from "@/components/forms/ContactForm";

type Locale = "es" | "en";

const ContactArea = ({ locale = "es" }: { locale?: Locale }) => {
   const isEnglish = locale === "en";

   return (
      <div className="contact-us mt-130 xl-mt-100 pt-80 lg-pt-60 pb-150 xl-pb-120">
         <div className="container">
            <div className="row">
               <div className="col-xxl-8 col-xl-9 col-lg-10 m-auto">
                  <div className="title-one text-center wow fadeInUp mb-50">
                     <h3>
                        {isEnglish
                           ? "Questions? Feel free to contact us."
                           : "¿Preguntas? No dudes en contactarnos"}
                     </h3>
                  </div>
                  <div className="form-style-one wow fadeInUp">
                     <ContactForm locale={locale} />
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ContactArea
