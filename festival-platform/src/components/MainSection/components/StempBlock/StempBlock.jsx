import React, { useState } from "react";
import { Typography, Row, Col, Radio, Collapse } from "antd";
import { DollarCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";
import DateSelector from "../DateSelector/DateSelector";
import StripePayment from "../StripePayment/StripePayment";
import PayPalPayment from "../PayPalPayment/PayPalPayment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import config from "../../../../config";
import { useTranslation } from "react-i18next";

const { Title } = Typography;
const { Panel } = Collapse;
const stripePromise = loadStripe(config.stripePublicKey);

const SessionBooking = ({ session, price, duration, availableDates }) => {
  const { t } = useTranslation();

  const [selectedDate, setSelectedDate] = useState(null);
  const [participants, setParticipants] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("Card");
  const [paymentEnabled, setPaymentEnabled] = useState(false);
  const [stripeWidgetEnabled, setStripeWidgetEnabled] = useState(false);

  const handleDateChange = (dateString) => {
    setSelectedDate(dateString);
  };

  const handleCheckAvailability = (isDateSelected) => {
    if (isDateSelected) {
      setPaymentEnabled(true);
      setStripeWidgetEnabled(true);
    }
  };

  const totalAmount = price * participants * 100;

  let sessionLabel = "";
  let sessionDescription = "";
  let sessionDiration = "";
  switch (session) {
    case "morning":
      sessionLabel = t("morningSession") || "Morning";
      sessionDescription = t("morningDescription");
      sessionDiration = "5";
      break;
    case "afternoon":
      sessionLabel = t("afternoonSession") || "Afternoon";
      sessionDescription = t("afternoonDescription");
      sessionDiration = "5";
      break;
    case "evening":
      sessionLabel = t("eveningSession") || "Evening";
      sessionDescription = t("eveningDescription");
      sessionDiration = "7";
      break;
    default:
      sessionLabel = "";
      sessionDescription = "";
  }

  return (
    <div className="session-booking">
      <hr />
      <div className="event-info-container">
        <Title level={4}>{sessionLabel}</Title>
        <div className="event-info">
          <Row gutter={16}>
            <Col span={12}>
              <div className="price-info">
                <DollarCircleOutlined
                  style={{ fontSize: "20px", color: "#52c41a" }}
                />
                <span className="price-text">
                  {t("priceEvent")}: {price} €
                </span>
              </div>
            </Col>
            <Col span={12}>
              <div className="duration-info">
                <ClockCircleOutlined
                  style={{ fontSize: "20px", color: "#fa8c16" }}
                />
                <span className="duration-text">
                  {t("durationEvent")}: {sessionDiration} {t("hours")}
                </span>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      <Collapse ghost>
        <Panel header={t("about") || "About"} key="1">
          <div dangerouslySetInnerHTML={{ __html: sessionDescription }} />
        </Panel>
      </Collapse>

      <DateSelector
        onDateSelect={handleDateChange}
        onParticipantsSelect={(value) => setParticipants(value)}
        onCheckAvailability={handleCheckAvailability}
        availableDates={availableDates}
      />

      {paymentEnabled && (
        <div className="payment-method">
          <Title level={4}>{t("selectPaymentMethod")}</Title>
          <Radio.Group
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            buttonStyle="solid"
          >
            <Radio.Button value="Card">{t("Card")}</Radio.Button>
            <Radio.Button value="PayPal">{t("PayPal")}</Radio.Button>
          </Radio.Group>
        </div>
      )}

      {selectedDate &&
        participants > 0 &&
        paymentMethod === "Card" &&
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

      {selectedDate && participants > 0 && paymentMethod === "PayPal" && (
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
    </div>
  );
};

export default SessionBooking;
