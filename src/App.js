import { QueryClientProvider, QueryClient } from 'react-query';
import './App.css';
import { Home } from './pages/Home';

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <div className="App">
        <Home />
      </div>
    </QueryClientProvider>
  );
}

export default App;
