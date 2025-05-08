
import { Provider } from 'react-redux';
import { store } from '../store/store';
import CryptoDashboard from '../components/CryptoDashboard';

const Index = () => {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50">
        <CryptoDashboard />
      </div>
    </Provider>
  );
};

export default Index;
