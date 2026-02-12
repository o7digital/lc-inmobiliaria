import Image, { StaticImageData } from "next/image"

import icon_1 from "@/assets/images/icon/icon_76.svg"
import icon_2 from "@/assets/images/icon/icon_77.svg"
import icon_3 from "@/assets/images/icon/icon_78.svg"
import { SiteLocale } from "@/types/siteLocale";

interface DataType {
   id: number;
   icon: StaticImageData;
   title: string;
   desc: JSX.Element;
}

const BLockFeatureOne = ({ locale = "es" }: { locale?: SiteLocale }) => {
   const copyMap = {
      es: {
         title: "Encuentra la casa perfecta",
         subtitle: "Tu socio inmobiliario de confianza en cada transacción.",
         cards: [
            { title: "NUESTRAS", desc: <>Asesoría legal para temas inmobiliarios en CDMX y Naucalpan.</> },
            { title: "COMPRA Y RENTA DE PROPIEDADES", desc: <>Vende tu casa rápido al mejor precio de mercado.</> },
            { title: "Proceso rápido", desc: <>Compra, Vende o renta Propriedades con LC Inmobiliaria</> },
         ],
      },
      en: {
         title: "Find the perfect home",
         subtitle: "Your trusted real estate partner in every transaction.",
         cards: [
            { title: "LEGAL SUPPORT", desc: <>Legal guidance for real estate transactions in Mexico City and Naucalpan.</> },
            { title: "BUY & RENT PROPERTIES", desc: <>Sell your home faster at the best market price.</> },
            { title: "FAST PROCESS", desc: <>Buy, sell, or rent properties with LC Inmobiliaria.</> },
         ],
      },
      fr: {
         title: "Trouvez la maison ideale",
         subtitle: "Votre partenaire immobilier de confiance a chaque etape.",
         cards: [
            { title: "CONSEIL JURIDIQUE", desc: <>Conseil legal pour les operations immobilieres a Mexico et Naucalpan.</> },
            { title: "ACHAT ET LOCATION", desc: <>Vendez votre bien rapidement au meilleur prix du marche.</> },
            { title: "PROCESSUS RAPIDE", desc: <>Achetez, vendez ou louez avec LC Inmobiliaria.</> },
         ],
      },
      it: {
         title: "Trova la casa perfetta",
         subtitle: "Il tuo partner immobiliare di fiducia in ogni operazione.",
         cards: [
            { title: "SUPPORTO LEGALE", desc: <>Consulenza legale per operazioni immobiliari a Citta del Messico e Naucalpan.</> },
            { title: "ACQUISTO E AFFITTO", desc: <>Vendi la tua casa piu velocemente al miglior prezzo di mercato.</> },
            { title: "PROCESSO RAPIDO", desc: <>Compra, vendi o affitta con LC Inmobiliaria.</> },
         ],
      },
      de: {
         title: "Finden Sie das perfekte Zuhause",
         subtitle: "Ihr vertrauensvoller Immobilienpartner bei jeder Transaktion.",
         cards: [
            { title: "RECHTLICHE BERATUNG", desc: <>Rechtsberatung fuer Immobilienthemen in Mexiko-Stadt und Naucalpan.</> },
            { title: "KAUF UND MIETE", desc: <>Verkaufen Sie Ihre Immobilie schnell zum besten Marktpreis.</> },
            { title: "SCHNELLER PROZESS", desc: <>Kaufen, verkaufen oder mieten Sie mit LC Inmobiliaria.</> },
         ],
      },
   } as const;

   const copy = copyMap[locale];
   const featureData: DataType[] = [
      {
         id: 1,
         icon: icon_1,
         title: copy.cards[0].title,
         desc: copy.cards[0].desc,
      },
      {
         id: 2,
         icon: icon_2,
         title: copy.cards[1].title,
         desc: copy.cards[1].desc,
      },
      {
         id: 3,
         icon: icon_3,
         title: copy.cards[2].title,
         desc: copy.cards[2].desc,
      },
   ];

   return (
      <div className="block-feature-one mt-150 xl-mt-120">
         <div className="container container-large">
            <div className="title-one text-center mb-60 xl-mb-30 lg-mb-20 wow fadeInUp">
               <h3>{copy.title}</h3>
               <p className="fs-24">{copy.subtitle}</p>
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
