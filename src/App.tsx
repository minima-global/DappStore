import './index.css';
import AppProvider from './AppContext';
import Home from './pages/Home';
import Splash from './components/Splash';
import BadgeNotification from './components/BadgeNotification';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Store from "./pages/Store";
import AppPage from "./pages/AppPage";
import SlideRoutes from "react-slide-routes";

function App() {
  return (
    <HashRouter>
      <AppProvider>
        <Splash />
        <SlideRoutes duration={150}>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/app" element={<AppPage />} />
        </SlideRoutes>
        <BadgeNotification />
      </AppProvider>
    </HashRouter>
  );
}

export default App;
