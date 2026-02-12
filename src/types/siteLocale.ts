export type SiteLocale = "es" | "en" | "fr" | "it" | "de";

export const localePrefixMap: Record<SiteLocale, string> = {
  es: "",
  en: "/en",
  fr: "/fr",
  it: "/it",
  de: "/de",
};

export const localeNumberFormatMap: Record<SiteLocale, string> = {
  es: "es-MX",
  en: "en-US",
  fr: "fr-FR",
  it: "it-IT",
  de: "de-DE",
};

export const getLocalePrefix = (locale: SiteLocale) => localePrefixMap[locale] || "";
