import React, { useEffect, useState } from "react";
import { Card, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./ReviewsCarousel.css";
import { useTranslation } from "react-i18next";

const { Meta } = Card;
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const ReviewsCarousel = ({ eventId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/events/1/reviews`);
        //("Полученные отзывы:", response.data);

        if (Array.isArray(response.data)) {
          setReviews(response.data);
        } else {
          setReviews(Object.values(response.data));
        }
      } catch (error) {
        console.error("Ошибка при загрузке отзывов:", error);
        message.error(
          t("errorLoadingReviews") || "Не удалось загрузить отзывы."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [eventId, t]);

  if (loading) {
    return (
      <div className="reviews-carousel-loading">
        <LoadingOutlined style={{ fontSize: 24 }} spin />
        <span>{t("loading") || "Загрузка..."}</span>
      </div>
    );
  }

  if (!Array.isArray(reviews) || reviews.length === 0) {
    return (
      <div className="reviews-carousel-empty">
        <p>{t("noReviews") || "Отзывов пока нет."}</p>
      </div>
    );
  }

  return (
    <div className="reviews-carousel">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        // pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        breakpoints={{
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          480: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
        }}
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <Card
              bordered={false}
              className="review-card"
              hoverable
              style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
            >
              <Meta
                avatar={
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      review.author
                    )}&background=random&size=64`}
                    alt={review.author}
                    className="review-avatar"
                  />
                }
                title={review.author}
                description={
                  <>
                    <div className="review-stars">
                      {Array.from({ length: 5 }, (_, i) => (
                        <span
                          key={i}
                          style={{
                            color:
                              i < Math.round(review.stars)
                                ? "#fadb14"
                                : "#d9d9d9",
                            fontSize: "16px",
                          }}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="review-text">{review.text}</p>
                  </>
                }
              />
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReviewsCarousel;
