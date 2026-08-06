"use client";

import { useEffect } from "react";

// The root layout's <html> only gets rendered once for the whole app,
// so the /en tree sets its own lang attribute client-side on mount
// (and restores "fr" on unmount) rather than needing a second <html>.
export default function SetHtmlLang({ lang }) {
  useEffect(() => {
    const previous = document.documentElement.lang;
    document.documentElement.lang = lang;
    return () => {
      document.documentElement.lang = previous;
    };
  }, [lang]);

  return null;
}
