import React from "react";
import { Button } from "antd";
import "./Header.css";

const Header = () => {
  const menuItems = [
    { label: "Главная", key: "1" },
    { label: "О нас", key: "2" },
  ];

  return (
    <div className="header">
      <div className="logo">ЛОГО</div>
      <div className="menu-buttons">
        {menuItems.map((item) => (
          <Button key={item.key} type="primary" className="menu-button">
            {item.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Header;
