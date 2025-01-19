import React from "react";
import { Button } from "antd";

const PayPalPayment = ({ amount }) => {
  const handlePayment = () => {
    alert(`Оплата через PayPal на сумму: ${amount / 100} €`);
  };

  return (
    <div>
      <Button type="primary" onClick={handlePayment}>
        Оплатить через PayPal
      </Button>
    </div>
  );
};

export default PayPalPayment;
