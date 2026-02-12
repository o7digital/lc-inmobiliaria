import Contact from "@/components/inner-pages/contact";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Kontakt | LC Inmobiliaria",
};

const GermanContactPage = () => {
   return (
      <Wrapper>
         <Contact locale="de" />
      </Wrapper>
   )
}

export default GermanContactPage
