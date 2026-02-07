import type * as React from "react";
import { useEffect, useMemo, useRef } from "react";
import { useAdContext } from "./AdProvider";
import type { AdPlacement } from "./types";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export type AdSlotProps = React.HTMLAttributes<HTMLModElement> & {
  placement: AdPlacement;
};

export function AdSlot({
  placement,
  className = "",
  style,
  ...insProps
}: AdSlotProps) {
  const { showAds, config } = useAdContext();
  const adRef = useRef<HTMLModElement | null>(null);
  const slotId = config.slots[placement];
  const isMultiplex = useMemo(() => placement === "multiplex", [placement]);
  const pushSignature = useMemo(
    () => `${placement}:${slotId ?? "missing-slot"}`,
    [placement, slotId],
  );

  useEffect(() => {
    if (!showAds || !slotId || typeof window === "undefined") {
      return;
    }

    const adElement = adRef.current;
    if (!adElement) {
      return;
    }

    if (adElement.dataset.codexAdSignature === pushSignature) {
      return;
    }

    try {
      window.adsbygoogle = window.adsbygoogle ?? [];
      window.adsbygoogle.push({});
      adElement.dataset.codexAdSignature = pushSignature;
    } catch {
      // Keep rendering even when ad network init fails.
    }
  }, [showAds, slotId, pushSignature]);

  if (!showAds || !slotId) {
    return null;
  }

  return (
    <ins
      {...insProps}
      ref={adRef}
      className={["adsbygoogle", className].filter(Boolean).join(" ")}
      style={{
        display: "block",
        ...style,
      }}
      data-ad-client={config.adClient}
      data-ad-slot={slotId}
      data-ad-format={isMultiplex ? "autorelaxed" : "auto"}
      data-full-width-responsive={isMultiplex ? undefined : "true"}
    />
  );
}
