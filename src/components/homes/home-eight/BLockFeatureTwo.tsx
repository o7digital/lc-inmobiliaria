import Image from "next/image"
import feature_data from "@/data/home-data/FeatureData"

type Locale = "es" | "en";

const BLockFeatureTwo = ({ locale = "es" }: { locale?: Locale }) => {
   const isEnglish = locale === "en";
   const englishCopy = [
      {
         title: "Experience",
         desc: "More than 10 years in the real estate market, with expert guidance at every step.",
      },
      {
         title: "Personalized Guidance",
         desc: "We support you from search to closing with close, personalized assistance.",
      },
      {
         title: "Wide Coverage",
         desc: "Strong presence in major metro areas with a high-quality property portfolio.",
      },
   ];

   const cards = feature_data
      .filter((items) => items.page === "home_6_feature_1")
      .map((item, index) => {
         if (!isEnglish) return item;
         return {
            ...item,
            title: englishCopy[index]?.title || item.title,
            desc: englishCopy[index]?.desc || item.desc,
         };
      });

   return (
      <div className="block-feature-fourteen pt-120 xl-pt-100 pb-140 xl-pb-100 mt-170 xl-mt-120">
         <div className="container container-large">
            <div className="title-one text-center wow fadeInUp">
               <h3 className="text-white">
                  {isEnglish ? "Why choose LC Inmobiliaria?" : "¿Por qué elegir LC Inmobiliaria?"}
               </h3>
               <p className="fs-24 mt-xs text-white">
                  {isEnglish
                     ? "Your trusted real estate partner in every transaction."
                     : "Tu socio inmobiliario de confianza en cada transacción."}
               </p>
            </div>

            <div className="card-bg-wrapper wow fadeInUp mt-70 lg-mt-50">
               <div className="row">
                  {cards.map((item) => (
                     <div key={item.id} className="col-lg-4">
                        <div className="card-style-eight mt-45 wow fadeInUp">
                           <div className="d-flex align-items-start pe-xxl-5">
                              <Image src={item.icon ? item.icon : ""} alt="" className="lazy-img icon" />
                              <div className="text">
                                 <h5 className="text-white">{item.title}</h5>
                                 <p>{item.desc}</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   )
}

export default BLockFeatureTwo
