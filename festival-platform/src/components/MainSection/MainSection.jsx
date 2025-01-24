import React, { useState, useEffect } from "react";
import { Carousel, Typography, Row, Col, Radio } from "antd";
import { DollarCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";
import DateSelector from "./components/DateSelector/DateSelector";
import ReviewForm from "../ReviewForm/ReviewForm";
import StripePayment from "./components/StripePayment/StripePayment";
import PayPalPayment from "./components/PayPalPayment/PayPalPayment";
import ReviewsCarousel from "./components/ReviewsCarousel/ReviewsCarousel";
import "./MainSection.css";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import config from "../../config";

const { Title, Paragraph } = Typography;

const stripePromise = loadStripe(config.stripePublicKey);

const BASE_URL = "http://127.0.0.1:8000/api";

const MainSection = ({ eventId = 1, lang = "de" }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [participants, setParticipants] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [paymentEnabled, setPaymentEnabled] = useState(false);
  const [stripeWidgetEnabled, setStripeWidgetEnabled] = useState(false);
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
          `${BASE_URL}/events/${eventId}/?lang=${lang}`
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

  const handleDateChange = (dateString) => {
    setSelectedDate(dateString);
  };

  const handleCheckAvailability = (isDateSelected) => {
    if (isDateSelected) {
      setPaymentEnabled(true);
      setStripeWidgetEnabled(true);
    }
  };

  if (!data) return <div className="loading">Loading...</div>;

  const totalAmount = data.price * participants * 100;

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
        <Paragraph className="description">{t("descriptionEvent")}</Paragraph>

        <div className="event-info-container">
          <Title level={3}>{t("aboutTheEvent")}</Title>
          <div className="event-info">
            <Row gutter={16}>
              <Col span={12}>
                <div className="price-info">
                  <DollarCircleOutlined
                    style={{ fontSize: "24px", color: "#52c41a" }}
                  />
                  <span className="price-text">
                    {t("priceEvent")}: {data.price} €
                  </span>
                </div>
              </Col>
              <Col span={12}>
                <div className="duration-info">
                  <ClockCircleOutlined
                    style={{ fontSize: "24px", color: "#fa8c16" }}
                  />
                  <span className="duration-text">
                    {t("durationEvent")}: {data.dates?.length || "N/A"}{" "}
                    {t("days")}
                  </span>
                </div>
              </Col>
            </Row>
          </div>
        </div>

        <DateSelector
          onDateSelect={handleDateChange}
          onParticipantsSelect={(value) => setParticipants(value)}
          onCheckAvailability={handleCheckAvailability}
          availableDates={data.dates}
        />

        {paymentEnabled && (
          <div className="payment-method">
            <Title level={4}>{t("selectPaymentMethod")}</Title>
            <Radio.Group
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              buttonStyle="solid"
            >
              <Radio.Button value="stripe">{t("stripe")}</Radio.Button>
              <Radio.Button value="paypal">{t("paypal")}</Radio.Button>
            </Radio.Group>
          </div>
        )}

        {selectedDate &&
          participants > 0 &&
          paymentMethod === "stripe" &&
          stripeWidgetEnabled && (
            <div className="payment-section">
              <Row gutter={16}>
                <Col span={22}>
                  <Elements stripe={stripePromise}>
                    <StripePayment
                      amount={totalAmount}
                      selectedDate={selectedDate}
                      participants={participants}
                      onPaymentSuccess={(data) => {
                        console.log("Payment successful:", data);
                      }}
                    />
                  </Elements>
                </Col>
              </Row>
            </div>
          )}

        {selectedDate && participants > 0 && paymentMethod === "paypal" && (
          <div className="payment-section">
            <PayPalPayment
              amount={totalAmount}
              selectedDate={selectedDate}
              participants={participants}
              onPaymentSuccess={(details) => {
                console.log("PayPal payment successful:", details);
              }}
            />
          </div>
        )}

        <div className="reviews-container">
          <ReviewsCarousel />
        </div>

        <div className="review-section">
          <ReviewForm />
        </div>
      </div>
    </div>
  );
};

export default MainSection;
