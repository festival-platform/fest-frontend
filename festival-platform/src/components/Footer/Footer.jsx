import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div
      style={{
        textAlign: "center",
        background: "#f0f2f5",
        padding: "10px 0",
      }}
    >
      <Link to="/privacy-policy" style={{ margin: "0 10px" }}>
        {t("privacyPolicy")}
      </Link>
      |
      <Link to="/legal-notice" style={{ margin: "0 10px" }}>
        {t("impressum")}
      </Link>
    </div>
  );
};

export default Footer;
