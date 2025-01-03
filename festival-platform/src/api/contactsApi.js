const BASE_URL = "http://127.0.0.1:8000/api";

/**
 * Получить информацию о странице "Contacts".
 * @returns {Promise<Object>} - Объект с данными страницы.
 */
export const fetchAboutInfo = async () => {
  try {
    const response = await fetch(`${BASE_URL}/contacts/`);
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      "Ошибка при запросе информации о странице 'Contacts':",
      error
    );
    return null;
  }
};
