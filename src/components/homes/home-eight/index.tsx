import HeaderTwo from "@/layouts/headers/HeaderTwo";
import Hero from "./Hero";
import AboutSection from "./AboutSection";
import ConsultoriaSection from "./ConsultoriaSection";
import BLockFeatureOne from "./BLockFeatureOne";
import ListingSixFeaturedDirectus from "@/components/inner-listing/listing-06/ListingSixFeaturedDirectus";
import FancyBannerOne from "./FancyBannerOne";
import BLockFeatureTwo from "./BLockFeatureTwo"; // ← Servicios original del template
import BLockFeatureFour from "../home-one/BLockFeatureFour";
import FancyBannerTwo from "../home-two/FancyBannerTwo";
import FooterThree from "@/layouts/footers/FooterThree";

const HomeEight = () => {
  return (
    <div className="main-page-wrapper">
      <HeaderTwo style_1={false} style_2={true} />
      <Hero />

      {/* 🔥 Bloques añadidos */}
      <AboutSection />
      <ConsultoriaSection />

      <BLockFeatureOne />
  {/* Section Propiedades destacadas (Directus) */}
  <ListingSixFeaturedDirectus />
      <FancyBannerOne />
      <BLockFeatureTwo />   {/* 👈 Mantiene el bloque de Servicios original */}
      <BLockFeatureFour />
      <FancyBannerTwo />
      <FooterThree />
    </div>
  );
};

export default HomeEight;
