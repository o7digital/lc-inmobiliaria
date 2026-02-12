"use client"
import HeaderFive from "@/layouts/headers/HeaderFive";
import FooterThree from "@/layouts/footers/FooterThree";

export default function ConsultingDe() {
  return (
    <>
      <HeaderFive locale="de" />
      <main className="container mx-auto py-16 px-4 pt-200 xl-pt-150 pb-120">
        <h1 className="text-4xl font-bold mb-8">Beratung</h1>

        <p className="mb-6">
          Neben unseren Immobilienservices bietet <strong>LC Inmobiliaria</strong>
          <strong> strategische Beratung</strong> fuer Investoren und Entwickler.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Beratungsbereiche</h2>
        <ul className="list-disc list-inside space-y-3">
          <li><strong>Marktanalyse</strong>: Trends, Machbarkeit und Prognosen.</li>
          <li><strong>Projekt- und Grundstuecksbewertung</strong>: Risiken und Chancen.</li>
          <li><strong>Strukturierung von Projekten</strong>: Kauf-, Verkaufs- und Entwicklungsstrategien.</li>
        </ul>
      </main>
      <FooterThree locale="de" />
    </>
  );
}
