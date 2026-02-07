# react-freemium-ads

This package provides a freemium ads module (AdProvider, AdSlot) for route-based ad control and disabling ads for premium users.

## Usage Example (Freemium Ads)

```tsx
import { AdProvider, AdSlot } from "react-freemium-ads";

type AppProps = {
  isPremium: boolean;
  pathname: string;
};

export function App({ isPremium, pathname }: AppProps) {
  return (
    <AdProvider
      plan={isPremium ? "premium" : "free"}
      currentPath={pathname}
      config={{
        adClient: "ca-pub-xxxxxxxxxxxxxxxx",
        slots: {
          banner: "1111111111",
          multiplex: "2222222222",
        },
        allowedPaths: ["/", "/search", "/result"],
        blockedPaths: [
          "/checkout",
          "/billing",
          "/account",
          "/login",
          "/privacy",
          "/terms",
        ],
      }}
    >
      <header>
        <AdSlot placement="banner" />
      </header>

      <main>
        {/* Your search/result UI */}
        <AdSlot placement="multiplex" />
      </main>
    </AdProvider>
  );
}
```

Notes:
1. `premium` users do not load the AdSense script.
2. Use `allowedPaths` / `blockedPaths` to control ad visibility by route.
3. Use AdSense dashboard settings for Anchor/Vignette behavior.
