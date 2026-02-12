"use client"
import Link from "next/link"
import HeaderFive from "@/layouts/headers/HeaderFive"
import FooterThree from "@/layouts/footers/FooterThree"

export default function CookiesPolicyEn() {
  return (
    <>
      <HeaderFive locale="en" />
      <div className="pt-200 xl-pt-150 pb-200 xl-pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="cookies-policy-content">
                <h1 className="text-center mb-60 color-primary">Cookies Policy</h1>
                <p className="text-center mb-40 fs-18">
                  <strong>Last updated: October 2025</strong>
                </p>

                <section className="mb-50">
                  <h2 className="color-primary mb-30">What are cookies?</h2>
                  <p>
                    Cookies are small text files stored on your device when you visit our website.
                    They help us improve your browsing experience and understand how our services are used.
                  </p>
                </section>

                <section className="mb-50">
                  <h2 className="color-primary mb-30">Which cookies do we use?</h2>
                  <div className="row">
                    <div className="col-md-6 mb-30">
                      <div className="bg-light p-20 rounded">
                        <h5 className="color-primary">Technical cookies</h5>
                        <p className="mb-0">Required for website operation. They cannot be disabled.</p>
                        <small><strong>Duration:</strong> Session</small>
                      </div>
                    </div>
                    <div className="col-md-6 mb-30">
                      <div className="bg-light p-20 rounded">
                        <h5 className="color-primary">Analytics cookies</h5>
                        <p className="mb-0">Help us understand how visitors interact with the website.</p>
                        <small><strong>Duration:</strong> 2 years</small>
                      </div>
                    </div>
                    <div className="col-md-6 mb-30">
                      <div className="bg-light p-20 rounded">
                        <h5 className="color-primary">Functional cookies</h5>
                        <p className="mb-0">Store your preferences and personalize your experience.</p>
                        <small><strong>Duration:</strong> 1 year</small>
                      </div>
                    </div>
                    <div className="col-md-6 mb-30">
                      <div className="bg-light p-20 rounded">
                        <h5 className="color-primary">Advertising cookies</h5>
                        <p className="mb-0">Used to show ads relevant to your interests.</p>
                        <small><strong>Duration:</strong> Variable</small>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="mb-50">
                  <h2 className="color-primary mb-30">Third-party cookies</h2>
                  <p>Our website may use third-party services:</p>
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Service</th>
                          <th>Purpose</th>
                          <th>More information</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Google Analytics</td>
                          <td>Traffic analytics</td>
                          <td><a href="https://policies.google.com/privacy" target="_blank">Google policy</a></td>
                        </tr>
                        <tr>
                          <td>Facebook Pixel</td>
                          <td>Advertising and remarketing</td>
                          <td><a href="https://www.facebook.com/privacy/policy/" target="_blank">Facebook policy</a></td>
                        </tr>
                        <tr>
                          <td>WhatsApp Business</td>
                          <td>Chat and communication</td>
                          <td><a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank">WhatsApp policy</a></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>

                <section className="mb-50">
                  <h2 className="color-primary mb-30">How to manage cookies</h2>
                  <p>
                    You can control and delete cookies through your browser settings. Disabling some
                    cookies may affect website functionality.
                  </p>
                </section>

                <section className="mb-50">
                  <h2 className="color-primary mb-30">Consent and rights</h2>
                  <p>
                    By continuing to browse this website, you accept the use of cookies described in this policy.
                    You may withdraw consent at any time in your browser settings.
                  </p>
                </section>

                <section className="mb-50">
                  <h2 className="color-primary mb-30">Contact</h2>
                  <div className="bg-light p-30 rounded">
                    <p className="mb-10"><strong>Email:</strong> info@lc-inmobiliaria.com.mx</p>
                    <p className="mb-10"><strong>Privacy:</strong> privacidad@lc-inmobiliaria.com.mx</p>
                    <p className="mb-0">
                      <strong>Privacy notice:</strong>{" "}
                      <Link href="/en/privacy-policy">View full notice</Link>
                    </p>
                  </div>
                </section>

                <div className="text-center pt-40 border-top">
                  <p className="fs-16">
                    <strong>LC INMOBILIARIA</strong> - Cookies Policy updated in October 2025
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
