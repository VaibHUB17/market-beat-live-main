
import { updateCryptoPrice } from '../store/cryptoSlice';
import { AppDispatch } from '../store/store';
import { RootState } from '../store/store';

class MockCryptoWebSocket {
  private interval: number | null = null;
  private dispatch: AppDispatch | null = null;
  private getState: (() => RootState) | null = null;

  connect(dispatch: AppDispatch, getState: () => RootState) {
    this.dispatch = dispatch;
    this.getState = getState;
    
    if (this.interval) {
      clearInterval(this.interval);
    }

    // Simulate WebSocket updates every 1-2 seconds
    this.interval = window.setInterval(() => {
      this.simulatePriceUpdate();
    }, 1500);
    
    console.log('WebSocket connected and simulating live data');
  }

  disconnect() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    this.dispatch = null;
    this.getState = null;
    console.log('WebSocket disconnected');
  }

  private simulatePriceUpdate() {
    if (!this.dispatch || !this.getState) return;

    // Get current state to access current prices
    const state = this.getState();
    
    // Generate a random asset ID (1-6)
    const randomId = Math.floor(Math.random() * 6) + 1;
    
    // Find the asset to update
    const asset = state.crypto.assets.find(a => a.id === randomId);
    if (!asset) return;
    
    // Random price fluctuation between -1.5% and +1.5%
    const priceChangePercent = (Math.random() * 3 - 1.5) * 0.01;
    const newPrice = asset.price * (1 + priceChangePercent);
    
    // Update hourly changes with some random fluctuation
    const hourChange = asset.percentChange1h + (Math.random() * 0.4 - 0.2);
    const dayChange = asset.percentChange24h + (Math.random() * 0.6 - 0.3);
    
    // Random volume change
    const volumeChangePercent = (Math.random() * 5 - 2.5) * 0.01;
    const newVolume = asset.volume24h * (1 + volumeChangePercent);
    
    this.dispatch(updateCryptoPrice({
      id: randomId,
      price: parseFloat(newPrice.toFixed(2)),
      percentChange1h: parseFloat(hourChange.toFixed(2)),
      percentChange24h: parseFloat(dayChange.toFixed(2)),
      volume24h: Math.round(newVolume)
    }));
  }
}

export const mockWebSocket = new MockCryptoWebSocket();
