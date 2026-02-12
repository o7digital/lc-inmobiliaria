import HeaderTwo from "@/layouts/headers/HeaderTwo";
import Hero from "./Hero";
import AboutSection from "./AboutSection";
import ConsultoriaSection from "./ConsultoriaSection";
import BLockFeatureOne from "./BLockFeatureOne";
import FancyBannerOne from "./FancyBannerOne";
import BLockFeatureTwo from "./BLockFeatureTwo"; // ← Servicios original del template
import BLockFeatureFour from "../home-one/BLockFeatureFour";
import FancyBannerTwo from "../home-two/FancyBannerTwo";
import FooterThree from "@/layouts/footers/FooterThree";

type Locale = "es" | "en";

const HomeEight = ({ locale = "es" }: { locale?: Locale }) => {
  return (
    <div className="main-page-wrapper">
      <HeaderTwo style_1={false} style_2={true} locale={locale} />
      <Hero locale={locale} />

      <AboutSection locale={locale} />
      <ConsultoriaSection locale={locale} />

      <BLockFeatureOne locale={locale} />
      <FancyBannerOne locale={locale} />
      <BLockFeatureTwo locale={locale} />
      <BLockFeatureFour locale={locale} />
      <FancyBannerTwo locale={locale} />
      <FooterThree locale={locale} />
    </div>
  );
};

export default HomeEight;
