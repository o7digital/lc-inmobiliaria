import HomeEight from "@/components/homes/home-eight";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
  title: "LC Inmobiliaria | Immobiliare a Citta del Messico",
};

const ItalianHomePage = () => {
  return (
    <Wrapper>
      <HomeEight locale="it" />
    </Wrapper>
  );
};

export default ItalianHomePage;
