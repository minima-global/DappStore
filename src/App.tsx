import './index.css';
import SlideRoutes from "react-slide-routes";
import { HashRouter, Route } from 'react-router-dom';
import AppProvider from './AppContext';
import Home from './pages/Home';
import Store from "./pages/Store";
import AppPage from "./pages/AppPage";
import Splash from './components/Splash';
import BadgeNotification from './components/BadgeNotification';
import AppIsInReadMode from "./components/AppIsInReadMode";

function App() {
  const isDesktop = window.outerWidth > 720;

  return (
    <HashRouter>
      <AppProvider>
        <Splash />
        <AppIsInReadMode />
        <SlideRoutes duration={isDesktop ? 0 : 150}>
          <Route path="/" element={<Home />} />
          <Route path="/store/:id" element={<Store />} />
          <Route path="/store/:id/:name" element={<AppPage />} />
        </SlideRoutes>
        <BadgeNotification />
      </AppProvider>
    </HashRouter>
  );
}

export default App;
