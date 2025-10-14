"use client";

import React, { useState } from 'react';
import useDirectusProperties from '@/hooks/useDirectusProperties';
import { getDirectusBaseUrl, getDirectusToken } from '@/lib/directus';
import { testDirectusConnection } from '@/services/directusService';

const TestDirectusPage = () => {
  const { properties, loading, error, refetch } = useDirectusProperties();
  const directusUrl = getDirectusBaseUrl();
  const directusToken = getDirectusToken();
  const [testResult, setTestResult] = useState<string>('');

  const testDirectConnection = async () => {
    setTestResult('Testing...');
    const result = await testDirectusConnection();
    setTestResult(`${result.success ? '✅' : '❌'} ${result.message} | Token: ${result.hasToken ? '✅' : '❌'}${result.url ? ` (${result.url})` : ''}`);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Test Connexion Directus</h1>
      
      <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f5f5f5' }}>
        <h3>Configuration</h3>
        <p><strong>NEXT_PUBLIC_DIRECTUS_URL:</strong> {directusUrl || 'Non configuré'}</p>
        <p><strong>NEXT_PUBLIC_DIRECTUS_TOKEN:</strong> {directusToken ? `${directusToken.substring(0, 10)}...` : 'Non configuré'}</p>
        <p><strong>URL Status:</strong> {directusUrl ? '✅ Configuré' : '❌ Non configuré'}</p>
        <p><strong>Token Status:</strong> {directusToken ? '✅ Configuré' : '❌ Non configuré'}</p>
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

      {testResult && (
        <div style={{ 
          marginBottom: '20px', 
          padding: '10px', 
          backgroundColor: testResult.includes('✅') ? '#d4edda' : '#f8d7da', 
          border: `1px solid ${testResult.includes('✅') ? '#c3e6cb' : '#f5c6cb'}`,
          borderRadius: '5px'
        }}>
          <p><strong>Résultat du test:</strong> {testResult}</p>
        </div>
      )}

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
                <h4>ID: {property.id} - {property.Title}</h4>
                <p><strong>Adresse:</strong> {property.Address || 'Non définie'}</p>
                <p><strong>Ville:</strong> {property.City || 'Non définie'}</p>
                <p><strong>État:</strong> {property.State || 'Non défini'}</p>
                <p><strong>Prix:</strong> {property.Price ? `${property.Price} ${property.Currency?.[0] || ''}` : 'Non défini'}</p>
                <p><strong>Type:</strong> {property.Property_type?.join(', ') || 'Non défini'}</p>
                <p><strong>Opération:</strong> {property.Operation_type?.join(', ') || 'Non définie'}</p>
                <p><strong>Chambres:</strong> {property.Bedrooms || 'Non défini'} | <strong>Salles de bain:</strong> {property.Bathrooms || 'Non défini'}</p>
                <p><strong>Surface:</strong> {property.Construccion_area ? `${property.Construccion_area} m²` : 'Non définie'}</p>
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