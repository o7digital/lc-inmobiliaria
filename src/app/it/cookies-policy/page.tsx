"use client"
import Link from "next/link"
import HeaderFive from "@/layouts/headers/HeaderFive"
import FooterThree from "@/layouts/footers/FooterThree"

export default function CookiesPolicyIt() {
  return (
    <>
      <HeaderFive locale="it" />
      <div className="pt-200 xl-pt-150 pb-200 xl-pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="cookies-policy-content">
                <h1 className="text-center mb-60 color-primary">Politica dei Cookie</h1>
                <p className="text-center mb-40 fs-18">
                  <strong>Ultimo aggiornamento: ottobre 2025</strong>
                </p>

                <section className="mb-50">
                  <h2 className="color-primary mb-30">Cosa sono i cookie?</h2>
                  <p>
                    I cookie sono piccoli file di testo salvati sul tuo dispositivo per migliorare
                    l&apos;esperienza e analizzare il traffico del sito.
                  </p>
                </section>

                <section className="mb-50">
                  <h2 className="color-primary mb-30">Contatto</h2>
                  <div className="bg-light p-30 rounded">
                    <p className="mb-10"><strong>Email:</strong> info@lc-inmobiliaria.com.mx</p>
                    <p className="mb-0">
                      <strong>Informativa privacy:</strong>{" "}
                      <Link href="/it/privacy-policy">Vedi informativa</Link>
                    </p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterThree locale="it" />
    </>
  )
}
