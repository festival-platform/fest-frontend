import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MainSection from "./components/MainSection/MainSection";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AboutPage from "./pages/AboutPage/AboutPage";
import ContactsPage from "./pages/ContactsPage/ContactsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage/PrivacyPolicyPage";
import LegalNoticePage from "./pages/LegalNoticePage/LegalNoticePage";
import "./App.css";
import "./i18n";

const Home = () => <MainSection />;

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/legal-notice" element={<LegalNoticePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
