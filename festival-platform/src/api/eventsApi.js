const BASE_URL = "http://127.0.0.1:8000/api";

/**
 * Получить доступные даты для события.
 * @param {number} eventId - ID события.
 * @returns {Promise<string[]>} - Список доступных дат в формате "YYYY-MM-DD".
 */
export const fetchEventDates = async (eventId) => {
  try {
    const response = await fetch(`${BASE_URL}/events/${eventId}/dates/`);
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }
    const data = await response.json();
    return data.dates;
  } catch (error) {
    console.error("Ошибка при запросе доступных дат:", error);
    return [];
  }
};

/**
 * Получить информацию о мероприятии.
 * @param {number} eventId - ID события.
 * @param {string} lang - Язык, на котором требуется информация (например: 'en', 'de').
 * @returns {Promise<Object>} - Объект с информацией о мероприятии.
 */
export const fetchEventInfo = async (eventId, lang = "en") => {
  try {
    const response = await fetch(`${BASE_URL}/events/${eventId}/?lang=${lang}`);
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка при запросе информации о мероприятии:", error);
    return null;
  }
};

/**
 * Получить всю информацию о мероприятии.
 * @param {number} eventId - ID мероприятия.
 * @returns {Promise<Object>} - Полная информация о мероприятии.
 */
export const fetchFullEventDetails = async (eventId) => {
  try {
    const response = await fetch(`${BASE_URL}/events/${eventId}/`);
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка при запросе полной информации о мероприятии:", error);
    return null;
  }
};
