"use client";

import React from 'react';
import useDirectusProperties from '@/hooks/useDirectusProperties';
import { getDirectusBaseUrl } from '@/lib/directus';

const TestDirectusPage = () => {
  const { properties, loading, error, refetch } = useDirectusProperties();
  const directusUrl = getDirectusBaseUrl();

  const testDirectConnection = async () => {
    try {
      console.log('Testing direct connection to:', `${directusUrl}/items/propriedades?limit=1`);
      const response = await fetch(`${directusUrl}/items/propriedades?limit=1`);
      const data = await response.json();
      console.log('Direct test result:', data);
      alert(`Direct test: ${response.ok ? 'Success' : 'Failed'} - Check console for details`);
    } catch (error) {
      console.error('Direct test failed:', error);
      alert('Direct test failed - Check console for details');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Test Connexion Directus</h1>
      
      <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f5f5f5' }}>
        <h3>Configuration</h3>
        <p><strong>NEXT_PUBLIC_DIRECTUS_URL:</strong> {directusUrl || 'Non configuré'}</p>
        <p><strong>Status:</strong> {directusUrl ? '✅ Configuré' : '❌ Non configuré'}</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={testDirectConnection}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            marginRight: '10px',
            cursor: 'pointer'
          }}
        >
          Test Connexion Directe
        </button>
        <button 
          onClick={refetch}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#28a745', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Recharger Propriétés Redux
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>État Redux</h3>
        <p><strong>Loading:</strong> {loading ? '⏳ Oui' : '✅ Non'}</p>
        <p><strong>Error:</strong> {error ? `❌ ${error}` : '✅ Aucune'}</p>
        <p><strong>Nombre de propriétés:</strong> {properties?.length || 0}</p>
      </div>

      {loading && (
        <div style={{ padding: '20px', backgroundColor: '#fff3cd', border: '1px solid #ffeaa7' }}>
          <p>⏳ Chargement des propriétés...</p>
        </div>
      )}

      {error && (
        <div style={{ padding: '20px', backgroundColor: '#f8d7da', border: '1px solid #f5c6cb' }}>
          <p>❌ Erreur: {error}</p>
        </div>
      )}

      {properties && properties.length > 0 && (
        <div>
          <h3>Propriétés récupérées ({properties.length})</h3>
          <div style={{ maxHeight: '400px', overflow: 'auto' }}>
            {properties.slice(0, 5).map((property: any, index: number) => (
              <div 
                key={property.id || index} 
                style={{ 
                  padding: '10px', 
                  margin: '10px 0', 
                  border: '1px solid #ddd', 
                  borderRadius: '5px' 
                }}
              >
                <h4>ID: {property.id}</h4>
                <p><strong>Titre:</strong> {property.Title || property.title || 'Non défini'}</p>
                <p><strong>Description:</strong> {property.Description || property.description || 'Non définie'}</p>
                <p><strong>Prix:</strong> {property.Price || property.price || 'Non défini'}</p>
                <details>
                  <summary>Voir JSON complet</summary>
                  <pre style={{ fontSize: '12px', backgroundColor: '#f8f9fa', padding: '10px', overflow: 'auto' }}>
                    {JSON.stringify(property, null, 2)}
                  </pre>
                </details>
              </div>
            ))}
            {properties.length > 5 && (
              <p style={{ fontStyle: 'italic' }}>
                ... et {properties.length - 5} autres propriétés
              </p>
            )}
          </div>
        </div>
      )}

      {!loading && !error && properties.length === 0 && (
        <div style={{ padding: '20px', backgroundColor: '#d4edda', border: '1px solid #c3e6cb' }}>
          <p>ℹ️ Aucune propriété trouvée. Cela peut être normal si la base de données est vide.</p>
        </div>
      )}
    </div>
  );
};

export default TestDirectusPage;