import React, { useState, useEffect } from "react";
import { Spin, Alert, Typography, Image } from "antd";
import { useTranslation } from "react-i18next";
import "./ContactsPage.css";
import { fetchAboutInfo } from "../../api/contactsApi";

const { Title, Paragraph } = Typography;

const AboutPage = () => {
  const { t, i18n } = useTranslation();
  const [aboutInfo, setAboutInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAboutInfo = async () => {
      try {
        const data = await fetchAboutInfo();
        if (data) {
          setAboutInfo(data);
        } else {
          throw new Error(t("failedToFetchData"));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getAboutInfo();
  }, [t]);

  if (loading) {
    return (
      <div className="contacts-page-spinner">
        <Spin tip={t("loading")} size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="contacts-page-error">
        <Alert message={t("errorOccurred")} description={error} type="error" />
      </div>
    );
  }

  if (!aboutInfo) {
    return null;
  }

  const titleKey = `title_${i18n.language}`;
  const descriptionKey = `description_${i18n.language}`;

  return (
    <div className="contacts-page-container">
      <Title level={2}>{aboutInfo[titleKey]}</Title>
      <Paragraph>{aboutInfo[descriptionKey]}</Paragraph>

      {aboutInfo.phone && (
        <Paragraph>
          <strong>{t("phone")}:</strong> {aboutInfo.phone}
        </Paragraph>
      )}
      {aboutInfo.email && (
        <Paragraph>
          <strong>{t("email")}:</strong> {aboutInfo.email}
        </Paragraph>
      )}
      {aboutInfo.address && (
        <Paragraph>
          <strong>{t("address")}:</strong> {aboutInfo.address}
        </Paragraph>
      )}

      {aboutInfo.images && aboutInfo.images.length > 0 && (
        <Image.PreviewGroup>
          {aboutInfo.images.map((imgUrl, index) => (
            <Image
              key={index}
              src={imgUrl}
              alt={`${t("image")} ${index + 1}`}
              className="contacts-page-image"
            />
          ))}
        </Image.PreviewGroup>
      )}
    </div>
  );
};

export default AboutPage;
