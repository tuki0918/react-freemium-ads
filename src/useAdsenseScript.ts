import { useEffect } from "react";

const ADSENSE_SCRIPT_ID = "adsbygoogle-script";
const ADSENSE_SCRIPT_URL =
  "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";

export type UseAdsenseScriptOptions = {
  enabled: boolean;
  adClient: string;
  scriptBaseUrl?: string;
};

function buildScriptSrc(adClient: string, scriptBaseUrl: string): string {
  const separator = scriptBaseUrl.includes("?") ? "&" : "?";
  return `${scriptBaseUrl}${separator}client=${encodeURIComponent(adClient)}`;
}

export function useAdsenseScript({
  enabled,
  adClient,
  scriptBaseUrl = ADSENSE_SCRIPT_URL,
}: UseAdsenseScriptOptions): void {
  useEffect(() => {
    if (!enabled || !adClient || typeof document === "undefined") {
      return;
    }

    const existingScript = document.getElementById(ADSENSE_SCRIPT_ID);
    if (existingScript) {
      return;
    }

    const script = document.createElement("script");
    script.id = ADSENSE_SCRIPT_ID;
    script.async = true;
    script.crossOrigin = "anonymous";
    script.src = buildScriptSrc(adClient, scriptBaseUrl);
    document.head.appendChild(script);
  }, [enabled, adClient, scriptBaseUrl]);
}
