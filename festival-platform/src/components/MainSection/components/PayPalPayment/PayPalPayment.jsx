import React from "react";
import { notification } from "antd";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useTranslation } from "react-i18next";
import config from "../../../../config";
import Cookies from "js-cookie";

const PayPalPayment = ({
  amount,
  selectedDate,
  participants,
  onPaymentSuccess,
}) => {
  const { t } = useTranslation();
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const clientId = config.clientId;

  const csrfToken = Cookies.get("csrftoken");

  const handlePaymentSuccess = async (details) => {
    try {
      const bookingResponse = await fetch(`${apiBaseUrl}/events/1/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        withCredentials: true,
        body: JSON.stringify({
          first_name: details.payer.name.given_name,
          last_name: details.payer.name.surname,
          email: details.payer.email_address,
          event_date_id: selectedDate,
          quantity: participants,
          payment_provider: "paypal",
        }),
      });

      if (!bookingResponse.ok) {
        const errorData = await bookingResponse.json();
        throw new Error(
          errorData.error || "Ошибка сервера при обработке бронирования."
        );
      }

      console.log("Бронирование успешно обработано.");

      const paypalResponse = await fetch(`${apiBaseUrl}/paypal/success/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify({
          email: details.payer.email_address,
          paypal_payment_id: details.id,
        }),
      });

      if (!paypalResponse.ok) {
        const errorData = await paypalResponse.json();
        throw new Error(
          errorData.error || "Ошибка сервера при подтверждении PayPal платежа."
        );
      }

      console.log("PayPal платеж успешно подтвержден.");

      notification.success({
        message: t("bookedSuccessMessage"),
        description: t("bookedSuccessInfo"),
        duration: 5,
      });

      onPaymentSuccess(details);
    } catch (err) {
      console.error("Ошибка при обработке платежа через PayPal:", err.message);
      notification.error({
        message: "Ошибка оплаты",
        description: err.message || "Произошла ошибка при обработке платежа.",
        duration: 5,
      });
    }
  };

  return (
    <PayPalScriptProvider
      options={{
        "client-id": clientId,
        currency: "EUR",
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        fundingSource="paypal"
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: (amount / 100).toFixed(2),
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            handlePaymentSuccess(details);
          });
        }}
        onError={(err) => {
          console.error("Ошибка PayPal:", err);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalPayment;
