export const PHOTO_BOOTH_CONFIG = {
  appName: "Shreyash PhotoBooth",
  captionPrefix: "Shreyash Booth",
  photosPerStrip: 3,
  countdownDuration: 3, // seconds
  interPhotoDelay: 500, // ms
  filters: [
    {
      id: "90s",
      name: "90s",
      cssClass: "_90s",
      filterStyle: "contrast(1.1) sepia(0.3) hue-rotate(-10deg) saturate(0.8) brightness(1.1)",
    },
    {
      id: "2000s",
      name: "2000s",
      cssClass: "_2000s",
      filterStyle: "saturate(1.8) contrast(1.05) brightness(1.1) sepia(0.1) hue-rotate(10deg)",
    },
    {
      id: "noir",
      name: "Noir",
      cssClass: "noir",
      filterStyle: "grayscale(1) contrast(0.8) brightness(1.1)",
    },
    {
      id: "fisheye",
      name: "Fisheye",
      cssClass: "fisheye",
      filterStyle: "brightness(1.1)", // Special effect handled via CSS/Shader normally, here just brightness
    },
    {
      id: "rainbow",
      name: "Rainbow",
      cssClass: "rainbow",
      filterStyle: "hue-rotate(90deg)",
    },
    {
      id: "glitch",
      name: "Glitch",
      cssClass: "glitch",
      filterStyle: "contrast(1.5) saturate(2)",
    },
    {
      id: "crosshatch",
      name: "Crosshatch",
      cssClass: "crosshatch",
      filterStyle: "grayscale(0.5) blur(1px)",
    },
    {
      id: "vaporwave",
      name: "Vaporwave",
      cssClass: "vaporwave",
      filterStyle: "hue-rotate(280deg) saturate(2) contrast(1.1)",
    },
    {
      id: "crt",
      name: "CRT",
      cssClass: "crt",
      filterStyle: "brightness(1.2) contrast(1.2)",
    },
    {
      id: "forest",
      name: "Forest",
      cssClass: "forest",
      filterStyle: "sepia(0.2) hue-rotate(80deg) saturate(1.5)",
    },
    {
      id: "sunset",
      name: "Sunset",
      cssClass: "sunset",
      filterStyle: "sepia(0.5) hue-rotate(-30deg) saturate(2) brightness(0.9)",
    },
    {
      id: "polaroid",
      name: "Polaroid",
      cssClass: "polaroid",
      filterStyle: "contrast(0.9) brightness(1.1) saturate(0.8) sepia(0.1)",
    },
  ],
};
