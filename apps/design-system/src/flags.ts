// SVGs live in public/flags/, sourced from packages/ui/assets/Flags.
export interface Flag {
  es: string;
  en: string;
  file: string;
}

export const FLAGS: Flag[] = [
  { es: "Brasil", en: "Brazil", file: "Brasil.svg" },
  { es: "Colombia", en: "Colombia", file: "Colombia.svg" },
  { es: "Costa Rica", en: "Costa Rica", file: "Costa Rica.svg" },
  { es: "Ecuador", en: "Ecuador", file: "Ecuador.svg" },
  { es: "El Salvador", en: "El Salvador", file: "El Salvador.svg" },
  { es: "Guatemala", en: "Guatemala", file: "Guatemala.svg" },
  { es: "Honduras", en: "Honduras", file: "Honduras.svg" },
  { es: "México", en: "Mexico", file: "Mexico.svg" },
  { es: "Nicaragua", en: "Nicaragua", file: "Nicaragua.svg" },
  { es: "Perú", en: "Peru", file: "Perú.svg" },
  { es: "República Dominicana", en: "Dominican Republic", file: "Republica Dominicana.svg" },
  { es: "Estados Unidos", en: "United States", file: "USA.svg" },
];
