import React, { useState, useEffect } from "react";
import { DatePicker, Button, Dropdown, InputNumber, Menu } from "antd";
import { fetchEventDates } from "../../../../api/eventsApi";
import { UserOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import "./DateSelector.css";

const DateSelector = ({ onDateSelect }) => {
  const { t } = useTranslation();
  const [enabledDates, setEnabledDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [participants, setParticipants] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    fetchEventDates(1).then((dates) => {
      setEnabledDates(dates);
    });
  }, []);

  const handleDateChange = (date, dateString) => {
    setSelectedDate(dateString);
    onDateSelect(dateString);
  };

  const disabledDate = (current) => {
    if (!current) return false;
    return !enabledDates.includes(current.format("YYYY-MM-DD"));
  };

  const handleParticipantsChange = (value) => {
    setParticipants(value);
  };

  const dropdownMenu = (
    <Menu>
      <Menu.Item key="1">
        <div className="participants-dropdown">
          <div className="dropdown-item">
            <div className="label">{t("people")}</div>
            <div className="controls">
              <Button
                onClick={() => setParticipants(participants - 1)}
                disabled={participants <= 1}
              >
                -
              </Button>
              <InputNumber
                min={1}
                max={99}
                value={participants}
                onChange={handleParticipantsChange}
              />
              <Button onClick={() => setParticipants(participants + 1)}>
                +
              </Button>
            </div>
            <div className="age-info">{t("ageInfo")}</div>
          </div>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="date-selector-container">
      <h3>{t("selectParticipantsAndDate")}</h3>
      <div className="controls">
        <div className="participants">
          <Dropdown
            menu={{ items: dropdownMenu }}
            trigger={["click"]}
            open={isDropdownOpen}
            onOpenChange={setIsDropdownOpen}
          >
            <Button className="participants-selector">
              <UserOutlined /> {t("people")} x {participants}
            </Button>
          </Dropdown>
        </div>
        <div className="date-picker-wrapper">
          <DatePicker
            onChange={handleDateChange}
            placeholder={t("selectDate")}
            className="date-picker"
            disabledDate={disabledDate}
          />
        </div>
        <Button type="primary" className="check-availability">
          {t("check_availability")}
        </Button>
      </div>
    </div>
  );
};

export default DateSelector;
