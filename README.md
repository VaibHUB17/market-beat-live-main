# Market Crypto Live

A real-time cryptocurrency market dashboard with live price updates and market data visualization.

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/market-beat-live.git
cd market-beat-live
```

2. Install dependencies
```bash
npm install
# or 
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:8080`

### Building for Production

```bash
npm run build
# or
yarn build
```

## Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Redux Toolkit** - State management
  - Manages cryptocurrency data, filters, and sorting configuration
- **React Router** - Page routing
- **Recharts** - Data visualization for price charts
- **TailwindCSS** - Utility-first CSS framework
- **shadcn/ui** - Component library built on Radix UI
- **Vite** - Frontend build tool

### Data
- Custom mock WebSocket implementation that simulates real-time cryptocurrency price updates

## Architecture

### Component Structure
- **App**: Root component with routing and global providers
- **Pages**:
  - **Index**: Main page wrapping the dashboard with Redux provider
  - **NotFound**: 404 error page
- **Components**:
  - **CryptoDashboard**: Container for the crypto dashboard that connects to WebSocket
  - **CryptoTable**: Displays cryptocurrency data in a table format with sparkline charts
  - **CryptoFilter**: Provides filters and sorting options for cryptocurrency data
  - **UI Components**: Reusable UI components from shadcn/ui

### State Management
- **Redux Store**: Central state store with the following slices:
  - `cryptoSlice`: Manages cryptocurrency data, filters, and sorting
- **Selectors**:
  - `selectFilteredAndSortedAssets`: Returns filtered and sorted assets based on user preferences
  - `selectSortConfig`: Returns the current sort configuration
  - `selectFilters`: Returns the current filter settings

### Data Flow
1. Mock WebSocket service simulates cryptocurrency price updates at regular intervals
2. Updates are dispatched to the Redux store
3. React components subscribe to store updates and re-render when data changes
4. User interactions with filters and sort options update the Redux store
5. Filtered and sorted data is derived using selectors

### Styling
- TailwindCSS for utility-first styling with dark/light mode support
