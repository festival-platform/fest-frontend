import React from "react";
import { WhatsAppOutlined } from "@ant-design/icons";
import "./WhatsAppButton.css";

const WhatsAppButton = ({ phoneNumber = "4917642024296" }) => {
  const whatsappLink = `https://wa.me/${phoneNumber}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-floating-button"
    >
      <WhatsAppOutlined style={{ fontSize: 28 }} />
    </a>
  );
};

export default WhatsAppButton;
