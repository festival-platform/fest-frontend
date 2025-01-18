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
        <Title level={2}>{t("privacyPolicyTitle")}</Title>

        <Paragraph>{t("privacyPolicyIntroduction")}</Paragraph>

        <Title level={4}>{t("section1Title")}</Title>
        <Paragraph>{t("section1Content")}</Paragraph>

        <Title level={4}>{t("section2Title")}</Title>
        <Paragraph>{t("section2Content")}</Paragraph>

        <Paragraph>{t("privacyPolicyConclusion")}</Paragraph>
      </Typography>
    </div>
  );
};

export default PrivacyPolicyPage;
