"use client"
import HeaderFive from "@/layouts/headers/HeaderFive";
import FooterThree from "@/layouts/footers/FooterThree";

export default function ConsultingFr() {
  return (
    <>
      <HeaderFive locale="fr" />
      <main className="container mx-auto py-16 px-4 pt-200 xl-pt-150 pb-120">
        <h1 className="text-4xl font-bold mb-8">Conseil</h1>

        <p className="mb-6">
          En plus de l&apos;intermediation immobiliere, <strong>LC Inmobiliaria</strong> offre un
          <strong> accompagnement strategique</strong> pour investisseurs et developpeurs.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Domaines de Conseil</h2>
        <ul className="list-disc list-inside space-y-3">
          <li><strong>Analyse du marche</strong> : faisabilite, tendances et projections.</li>
          <li><strong>Evaluation de terrains et projets</strong> : risques et opportunites.</li>
          <li><strong>Structuration d&apos;operations</strong> : strategie achat, vente et developpement.</li>
          <li><strong>Optimisation de portefeuille</strong> : diversification et maximisation de valeur.</li>
        </ul>
      </main>
      <FooterThree locale="fr" />
    </>
  );
}
