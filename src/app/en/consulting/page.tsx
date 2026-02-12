"use client"
import HeaderFive from "@/layouts/headers/HeaderFive";
import FooterThree from "@/layouts/footers/FooterThree";

export default function ConsultingEn() {
  return (
    <>
      <HeaderFive locale="en" />
      <main className="container mx-auto py-16 px-4 pt-200 xl-pt-150 pb-120">
        <h1 className="text-4xl font-bold mb-8">Consulting</h1>

        <p className="mb-6">
          In addition to our brokerage services, <strong>LC Inmobiliaria</strong> offers
          <strong> strategic consulting</strong> for investors and developers.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Consulting Areas</h2>
        <ul className="list-disc list-inside space-y-3">
          <li>
            <strong>Real estate market analysis</strong>: feasibility studies, trends, and investment projections.
          </li>
          <li>
            <strong>Land and project evaluation</strong>: risk and opportunity assessment for developments.
          </li>
          <li>
            <strong>Project structuring</strong>: acquisition, sale, and development strategies focused on profitability.
          </li>
          <li>
            <strong>Portfolio optimization</strong>: guidance on diversification and asset value maximization.
          </li>
        </ul>

        <p className="mt-6">
          We are committed to delivering <strong>clear strategies and reliable information</strong>
          so investors can make secure and profitable decisions.
        </p>
      </main>
      <FooterThree locale="en" />
    </>
  );
}
