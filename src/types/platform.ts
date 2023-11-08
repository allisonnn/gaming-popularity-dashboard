export enum NintendoPlatform {
  NES = "NES",
  GB = "GB",
  SNES = "SNES",
  N64 = "N64",
  GBA = "GBA",
  GC = "GC",
  DS = "DS",
  Wii = "Wii",
  "3DS" = "3DS",
  WiiU = "WiiU",
}

export enum SonyPlatform {
  PS = "PS",
  PS2 = "PS2",
  PS3 = "PS3",
  PS4 = "PS4",
  PSP = "PSP",
  PSV = "PSV",
}

export enum MicrosoftPlatform {
  XB = "XB",
  X360 = "X360",
  XOne = "XOne",
}

export enum SegaPlatform {
  GEN = "GEN",
  GG = "GG",
  SSAT = "SSAT",
  SCD = "SCD",
  DC = "DC",
}

export type PCPlatform = "PC";

export enum OtherPlatform {
  Atari2600 = "2600",
  "3DO" = "3DO",
  NG = "NG",
  PCFX = "PCFX",
  SAT = "SAT",
  TG16 = "TG16",
  WS = "WS",
}

export enum Manufacturer {
  All = "Overall",
  Microsoft = "Microsoft",
  Nintendo = "Nintendo",
  PC = "PC",
  Sega = "Sega",
  Sony = "Sony",
  Other = "Other",
}

export type Platform =
  | NintendoPlatform
  | SonyPlatform
  | MicrosoftPlatform
  | SegaPlatform
  | PCPlatform
  | OtherPlatform;
