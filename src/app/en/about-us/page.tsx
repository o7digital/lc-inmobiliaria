"use client"
import HeaderFive from "@/layouts/headers/HeaderFive";
import FooterThree from "@/layouts/footers/FooterThree";

export default function AboutUsEn() {
  return (
    <>
      <HeaderFive locale="en" />
      <main className="container mx-auto py-16 px-4 pt-200 xl-pt-150 pb-120">
        <h1 className="text-4xl font-bold mb-8">About Us</h1>

        <p className="mb-4">
          At <strong>LC Inmobiliaria</strong>, we provide a service built on trust, experience,
          and transparency. Our founder, <strong>Ma. de Lourdes Cazares Arce</strong>, has over
          <strong> 20 years of experience in the real estate sector</strong>, working with
          renowned agencies and consolidating her career as an independent advisor.
        </p>

        <p className="mb-4">
          Over the years, we have built <strong>strategic partnerships with trusted colleagues</strong>,
          which allows us to close secure and successful transactions. Our commitment is to deliver
          a formal, transparent, and responsible service that gives clients peace of mind.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Passion</h2>
        <p className="mb-4">
          Helping people reach their goals: finding the <strong>perfect home</strong> or the
          <strong> ideal property for their business</strong>.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Core Values</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Trust and close support in every transaction</li>
          <li>Clear and transparent processes</li>
          <li>More than 20 years of proven experience</li>
          <li>Successful outcomes for our clients</li>
        </ul>
      </main>
      <FooterThree locale="en" />
    </>
  );
}
