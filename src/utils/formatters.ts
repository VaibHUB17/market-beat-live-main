
export const formatCurrency = (value: number): string => {
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(2)}B`;
  }
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`;
  }
  if (value >= 1_000) {
    return `$${value.toLocaleString('en-US', { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  }
  return `$${value.toLocaleString('en-US', { 
    minimumFractionDigits: 2,
    maximumFractionDigits: value >= 1 ? 2 : 6
  })}`;
};

export const formatPercentage = (value: number): string => {
  return `${value >= 0 ? '' : '-'}${Math.abs(value).toFixed(2)}%`;
};

export const formatNumber = (value: number): string => {
  return value.toLocaleString('en-US');
};

export const formatSupply = (value: number, symbol: string): string => {
  if (value >= 1_000_000) {
    return `${(value).toFixed(2)}M ${symbol}`;
  }
  return `${value.toLocaleString('en-US')} ${symbol}`;
};
