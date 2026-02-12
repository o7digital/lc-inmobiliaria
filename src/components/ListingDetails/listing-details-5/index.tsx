import ListingDetailsFiveArea from "./ListingDetailsFiveArea"
import { SiteLocale } from "@/types/siteLocale";

const ListingDetailsFour = ({ locale = "es" }: { locale?: SiteLocale }) => {
   return (
      <>
         <ListingDetailsFiveArea locale={locale} />
      </>
   )
}

export default ListingDetailsFour
