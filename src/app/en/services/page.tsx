"use client"
import HeaderFive from "@/layouts/headers/HeaderFive";
import FooterThree from "@/layouts/footers/FooterThree";

export default function ServicesEn() {
  return (
    <>
      <HeaderFive locale="en" />
      <main className="container mx-auto py-16 px-4 pt-200 xl-pt-150 pb-120">
        <h1 className="text-4xl font-bold mb-8">Services</h1>

        <p className="mb-6">
          At <strong>LC Inmobiliaria</strong>, we provide comprehensive solutions for clients
          who want to invest, buy, sell, or rent properties.
        </p>

        <ul className="list-disc list-inside space-y-3">
          <li>
            <strong>Sales and rentals of residential and commercial properties</strong>:
            broad inventory tailored to each client.
          </li>
          <li>
            <strong>Legal and administrative guidance</strong>: support for contracts, title
            deeds, and official procedures.
          </li>
          <li>
            <strong>End-to-end transaction management</strong>: from property search to final signature.
          </li>
          <li>
            <strong>Partnerships with trusted professionals</strong>: a strong network to expand opportunities.
          </li>
          <li>
            <strong>Personalized support</strong>: close attention and follow-up at every stage.
          </li>
        </ul>

        <p className="mt-6">
          Our goal is for every client to find a <strong>trusted partner</strong> in us.
        </p>
      </main>
      <FooterThree locale="en" />
    </>
  );
}
