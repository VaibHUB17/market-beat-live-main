import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialCryptoData } from '../data/initialCryptoData';
import { CryptoAsset } from '../types/crypto';

interface CryptoState {
  assets: CryptoAsset[];
  loading: boolean;
  error: string | null;
  sortConfig: {
    key: string;
    direction: 'asc' | 'desc';
  } | null;
  filters: {
    search: string;
    minPrice: number | null;
    maxPrice: number | null;
    priceChangeFilter: 'all' | 'positive' | 'negative';
  };
}

const initialState: CryptoState = {
  assets: initialCryptoData,
  loading: false,
  error: null,
  sortConfig: null,
  filters: {
    search: '',
    minPrice: null,
    maxPrice: null,
    priceChangeFilter: 'all',
  },
};

export const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updateCryptoData: (state, action: PayloadAction<CryptoAsset[]>) => {
      state.assets = action.payload;
    },
    updateCryptoPrice: (
      state, 
      action: PayloadAction<{id: number; price: number; percentChange1h: number; percentChange24h: number; volume24h: number}>
    ) => {
      const { id, price, percentChange1h, percentChange24h, volume24h } = action.payload;
      const assetIndex = state.assets.findIndex(asset => asset.id === id);
      
      if (assetIndex !== -1) {
        const asset = state.assets[assetIndex];
        
        
        const lastPrice = asset.sparklineData[asset.sparklineData.length - 1];
        const priceVariability = price * 0.01; // 1% of current price
        const randomFactor = (Math.random() * 2 - 1) * priceVariability;
        const trendFactor = (price > lastPrice ? 0.004 : -0.004) * price; 
        const sparklinePrice = price + randomFactor + trendFactor;
        
        // Update the state with new data
        state.assets[assetIndex] = {
          ...asset,
          price,
          percentChange1h,
          percentChange24h,
          volume24h,
          
          // Update the sparkline data
          sparklineData: [...asset.sparklineData.slice(1), parseFloat(sparklinePrice.toFixed(2))]
        };
      }
    },
    setSortConfig: (
      state,
      action: PayloadAction<{ key: string; direction: 'asc' | 'desc' }>
    ) => {
      state.sortConfig = action.payload;
    },
    setFilters: (
      state,
      action: PayloadAction<{
        search?: string;
        minPrice?: number | null;
        maxPrice?: number | null;
        priceChangeFilter?: 'all' | 'positive' | 'negative';
      }>
    ) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    }
  }
});

export const { 
  updateCryptoData, 
  updateCryptoPrice,
  setSortConfig,
  setFilters,
  resetFilters
} = cryptoSlice.actions;

// Selectors
export const selectAllAssets = (state: { crypto: CryptoState }) => state.crypto.assets;
export const selectSortConfig = (state: { crypto: CryptoState }) => state.crypto.sortConfig;
export const selectFilters = (state: { crypto: CryptoState }) => state.crypto.filters;

export const selectFilteredAndSortedAssets = (state: { crypto: CryptoState }) => {
  const { assets, sortConfig, filters } = state.crypto;
  
  // Apply filters
  let filteredAssets = [...assets];
  
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filteredAssets = filteredAssets.filter(asset => 
      asset.name.toLowerCase().includes(searchTerm) || 
      asset.symbol.toLowerCase().includes(searchTerm)
    );
  }
  
  if (filters.minPrice !== null) {
    filteredAssets = filteredAssets.filter(asset => asset.price >= (filters.minPrice || 0));
  }
  
  if (filters.maxPrice !== null) {
    filteredAssets = filteredAssets.filter(asset => asset.price <= (filters.maxPrice || Infinity));
  }
  
  if (filters.priceChangeFilter !== 'all') {
    filteredAssets = filteredAssets.filter(asset => {
      if (filters.priceChangeFilter === 'positive') {
        return asset.percentChange24h > 0;
      } else if (filters.priceChangeFilter === 'negative') {
        return asset.percentChange24h < 0;
      }
      return true;
    });
  }
  
  // Apply sorting
  if (sortConfig) {
    filteredAssets.sort((a, b) => {
      
      const aValue = a[sortConfig.key];
      
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }
  
  return filteredAssets;
};

export const selectAssetById = (state: { crypto: CryptoState }, id: number) => 
  state.crypto.assets.find(asset => asset.id === id);

export default cryptoSlice.reducer;

