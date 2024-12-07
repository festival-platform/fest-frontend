import React, { useState, useEffect } from "react";
import { DatePicker, Button, Dropdown, InputNumber } from "antd";
import { fetchEventDates } from "../../../../api/eventsApi";
import { UserOutlined } from "@ant-design/icons";
import "./DateSelector.css";

const DateSelector = ({ onDateSelect }) => {
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

  const dropdownContent = (
    <div className="participants-dropdown">
      <div className="dropdown-item">
        <div className="label">People</div>
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
          <Button onClick={() => setParticipants(participants + 1)}>+</Button>
        </div>
        <div className="age-info">(Age: 100 and younger)</div>
      </div>
    </div>
  );

  return (
    <div className="date-selector-container">
      <h3>Select participants and date</h3>
      <div className="controls">
        <div className="participants">
          <Dropdown
            overlay={dropdownContent}
            trigger={["click"]}
            open={isDropdownOpen}
            onOpenChange={setIsDropdownOpen}
          >
            <Button className="participants-selector">
              <UserOutlined /> People x {participants}
            </Button>
          </Dropdown>
        </div>
        <div className="date-picker-wrapper">
          <DatePicker
            onChange={handleDateChange}
            placeholder="Select date"
            className="date-picker"
            disabledDate={disabledDate}
          />
        </div>
        <Button type="primary" className="check-availability">
          Check availability
        </Button>
      </div>
    </div>
  );
};

export default DateSelector;
