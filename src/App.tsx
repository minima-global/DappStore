import './index.css';
import SlideRoutes from 'react-slide-routes';
import { HashRouter, Route } from 'react-router-dom';
import AppProvider, { appContext } from './AppContext';
import Home from './pages/Home';
import Store from './pages/Store';
import AppPage from './pages/AppPage';
import Splash from './components/Splash';
import BadgeNotification from './components/BadgeNotification';
import AppIsInReadMode from './components/AppIsInReadMode';
import TermsOfUse from './components/TermsOfUse';
import { useContext } from 'react';

const Routes = () => {
  const { appReady } = useContext(appContext);
  const isDesktop = window.outerWidth > 720;

  if (!appReady) {
    return null;
  }

  return (
    <SlideRoutes duration={isDesktop ? 0 : 150}>
      <Route path="/" element={<Home />} />
      <Route path="/store/:id" element={<Store />} />
      <Route path="/store/:id/:name" element={<AppPage />} />
    </SlideRoutes>
  )
}

function App() {

  return (
    <HashRouter>
      <AppProvider>
        <Splash />
        <TermsOfUse />
        <AppIsInReadMode />
        <Routes />
        <BadgeNotification />
      </AppProvider>
    </HashRouter>
  );
}

export default App;
