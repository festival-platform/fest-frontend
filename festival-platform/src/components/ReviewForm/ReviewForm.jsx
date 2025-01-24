import React, { useState } from "react";
import { Rate, Button, Input, message } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import axios from "axios";
import "./ReviewForm.css";
import { useTranslation } from "react-i18next";
import config from "../../config";

const BASE_URL = "http://127.0.0.1:8000/api";

const firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const ReviewForm = () => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [user, setUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { t } = useTranslation();

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
      message.success("Successfully logged in with Google!");
    } catch (error) {
      console.error("Google sign-in error:", error);
      message.error("Failed to log in with Google.");
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      message.error("You need to log in before publishing your review.");
      return;
    }

    setIsSubmitting(true);

    const reviewData = {
      author: user.displayName,
      text: review,
      stars: rating,
      event: 1,
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/reviews/create/`,
        reviewData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        message.success(t("successfullyPublishedMessage"));
        setReview("");
        setRating(0);
      } else {
        message.error("Failed to publish your review.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      message.error("An error occurred while publishing your review.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="review-form">
      <h3>{t("rewiewText")}</h3>
      <div className="rating">
        <Rate
          allowHalf
          value={rating}
          onChange={setRating}
          className="rating-stars"
        />
      </div>
      <Input.TextArea
        rows={4}
        placeholder={t("rewiewPlaceholder")}
        value={review}
        onChange={(e) => setReview(e.target.value)}
        disabled={isSubmitting}
      />
      {!user ? (
        <Button
          type="primary"
          icon={<GoogleOutlined />}
          onClick={handleLogin}
          className="google-login-button"
        >
          {t("googleButton")}
        </Button>
      ) : (
        <Button
          type="primary"
          onClick={handleSubmit}
          loading={isSubmitting}
          disabled={!rating || !review.trim()}
        >
          {t("googleButtonPublish")}
        </Button>
      )}
    </div>
  );
};

export default ReviewForm;
