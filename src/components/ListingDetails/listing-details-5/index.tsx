import ListingDetailsFiveArea from "./ListingDetailsFiveArea"

type Locale = "es" | "en";

const ListingDetailsFour = ({ locale = "es" }: { locale?: Locale }) => {
   return (
      <>
         <ListingDetailsFiveArea locale={locale} />
      </>
   )
}

export default ListingDetailsFour
