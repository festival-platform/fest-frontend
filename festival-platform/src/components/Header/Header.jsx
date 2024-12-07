import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import "./Header.css";

const Header = () => {
  const menuItems = [
    { label: "Главная", key: "1", link: "/" },
    { label: "О нас", key: "2", link: "/about" },
    { label: "Контакты", key: "3", link: "/contacts" },
  ];

  return (
    <div className="header">
      <div className="logo">ЛОГО</div>
      <div className="menu-buttons">
        {menuItems.map((item) => (
          <Link key={item.key} to={item.link}>
            <Button type="primary" className="menu-button">
              {item.label}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Header;
