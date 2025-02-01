import React, { useState, useEffect } from "react";
import { Spin, Alert, Typography, Image } from "antd";
import { useTranslation } from "react-i18next";
import "./AboutPage.css";
import parse from "html-react-parser";

const { Title, Paragraph } = Typography;
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const AboutPage = () => {
  const { t, i18n } = useTranslation();
  const [aboutInfo, setAboutInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutInfo = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/about/`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setAboutInfo(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutInfo();
  }, []);

  if (loading) {
    return (
      <div className="about-page-spinner">
        <Spin tip={t("loading")} size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="about-page-error">
        <Alert message={t("errorOccurred")} description={error} type="error" />
      </div>
    );
  }

  if (!aboutInfo) {
    return null;
  }

  const titleKey = i18n.language === "de" ? "title_de" : "title_en";
  const descriptionKey =
    i18n.language === "de" ? "description_de" : "description_en";

  return (
    <div className="about-page-container">
      <Title level={2}>{aboutInfo[titleKey]}</Title>
      <Paragraph>{parse(aboutInfo[descriptionKey])}</Paragraph>
      <Image
        src={aboutInfo.images[0]}
        alt="About Image"
        className="about-page-image"
      />
    </div>
  );
};

export default AboutPage;
