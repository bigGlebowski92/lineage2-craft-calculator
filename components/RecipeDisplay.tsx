'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import NestedRecipe from './NestedRecipe';

interface Material {
  itemId: string;
  quantity: number;
  name: string;
}

interface Recipe {
  itemId: string;
  materials: Material[];
}

interface RecipeDisplayProps {
  itemId: string;
  itemName?: string;
}

export default function RecipeDisplay({
  itemId,
  itemName,
}: RecipeDisplayProps) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [totalCost, setTotalCost] = useState<number>(0);
  const [materialHasRecipes, setMaterialHasRecipes] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const data = await api.getRecipe(itemId);
        setRecipe(data);

        // Load saved prices from localStorage
        const savedPrices = localStorage.getItem('craftPrices');
        if (savedPrices) {
          setPrices(JSON.parse(savedPrices));
        }

        // Check which materials have recipes
        if (data.materials) {
          const materialIds = data.materials.map((m: Material) => m.itemId);
          const hasRecipes = await api.checkRecipes(materialIds);
          setMaterialHasRecipes(hasRecipes);
        }
      } catch (error) {
        console.error('Failed to fetch recipe:', error);
      } finally {
        setLoading(false);
      }
    };

    if (itemId) {
      fetchRecipe();
    }
  }, [itemId]);

  useEffect(() => {
    // Calculate total cost whenever prices change
    if (recipe) {
      const total = recipe.materials.reduce((sum, material) => {
        const price = prices[material.itemId] || 0;
        return sum + price * material.quantity;
      }, 0);
      setTotalCost(total);
    }
  }, [prices, recipe]);

  const handlePriceChange = (materialItemId: string, price: number) => {
    const newPrices = {
      ...prices,
      [materialItemId]: price,
    };
    setPrices(newPrices);

    // Save to localStorage
    localStorage.setItem('craftPrices', JSON.stringify(newPrices));
  };

  if (loading) {
    return <div>Loading recipe...</div>;
  }

  if (!recipe) {
    return <div>No recipe found for this item</div>;
  }

  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '1.5rem',
        backgroundColor: '#fafafa',
      }}
    >
      <h2 style={{ marginBottom: '1rem' }}>
        Recipe: {itemName || `Item ${itemId}`}
      </h2>

      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ marginBottom: '0.75rem', fontSize: '1.1rem' }}>
          Required Materials:
        </h3>
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
        >
          {recipe.materials.map((material) => (
            <NestedRecipe
              key={material.itemId}
              itemId={material.itemId}
              itemName={material.name}
              quantity={material.quantity}
              level={0}
              prices={prices}
              onPriceChange={handlePriceChange}
              hasRecipe={materialHasRecipes[material.itemId] || false}
            />
          ))}
        </div>
      </div>

      <div
        style={{
          padding: '1rem',
          backgroundColor: '#e3f2fd',
          borderRadius: '4px',
          border: '2px solid #2196f3',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
            Total Cost:
          </span>
          <span
            style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1976d2' }}
          >
            {totalCost.toLocaleString()} adena
          </span>
        </div>
      </div>
    </div>
  );
}
