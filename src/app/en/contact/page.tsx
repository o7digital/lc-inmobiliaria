import Contact from "@/components/inner-pages/contact";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Contact | LC Inmobiliaria",
};

const EnglishContactPage = () => {
   return (
      <Wrapper>
         <Contact locale="en" />
      </Wrapper>
   )
}

export default EnglishContactPage
