import ListingFive from "@/components/inner-listing/listing-05";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
  title: "Immobilien | LC Inmobiliaria",
};

const GermanPropertiesPage = () => {
  return (
    <Wrapper>
      <ListingFive locale="de" />
    </Wrapper>
  );
};

export default GermanPropertiesPage;
