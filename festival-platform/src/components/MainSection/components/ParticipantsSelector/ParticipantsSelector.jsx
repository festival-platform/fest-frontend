import React, { useState } from "react";
import { Dropdown, Button, InputNumber, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./ParticipantsSelector.css";

const ParticipantsSelector = () => {
  const [count, setCount] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
          <div className="label">People</div>
          <div className="controls">
            <Button onClick={handleDecrement} disabled={count <= 1}>
              -
            </Button>
            <InputNumber
              min={1}
              max={99}
              value={count}
              onChange={handleInputChange}
            />
            <Button onClick={handleIncrement}>+</Button>
          </div>
          <div className="age-info">(Age: 100 and younger)</div>
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
        <UserOutlined /> People x {count}
      </Button>
    </Dropdown>
  );
};

export default ParticipantsSelector;
