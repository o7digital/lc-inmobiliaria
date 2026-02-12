import ListingDetailsFive from "@/components/ListingDetails/listing-details-5";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
  title: "Property Details | LC Inmobiliaria",
};

const EnglishPropertyDetailsPage = () => {
  return (
    <Wrapper>
      <ListingDetailsFive locale="en" />
    </Wrapper>
  );
};

export default EnglishPropertyDetailsPage;
