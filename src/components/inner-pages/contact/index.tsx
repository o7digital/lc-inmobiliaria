import FooterThree from '@/layouts/footers/FooterThree'
import HeaderFive from '@/layouts/headers/HeaderFive'
import ContactArea from './ContactArea'
import { SiteLocale } from "@/types/siteLocale";

const Contact = ({ locale = "es" }: { locale?: SiteLocale }) => {
   return (
      <>
         <HeaderFive style={true} locale={locale} />
         <ContactArea locale={locale} />
         <FooterThree locale={locale} />
      </>
   )
}

export default Contact
