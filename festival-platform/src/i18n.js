import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          selectParticipantsAndDate: "Select participants and date",
          people: "People",
          ageInfo: "(Age: 100 and younger)",
          increment: "+",
          decrement: "-",
          check_availability: "Check availability",
          selectDate: "Select date",
          aboutTheEvent: "About the event",
          priceEvent: "Price",
          durationEvent: "Duration",
          rewiewText: "Write your review",
          rewiewPlaceholder: "Write your review here...",
          nameEvent: "Event Name", // заглушка
          descriptionEvent: "Event Description", // заглушка
          googleButton: "Login with Google",
          menuMain: "Main",
          days: "days",
          menuAboutUs: "About us",
          menuContacts: "Contacts",
          pleaseSelectDate: "Please select a date to register",
          failedToFetchData: "Failed to fetch data.",
          phone: "Phone",
          email: "Email",
          address: "Address",
        },
      },
      de: {
        translation: {
          selectParticipantsAndDate: "Wählen sie teilnehmer und datum aus",
          people: "Personen",
          ageInfo: "(Alter: 100 und jünger)",
          increment: "+",
          decrement: "-",
          check_availability: "Verfügbarkeit prüfen",
          selectDate: "Datum auswählen",
          aboutTheEvent: "Über die veranstaltung",
          priceEvent: "Preis",
          durationEvent: "Dauer",
          rewiewText: "Schreiben Sie Ihre Bewertung",
          rewiewPlaceholder: "Schreiben Sie hier Ihre Bewertung...",
          nameEvent: "Veranstaltungsname", // заглушка
          descriptionEvent: "Veranstaltungsbeschreibung", // заглушка
          googleButton: "Melden Sie sich mit Google an",
          menuMain: "Hauptseite",
          days: "Tage",
          menuAboutUs: "Über uns",
          menuContacts: "Kontakte",
          pleaseSelectDate: "Bitte wählen Sie ein Datum zur Anmeldung aus",
          failedToFetchData: "Daten konnten nicht abgerufen werden.",
          phone: "Telefon",
          email: "E-Mail",
          address: "Adresse",
        },
      },
    },
    fallbackLng: "de",
    interpolation: {
      escapeValue: false,
    },
  });

export const updateTranslations = (lang, translations) => {
  Object.entries(translations).forEach(([key, value]) => {
    i18n.addResource(lang, "translation", key, value);
  });
};

export default i18n;
