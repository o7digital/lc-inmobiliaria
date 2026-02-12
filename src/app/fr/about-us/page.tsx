"use client"
import HeaderFive from "@/layouts/headers/HeaderFive";
import FooterThree from "@/layouts/footers/FooterThree";

export default function AboutUsFr() {
  return (
    <>
      <HeaderFive locale="fr" />
      <main className="container mx-auto py-16 px-4 pt-200 xl-pt-150 pb-120">
        <h1 className="text-4xl font-bold mb-8">A Propos</h1>

        <p className="mb-4">
          Chez <strong>LC Inmobiliaria</strong>, nous offrons un service base sur la confiance,
          l&apos;experience et la transparence. Notre fondatrice, <strong>Ma. de Lourdes Cazares Arce</strong>,
          possede plus de <strong>20 ans d&apos;experience dans l&apos;immobilier</strong>.
        </p>

        <p className="mb-4">
          Au fil des annees, nous avons construit des <strong>partenariats strategiques</strong>
          qui nous permettent de realiser des operations sures et efficaces.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Notre Passion</h2>
        <p className="mb-4">
          Aider nos clients a atteindre leurs objectifs : trouver le <strong>logement ideal</strong>
          ou le <strong>bien parfait pour leur activite</strong>.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Nos Valeurs</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Confiance et accompagnement a chaque etape</li>
          <li>Processus clairs et transparents</li>
          <li>Plus de 20 ans d&apos;experience</li>
          <li>Resultats solides pour nos clients</li>
        </ul>
      </main>
      <FooterThree locale="fr" />
    </>
  );
}
