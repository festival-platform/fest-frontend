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
          morningSession: "Table reservation in the morning",
          afternoonSession: "Table reservation in the afternoon",
          eveningSession: "Table reservation in the evening",
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
          privacyPolicy: "Privacy Policy",
          impressum: "Legal Notice",
          firstNamePlaceholder: "First Name",
          lastNamePlaceholder: "Last Name",
          emailPlaceholder: "Email",
          paymentSuccess: "Payment successfully completed!",
          paymentError: "An error occurred while processing the payment.",
          payButton: "Pay via Stripe",
          selectPaymentMethod: "Select payment method",
          continueButton: "Go to payment",
          googleButtonPublish: "Publish review",
          successfullyPublishedMessage:
            "Your review has been successfully published",
          failedPublishedMessage: "Failed to publish your review",
          bookedSuccessMessage:
            "Oktoberfest seats have been successfully booked",
          bookedSuccessInfo:
            "All additional information has already been sent to you by email",
          firstNameRequired: "Name is a required field",
          nameInvalid: "The name must contain only letters",
          emailRequired: "Email is a required field",
          emailInvalid: "Introduction correct email address",
          about: "More details",
          morningDescription: "morning text",
          afternoonDescription: "afternoon text",
          eveningDescription: "evening text",
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
          morningSession: "Mittags Tischreservierung",
          afternoonSession: "Nachmittags Tischreservierung",
          eveningSession: "Abend Tischreservierung",
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
          privacyPolicy: "Datenschutz",
          impressum: "Impressum",
          firstNamePlaceholder: "Vorname",
          lastNamePlaceholder: "Nachname",
          emailPlaceholder: "E-Mail",
          paymentSuccess: "Zahlung erfolgreich abgeschlossen!",
          paymentError:
            "Es ist ein Fehler bei der Zahlungsabwicklung aufgetreten.",
          payButton: "Mit Stripe bezahlen",
          selectPaymentMethod: "Zahlungsart auswählen",
          continueButton: "Gehen Sie zur Zahlung",
          googleButtonPublish: "Rezension veröffentlichen",
          successfullyPublishedMessage:
            "Ihre Bewertung wurde erfolgreich veröffentlicht",
          failedPublishedMessage:
            "Ihre Bewertung konnte nicht veröffentlicht werden",
          bookedSuccessMessage: "Oktoberfest-Plätze wurden erfolgreich gebucht",
          bookedSuccessInfo:
            "Alle weiteren Informationen wurden Ihnen bereits per E-Mail zugesandt",
          firstNameRequired: "Name ist ein Pflichtfeld",
          nameInvalid: "Der Name darf nur Buchstaben enthalten",
          emailRequired: "E-Mail ist ein Pflichtfeld",
          emailInvalid: "Einführung korrekte E-Mail-Adresse",
          about: "Weitere Details",
          morningDescription: "morning text",
          afternoonDescription: "afternoon text",
          eveningDescription: "evening text",
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
