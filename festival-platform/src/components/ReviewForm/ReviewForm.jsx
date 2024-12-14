import React, { useState } from "react";
import { Rate, Button, Input, message } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import "./ReviewForm.css";
import { useTranslation } from "react-i18next";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
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

  const handleSubmit = () => {
    if (!user) {
      message.error("You need to log in before publishing your review.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      message.success("Your review has been successfully published!");
      setReview("");
      setRating(0);
    }, 1000);
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
          Publish Review
        </Button>
      )}
    </div>
  );
};

export default ReviewForm;
