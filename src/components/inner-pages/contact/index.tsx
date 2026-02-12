import FooterThree from '@/layouts/footers/FooterThree'
import HeaderFive from '@/layouts/headers/HeaderFive'
import ContactArea from './ContactArea'

type Locale = "es" | "en";

const Contact = ({ locale = "es" }: { locale?: Locale }) => {
   return (
      <>
         <HeaderFive style={true} locale={locale} />
         <ContactArea locale={locale} />
         <FooterThree locale={locale} />
      </>
   )
}

export default Contact
