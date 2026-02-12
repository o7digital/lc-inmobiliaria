import HomeEight from "@/components/homes/home-eight";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
  title: "LC Inmobiliaria | Immobilien in Mexiko-Stadt",
};

const GermanHomePage = () => {
  return (
    <Wrapper>
      <HomeEight locale="de" />
    </Wrapper>
  );
};

export default GermanHomePage;
