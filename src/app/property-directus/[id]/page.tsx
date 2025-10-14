import { notFound } from "next/navigation";
import { Suspense } from "react";
import Wrapper from "@/layouts/Wrapper";

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
    <Wrapper>
      <div className="container py-5">
        <h1 className="mb-4">{property.Title || "Propriété"}</h1>
        <p><b>Adresse:</b> {property.Address}</p>
        <p><b>Ville:</b> {property.City}</p>
        <p><b>Prix:</b> {property.Price} {property.Currency?.[0] || "MXN"}</p>
        <p><b>Chambres:</b> {property.Bedrooms}</p>
        <p><b>Salles de bain:</b> {property.Bathrooms}</p>
        {property.images && property.images.length > 0 && (
          <div className="row mt-4">
            {property.images.map((img: any, i: number) => (
              <div className="col-md-4 mb-3" key={i}>
                <img src={`https://directus-backend-production.up.railway.app/assets/${img.directus_files_id.id}`} alt="photo" className="img-fluid rounded" />
              </div>
            ))}
          </div>
        )}
      </div>
    </Wrapper>
  );
}
