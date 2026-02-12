"use client"
import HeaderFive from "@/layouts/headers/HeaderFive";
import FooterThree from "@/layouts/footers/FooterThree";

export default function AboutUsDe() {
  return (
    <>
      <HeaderFive locale="de" />
      <main className="container mx-auto py-16 px-4 pt-200 xl-pt-150 pb-120">
        <h1 className="text-4xl font-bold mb-8">Uber Uns</h1>

        <p className="mb-4">
          Bei <strong>LC Inmobiliaria</strong> arbeiten wir mit Vertrauen, Erfahrung und Transparenz.
          Unsere Gruenderin, <strong>Ma. de Lourdes Cazares Arce</strong>, verfuegt ueber
          <strong> mehr als 20 Jahre Erfahrung im Immobilienbereich</strong>.
        </p>

        <p className="mb-4">
          Durch <strong>strategische Partnerschaften</strong> realisieren wir sichere und erfolgreiche
          Transaktionen fuer unsere Kunden.
        </p>
      </main>
      <FooterThree locale="de" />
    </>
  );
}
