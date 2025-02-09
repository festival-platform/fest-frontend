import React, { useState, useEffect } from "react";
import { Carousel, Typography } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import ReviewForm from "../ReviewForm/ReviewForm";
import ReviewsCarousel from "./components/ReviewsCarousel/ReviewsCarousel";
import WhatsAppButton from "./components/WhatsAppButton/WhatsAppButton";
import SessionBooking from "./components/StempBlock/StempBlock";
import "./MainSection.css";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import parse from "html-react-parser";

const { Title, Paragraph } = Typography;
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const MainSection = ({ eventId = 1, lang = "de" }) => {
  const [data, setData] = useState(null);
  const { t } = useTranslation();

  const addTranslations = (json) => {
    const languages = ["de", "en"];
    languages.forEach((lng) => {
      i18n.addResource(lng, "translation", "nameEvent", json[`name_${lng}`]);
      i18n.addResource(
        lng,
        "translation",
        "descriptionEvent",
        json[`description_${lng}`]
      );
    });
  };

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch(
          `${apiBaseUrl}/events/${eventId}/?lang=${lang}`
        );
        if (!response.ok) {
          throw new Error(`Ошибка: ${response.status}`);
        }
        const json = await response.json();
        setData(json);
        addTranslations(json);
      } catch (error) {
        console.error("Ошибка при запросе данных о мероприятии:", error);
      }
    };

    fetchEventData();
  }, [eventId, lang]);

  if (!data)
    return (
      <div className="loading-container">
        <div className="spinner">
          <LoadingOutlined style={{ fontSize: 50, color: "#1890ff" }} spin />
          <p>Loading...</p>
        </div>
      </div>
    );

  const sessions = ["morning", "afternoon", "evening"].map((timeSlot) => {
    const filteredDates = data.event_dates.filter(
      (item) => item.time_slot === timeSlot
    );
    return {
      key: timeSlot,
      price: data[`${timeSlot}_price`],
      duration: filteredDates.length || "N/A",
      availableDates: filteredDates,
    };
  });

  return (
    <div className="main-section">
      <div className="carousel-container">
        <Carousel autoplay>
          {data.images.map((image, index) => (
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
          {t("nameEvent")}
        </Title>
        <Paragraph className="description">
          {parse(t("descriptionEvent"))}
        </Paragraph>

        {sessions.map(({ key, price, duration, availableDates }) => (
          <SessionBooking
            key={key}
            session={key}
            price={price}
            duration={duration}
            availableDates={availableDates}
          />
        ))}

        <hr />

        <div className="reviews-container">
          <ReviewsCarousel />
        </div>

        <div className="review-section">
          <ReviewForm />
        </div>
      </div>

      <WhatsAppButton />
    </div>
  );
};

export default MainSection;
