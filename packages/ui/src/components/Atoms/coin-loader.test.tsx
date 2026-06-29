import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, it, expect } from "vitest";
import { CoinLoader, COIN_LOADER_DEFAULT_SRC } from "./coin-loader";

const SIZES = ["sm", "md", "lg"] as const;

const SIZE_CLASS = {
  sm: "size-10",
  md: "size-15",
  lg: "size-20",
} as const;

describe("CoinLoader", () => {
  it("renders with role='status' and default label", () => {
    render(<CoinLoader data-testid="coin" />);
    const el = screen.getByTestId("coin");
    expect(el).toHaveAttribute("role", "status");
    expect(el).toHaveAttribute("aria-live", "polite");
    expect(screen.getByText("Loading")).toBeInTheDocument();
  });

  it("surfaces a custom label to screen readers", () => {
    render(<CoinLoader label="Processing payment" />);
    expect(screen.getByText("Processing payment")).toBeInTheDocument();
  });

  it("defaults src to the Felix coin asset", () => {
    render(<CoinLoader data-testid="coin" />);
    const img = screen
      .getByTestId("coin")
      .querySelector("img[data-slot='coin-loader-image']")!;
    expect(img).toHaveAttribute("src", COIN_LOADER_DEFAULT_SRC);
    expect(COIN_LOADER_DEFAULT_SRC).toBe("/assets/coin-felix.gif");
  });

  it("accepts a src override", () => {
    render(
      <CoinLoader data-testid="coin" src="https://cdn.example.com/coin.gif" />
    );
    const img = screen
      .getByTestId("coin")
      .querySelector("img[data-slot='coin-loader-image']")!;
    expect(img).toHaveAttribute("src", "https://cdn.example.com/coin.gif");
  });

  it("renders the image as decorative (empty alt + aria-hidden)", () => {
    render(<CoinLoader data-testid="coin" />);
    const img = screen
      .getByTestId("coin")
      .querySelector("img[data-slot='coin-loader-image']")!;
    expect(img).toHaveAttribute("alt", "");
    expect(img).toHaveAttribute("aria-hidden", "true");
  });

  it("applies default size (md)", () => {
    render(<CoinLoader data-testid="coin" />);
    const el = screen.getByTestId("coin");
    expect(el).toHaveAttribute("data-size", "md");
    expect(el.querySelector("img")).toHaveClass(SIZE_CLASS.md);
  });

  it.each(SIZES)("applies size='%s' class on the image", (size) => {
    render(<CoinLoader data-testid="coin" size={size} />);
    const el = screen.getByTestId("coin");
    expect(el).toHaveAttribute("data-size", size);
    expect(el.querySelector("img")).toHaveClass(SIZE_CLASS[size]);
  });

  it("merges custom className onto the wrapper", () => {
    render(<CoinLoader data-testid="coin" className="custom-class" />);
    expect(screen.getByTestId("coin")).toHaveClass("custom-class");
  });

  it("forwards native HTML attributes", () => {
    render(<CoinLoader data-testid="coin" id="payment-coin" />);
    expect(screen.getByTestId("coin")).toHaveAttribute("id", "payment-coin");
  });

  it("sets data-slot='coin-loader'", () => {
    render(<CoinLoader data-testid="coin" />);
    expect(screen.getByTestId("coin")).toHaveAttribute(
      "data-slot",
      "coin-loader"
    );
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<CoinLoader />);
    expect(await axe(container)).toHaveNoViolations();
  });

  describe("all sizes pass accessibility check", () => {
    for (const size of SIZES) {
      it(`size="${size}" has no violations`, async () => {
        const { container } = render(<CoinLoader size={size} />);
        expect(await axe(container)).toHaveNoViolations();
      });
    }
  });
});
