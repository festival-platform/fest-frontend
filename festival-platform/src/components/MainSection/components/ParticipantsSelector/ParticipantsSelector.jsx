import React, { useState } from "react";
import { Dropdown, Button, InputNumber, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import "./ParticipantsSelector.css";

const ParticipantsSelector = () => {
  const [count, setCount] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { t } = useTranslation();

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (count > 1) setCount((prev) => prev - 1);
  };

  const handleInputChange = (value) => {
    setCount(value || 1);
  };

  const menu = (
    <Menu className="participants-dropdown">
      <Menu.Item key="1">
        <div className="dropdown-item">
          <div className="label">{t("people")}</div>
          <div className="controls">
            <Button onClick={handleDecrement} disabled={count <= 1}>
              {t("decrement")}
            </Button>
            <InputNumber
              min={1}
              max={99}
              value={count}
              onChange={handleInputChange}
            />
            <Button onClick={handleIncrement}>{t("increment")}</Button>
          </div>
          <div className="age-info">{t("ageInfo")}</div>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown
      menu={menu}
      trigger={["click"]}
      open={isDropdownOpen}
      onOpenChange={setIsDropdownOpen}
      overlayClassName="participants-dropdown"
    >
      <Button className="participants-selector">
        <UserOutlined /> {t("people")} x {count}
      </Button>
    </Dropdown>
  );
};

export default ParticipantsSelector;
