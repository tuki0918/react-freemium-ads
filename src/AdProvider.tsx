import type { ReactNode } from "react";
import { createContext, useContext, useMemo } from "react";
import type { AdConfig, Plan } from "./types";
import { useAdsenseScript } from "./useAdsenseScript";
import { shouldShowAds } from "./visibility";

type AdContextValue = {
  showAds: boolean;
  config: AdConfig;
};

const AdContext = createContext<AdContextValue | null>(null);

export type AdProviderProps = {
  plan: Plan;
  currentPath: string;
  config: AdConfig;
  children: ReactNode;
};

export function AdProvider({
  plan,
  currentPath,
  config,
  children,
}: AdProviderProps) {
  const showAds = useMemo(
    () => shouldShowAds(plan, currentPath, config),
    [plan, currentPath, config],
  );

  useAdsenseScript({
    enabled: showAds,
    adClient: config.adClient,
    scriptBaseUrl: config.scriptBaseUrl,
  });

  const value = useMemo(
    () => ({
      showAds,
      config,
    }),
    [showAds, config],
  );

  return <AdContext.Provider value={value}>{children}</AdContext.Provider>;
}

export function useAdContext(): AdContextValue {
  const context = useContext(AdContext);
  if (!context) {
    throw new Error("useAdContext must be used within an AdProvider.");
  }
  return context;
}
