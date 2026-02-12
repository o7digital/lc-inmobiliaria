import Contact from "@/components/inner-pages/contact";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Contatto | LC Inmobiliaria",
};

const ItalianContactPage = () => {
   return (
      <Wrapper>
         <Contact locale="it" />
      </Wrapper>
   )
}

export default ItalianContactPage
