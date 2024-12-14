import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import "./Header.css";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();

  const menuItems = [
    { key: "1", labelKey: "menuMain", link: "/" },
    { key: "2", labelKey: "menuAboutUs", link: "/about" },
    { key: "3", labelKey: "menuContacts", link: "/contacts" },
  ];

  return (
    <div className="header">
      <div className="logo">LOGO</div>
      <div className="menu-buttons">
        {menuItems.map((item) => (
          <Link key={item.key} to={item.link}>
            <Button type="primary" className="menu-button">
              {t(item.labelKey)}
            </Button>
          </Link>
        ))}
        <LanguageSwitcher />
      </div>
    </div>
  );
};

export default Header;
