import {
  Manufacturer,
  MicrosoftPlatform,
  NintendoPlatform,
  Platform,
  SegaPlatform,
  SonyPlatform,
} from "../types";

const nintendoPlatformValues = Object.values(NintendoPlatform);
const sonyPlatformValues = Object.values(SonyPlatform);
const microsoftPlatformValues = Object.values(MicrosoftPlatform);
const segaPlatformValues = Object.values(SegaPlatform);

function getManufacturerByPlatform(platform: Platform) {
  if (platform === "PC") {
    return Manufacturer.PC;
  } else if (nintendoPlatformValues.includes(platform as NintendoPlatform)) {
    return Manufacturer.Nintendo;
  } else if (sonyPlatformValues.includes(platform as SonyPlatform)) {
    return Manufacturer.Sony;
  } else if (microsoftPlatformValues.includes(platform as MicrosoftPlatform)) {
    return Manufacturer.Microsoft;
  } else if (segaPlatformValues.includes(platform as SegaPlatform)) {
    return Manufacturer.Sega;
  } else {
    return Manufacturer.Other;
  }
}

export default getManufacturerByPlatform;
