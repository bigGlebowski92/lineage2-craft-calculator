'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

interface Material {
  itemId: string;
  quantity: number;
  name: string;
}

interface Recipe {
  itemId: string;
  materials: Material[];
}

interface DropSource {
  npcId: number;
  npcName: string;
  type: 'drop' | 'spoil';
  min: number;
  max: number;
  chance: number;
}

interface NestedRecipeProps {
  itemId: string;
  itemName: string;
  quantity: number;
  level?: number;
  prices: Record<string, number>;
  onPriceChange: (itemId: string, price: number) => void;
  hasRecipe: boolean;
}

export default function NestedRecipe({
  itemId,
  itemName,
  quantity,
  level = 0,
  prices,
  onPriceChange,
  hasRecipe,
}: NestedRecipeProps) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [materialHasRecipes, setMaterialHasRecipes] = useState<
    Record<string, boolean>
  >({});
  const [sources, setSources] = useState<DropSource[]>([]);
  const [sourcesLoading, setSourcesLoading] = useState(false);
  const [sourcesExpanded, setSourcesExpanded] = useState(false);

  useEffect(() => {
    if (expanded && hasRecipe && !recipe) {
      const fetchRecipe = async () => {
        try {
          setLoading(true);
          const data = await api.getRecipe(itemId);
          setRecipe(data);

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
      fetchRecipe();
    }
  }, [expanded, hasRecipe, itemId, recipe]);

  useEffect(() => {
    if (sourcesExpanded && sources.length === 0) {
      const fetchSources = async () => {
        try {
          setSourcesLoading(true);
          const data = await api.getDropsSpoils(itemId);
          // Combine drops and spoils into a single array
          const allSources = [
            ...(data.drops || []).map((d: any) => ({
              ...d,
              type: 'drop' as const,
            })),
            ...(data.spoils || []).map((s: any) => ({
              ...s,
              type: 'spoil' as const,
            })),
          ];
          setSources(allSources);
        } catch (error) {
          console.error('Failed to fetch drop/spoil sources:', error);
        } finally {
          setSourcesLoading(false);
        }
      };
      fetchSources();
    }
  }, [sourcesExpanded, itemId, sources.length]);

  const materialPrice = prices[itemId] || 0;
  const materialTotal = materialPrice * quantity;
  const indent = level * 24;

  return (
    <div style={{ marginLeft: `${indent}px` }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          padding: '0.75rem',
          backgroundColor: level === 0 ? 'white' : '#f9f9f9',
          borderRadius: '4px',
          border: '1px solid #e0e0e0',
          marginBottom: '0.5rem',
        }}
      >
        <div style={{ flex: '1', minWidth: '150px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {hasRecipe && (
              <button
                onClick={() => setExpanded(!expanded)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  color: '#0070f3',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f0f0f0';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {expanded ? '▼' : '▶'} {itemName}
              </button>
            )}
            {!hasRecipe && <div style={{ fontWeight: '500' }}>{itemName}</div>}
          </div>
          <div
            style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.25rem' }}
          >
            Quantity: {quantity}
            {hasRecipe && (
              <span
                style={{
                  marginLeft: '0.5rem',
                  color: '#0070f3',
                  fontSize: '0.8rem',
                }}
              >
                (clickable - has recipe)
              </span>
            )}
          </div>
          <div
            style={{
              marginTop: '0.25rem',
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'center',
            }}
          >
            <button
              onClick={() => setSourcesExpanded(!sourcesExpanded)}
              style={{
                background: 'none',
                border: '1px solid #ccc',
                cursor: 'pointer',
                fontSize: '0.75rem',
                color: '#666',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f0f0f0';
                e.currentTarget.style.borderColor = '#999';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = '#ccc';
              }}
            >
              {sourcesExpanded ? '▼' : '▶'} Drop/Spoil Sources
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.9rem', color: '#666' }}>Price:</label>
          <input
            type="number"
            min="0"
            step="1"
            value={prices[itemId] || ''}
            onChange={(e) => {
              const value =
                e.target.value === '' ? 0 : parseFloat(e.target.value);
              onPriceChange(itemId, value);
            }}
            placeholder="0"
            style={{
              width: '120px',
              padding: '0.5rem',
              fontSize: '1rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              textAlign: 'right',
            }}
          />
          <span style={{ fontSize: '0.9rem', color: '#666', minWidth: '40px' }}>
            adena
          </span>
        </div>

        <div
          style={{
            minWidth: '120px',
            textAlign: 'right',
            fontWeight: '500',
            color: materialTotal > 0 ? '#333' : '#999',
          }}
        >
          {materialTotal > 0 ? `${materialTotal.toLocaleString()} adena` : '-'}
        </div>
      </div>

      {expanded && hasRecipe && (
        <div
          style={{
            marginLeft: '1rem',
            marginTop: '0.5rem',
            padding: '1rem',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
            border: '1px solid #ddd',
          }}
        >
          {loading ? (
            <div style={{ color: '#666' }}>Loading recipe...</div>
          ) : recipe ? (
            <>
              <div
                style={{
                  fontSize: '0.9rem',
                  color: '#666',
                  marginBottom: '0.75rem',
                  fontWeight: '500',
                }}
              >
                Recipe for {itemName}:
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}
              >
                {recipe.materials.map((material) => (
                  <NestedRecipe
                    key={material.itemId}
                    itemId={material.itemId}
                    itemName={material.name}
                    quantity={material.quantity}
                    level={level + 1}
                    prices={prices}
                    onPriceChange={onPriceChange}
                    hasRecipe={materialHasRecipes[material.itemId] || false}
                  />
                ))}
              </div>
            </>
          ) : (
            <div style={{ color: '#999' }}>No recipe found</div>
          )}
        </div>
      )}

      {sourcesExpanded && (
        <div
          style={{
            marginLeft: '1rem',
            marginTop: '0.5rem',
            padding: '1rem',
            backgroundColor: '#fff9e6',
            borderRadius: '4px',
            border: '1px solid #ffd700',
            maxHeight: '400px',
            overflowY: 'auto',
          }}
        >
          {sourcesLoading ? (
            <div style={{ color: '#666' }}>Loading sources...</div>
          ) : sources.length > 0 ? (
            <>
              <div
                style={{
                  fontSize: '0.9rem',
                  color: '#666',
                  marginBottom: '0.75rem',
                  fontWeight: '500',
                }}
              >
                Monsters that drop/spoil {itemName}:
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}
              >
                {sources.slice(0, 20).map((source, idx) => (
                  <div
                    key={`${source.npcId}-${idx}`}
                    style={{
                      padding: '0.5rem',
                      backgroundColor: 'white',
                      borderRadius: '4px',
                      border: '1px solid #e0e0e0',
                      fontSize: '0.85rem',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <div>
                        <span style={{ fontWeight: '500' }}>
                          {source.npcName}
                        </span>
                        <span
                          style={{
                            marginLeft: '0.5rem',
                            padding: '0.15rem 0.4rem',
                            borderRadius: '3px',
                            fontSize: '0.75rem',
                            backgroundColor:
                              source.type === 'drop' ? '#e3f2fd' : '#fff3e0',
                            color:
                              source.type === 'drop' ? '#1976d2' : '#e65100',
                          }}
                        >
                          {source.type === 'drop' ? 'DROP' : 'SPOIL'}
                        </span>
                      </div>
                      <div style={{ color: '#666', fontSize: '0.8rem' }}>
                        {source.min === source.max
                          ? `${source.min}x`
                          : `${source.min}-${source.max}x`}{' '}
                        <span style={{ color: '#999' }}>
                          ({source.chance.toFixed(2)}%)
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                {sources.length > 20 && (
                  <div
                    style={{
                      padding: '0.5rem',
                      textAlign: 'center',
                      color: '#999',
                      fontSize: '0.8rem',
                    }}
                  >
                    ... and {sources.length - 20} more sources
                  </div>
                )}
              </div>
            </>
          ) : (
            <div style={{ color: '#999' }}>No drop/spoil sources found</div>
          )}
        </div>
      )}
    </div>
  );
}
