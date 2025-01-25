import React from "react";
import { notification } from "antd";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useTranslation } from "react-i18next";
import config from "../../../../config";

const PayPalPayment = ({
  amount,
  selectedDate,
  participants,
  onPaymentSuccess,
}) => {
  const { t } = useTranslation();
  const clientId = config.clientId;

  const handlePaymentSuccess = async (details) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/events/1/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: details.payer.name.given_name,
          last_name: details.payer.name.surname,
          email: details.payer.email_address,
          date: selectedDate,
          quantity: participants,
          payment_provider: "paypal",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Ошибка сервера при обработке PayPal платежа."
        );
      }

      notification.success({
        message: t("bookedSuccessMessage"),
        description: t("bookedSuccessInfo"),
        duration: 5,
      });

      console.log("Server successfully processed the PayPal payment.");
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
