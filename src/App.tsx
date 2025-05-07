import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ErrorBoundary } from 'react-error-boundary';
import Weather from './Weather';
import Loading from './Loading';
import './App.css';

const weatherProps = {
  cityProps: 'Tokyo',
  languageProps: 'en'
};

const cli = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <ErrorBoundary fallback={<p>Error...</p>}>
        <QueryClientProvider client={cli}>
          <Weather {...weatherProps} />
        </QueryClientProvider>
      </ErrorBoundary>
    </Suspense>
  );
}

export default App;
