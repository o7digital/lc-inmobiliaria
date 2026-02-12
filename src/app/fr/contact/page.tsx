import Contact from "@/components/inner-pages/contact";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Contact | LC Inmobiliaria",
};

const FrenchContactPage = () => {
   return (
      <Wrapper>
         <Contact locale="fr" />
      </Wrapper>
   )
}

export default FrenchContactPage
