import ListingDetailsFive from "@/components/ListingDetails/listing-details-5";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
  title: "Immobilien-Details | LC Inmobiliaria",
};

const GermanPropertyDetailsPage = () => {
  return (
    <Wrapper>
      <ListingDetailsFive locale="de" />
    </Wrapper>
  );
};

export default GermanPropertyDetailsPage;
