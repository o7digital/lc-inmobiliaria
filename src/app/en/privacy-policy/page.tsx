"use client"
import Link from "next/link"
import HeaderFive from "@/layouts/headers/HeaderFive"
import FooterThree from "@/layouts/footers/FooterThree"

export default function PrivacyPolicyEn() {
  return (
    <>
      <HeaderFive locale="en" />
      <div className="pt-200 xl-pt-150 pb-200 xl-pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="privacy-policy-content">
                <h1 className="text-center mb-40 text-primary" style={{ fontSize: "2.5rem", fontWeight: "600" }}>
                  Privacy Notice
                </h1>
                <p className="text-center mb-30" style={{ fontSize: "16px" }}>
                  <strong>Last updated: October 2025</strong>
                </p>

                <div className="alert alert-info mb-40">
                  <h5 className="text-primary">This notice complies with:</h5>
                  <ul className="mb-0">
                    <li>Federal Law on Protection of Personal Data Held by Private Parties (Mexico)</li>
                    <li>General Data Protection Regulation (European Union)</li>
                    <li>California Consumer Privacy Act (California, USA)</li>
                  </ul>
                </div>

                <section className="mb-40">
                  <h2 className="text-primary mb-25" style={{ fontSize: "1.75rem", fontWeight: "500" }}>
                    Data controller
                  </h2>
                  <p><strong>Company:</strong> LC INMOBILIARIA</p>
                  <p><strong>Email:</strong> info@lc-inmobiliaria.com.mx</p>
                </section>

                <section className="mb-40">
                  <h2 className="text-primary mb-25" style={{ fontSize: "1.75rem", fontWeight: "500" }}>
                    Purpose of data processing
                  </h2>
                  <p>Your personal data may be used for the following primary purposes:</p>
                  <ul>
                    <li>Contact you regarding the real estate services we provide</li>
                    <li>Prepare, manage, or execute lease, sale, or brokerage agreements</li>
                    <li>Provide personalized real estate investment, purchase, or rental advice</li>
                    <li>Comply with legal, tax, and contractual obligations</li>
                    <li>Maintain updated records of clients, providers, and partners</li>
                  </ul>
                </section>

                <section className="mb-40">
                  <h2 className="text-primary mb-25" style={{ fontSize: "1.75rem", fontWeight: "500" }}>
                    Collected data
                  </h2>
                  <p>LC INMOBILIARIA may collect:</p>
                  <ul>
                    <li>Identification data: full name, date of birth, nationality</li>
                    <li>Contact data: phone number, email, address</li>
                    <li>Financial data: bank and tax information</li>
                    <li>Asset-related data: property and contract information</li>
                  </ul>
                </section>

                <section className="mb-40">
                  <h2 className="text-primary mb-25" style={{ fontSize: "1.75rem", fontWeight: "500" }}>
                    Data transfers and storage
                  </h2>
                  <p>
                    Your personal data will <strong>not be transferred to third parties</strong> without
                    your consent, except when required by law or for operational processes involving
                    authorized institutions.
                  </p>
                </section>

                <section className="mb-40">
                  <h2 className="text-primary mb-25" style={{ fontSize: "1.75rem", fontWeight: "500" }}>
                    ARCO rights and international rights
                  </h2>
                  <p>
                    You may access, correct, cancel, or object to the processing of your data.
                    If you are in the EU or California, you may also exercise GDPR/CCPA rights.
                  </p>
                  <p>
                    To request any of these rights, contact:{" "}
                    <strong>privacidad@lc-inmobiliaria.com.mx</strong>
                  </p>
                </section>

                <section className="mb-40">
                  <h2 className="text-primary mb-25" style={{ fontSize: "1.75rem", fontWeight: "500" }}>
                    Security measures
                  </h2>
                  <p>
                    We implement administrative, technical, and physical safeguards to protect
                    your personal data from unauthorized access, loss, misuse, or alteration.
                  </p>
                </section>

                <section className="mb-40">
                  <h2 className="text-primary mb-25" style={{ fontSize: "1.75rem", fontWeight: "500" }}>
                    Updates
                  </h2>
                  <p>
                    This Privacy Notice may be updated at any time. Any changes will be published on this page.
                  </p>
                </section>

                <section className="mb-50">
                  <h2 className="color-primary mb-30">Privacy contact</h2>
                  <div className="bg-light p-30 rounded">
                    <p className="mb-10"><strong>Data controller:</strong> LC INMOBILIARIA</p>
                    <p className="mb-10"><strong>Email:</strong> privacidad@lc-inmobiliaria.com.mx</p>
                    <p className="mb-0">
                      <strong>Cookie policy:</strong>{" "}
                      <Link href="/en/cookies-policy">View policy</Link>
                    </p>
                  </div>
                </section>

                <div className="text-center pt-40 border-top">
                  <p className="fs-16">
                    <strong>LC INMOBILIARIA</strong> - Privacy Notice updated in October 2025
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterThree locale="en" />
    </>
  )
}
