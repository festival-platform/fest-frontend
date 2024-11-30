import React from "react";
import { Menu } from "antd";
import "./Header.css";

const Header = () => {
  const menuItems = [
    { label: "Главная", key: "1" },
    { label: "О нас", key: "2" },
  ];

  return (
    <div className="header">
      <div className="logo">ЛОГО</div>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        items={menuItems}
      />
    </div>
  );
};

export default Header;
