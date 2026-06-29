import "@testing-library/jest-dom";
import { expect } from "vitest";
import { toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

// jsdom does not implement ResizeObserver — provide a no-op stub so any
// component that uses it doesn't throw. Tests that need to trigger callbacks
// can override this with vi.stubGlobal in their own beforeEach.
globalThis.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// jsdom doesn't implement Pointer Events — Sonner (and other libs that
// support swipe-to-dismiss) call `setPointerCapture` / `releasePointerCapture`
// during pointer interactions and would otherwise throw.
if (typeof window !== "undefined" && window.HTMLElement) {
  if (!window.HTMLElement.prototype.setPointerCapture) {
    window.HTMLElement.prototype.setPointerCapture = () => {};
  }
  if (!window.HTMLElement.prototype.releasePointerCapture) {
    window.HTMLElement.prototype.releasePointerCapture = () => {};
  }
  if (!window.HTMLElement.prototype.hasPointerCapture) {
    window.HTMLElement.prototype.hasPointerCapture = () => false;
  }
}

// vaul (Drawer) and other components use window.matchMedia — jsdom doesn't implement it
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// vaul relies on Pointer Events APIs that jsdom doesn't implement.
// Provide no-op polyfills so Drawer tests don't crash on open/close.
if (!HTMLElement.prototype.setPointerCapture) {
  HTMLElement.prototype.setPointerCapture = function () {};
}
if (!HTMLElement.prototype.releasePointerCapture) {
  HTMLElement.prototype.releasePointerCapture = function () {};
}
if (!HTMLElement.prototype.hasPointerCapture) {
  HTMLElement.prototype.hasPointerCapture = function () {
    return false;
  };
}

// Radix Select (and other typeahead-driven listboxes) call `scrollIntoView`
// when focus moves between options. jsdom doesn't implement it.
if (!HTMLElement.prototype.scrollIntoView) {
  HTMLElement.prototype.scrollIntoView = function () {};
}

// vaul's `getTranslate()` reads `getComputedStyle(el).transform` and calls
// `.match(...)` on it. jsdom can expose this as `undefined`, which throws.
// Wrap the returned style in a Proxy that always yields a string for the
// transform properties so `.match()` is safe.
const originalGetComputedStyle = window.getComputedStyle.bind(window);
const TRANSFORM_KEYS = new Set([
  "transform",
  "webkitTransform",
  "mozTransform",
]);
window.getComputedStyle = (
  elt: Element,
  pseudoElt?: string | null
): CSSStyleDeclaration =>
  new Proxy(originalGetComputedStyle(elt, pseudoElt), {
    get(target, prop, receiver) {
      const value = Reflect.get(target, prop, receiver);
      if (
        typeof prop === "string" &&
        TRANSFORM_KEYS.has(prop) &&
        typeof value !== "string"
      ) {
        return "none";
      }
      return typeof value === "function" ? value.bind(target) : value;
    },
  });
