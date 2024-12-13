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
