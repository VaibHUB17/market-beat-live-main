import React, { useEffect } from 'react';
import { useAppDispatch } from '../store/hooks';
import { mockWebSocket } from '../services/cryptoWebSocket';
import CryptoTable from './CryptoTable';
import CryptoFilter from './filters/CryptoFilter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { store } from '../store/store';

const CryptoDashboard: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Connect to the mock WebSocket when component mounts
    mockWebSocket.connect(dispatch, store.getState);
    
    // Disconnect when component unmounts
    return () => {
      mockWebSocket.disconnect();
    };
  }, [dispatch]);

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-3xl font-bold">Cryptocurrency Market</CardTitle>
          <CardDescription>
            Real-time cryptocurrency price updates. All data is updated automatically.
          </CardDescription>
        </CardHeader>
      </Card>
      
      <CryptoFilter />
      <CryptoTable />
    </div>
  );
};

export default CryptoDashboard;
