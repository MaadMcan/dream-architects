import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import TeamPage from './pages/TeamPage';
import FaqPage from './pages/FaqPage';
import PortfolioPage from './pages/PortfolioPage';
import ContactPage from './pages/ContactPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="portfolio" element={<PortfolioPage />} />
        <Route path="portfolio/:slug" element={<ProjectDetailPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="team" element={<TeamPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="about" element={<AboutPage />} />

      </Route>
    </Routes>
  );
}

export default App;