import Weather from './Weather';
import './App.css';

const weatherProps = {
  cityProps: 'Tokyo',
  languageProps: 'en'
};

function App() {
  return (
    <Weather {...weatherProps} />
  );
}

export default App;
