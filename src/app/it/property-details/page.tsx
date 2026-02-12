import ListingDetailsFive from "@/components/ListingDetails/listing-details-5";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
  title: "Dettagli Immobile | LC Inmobiliaria",
};

const ItalianPropertyDetailsPage = () => {
  return (
    <Wrapper>
      <ListingDetailsFive locale="it" />
    </Wrapper>
  );
};

export default ItalianPropertyDetailsPage;
