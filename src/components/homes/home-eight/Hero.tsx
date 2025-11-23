"use client"
import Link from "next/link"

const Hero = () => {
  return (
    <div className="hero-banner-eight z-1 pt-250 xl-pt-200 pb-250 xl-pb-150 lg-pb-100 position-relative">
      <div className="container position-relative">
        <div className="row">
          <div className="col-xl-9 col-lg-10 col-md-10 m-auto">
            {/* ✅ Título cambiado */}
            <h1 className="hero-heading text-white text-center wow fadeInUp" style={{ marginTop: '0' }}>
              <style jsx>{`
                @media (max-width: 767px) {
                  .hero-heading {
                    margin-top: 1.5cm !important;
                  }
                }
              `}</style>
              LC INMOBILIARIA
            </h1>

            {/* ✅ Subtítulo cambiado */}
            <p
              className="fs-24 text-white text-center pt-35 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              Encuentra la casa de tus sueños con nosotros.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
