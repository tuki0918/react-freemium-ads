import { describe, expect, it } from "vitest";
import type { AdConfig } from "./types";
import { normalizePath, shouldShowAds } from "./visibility";

const baseConfig: AdConfig = {
  adClient: "ca-pub-123456789",
  slots: {
    banner: "1111111111",
    multiplex: "2222222222",
  },
  allowedPaths: ["/", "/search", "/result"],
  blockedPaths: ["/checkout", "/billing", "/account", "/login"],
};

describe("normalizePath", () => {
  it("normalizes empty values to root path", () => {
    expect(normalizePath("")).toBe("/");
  });

  it("removes query and hash", () => {
    expect(normalizePath("/result/items?page=2#top")).toBe("/result/items");
  });

  it("adds a leading slash when missing", () => {
    expect(normalizePath("search")).toBe("/search");
  });
});

describe("shouldShowAds", () => {
  it("shows ads for free users on allowed pages", () => {
    expect(shouldShowAds("free", "/result", baseConfig)).toBe(true);
  });

  it("hides ads for premium users", () => {
    expect(shouldShowAds("premium", "/result", baseConfig)).toBe(false);
  });

  it("hides ads for blocked pages", () => {
    expect(shouldShowAds("free", "/checkout", baseConfig)).toBe(false);
  });

  it("does not match similar but different path prefixes", () => {
    expect(shouldShowAds("free", "/result2", baseConfig)).toBe(false);
  });
});
