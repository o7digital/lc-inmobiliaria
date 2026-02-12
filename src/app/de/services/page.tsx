"use client"
import HeaderFive from "@/layouts/headers/HeaderFive";
import FooterThree from "@/layouts/footers/FooterThree";

export default function ServicesDe() {
  return (
    <>
      <HeaderFive locale="de" />
      <main className="container mx-auto py-16 px-4 pt-200 xl-pt-150 pb-120">
        <h1 className="text-4xl font-bold mb-8">Dienstleistungen</h1>

        <p className="mb-6">
          Bei <strong>LC Inmobiliaria</strong> bieten wir umfassende Loesungen fuer Kauf,
          Verkauf, Vermietung und Investitionen.
        </p>

        <ul className="list-disc list-inside space-y-3">
          <li><strong>Verkauf und Vermietung</strong> von Wohn- und Gewerbeimmobilien.</li>
          <li><strong>Rechtliche und administrative Beratung</strong> fuer Vertraege und Prozesse.</li>
          <li><strong>Komplette Abwicklung</strong> von der Suche bis zum Abschluss.</li>
          <li><strong>Netzwerk vertrauensvoller Partner</strong> fuer mehr Chancen.</li>
        </ul>
      </main>
      <FooterThree locale="de" />
    </>
  );
}
