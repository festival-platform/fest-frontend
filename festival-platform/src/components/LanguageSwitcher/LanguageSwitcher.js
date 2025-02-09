import React from "react";
import { useTranslation } from "react-i18next";
import "./LanguageSwitcher.css";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="language-switcher">
      <button onClick={() => changeLanguage("en")} className="lang-button">
        <img
          src="/flags/united-kingdom.png"
          alt="English"
          className="flag-icon"
        />
      </button>
      <button onClick={() => changeLanguage("de")} className="lang-button">
        <img src="/flags/germany.png" alt="Deutsch" className="flag-icon" />
      </button>
    </div>
  );
};

export default LanguageSwitcher;
