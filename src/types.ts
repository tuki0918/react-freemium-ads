export type Plan = "free" | "premium";

export type AdPlacement = "banner" | "multiplex";

export type AdSlots = Partial<Record<AdPlacement, string>>;

export type AdConfig = {
  adClient: string;
  slots: AdSlots;
  allowedPaths?: string[];
  blockedPaths?: string[];
  scriptBaseUrl?: string;
};
