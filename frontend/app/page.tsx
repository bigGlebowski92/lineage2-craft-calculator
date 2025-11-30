'use client';

import { useState } from 'react';
import ItemSelector from '@/components/ItemSelector';
import RecipeDisplay from '@/components/RecipeDisplay';
import { api } from '@/lib/api';
import { useEffect } from 'react';

export default function Home() {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [selectedItemName, setSelectedItemName] = useState<string>('');

  useEffect(() => {
    const fetchItemName = async () => {
      if (selectedItemId) {
        try {
          const item = await api.getItem(selectedItemId);
          setSelectedItemName(item.name);
        } catch (error) {
          console.error('Failed to fetch item:', error);
        }
      }
    };

    fetchItemName();
  }, [selectedItemId]);

  const handleItemSelect = (itemId: string) => {
    setSelectedItemId(itemId);
  };

  return (
    <main style={{
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      minHeight: '100vh'
    }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
          Lineage 2 Craft Calculator
        </h1>
        <p style={{ color: '#666' }}>
          Select an item to see crafting requirements and calculate costs
        </p>
      </header>

      <ItemSelector
        onItemSelect={handleItemSelect}
        selectedItemId={selectedItemId || undefined}
      />

      {selectedItemId && (
        <RecipeDisplay
          itemId={selectedItemId}
          itemName={selectedItemName}
        />
      )}

      {!selectedItemId && (
        <div style={{
          padding: '2rem',
          textAlign: 'center',
          color: '#999',
          border: '2px dashed #ddd',
          borderRadius: '8px'
        }}>
          Select an item above to see its crafting recipe and calculate costs
        </div>
      )}
    </main>
  );
}
