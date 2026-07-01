// PNGs live in public/icons-extra/, sourced from packages/ui/assets/Icons extras.
export interface ExtraIcon {
  name: string;
  file: string;
}

export const EXTRA_ICONS: ExtraIcon[] = [
  { name: "Visa", file: "Visa.png" },
  { name: "Mastercard", file: "Mastercard.png" },
  { name: "Amex", file: "Amex.png" },
  { name: "PayPal", file: "PayPal.png" },
  { name: "Apple Pay", file: "Apple Pay Icon.png" },
  { name: "Google Pay", file: "GpayIcon.png" },
  { name: "Apple", file: "Apple Icon.png" },
  { name: "Google", file: "Google Icon.png" },
];
