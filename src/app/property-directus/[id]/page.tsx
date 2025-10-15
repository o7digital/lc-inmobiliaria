import { notFound } from "next/navigation";
import HeaderFive from "@/layouts/headers/HeaderFive";
import FooterThree from "@/layouts/footers/FooterThree";
import dynamic from "next/dynamic";
const GalleryDirectus = dynamic(() => import("@/components/ListingDetails/GalleryDirectus"), { ssr: false });

async function getProperty(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DIRECTUS_URL || "https://directus-backend-production.up.railway.app"}/items/propriedades/${id}?fields=*,images.directus_files_id.*`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data || null;
  } catch {
    return null;
  }
}

export default async function PropertyDirectusPage({ params }: { params: { id: string } }) {
  const property = await getProperty(params.id);
  if (!property) return notFound();

  return (
    <>
      <HeaderFive />
      {/* DEBUG: JSON complet de la propriété */}
      <div style={{background:'#f8f9fa', color:'#333', fontSize:12, padding:8, borderRadius:4, maxWidth:900, margin:'24px auto 24px auto', overflow:'auto'}}>
        <b>Clés et types de la propriété :</b>
        <ul>
          {Object.entries(property).map(([key, value]) => (
            <li key={key}><b>{key}</b> : {Array.isArray(value) ? `Array(${value.length})` : typeof value}</li>
          ))}
        </ul>
        <hr />
        <b>JSON complet :</b>
        <pre>{JSON.stringify(property, null, 2)}</pre>
      </div>
      <div className="container py-5">
        <h1 className="mb-4">{property.Title || "Propriété"}</h1>
        <p><b>Adresse:</b> {property.Address}</p>
        <p><b>Ville:</b> {property.City}</p>
        <p><b>Prix:</b> {property.Price} {property.Currency?.[0] || "MXN"}</p>
        <p><b>Chambres:</b> {property.Bedrooms}</p>
        <p><b>Salles de bain:</b> {property.Bathrooms}</p>
        {/* Debug: afficher tout l'objet property */}
        <pre style={{background:'#f8f9fa', color:'#333', fontSize:12, padding:8, borderRadius:4, maxWidth:900, overflow:'auto'}}>
          {JSON.stringify(property, null, 2)}
        </pre>
        {property.images && property.images.length > 0 && (
          <GalleryDirectus images={property.images} />
        )}
      </div>
      <FooterThree />
    </>
  );
}
