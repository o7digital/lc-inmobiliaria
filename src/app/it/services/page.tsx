"use client"
import HeaderFive from "@/layouts/headers/HeaderFive";
import FooterThree from "@/layouts/footers/FooterThree";

export default function ServicesIt() {
  return (
    <>
      <HeaderFive locale="it" />
      <main className="container mx-auto py-16 px-4 pt-200 xl-pt-150 pb-120">
        <h1 className="text-4xl font-bold mb-8">Servizi</h1>

        <p className="mb-6">
          In <strong>LC Inmobiliaria</strong> offriamo soluzioni complete per clienti che vogliono
          investire, comprare, vendere o affittare immobili.
        </p>

        <ul className="list-disc list-inside space-y-3">
          <li><strong>Vendita e affitto</strong> di immobili residenziali e commerciali.</li>
          <li><strong>Consulenza legale e amministrativa</strong> per contratti e pratiche.</li>
          <li><strong>Gestione completa</strong> dalla ricerca alla firma finale.</li>
          <li><strong>Rete di professionisti fidati</strong> per ampliare opportunita.</li>
          <li><strong>Assistenza personalizzata</strong> in ogni fase.</li>
        </ul>
      </main>
      <FooterThree locale="it" />
    </>
  );
}
