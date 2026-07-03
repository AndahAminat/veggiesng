import { useState, useCallback, useMemo } from "react";
import { LANG, type Locale, LS_KEYS } from "@/constants";

function getStoredLocale(): Locale {
  try {
    const stored = localStorage.getItem(LS_KEYS.locale);
    if (stored === "en" || stored === "yo" || stored === "ha" || stored === "ig") {
      return stored;
    }
  } catch { /* SSR guard */ }
  return "en";
}

export function useT() {
  const [locale, setLocaleState] = useState<Locale>(getStoredLocale);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(LS_KEYS.locale, next);
    } catch { /* ignore */ }
  }, []);

  const t = useMemo(() => LANG[locale], [locale]);

  return { t, locale, setLocale };
}
