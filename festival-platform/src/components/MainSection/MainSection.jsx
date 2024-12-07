import React, { useState, useEffect } from "react";
import { Carousel, Typography, Button, Row, Col } from "antd";
import {
  DollarCircleOutlined,
  ClockCircleOutlined,
  RedEnvelopeOutlined,
} from "@ant-design/icons";
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

  if (!data) return <div className="loading">Loading...</div>;

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
        <Title level={3} className="title">
          {data.welcomeMessage}
        </Title>
        <Paragraph className="description">{data.description}</Paragraph>
        <div className="event-info-container">
          <Title level={3}>About the event</Title>
          <div className="event-info">
            <Row gutter={16}>
              <Col span={8}>
                <div className="price-info">
                  <DollarCircleOutlined
                    style={{ fontSize: "24px", color: "#52c41a" }}
                  />
                  <span className="price-text">Price: {data.price} €</span>
                </div>
              </Col>
              <Col span={8}>
                <div className="duration-info">
                  <ClockCircleOutlined
                    style={{ fontSize: "24px", color: "#fa8c16" }}
                  />
                  <span className="duration-text">
                    Duration: {data.duration}
                  </span>
                </div>
              </Col>
              <Col span={8}>
                <div className="cancellation-info">
                  <RedEnvelopeOutlined
                    style={{ fontSize: "24px", color: "#1890ff" }}
                  />
                  <span className="cancellation-text">Free cancellation</span>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <DateSelector onDateSelect={handleDateChange} />{" "}
        {selectedDate && (
          <Button type="primary" size="large" className="register-button">
            Sign up for {selectedDate}
          </Button>
        )}
      </div>
    </div>
  );
};

export default MainSection;
