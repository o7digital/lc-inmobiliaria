import FooterThree from "@/layouts/footers/FooterThree"
import ListingTwoArea from "./ListingFiveArea"
import FancyBanner from "@/components/common/FancyBanner"
import HeaderTwo from "@/layouts/headers/HeaderTwo"

const ListingFive = () => {
   return (
      <>
         <HeaderTwo style_1={false} style_2={true} />
         <ListingTwoArea/>
         <FancyBanner />
         <FooterThree />
      </>
   )
}

export default ListingFive;
