import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button, Input, Row, Col, Alert, notification, Form } from "antd";
import { useTranslation } from "react-i18next";
import config from "../../../../config";
import "./StripePayment.css";
import Cookies from "js-cookie";

const stripePromise = loadStripe(config.stripePublicKey);

const UserInfoForm = ({
  onUserSecretReceived,
  selectedDate,
  participants,
  onPaymentSuccess,
}) => {
  const { t } = useTranslation();
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const [form] = Form.useForm();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const nameRules = [
    {
      required: true,
      message: t("firstNameRequired"),
    },
    {
      pattern: /^[A-Za-zА-Яа-яЁё\s-]+$/,
      message: t("nameInvalid"),
    },
  ];

  const emailRules = [
    {
      required: true,
      message: t("emailRequired"),
    },
    {
      type: "email",
      message: t("emailInvalid"),
    },
  ];

  const handleSubmit = async (values) => {
    setError(null);
    setLoading(true);

    const csrfToken = Cookies.get("csrftoken");

    try {
      const response = await fetch(`${apiBaseUrl}/events/1/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        withCredentials: true,
        body: JSON.stringify({
          first_name: values.firstName.trim(),
          last_name: values.lastName.trim(),
          email: values.email.trim(),
          event_date_id: selectedDate,
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
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="firstName" rules={nameRules}>
              <Input placeholder={t("firstNamePlaceholder")} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="lastName" rules={nameRules}>
              <Input placeholder={t("lastNamePlaceholder")} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="email" rules={emailRules}>
          <Input placeholder={t("emailPlaceholder")} />
        </Form.Item>
        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            style={{ marginBottom: "10px" }}
          />
        )}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{ marginTop: "10px" }}
          >
            {t("continueButton")}
          </Button>
        </Form.Item>
      </Form>
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
        notification.success({
          message: t("bookedSuccessMessage"),
          description: t("bookedSuccessInfo"),
          duration: 5,
        });
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

  const currentLocale = i18n.language;

  return (
    <div className="stripe-payment-container">
      {!userSecret ? (
        <UserInfoForm
          onUserSecretReceived={handleUserSecretReceived}
          selectedDate={selectedDate}
          participants={participants}
          onPaymentSuccess={onPaymentSuccess}
        />
      ) : (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret: userSecret, locale: currentLocale }}
        >
          <PaymentForm
            userSecret={userSecret}
            onPaymentSuccess={onPaymentSuccess}
          />
        </Elements>
      )}
    </div>
  );
};

export default StripePaymentContainer;
