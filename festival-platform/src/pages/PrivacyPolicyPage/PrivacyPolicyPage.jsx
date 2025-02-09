import React from "react";
import { Typography } from "antd";
import { useTranslation } from "react-i18next";
import "./PrivacyPolicyPage.css";

const { Title, Paragraph } = Typography;

const PrivacyPolicyPage = () => {
  const { t } = useTranslation();

  return (
    <div className="privacy-policy-container">
      <Typography>
        <Title level={2}>{t("privacyPolicy")}</Title>
        <Title level={4}>{t("Oktoberfest Tours by Julie")}</Title>

        <Paragraph>{t("Franz-Wolter-Straße 42")}</Paragraph>
        <Paragraph>{t("81925 München")}</Paragraph>
        <Paragraph>{t("Geschäftsführerin: Julietta Maruschkin")}</Paragraph>
        <Paragraph>{t("+4917642024296")}</Paragraph>
      </Typography>
    </div>
  );
};

export default PrivacyPolicyPage;
