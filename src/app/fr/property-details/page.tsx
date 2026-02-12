import ListingDetailsFive from "@/components/ListingDetails/listing-details-5";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
  title: "Details Propriete | LC Inmobiliaria",
};

const FrenchPropertyDetailsPage = () => {
  return (
    <Wrapper>
      <ListingDetailsFive locale="fr" />
    </Wrapper>
  );
};

export default FrenchPropertyDetailsPage;
