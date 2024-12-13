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
          cancellationText: "Free cancellation",
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
          cancellationText: "Kostenlose stornierung",
        },
      },
    },
    fallbackLng: "de",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
