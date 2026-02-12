import ListingFive from "@/components/inner-listing/listing-05";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
  title: "Proprietes | LC Inmobiliaria",
};

const FrenchPropertiesPage = () => {
  return (
    <Wrapper>
      <ListingFive locale="fr" />
    </Wrapper>
  );
};

export default FrenchPropertiesPage;
