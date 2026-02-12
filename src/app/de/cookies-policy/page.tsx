"use client"
import Link from "next/link"
import HeaderFive from "@/layouts/headers/HeaderFive"
import FooterThree from "@/layouts/footers/FooterThree"

export default function CookiesPolicyDe() {
  return (
    <>
      <HeaderFive locale="de" />
      <div className="pt-200 xl-pt-150 pb-200 xl-pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="cookies-policy-content">
                <h1 className="text-center mb-60 color-primary">Cookie-Richtlinie</h1>
                <p className="text-center mb-40 fs-18">
                  <strong>Letzte Aktualisierung: Oktober 2025</strong>
                </p>

                <section className="mb-50">
                  <h2 className="color-primary mb-30">Was sind Cookies?</h2>
                  <p>
                    Cookies sind kleine Textdateien, die auf Ihrem Geraet gespeichert werden, um
                    die Nutzung zu verbessern und den Traffic zu analysieren.
                  </p>
                </section>

                <section className="mb-50">
                  <h2 className="color-primary mb-30">Kontakt</h2>
                  <div className="bg-light p-30 rounded">
                    <p className="mb-10"><strong>Email:</strong> info@lc-inmobiliaria.com.mx</p>
                    <p className="mb-0">
                      <strong>Datenschutz:</strong>{" "}
                      <Link href="/de/privacy-policy">Hinweise anzeigen</Link>
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
