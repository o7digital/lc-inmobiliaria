import FooterThree from '@/layouts/footers/FooterThree'
import HeaderTwo from '@/layouts/headers/HeaderTwo'
import ContactArea from './ContactArea'
import { SiteLocale } from "@/types/siteLocale";

const Contact = ({ locale = "es" }: { locale?: SiteLocale }) => {
   return (
      <>
         <HeaderTwo style_2={true} locale={locale} />
         <ContactArea locale={locale} />
         <FooterThree locale={locale} />
      </>
   )
}

export default Contact
