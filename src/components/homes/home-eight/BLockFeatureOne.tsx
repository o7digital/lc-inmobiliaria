import Image, { StaticImageData } from "next/image"

import icon_1 from "@/assets/images/icon/icon_76.svg"
import icon_2 from "@/assets/images/icon/icon_77.svg"
import icon_3 from "@/assets/images/icon/icon_78.svg"

interface DataType {
   id: number;
   icon: StaticImageData;
   title: string;
   desc: JSX.Element;
}

type Locale = "es" | "en";

const BLockFeatureOne = ({ locale = "es" }: { locale?: Locale }) => {
   const isEnglish = locale === "en";
   const featureData: DataType[] = [
      {
         id: 1,
         icon: icon_1,
         title: isEnglish ? "LEGAL SUPPORT" : "NUESTRAS",
         desc: isEnglish
            ? <>Legal guidance for real estate transactions in Mexico City and Naucalpan.</>
            : <>Asesoría legal para temas inmobiliarios en CDMX y Naucalpan.</>,
      },
      {
         id: 2,
         icon: icon_2,
         title: isEnglish ? "BUY & RENT PROPERTIES" : "COMPRA Y RENTA DE PROPIEDADES",
         desc: isEnglish
            ? <>Sell your home faster at the best market price.</>
            : <>Vende tu casa rápido al mejor precio de mercado.</>,
      },
      {
         id: 3,
         icon: icon_3,
         title: isEnglish ? "FAST PROCESS" : "Proceso rápido",
         desc: isEnglish
            ? <>Buy, sell, or rent properties with LC Inmobiliaria.</>
            : <>Compra, Vende o renta Propriedades con LC Inmobiliaria</>,
      },
   ];

   return (
      <div className="block-feature-one mt-150 xl-mt-120">
         <div className="container container-large">
            <div className="title-one text-center mb-60 xl-mb-30 lg-mb-20 wow fadeInUp">
               <h3>{isEnglish ? "Find the perfect home" : "Encuentra la casa perfecta"}</h3>
               <p className="fs-24">
                  {isEnglish
                     ? "Your trusted real estate partner in every transaction."
                     : "Tu socio inmobiliario de confianza en cada transacción."}
               </p>
            </div>

            <div className="row gx-xl-5">
               {featureData.map((item) => (
                  <div key={item.id} className="col-md-4">
                     <div className="card-style-twelve text-center wow fadeInUp mt-20" data-wow-delay="0.2s">
                        <div className="icon d-flex align-items-center justify-content-center m-auto tran3s rounded-circle">
                           <Image src={item.icon} alt="" />
                        </div>
                        <h6 className="fs-20 text-uppercase fw-bold">{item.title}</h6>
                        <p className="fs-24 ps-xxl-4 pe-xxl-4">{item.desc}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}

export default BLockFeatureOne
