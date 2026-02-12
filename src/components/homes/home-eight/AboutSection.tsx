"use client";

type Locale = "es" | "en";

const AboutSection = ({ locale = "es" }: { locale?: Locale }) => {
  const isEnglish = locale === "en";

  return (
    <section id={isEnglish ? "about-us" : "quienes-somos"} className="pt-120 pb-120 bg-white">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="title-one text-center mb-40">
              <h2>{isEnglish ? "About Us" : "Quiénes Somos"}</h2>
              <p>
                {isEnglish ? (
                  <>
                    At <strong>LC Inmobiliaria</strong>, we provide a service built on trust,
                    experience, and transparency. Our founder,
                    <strong> Ma. de Lourdes Cazares Arce</strong>, has more than 20 years of
                    experience in the real estate sector.
                  </>
                ) : (
                  <>
                    En <strong>LC Inmobiliaria</strong> ofrecemos un servicio basado en la
                    confianza, la experiencia y la transparencia. Nuestra fundadora,
                    <strong> Ma. de Lourdes Cázares Arce</strong>, cuenta con más de 20 años
                    de trayectoria en el sector inmobiliario.
                  </>
                )}
              </p>
            </div>
            <ul className="list-style-one">
              <li>{isEnglish ? "Trust and close support in every transaction" : "Confianza y cercanía en cada trato"}</li>
              <li>{isEnglish ? "Clear and transparent processes" : "Trámites claros y transparentes"}</li>
              <li>{isEnglish ? "More than 20 years of proven experience" : "Experiencia comprobada de más de 20 años"}</li>
              <li>{isEnglish ? "Successful results for our clients" : "Resultados exitosos para nuestros clientes"}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
