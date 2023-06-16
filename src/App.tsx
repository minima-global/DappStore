import './index.css';
import AppProvider from './AppContext';
import Home from './pages/Home';
import Splash from './components/Splash';
import BadgeNotification from './components/BadgeNotification';

function App() {
  return (
    <AppProvider>
      <Splash />
      <Home />
      <BadgeNotification />
    </AppProvider>
  );
}

export default App;
