"use client"
import HeaderFive from "@/layouts/headers/HeaderFive";
import FooterThree from "@/layouts/footers/FooterThree";

export default function ServicesFr() {
  return (
    <>
      <HeaderFive locale="fr" />
      <main className="container mx-auto py-16 px-4 pt-200 xl-pt-150 pb-120">
        <h1 className="text-4xl font-bold mb-8">Services</h1>

        <p className="mb-6">
          Chez <strong>LC Inmobiliaria</strong>, nous proposons des solutions completes pour
          investir, acheter, vendre ou louer des proprietes.
        </p>

        <ul className="list-disc list-inside space-y-3">
          <li><strong>Vente et location</strong> de biens residentiels et commerciaux.</li>
          <li><strong>Accompagnement juridique et administratif</strong> pour contrats et actes.</li>
          <li><strong>Gestion complete des operations</strong> de la recherche a la signature.</li>
          <li><strong>Partenariats de confiance</strong> pour elargir les opportunites.</li>
          <li><strong>Suivi personnalise</strong> tout au long du processus.</li>
        </ul>
      </main>
      <FooterThree locale="fr" />
    </>
  );
}
