import './index.css';
import AppProvider from './AppContext';
import Home from './pages/Home';
import Splash from './components/Splash';
import BadgeNotification from './components/BadgeNotification';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Store from "./pages/Store";

function App() {
  return (
    <HashRouter>
      <AppProvider>
        <Splash />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
        </Routes>
        <BadgeNotification />
      </AppProvider>
    </HashRouter>
  );
}

export default App;
