import ListingFive from "@/components/inner-listing/listing-05";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
  title: "Immobili | LC Inmobiliaria",
};

const ItalianPropertiesPage = () => {
  return (
    <Wrapper>
      <ListingFive locale="it" />
    </Wrapper>
  );
};

export default ItalianPropertiesPage;
