import React, { useState, useEffect } from "react";
import { DatePicker, Button, InputNumber, message, Typography } from "antd";
import { fetchEventDates } from "../../../../api/eventsApi";
import { useTranslation } from "react-i18next";
import "./DateSelector.css";

const { Text } = Typography;

const DateSelector = ({
  onDateSelect,
  onCheckAvailability,
  onParticipantsSelect,
}) => {
  const { t } = useTranslation();
  const [enabledDates, setEnabledDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [participants, setParticipants] = useState(1);

  useEffect(() => {
    const loadDates = async () => {
      try {
        const dates = await fetchEventDates(1);
        if (Array.isArray(dates)) {
          setEnabledDates(dates);
        } else {
          console.error("Invalid dates format:", dates);
        }
      } catch (error) {
        console.error("Error fetching dates:", error);
        message.error(t("errorFetchingDates"));
      }
    };

    loadDates();
  }, [t]);

  const handleDateChange = (date, dateString) => {
    setSelectedDate(dateString);
    onDateSelect(dateString);
    console.log("Selected date:", dateString); // Debugging log
  };

  const handleParticipantsChange = (value) => {
    if (value >= 1 && value <= 99) {
      setParticipants(value);
      if (onParticipantsSelect) {
        onParticipantsSelect(value);
      }
      console.log("Participants updated to:", value); // Debugging log
    }
  };

  const handleCheckAvailability = () => {
    if (!selectedDate) {
      message.error(t("pleaseSelectDate"));
    } else {
      onCheckAvailability(selectedDate);
      console.log("Date availability checked for:", selectedDate); // Debugging log
    }
  };

  const disabledDate = (current) => {
    if (!current) return false;
    return !enabledDates.includes(current.format("YYYY-MM-DD"));
  };

  return (
    <div className="date-selector-container">
      <h3>{t("selectParticipantsAndDate")}</h3>
      <div className="controls">
        <div className="participants-controls">
          <Text className="label">{t("people")}: </Text>
          {participants > 1 && (
            <Button
              onClick={() => handleParticipantsChange(participants - 1)}
              className="participant-button"
            >
              -
            </Button>
          )}
          <InputNumber
            min={1}
            max={99}
            value={participants}
            onChange={handleParticipantsChange}
            className="participant-input"
          />
          <Button
            onClick={() => handleParticipantsChange(participants + 1)}
            disabled={participants >= 99}
            className="participant-button"
          >
            +
          </Button>
        </div>
        <div className="date-picker-wrapper">
          <DatePicker
            onChange={handleDateChange}
            placeholder={t("selectDate")}
            className="date-picker"
            disabledDate={disabledDate}
          />
        </div>
        <Button
          type="primary"
          className="check-availability"
          onClick={handleCheckAvailability}
        >
          {t("check_availability")}
        </Button>
      </div>
    </div>
  );
};

export default DateSelector;
