import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { afterEach, describe, expect, it } from "vitest";

import {
  Toaster,
  toast,
  defaultToastClassNames,
  secondaryToastClassNames,
} from "./toast";

// Sonner persists its in-memory toast queue across tests. Clear it after
// every test so we don't leak toasts between cases.
afterEach(() => {
  act(() => {
    toast.dismiss();
  });
});

// Sonner lazy-mounts the inner `[data-sonner-toaster]` element only after the
// first toast fires; before that, only the empty live-region <section> exists.
// This helper fires a toast and waits for the inner toaster div to appear so
// we can assert on the props Felix's <Toaster /> forwards.
async function findSonnerToaster(): Promise<HTMLElement> {
  return await waitFor(() => {
    const el = document.querySelector<HTMLElement>("[data-sonner-toaster]");
    expect(el).not.toBeNull();
    return el!;
  });
}

describe("Toaster", () => {
  it("renders without crashing", () => {
    render(<Toaster />);
    expect(screen.getByLabelText(/notifications/i)).toBeInTheDocument();
  });

  it("forwards `position` to Sonner", async () => {
    render(<Toaster position="top-left" />);
    act(() => {
      toast("ping");
    });
    const region = await findSonnerToaster();
    expect(region).toHaveAttribute("data-y-position", "top");
    expect(region).toHaveAttribute("data-x-position", "left");
  });

  it("forwards `theme` to Sonner", async () => {
    render(<Toaster theme="dark" />);
    act(() => {
      toast("ping");
    });
    const region = await findSonnerToaster();
    expect(region).toHaveAttribute("data-sonner-theme", "dark");
  });

  it("merges a consumer className onto the toaster wrapper", async () => {
    render(<Toaster className="custom-toaster" />);
    act(() => {
      toast("ping");
    });
    const region = await findSonnerToaster();
    expect(region).toHaveClass("custom-toaster");
    expect(region).toHaveClass("felix-toaster");
  });

  // Covers the consumer-override branch of `mergedClassNames` in <Toaster />:
  //   { ...defaultToastClassNames, ...(toastOptions?.classNames ?? {}) }
  // Consumers can pass `toastOptions.classNames` to override any slot at the
  // Toaster level — unspecified slots keep the Felix defaults.
  it("merges `toastOptions.classNames` over the Felix defaults", async () => {
    render(
      <Toaster
        toastOptions={{
          classNames: { toast: "consumer-override-toast" },
        }}
      />
    );
    act(() => {
      toast("Notification");
    });
    const toastEl = await screen.findByText("Notification");
    const root = toastEl.closest("[data-sonner-toast]");
    expect(root).not.toBeNull();
    expect(root).toHaveClass("consumer-override-toast");
    // Slots the consumer didn't touch still come from the Felix defaults.
    expect(root?.querySelector("[data-title]")).toHaveClass("font-sans");
  });

  // Covers the `?? {}` fallback: consumer passes `toastOptions` WITHOUT
  // a `classNames` key. Should not throw, and Felix defaults apply.
  it("tolerates `toastOptions` without a `classNames` key", async () => {
    render(<Toaster toastOptions={{ duration: 10_000 }} />);
    act(() => {
      toast("Notification");
    });
    const toastEl = await screen.findByText("Notification");
    const root = toastEl.closest("[data-sonner-toast]");
    expect(root).not.toBeNull();
    expect(root).toHaveClass("bg-turquoise-50");
  });
});

describe("toast()", () => {
  it("renders title + description when fired", async () => {
    render(<Toaster />);
    act(() => {
      toast("Notification", { description: "You have a new message." });
    });
    expect(await screen.findByText("Notification")).toBeInTheDocument();
    expect(
      await screen.findByText("You have a new message.")
    ).toBeInTheDocument();
  });

  it("applies Felix `default` toast classes to the rendered toast", async () => {
    render(<Toaster />);
    act(() => {
      toast("Notification");
    });
    const toastEl = await screen.findByText("Notification");
    const root = toastEl.closest("[data-sonner-toast]");
    expect(root).not.toBeNull();
    // A representative Tailwind utility from `defaultToastClassNames.toast`.
    expect(root).toHaveClass("bg-turquoise-50");
    expect(root).toHaveClass("border-turquoise-600");
    expect(root).toHaveClass("text-turquoise-600");
  });

  it("renders an action button when `action` is provided", async () => {
    const user = userEvent.setup();
    let clicked = false;

    render(<Toaster />);
    act(() => {
      toast("Notification", {
        action: {
          label: "Decline",
          onClick: () => {
            clicked = true;
          },
        },
      });
    });

    const button = await screen.findByRole("button", { name: "Decline" });
    expect(button).toHaveClass("bg-primary");
    await user.click(button);
    expect(clicked).toBe(true);
  });

  it("renders a custom icon when provided", async () => {
    render(<Toaster />);
    act(() => {
      toast("Notification", {
        icon: <svg data-testid="custom-icon" />,
      });
    });
    expect(await screen.findByTestId("custom-icon")).toBeInTheDocument();
  });
});

describe("toast.secondary()", () => {
  it("applies Felix `secondary` classes to the rendered toast", async () => {
    render(<Toaster />);
    act(() => {
      toast.secondary("Notification");
    });
    const toastEl = await screen.findByText("Notification");
    const root = toastEl.closest("[data-sonner-toast]");
    expect(root).not.toBeNull();
    expect(root).toHaveClass("bg-turquoise-800");
    expect(root).toHaveClass("border-turquoise-900");
    expect(root).toHaveClass("text-white");
  });

  it("uses the secondary action button styling", async () => {
    render(<Toaster />);
    act(() => {
      toast.secondary("Notification", {
        action: { label: "Decline", onClick: () => undefined },
      });
    });
    const button = await screen.findByRole("button", { name: "Decline" });
    expect(button).toHaveClass("bg-white");
    expect(button).toHaveClass("text-turquoise-800");
  });

  it("lets per-call classNames override the secondary defaults", async () => {
    render(<Toaster />);
    act(() => {
      toast.secondary("Notification", {
        classNames: { toast: "custom-secondary-toast" },
      });
    });
    const toastEl = await screen.findByText("Notification");
    const root = toastEl.closest("[data-sonner-toast]");
    expect(root).toHaveClass("custom-secondary-toast");
  });
});

describe("class-name registries", () => {
  it("exposes the default and secondary class registries", () => {
    expect(defaultToastClassNames.toast).toMatch(/bg-turquoise-50/);
    expect(secondaryToastClassNames.toast).toMatch(/bg-turquoise-800/);
  });
});

describe("accessibility", () => {
  it("has no a11y violations with no toasts on screen", async () => {
    const { container } = render(<Toaster />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no a11y violations with a toast visible", async () => {
    const { container } = render(<Toaster />);
    act(() => {
      toast("Notification", { description: "You have a new message." });
    });
    await waitFor(() => {
      expect(screen.getByText("Notification")).toBeInTheDocument();
    });
    expect(await axe(container)).toHaveNoViolations();
  });
});
