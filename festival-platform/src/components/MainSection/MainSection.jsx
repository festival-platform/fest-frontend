import React, { useState, useEffect } from "react";
import { Carousel, Typography, Button } from "antd";
import DateSelector from "./components/DateSelector/DateSelector";
import "./MainSection.css";

const { Title, Paragraph } = Typography;

const MainSection = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("content.json")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  const handleDateChange = (dateString) => {
    setSelectedDate(dateString);
  };

  if (!data) return <div className="loading">Загрузка...</div>;

  return (
    <div className="main-section">
      <div className="carousel-container">
        <Carousel autoplay>
          {data.carouselImages.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="carousel-image"
              />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="info-container">
        <Title level={2} className="title">
          {data.welcomeMessage}
        </Title>
        <Paragraph className="description">{data.description}</Paragraph>
        <DateSelector onDateSelect={handleDateChange} />{" "}
        {selectedDate && (
          <Button type="primary" size="large" className="register-button">
            Записаться на {selectedDate}
          </Button>
        )}
      </div>
    </div>
  );
};

export default MainSection;
