import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button, Input, Row, Col, Alert } from "antd";
import { useTranslation } from "react-i18next";
import config from "../../../../config";
import "./StripePayment.css";

const stripePromise = loadStripe(config.stripePublicKey);

const UserInfoForm = ({
  onUserSecretReceived,
  selectedDate,
  participants,
  onPaymentSuccess,
}) => {
  const { t } = useTranslation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/events/1/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          date: selectedDate,
          quantity: participants,
          payment_provider: "stripe",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Ошибка сервера");
      }

      const { client_secret } = await response.json();
      if (!client_secret) throw new Error("Не удалось получить client_secret.");
      onUserSecretReceived(client_secret);
    } catch (err) {
      setError(err.message || "Произошла ошибка.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-info-form">
      <Row gutter={16}>
        <Col span={12}>
          <Input
            placeholder={t("firstNamePlaceholder")}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Col>
        <Col span={12}>
          <Input
            placeholder={t("lastNamePlaceholder")}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Col>
      </Row>
      <Input
        placeholder={t("emailPlaceholder")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginTop: "10px" }}
      />
      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          style={{ marginTop: "10px" }}
        />
      )}
      <Button
        type="primary"
        onClick={handleSubmit}
        loading={loading}
        style={{ marginTop: "10px" }}
      >
        {t("continueButton")}
      </Button>
    </div>
  );
};

const PaymentForm = ({ userSecret, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError(null);

    try {
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.href,
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        onPaymentSuccess(result.paymentIntent);
      } else {
        setError("Неизвестный статус платежа.");
      }
    } catch (err) {
      setError(err.message || "Произошла ошибка при обработке платежа.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <div className="payment-element-container">
        <PaymentElement />
      </div>
      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          style={{ marginTop: "10px" }}
        />
      )}
      <Button
        type="primary"
        htmlType="submit"
        disabled={processing}
        loading={processing}
        style={{ marginTop: "20px" }}
      >
        {t("payButton")}
      </Button>
    </form>
  );
};

const StripePaymentContainer = ({
  selectedDate,
  participants,
  onPaymentSuccess,
  amount,
}) => {
  const { i18n } = useTranslation();
  const [userSecret, setUserSecret] = useState(null);

  const handleUserSecretReceived = (secret) => {
    setUserSecret(secret);
  };

  const handlePaymentSuccess = (paymentIntent) => {
    console.log("Payment successful:", paymentIntent);
  };

  const currentLocale = i18n.language;

  return (
    <div className="stripe-payment-container">
      {!userSecret ? (
        <UserInfoForm
          onUserSecretReceived={handleUserSecretReceived}
          selectedDate={selectedDate}
          participants={participants}
          onPaymentSuccess={handlePaymentSuccess}
        />
      ) : (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret: userSecret, locale: currentLocale }}
        >
          <PaymentForm
            userSecret={userSecret}
            onPaymentSuccess={handlePaymentSuccess}
          />
        </Elements>
      )}
    </div>
  );
};

export default StripePaymentContainer;
