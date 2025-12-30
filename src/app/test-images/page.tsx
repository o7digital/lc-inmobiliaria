"use client";
import { useEffect, useState } from "react";
import { buildDirectusAssetUrl } from "@/lib/directus";

interface ImageData {
  directus_files_id: {
    id: string;
    filename_download: string;
    type: string;
  };
}

interface Property {
  id: number;
  Title: string;
  images?: ImageData[];
}

export default function TestImages() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [rawData, setRawData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/directus/properties?limit=3');
        const data = await response.json();
        setRawData(data);
        setProperties(data);
        console.log('Raw data from API:', data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-5">Chargement...</div>;

  return (
    <div className="container py-5">
      <h1>Test Images Directus</h1>
      
      <div className="mb-5">
        <h2>Structure des données brutes</h2>
        <pre className="bg-dark text-white p-3" style={{ fontSize: '12px', overflow: 'auto', maxHeight: '300px' }}>
          {JSON.stringify(rawData, null, 2)}
        </pre>
      </div>

      {properties.map((property) => (
        <div key={property.id} className="card mb-4">
          <div className="card-body">
            <h3>{property.Title}</h3>
            
            <div className="mb-3">
              <strong>Images field:</strong>
              <pre className="bg-light p-2" style={{ fontSize: '11px' }}>
                {JSON.stringify(property.images, null, 2)}
              </pre>
            </div>

            {property.images && property.images.length > 0 ? (
              <div>
                <p><strong>Nombre d'images:</strong> {property.images.length}</p>
                
                <div className="row">
                  {property.images.map((img, idx) => {
                    const imageId = img?.directus_files_id?.id;
                    const imageUrl = imageId ? buildDirectusAssetUrl(imageId, 400, 300) : null;
                    
                    return (
                      <div key={idx} className="col-md-4 mb-3">
                        <div className="border p-2">
                          <p style={{ fontSize: '10px', wordBreak: 'break-all' }}>
                            <strong>ID:</strong> {imageId || 'N/A'}
                          </p>
                          <p style={{ fontSize: '10px', wordBreak: 'break-all' }}>
                            <strong>URL:</strong> {imageUrl || 'N/A'}
                          </p>
                          {imageUrl && (
                            <img 
                              src={imageUrl} 
                              alt={`Image ${idx + 1}`}
                              style={{ width: '100%', height: 'auto' }}
                              onError={(e) => {
                                console.error(`Failed to load image: ${imageUrl}`);
                                e.currentTarget.src = '/assets/images/listing/img_large_07.jpg';
                              }}
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <p className="text-danger">Aucune image trouvée</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
