import HomeEight from "@/components/homes/home-eight";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
  title: "LC Inmobiliaria | Immobilier a Mexico",
};

const FrenchHomePage = () => {
  return (
    <Wrapper>
      <HomeEight locale="fr" />
    </Wrapper>
  );
};

export default FrenchHomePage;
