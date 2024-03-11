import ReactDOM from 'react-dom/client';
import App from './App.tsx';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '@vkontakte/vkui/dist/vkui.css';
import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
