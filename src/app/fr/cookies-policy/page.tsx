"use client"
import Link from "next/link"
import HeaderFive from "@/layouts/headers/HeaderFive"
import FooterThree from "@/layouts/footers/FooterThree"

export default function CookiesPolicyFr() {
  return (
    <>
      <HeaderFive locale="fr" />
      <div className="pt-200 xl-pt-150 pb-200 xl-pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="cookies-policy-content">
                <h1 className="text-center mb-60 color-primary">Politique de Cookies</h1>
                <p className="text-center mb-40 fs-18">
                  <strong>Derniere mise a jour : octobre 2025</strong>
                </p>

                <section className="mb-50">
                  <h2 className="color-primary mb-30">Que sont les cookies ?</h2>
                  <p>
                    Les cookies sont de petits fichiers enregistres sur votre appareil pour
                    ameliorer votre experience et analyser l&apos;utilisation du site.
                  </p>
                </section>

                <section className="mb-50">
                  <h2 className="color-primary mb-30">Comment les gerer ?</h2>
                  <p>
                    Vous pouvez controler les cookies depuis les parametres de votre navigateur.
                  </p>
                </section>

                <section className="mb-50">
                  <h2 className="color-primary mb-30">Contact</h2>
                  <div className="bg-light p-30 rounded">
                    <p className="mb-10"><strong>Email :</strong> info@lc-inmobiliaria.com.mx</p>
                    <p className="mb-0">
                      <strong>Politique de confidentialite :</strong>{" "}
                      <Link href="/fr/privacy-policy">Voir la notice</Link>
                    </p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterThree locale="fr" />
    </>
  )
}
