"use client"

import Slider from "react-slick"
import DropdownOne from "@/components/search-dropdown/home-dropdown/DropdownOne"
import { SiteLocale } from "@/types/siteLocale";

const sliderSettings = {
  dots: false,
  arrows: false,
  centerPadding: "0px",
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  fade: true,
  autoplaySpeed: 7000,
}

const Hero = ({ locale = "es" }: { locale?: SiteLocale }) => {
  const heroSubtitleMap: Record<SiteLocale, string> = {
    es: "Encuentra la casa de tus sueños con nosotros.",
    en: "Find the home of your dreams with us.",
    fr: "Trouvez la maison de vos reves avec nous.",
    it: "Trova la casa dei tuoi sogni con noi.",
    de: "Finden Sie mit uns Ihr Traumhaus.",
  };

  return (
    <div className="hero-banner-eight z-1 pt-250 xl-pt-200 lg-pt-150 md-pt-120 pb-250 xl-pb-150 lg-pb-100 md-pb-80 position-relative overflow-hidden">
      <Slider {...sliderSettings} className="hero-slider-one m0">
        <div className="item m0">
          <div className="hero-img" style={{ backgroundImage: `url(/slider/1.png)` }} />
        </div>
        <div className="item m0">
          <div className="hero-img" style={{ backgroundImage: `url(/slider/2.png)` }} />
        </div>
        <div className="item m0">
          <div className="hero-img" style={{ backgroundImage: `url(/slider/3.png)` }} />
        </div>
      </Slider>

      <div className="container position-relative z-2">
        <div className="row">
          <div className="col-xl-9 col-lg-10 col-md-10 m-auto">
            <h1 className="hero-heading text-white text-center wow fadeInUp" style={{ marginTop: "0" }}>
              <style jsx>{`
                @media (max-width: 767px) {
                  .hero-heading {
                    margin-top: 1.5cm !important;
                  }
                }
              `}</style>
              LC INMOBILIARIA
            </h1>

            <p
              className="fs-24 text-white text-center pt-35 lg-pt-25 md-pt-20 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              {heroSubtitleMap[locale]}
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col-xxl-10 m-auto">
            <div className="search-wrapper-one layout-one position-relative wow fadeInUp" data-wow-delay="0.2s">
              <div className="bg-wrapper">
                <DropdownOne style={true} locale={locale} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
