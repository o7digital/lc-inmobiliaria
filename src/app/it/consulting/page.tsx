"use client"
import HeaderFive from "@/layouts/headers/HeaderFive";
import FooterThree from "@/layouts/footers/FooterThree";

export default function ConsultingIt() {
  return (
    <>
      <HeaderFive locale="it" />
      <main className="container mx-auto py-16 px-4 pt-200 xl-pt-150 pb-120">
        <h1 className="text-4xl font-bold mb-8">Consulenza</h1>

        <p className="mb-6">
          Oltre ai servizi immobiliari, <strong>LC Inmobiliaria</strong> offre
          <strong> consulenza strategica</strong> per investitori e sviluppatori.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Aree di Consulenza</h2>
        <ul className="list-disc list-inside space-y-3">
          <li><strong>Analisi di mercato</strong>: trend, fattibilita e proiezioni.</li>
          <li><strong>Valutazione di terreni e progetti</strong>: rischi e opportunita.</li>
          <li><strong>Strutturazione operazioni</strong>: acquisto, vendita e sviluppo.</li>
          <li><strong>Ottimizzazione portafoglio</strong>: diversificazione e valore.</li>
        </ul>
      </main>
      <FooterThree locale="it" />
    </>
  );
}
