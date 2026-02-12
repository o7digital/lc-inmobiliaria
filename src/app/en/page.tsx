import HomeEight from "@/components/homes/home-eight";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
  title: "LC Inmobiliaria | Real Estate in Mexico City",
};

const EnglishHomePage = () => {
  return (
    <Wrapper>
      <HomeEight locale="en" />
    </Wrapper>
  );
};

export default EnglishHomePage;
