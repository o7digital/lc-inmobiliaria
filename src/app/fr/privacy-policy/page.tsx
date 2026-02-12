"use client"
import Link from "next/link"
import HeaderFive from "@/layouts/headers/HeaderFive"
import FooterThree from "@/layouts/footers/FooterThree"

export default function PrivacyPolicyFr() {
  return (
    <>
      <HeaderFive locale="fr" />
      <div className="pt-200 xl-pt-150 pb-200 xl-pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="privacy-policy-content">
                <h1 className="text-center mb-40 text-primary" style={{ fontSize: "2.5rem", fontWeight: "600" }}>
                  Politique de Confidentialite
                </h1>
                <p className="text-center mb-30" style={{ fontSize: "16px" }}>
                  <strong>Derniere mise a jour : octobre 2025</strong>
                </p>

                <section className="mb-40">
                  <h2 className="text-primary mb-25" style={{ fontSize: "1.75rem", fontWeight: "500" }}>
                    Responsable du traitement
                  </h2>
                  <p><strong>Entreprise :</strong> LC INMOBILIARIA</p>
                  <p><strong>Email :</strong> info@lc-inmobiliaria.com.mx</p>
                </section>

                <section className="mb-40">
                  <h2 className="text-primary mb-25" style={{ fontSize: "1.75rem", fontWeight: "500" }}>
                    Finalites du traitement
                  </h2>
                  <ul>
                    <li>Vous contacter au sujet de nos services immobiliers</li>
                    <li>Gerer les operations de location, achat et vente</li>
                    <li>Fournir un conseil personnalise en investissement immobilier</li>
                    <li>Respecter nos obligations legales et contractuelles</li>
                  </ul>
                </section>

                <section className="mb-50">
                  <h2 className="color-primary mb-30">Contact confidentialite</h2>
                  <div className="bg-light p-30 rounded">
                    <p className="mb-10"><strong>Email :</strong> privacidad@lc-inmobiliaria.com.mx</p>
                    <p className="mb-0">
                      <strong>Politique de cookies :</strong>{" "}
                      <Link href="/fr/cookies-policy">Voir la politique</Link>
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
