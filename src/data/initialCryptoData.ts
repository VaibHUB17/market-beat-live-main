
import { CryptoAsset } from '../types/crypto';

// Helper function to generate realistic-looking price data with fluctuations
const generateSparklineData = (basePrice: number, volatility: number, dataPoints: number = 50): number[] => {
  const data: number[] = [];
  let currentPrice = basePrice;
  
  for (let i = 0; i < dataPoints; i++) {
    // Generate random price movement as a percentage of the base price
    // Create slightly more realistic price movements with some trends
    const trend = Math.sin(i / 10) * volatility * 0.5;
    const randomFactor = (Math.random() * 2 - 1) * volatility;
    const movement = (randomFactor + trend) * basePrice;
    
    currentPrice = Math.max(currentPrice + movement, basePrice * 0.7); // Prevent prices going too low
    data.push(parseFloat(currentPrice.toFixed(2)));
  }
  
  return data;
};

export const initialCryptoData: CryptoAsset[] = [
  {
    id: 1,
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 93759.48,
    percentChange1h: 0.43,
    percentChange24h: 0.93,
    percentChange7d: 11.11,
    marketCap: 1861618902186,
    volume24h: 43874950947,
    circulatingSupply: 19.85,
    maxSupply: 21,
    logo: '/lovable-uploads/4a247086-f389-4c7e-a345-8128038f3182.png',
    sparklineData: generateSparklineData(90000, 0.05, 50) // 5% volatility, 50 data points
  },
  {
    id: 2,
    name: 'Ethereum',
    symbol: 'ETH',
    price: 1802.46,
    percentChange1h: 0.60,
    percentChange24h: 3.21,
    percentChange7d: 13.68,
    marketCap: 217581279327,
    volume24h: 23547469307,
    circulatingSupply: 120.71,
    maxSupply: null,
    logo: '/lovable-uploads/4a247086-f389-4c7e-a345-8128038f3182.png',
    sparklineData: generateSparklineData(1750, 0.07, 50) // 7% volatility, 50 data points
  },
  {
    id: 3,
    name: 'Tether',
    symbol: 'USDT',
    price: 1.00,
    percentChange1h: 0.00,
    percentChange24h: 0.00,
    percentChange7d: 0.04,
    marketCap: 145320022085,
    volume24h: 92288882007,
    circulatingSupply: 145.27,
    maxSupply: null,
    logo: '/lovable-uploads/4a247086-f389-4c7e-a345-8128038f3182.png',
    sparklineData: generateSparklineData(1.00, 0.003, 50) // 0.3% volatility (stable coin), 50 data points
  },
  {
    id: 4,
    name: 'XRP',
    symbol: 'XRP',
    price: 2.22,
    percentChange1h: 0.46,
    percentChange24h: 0.54,
    percentChange7d: 6.18,
    marketCap: 130073814966,
    volume24h: 5131481491,
    circulatingSupply: 58.39,
    maxSupply: 100,
    logo: '/lovable-uploads/4a247086-f389-4c7e-a345-8128038f3182.png',
    sparklineData: generateSparklineData(2.15, 0.08, 50) // 8% volatility, 50 data points
  },
  {
    id: 5,
    name: 'BNB',
    symbol: 'BNB',
    price: 606.65,
    percentChange1h: 0.09,
    percentChange24h: -1.20,
    percentChange7d: 3.73,
    marketCap: 85471956947,
    volume24h: 1874281784,
    circulatingSupply: 140.89,
    maxSupply: 200,
    logo: '/lovable-uploads/4a247086-f389-4c7e-a345-8128038f3182.png',
    sparklineData: generateSparklineData(590, 0.06, 50) // 6% volatility, 50 data points
  },
  {
    id: 6,
    name: 'Solana',
    symbol: 'SOL',
    price: 151.51,
    percentChange1h: 0.53,
    percentChange24h: 1.26,
    percentChange7d: 14.74,
    marketCap: 78381958631,
    volume24h: 4881674486,
    circulatingSupply: 517.31,
    maxSupply: null,
    logo: '/lovable-uploads/4a247086-f389-4c7e-a345-8128038f3182.png',
    sparklineData: generateSparklineData(140, 0.09, 50) // 9% volatility, 50 data points
  }
];

