import FooterThree from "@/layouts/footers/FooterThree"
import ListingTwoArea from "./ListingFiveArea"
import FancyBanner from "@/components/common/FancyBanner"
import HeaderTwo from "@/layouts/headers/HeaderTwo"

type Locale = "es" | "en";

const ListingFive = ({ locale = "es" }: { locale?: Locale }) => {
   return (
      <>
         <HeaderTwo style_1={false} style_2={true} locale={locale} />
         <ListingTwoArea locale={locale} />
         <FancyBanner locale={locale} />
         <FooterThree locale={locale} />
      </>
   )
}

export default ListingFive;
