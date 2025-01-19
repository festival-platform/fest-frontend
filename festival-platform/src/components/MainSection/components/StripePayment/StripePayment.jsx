import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Button, Alert, Input, Row, Col } from "antd";
import { useTranslation } from "react-i18next";
import "./StripePayment.css";

const StripePayment = ({
  amount,
  selectedDate,
  participants,
  onPaymentSuccess,
}) => {
  const { t } = useTranslation();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError(null);

    if (!stripe || !elements) {
      setError("Stripe не инициализирован. Попробуйте позже.");
      return;
    }

    const cardElement = elements.getElement(CardElement);

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

      if (!client_secret) {
        throw new Error("Не удалось получить clientSecret.");
      }

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        switch (result.paymentIntent.status) {
          case "succeeded":
            setSuccess(true);
            onPaymentSuccess(result.paymentIntent);
            break;
          case "requires_action":
            const confirmResult = await stripe.confirmCardPayment(
              client_secret
            );
            if (confirmResult.error) {
              setError(confirmResult.error.message);
            } else if (confirmResult.paymentIntent.status === "succeeded") {
              setSuccess(true);
              onPaymentSuccess(confirmResult.paymentIntent);
            }
            break;
          default:
            setError("Неизвестный статус платежа.");
        }
      }
    } catch (err) {
      setError(err.message || "Произошла ошибка при обработке платежа.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="stripe-payment-container">
      {success ? (
        <Alert
          message={t("paymentSuccess")}
          type="success"
          showIcon
          className="success-alert"
        />
      ) : (
        <form onSubmit={handleSubmit} className="stripe-form">
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
          <div className="card-element-container" style={{ marginTop: "20px" }}>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#495057",
                    fontFamily: '"Roboto", sans-serif',
                    "::placeholder": {
                      color: "#868e96",
                    },
                  },
                },
              }}
            />
          </div>
          {error && <Alert message={error} type="error" showIcon />}
          <Button
            type="primary"
            htmlType="submit"
            disabled={!stripe || processing}
            loading={processing}
            className="pay-button"
          >
            {t("payButton")}
          </Button>
        </form>
      )}
    </div>
  );
};

export default StripePayment;
