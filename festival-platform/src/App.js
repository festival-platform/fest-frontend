import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MainSection from "./components/MainSection/MainSection";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

const About = () => <div>О нас</div>;
const Contacts = () => <div>Контакты</div>;
const Home = () => <MainSection />; // Главная страница

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contacts" element={<Contacts />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
