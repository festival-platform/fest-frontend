import React, { useState, useEffect } from "react";
import { DatePicker, Space } from "antd";
import { fetchEventDates } from "../../../../api/eventsApi";

const DateSelector = ({ onDateSelect }) => {
  const [enabledDates, setEnabledDates] = useState([]);

  useEffect(() => {
    fetchEventDates(1).then((dates) => {
      setEnabledDates(dates);
    });
  }, []);

  const handleDateChange = (date, dateString) => {
    onDateSelect(dateString);
  };

  const disabledDate = (current) => {
    if (!current) return false;
    return !enabledDates.includes(current.format("YYYY-MM-DD"));
  };

  return (
    <Space direction="vertical" size={12} className="date-picker-space">
      <DatePicker
        onChange={handleDateChange}
        placeholder="Выберите дату"
        className="date-picker"
        disabledDate={disabledDate}
      />
    </Space>
  );
};

export default DateSelector;
