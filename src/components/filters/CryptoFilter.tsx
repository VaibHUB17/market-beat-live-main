import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setSortConfig, setFilters, resetFilters, selectSortConfig, selectFilters } from '../../store/cryptoSlice';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { ChevronUp, ChevronDown, X, Search, ArrowUpDown } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const sortableFields = [
  { key: 'name', label: 'Name' },
  { key: 'price', label: 'Price' },
  { key: 'percentChange1h', label: '1h %' },
  { key: 'percentChange24h', label: '24h %' },
  { key: 'percentChange7d', label: '7d %' },
  { key: 'marketCap', label: 'Market Cap' },
  { key: 'volume24h', label: 'Volume(24h)' },
];

const CryptoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const sortConfig = useAppSelector(selectSortConfig);
  const filters = useAppSelector(selectFilters);
  
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const [searchInput, setSearchInput] = useState(filters.search);
  const [minPrice, setMinPrice] = useState<string>(filters.minPrice !== null ? filters.minPrice.toString() : '');
  const [maxPrice, setMaxPrice] = useState<string>(filters.maxPrice !== null ? filters.maxPrice.toString() : '');
  
  // Use debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setFilters({ search: searchInput }));
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchInput, dispatch]);
  
  const handleSort = (key: string) => {
    if (sortConfig && sortConfig.key === key) {
      const newDirection = sortConfig.direction === 'asc' ? 'desc' : 'asc';
      dispatch(setSortConfig({ key, direction: newDirection }));
    } else {
      dispatch(setSortConfig({ key, direction: 'asc' }));
    }
  };
  
  const handleReset = () => {
    dispatch(resetFilters());
    setSearchInput('');
    setMinPrice('');
    setMaxPrice('');
  };
  
  const handleApplyPriceFilters = () => {
    dispatch(setFilters({
      minPrice: minPrice === '' ? null : parseFloat(minPrice),
      maxPrice: maxPrice === '' ? null : parseFloat(maxPrice)
    }));
  };
  
  const handlePriceChangeFilter = (value: string) => {
    dispatch(setFilters({ 
      priceChangeFilter: value as 'all' | 'positive' | 'negative'
    }));
  };
  
  const renderSortIcon = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <ArrowUpDown className="h-4 w-4 inline ml-1 text-gray-400" />;
    }
    
    return sortConfig.direction === 'asc' 
      ? <ChevronUp className="h-4 w-4 inline ml-1" />
      : <ChevronDown className="h-4 w-4 inline ml-1" />;
  };
  
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex flex-col space-y-4">
          {/* Search Bar */}
          <div className="flex items-center">
            <div className="relative flex-grow">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Search by name or symbol..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-8"
              />
              {searchInput && (
                <button 
                  onClick={() => setSearchInput('')}
                  className="absolute right-2 top-2.5"
                >
                  <X className="h-4 w-4 text-gray-500" />
                </button>
              )}
            </div>
            
            <Button 
              variant="outline" 
              className="ml-2"
              onClick={() => setIsFilterExpanded(!isFilterExpanded)}
            >
              Filters {isFilterExpanded ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
            </Button>
            
            <Button
              variant="ghost"
              onClick={handleReset}
              className="ml-2"
            >
              Reset
            </Button>
          </div>
          
          {/* Expanded Filters */}
          {isFilterExpanded && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
              <div>
                <p className="text-sm mb-1 font-medium">Sort by</p>
                <div className="flex flex-wrap gap-2">
                  {sortableFields.map(field => (
                    <Button
                      key={field.key}
                      variant={sortConfig && sortConfig.key === field.key ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSort(field.key)}
                    >
                      {field.label} {renderSortIcon(field.key)}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-sm mb-1 font-medium">Price Range</p>
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    placeholder="Min $"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-24"
                  />
                  <span>to</span>
                  <Input
                    type="number"
                    placeholder="Max $"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-24"
                  />
                  <Button onClick={handleApplyPriceFilters} size="sm">Apply</Button>
                </div>
              </div>
              
              <div>
                <p className="text-sm mb-1 font-medium">24h Change</p>
                <Select 
                  value={filters.priceChangeFilter} 
                  onValueChange={handlePriceChangeFilter}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="positive">Gainers (Positive)</SelectItem>
                    <SelectItem value="negative">Losers (Negative)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CryptoFilter;