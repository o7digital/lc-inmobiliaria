"use client"
import HeaderFive from "@/layouts/headers/HeaderFive";
import FooterThree from "@/layouts/footers/FooterThree";

export default function AboutUsIt() {
  return (
    <>
      <HeaderFive locale="it" />
      <main className="container mx-auto py-16 px-4 pt-200 xl-pt-150 pb-120">
        <h1 className="text-4xl font-bold mb-8">Chi Siamo</h1>

        <p className="mb-4">
          In <strong>LC Inmobiliaria</strong>, offriamo un servizio basato su fiducia, esperienza
          e trasparenza. La nostra fondatrice, <strong>Ma. de Lourdes Cazares Arce</strong>,
          ha oltre <strong>20 anni di esperienza nel settore immobiliare</strong>.
        </p>

        <p className="mb-4">
          Negli anni abbiamo costruito <strong>partnership strategiche affidabili</strong>, utili
          per realizzare operazioni sicure e di successo.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">La Nostra Passione</h2>
        <p className="mb-4">
          Aiutare le persone a trovare la <strong>casa perfetta</strong> o l&apos;
          <strong>immobile ideale per il business</strong>.
        </p>
      </main>
      <FooterThree locale="it" />
    </>
  );
}
