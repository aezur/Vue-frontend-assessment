import { describe, it, expect } from "vitest";
import {
  formatCurrency,
  formatDate,
  formatPercentage,
  formatNumber,
} from "../formatters";

describe("formatCurrency", () => {
  it("formats whole numbers with dollar sign and commas", () => {
    expect(formatCurrency(50000)).toBe("$50,000");
    expect(formatCurrency(1000)).toBe("$1,000");
    expect(formatCurrency(100)).toBe("$100");
  });

  it("formats decimal values with up to 2 decimal places", () => {
    expect(formatCurrency(3.57)).toBe("$3.57");
    expect(formatCurrency(12.5)).toBe("$12.50");
    expect(formatCurrency(99.99)).toBe("$99.99");
  });

  it("handles zero", () => {
    expect(formatCurrency(0)).toBe("$0");
  });

  it("handles null and undefined", () => {
    expect(formatCurrency(null)).toBe("$0");
    expect(formatCurrency(undefined)).toBe("$0");
  });

  it("handles negative numbers", () => {
    expect(formatCurrency(-500)).toBe("-$500");
  });

  it("handles large numbers", () => {
    expect(formatCurrency(1234567.89)).toBe("$1,234,567.89");
  });

  it("handles NaN", () => {
    expect(formatCurrency(NaN)).toBe("$NaN");
  });
});

describe("formatDate", () => {
  it("formats ISO date strings to human-readable format", () => {
    expect(formatDate("2024-06-01")).toBe("Jun 1, 2024");
    expect(formatDate("2024-12-25")).toBe("Dec 25, 2024");
    expect(formatDate("2024-01-15")).toBe("Jan 15, 2024");
  });

  it("handles null and undefined", () => {
    expect(formatDate(null)).toBe("");
    expect(formatDate(undefined)).toBe("");
    expect(formatDate("")).toBe("");
  });

  it("handles invalid date strings by returning original value", () => {
    expect(formatDate("invalid-date")).toBe("invalid-date");
    expect(formatDate("not a date")).toBe("not a date");
  });

  it("handles different date formats", () => {
    expect(formatDate("2024-08-31")).toBe("Aug 31, 2024");
  });
});

describe("formatPercentage", () => {
  it("formats numbers with percentage sign and 1 decimal by default", () => {
    expect(formatPercentage(2.8)).toBe("2.8%");
    expect(formatPercentage(15.5)).toBe("15.5%");
    expect(formatPercentage(100)).toBe("100.0%");
  });

  it("supports custom decimal places", () => {
    expect(formatPercentage(2.856, 2)).toBe("2.86%");
    expect(formatPercentage(15, 0)).toBe("15%");
    expect(formatPercentage(99.999, 3)).toBe("99.999%");
  });

  it("handles zero", () => {
    expect(formatPercentage(0)).toBe("0.0%");
  });

  it("handles null and undefined", () => {
    expect(formatPercentage(null)).toBe("0%");
    expect(formatPercentage(undefined)).toBe("0%");
  });

  it("handles negative percentages", () => {
    expect(formatPercentage(-5.5)).toBe("-5.5%");
  });

  it("handles NaN", () => {
    expect(formatPercentage(NaN)).toBe("NaN%");
  });
});

describe("formatNumber", () => {
  it("formats numbers with thousands separators", () => {
    expect(formatNumber(125000)).toBe("125,000");
    expect(formatNumber(3500)).toBe("3,500");
    expect(formatNumber(245)).toBe("245");
  });

  it("handles zero", () => {
    expect(formatNumber(0)).toBe("0");
  });

  it("handles null and undefined", () => {
    expect(formatNumber(null)).toBe("0");
    expect(formatNumber(undefined)).toBe("0");
  });

  it("handles large numbers", () => {
    expect(formatNumber(1234567890)).toBe("1,234,567,890");
  });

  it("handles decimal numbers", () => {
    expect(formatNumber(1234.56)).toBe("1,234.56");
  });

  it("handles negative numbers", () => {
    expect(formatNumber(-5000)).toBe("-5,000");
  });

  it("handles NaN", () => {
    expect(formatNumber(NaN)).toBe("NaN");
  });
});
