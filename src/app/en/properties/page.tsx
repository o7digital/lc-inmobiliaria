import ListingFive from "@/components/inner-listing/listing-05";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
  title: "Properties | LC Inmobiliaria",
};

const EnglishPropertiesPage = () => {
  return (
    <Wrapper>
      <ListingFive locale="en" />
    </Wrapper>
  );
};

export default EnglishPropertiesPage;
