import React from 'react';
import { useAppSelector } from '../store/hooks';
import { selectFilteredAndSortedAssets } from '../store/cryptoSlice';
import { formatCurrency, formatPercentage, formatNumber, formatSupply } from '../utils/formatters';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';

const CryptoTable: React.FC = () => {
  // Use the new filtered and sorted assets selector
  const assets = useAppSelector(selectFilteredAndSortedAssets);

  // Helper function to get the appropriate icon based on crypto symbol
  const getCryptoIcon = (symbol: string) => {
    switch (symbol) {
      case 'BTC':
        return <span className="h-6 w-6 flex items-center justify-center rounded-full bg-amber-500 text-white text-xs">₿</span>;
      case 'ETH':
        return <span className="h-6 w-6 flex items-center justify-center rounded-full bg-indigo-400 text-white text-xs">Ξ</span>;
      case 'USDT':
        return <span className="h-6 w-6 flex items-center justify-center rounded-full bg-teal-500 text-white text-xs">₮</span>;
      case 'XRP':
        return <span className="h-6 w-6 flex items-center justify-center rounded-full bg-gray-700 text-white text-xs">XRP</span>;
      case 'BNB':
        return <span className="h-6 w-6 flex items-center justify-center rounded-full bg-yellow-500 text-white text-xs">BNB</span>;
      case 'SOL':
        return <span className="h-6 w-6 flex items-center justify-center rounded-full bg-purple-600 text-white text-xs">SOL</span>;
      default:
        return <span className="h-6 w-6 flex items-center justify-center rounded-full bg-gray-500 text-white text-xs">{symbol.charAt(0)}</span>;
    }
  };

  const renderPercentChange = (value: number) => {
    const isPositive = value > 0;
    const color = value === 0 ? 'text-gray-500' : isPositive ? 'text-green-500' : 'text-red-500';
    const Icon = isPositive ? ArrowUp : ArrowDown;
    
    return (
      <div className={`flex items-center ${color}`}>
        {value !== 0 && <Icon className="h-3 w-3 mr-1" />}
        {formatPercentage(value)}
      </div>
    );
  };

  const renderSparkline = (data: number[]) => {
    const isPositive = data[data.length - 1] >= data[0];
    const startPrice = data[0];
    const currentPrice = data[data.length - 1];
    const percentChange = ((currentPrice - startPrice) / startPrice) * 100;
    
    // Add price fluctuation points to make the chart more informative
    const chartData = data.map((value, index) => ({ 
      value,
      index,
      date: `Day ${index + 1}` // For tooltip reference
    }));
    
    // Color based on price trend
    const lineColor = isPositive ? '#10b981' : '#ef4444';
    const areaColor = isPositive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)';
    
    return (
      <div className="flex flex-col">
        <ResponsiveContainer width="100%" height={50}>
          <LineChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <YAxis 
              domain={['dataMin', 'dataMax']} 
              hide={true} 
              padding={{ top: 10, bottom: 10 }} 
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={lineColor}
              strokeWidth={1.5}
              dot={false}
              activeDot={{ r: 4, fill: lineColor }}
              isAnimationActive={true}
              animationDuration={500}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className={`text-xs text-right ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {percentChange > 0 ? '+' : ''}{percentChange.toFixed(2)}%
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">1h %</TableHead>
                <TableHead className="text-right">24h %</TableHead>
                <TableHead className="text-right">7d %</TableHead>
                <TableHead className="text-right">Market Cap</TableHead>
                <TableHead className="text-right">Volume(24h)</TableHead>
                <TableHead className="text-right">Circulating Supply</TableHead>
                <TableHead className="text-right w-32 md:w-48">Last 7 Days</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assets.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-8 text-gray-500">
                    No cryptocurrencies match your filter criteria
                  </TableCell>
                </TableRow>
              ) : (
                assets.map((asset) => (
                  <TableRow key={asset.id}>
                    <TableCell className="font-medium">{asset.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getCryptoIcon(asset.symbol)}
                        <div>
                          <div className="font-medium">{asset.name}</div>
                          <div className="text-sm text-gray-500">{asset.symbol}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-semibold">{formatCurrency(asset.price)}</TableCell>
                    <TableCell className="text-right">{renderPercentChange(asset.percentChange1h)}</TableCell>
                    <TableCell className="text-right">{renderPercentChange(asset.percentChange24h)}</TableCell>
                    <TableCell className="text-right">{renderPercentChange(asset.percentChange7d)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(asset.marketCap)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(asset.volume24h)}</TableCell>
                    <TableCell className="text-right">{formatSupply(asset.circulatingSupply, asset.symbol)}</TableCell>
                    <TableCell className="w-32 md:w-48">
                      {renderSparkline(asset.sparklineData)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default CryptoTable;

