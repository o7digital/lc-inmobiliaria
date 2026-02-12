"use client"
import Link from "next/link"
import HeaderFive from "@/layouts/headers/HeaderFive"
import FooterThree from "@/layouts/footers/FooterThree"

export default function PrivacyPolicyDe() {
  return (
    <>
      <HeaderFive locale="de" />
      <div className="pt-200 xl-pt-150 pb-200 xl-pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="privacy-policy-content">
                <h1 className="text-center mb-40 text-primary" style={{ fontSize: "2.5rem", fontWeight: "600" }}>
                  Datenschutzrichtlinie
                </h1>
                <p className="text-center mb-30" style={{ fontSize: "16px" }}>
                  <strong>Letzte Aktualisierung: Oktober 2025</strong>
                </p>

                <section className="mb-40">
                  <h2 className="text-primary mb-25" style={{ fontSize: "1.75rem", fontWeight: "500" }}>
                    Verantwortliche Stelle
                  </h2>
                  <p><strong>Unternehmen:</strong> LC INMOBILIARIA</p>
                  <p><strong>Email:</strong> info@lc-inmobiliaria.com.mx</p>
                </section>

                <section className="mb-50">
                  <h2 className="color-primary mb-30">Datenschutzkontakt</h2>
                  <div className="bg-light p-30 rounded">
                    <p className="mb-10"><strong>Email:</strong> privacidad@lc-inmobiliaria.com.mx</p>
                    <p className="mb-0">
                      <strong>Cookie-Richtlinie:</strong>{" "}
                      <Link href="/de/cookies-policy">Richtlinie ansehen</Link>
                    </p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterThree locale="de" />
    </>
  )
}
