'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

interface Item {
  id: string;
  name: string;
  type: string;
  grade?: string;
}

interface ItemSelectorProps {
  onItemSelect: (itemId: string) => void;
  selectedItemId?: string;
}

export default function ItemSelector({ onItemSelect, selectedItemId }: ItemSelectorProps) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await api.getItems();
        setItems(data);
      } catch (error) {
        console.error('Failed to fetch items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesType;
  });

  const itemTypes = Array.from(new Set(items.map(item => item.type)));

  if (loading) {
    return <div>Loading items...</div>;
  }

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Select Item to Craft</h2>
      
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '0.5rem',
            fontSize: '1rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
            flex: '1',
            minWidth: '200px'
          }}
        />
        
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          style={{
            padding: '0.5rem',
            fontSize: '1rem',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        >
          <option value="all">All Types</option>
          {itemTypes.map(type => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '0.5rem',
        maxHeight: '400px',
        overflowY: 'auto',
        padding: '0.5rem',
        border: '1px solid #ddd',
        borderRadius: '4px'
      }}>
        {filteredItems.map(item => (
          <button
            key={item.id}
            onClick={() => onItemSelect(item.id)}
            style={{
              padding: '0.75rem',
              border: selectedItemId === item.id ? '2px solid #0070f3' : '1px solid #ddd',
              borderRadius: '4px',
              backgroundColor: selectedItemId === item.id ? '#f0f8ff' : 'white',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              if (selectedItemId !== item.id) {
                e.currentTarget.style.backgroundColor = '#f5f5f5';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedItemId !== item.id) {
                e.currentTarget.style.backgroundColor = 'white';
              }
            }}
          >
            <div style={{ fontWeight: 'bold' }}>{item.name}</div>
            <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.25rem' }}>
              {item.type} {item.grade && `(${item.grade})`}
            </div>
          </button>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div style={{ padding: '1rem', textAlign: 'center', color: '#666' }}>
          No items found
        </div>
      )}
    </div>
  );
}


