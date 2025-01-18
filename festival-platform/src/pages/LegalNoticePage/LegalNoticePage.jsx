import React from "react";
import { Typography } from "antd";
import { useTranslation } from "react-i18next";

const { Title } = Typography;

const PrivacyPolicyPage = () => {
  const { t } = useTranslation();

  return (
    <div className="privacy-policy-container">
      <Typography>
        <Title level={2}>{t("legalNoticeTitle")}</Title>
      </Typography>
    </div>
  );
};

export default PrivacyPolicyPage;
