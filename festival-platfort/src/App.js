import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MainSection from "./components/MainSection/MainSection";
import "./App.css";

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <main className="app-content">
        <MainSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
