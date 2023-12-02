import type { Language } from "@/types/client";

/**
 * change language names → country names
 * @see https://www.kanzaki.com/docs/html/lang.html
 */
export const LanguageToCountry = (language: Language) => {
  switch (language) {
    case "en":
      return "united-kingdom";

    case "ja":
      return "japan";

    // case "ko":
    //   return "south-korea";

    // case "fr":
    //   return "france";

    // case "de":
    //   return "germany";

    case "it":
      return "italy";

    // case "ru":
    //   return "russia";
  }
};
