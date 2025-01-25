const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

/**
 * Получить информацию о странице "Contacts".
 * @returns {Promise<Object>} - Объект с данными страницы.
 */
export const fetchAboutInfo = async () => {
  try {
    const response = await fetch(`${apiBaseUrl}/contacts/`);
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
