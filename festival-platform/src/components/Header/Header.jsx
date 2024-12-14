import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import "./Header.css";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

const Header = () => {
  const menuItems = [
    { label: "Main", key: "1", link: "/" },
    { label: "About us", key: "2", link: "/about" },
    { label: "Contacts", key: "3", link: "/contacts" },
  ];

  return (
    <div className="header">
      <div className="logo">LOGO</div>
      <div className="menu-buttons">
        {menuItems.map((item) => (
          <Link key={item.key} to={item.link}>
            <Button type="primary" className="menu-button">
              {item.label}
            </Button>
          </Link>
        ))}
        <LanguageSwitcher />
      </div>
    </div>
  );
};

export default Header;
