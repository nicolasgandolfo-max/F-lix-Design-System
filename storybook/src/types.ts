import type React from "react";

export type Column = "token" | "value" | "preview" | "usage" | "tailwind";

export interface TokenRow {
  token: string;
  value: string;
  tailwind?: string;
  usage?: string;
  preview?: React.ReactNode;
}

export interface ColorToken {
  token: string;
  hex: string;
  description: string;
}

export interface SemanticToken {
  token: string;
  light: string;
  dark?: string;
  description: string;
  lightRef?: string;
  darkRef?: string;
}

export interface SemanticGroup {
  label: string;
  tokens: SemanticToken[];
}

export interface FontWeightItem {
  token: string;
  value: string;
  weight: number;
  tailwind: string;
  usage: string;
}
