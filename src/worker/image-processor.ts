const QUANTIZATION_DEPTH = 3; // Generates 8 Colors.

// Web Worker to process the image.
self.onmessage = async (e: MessageEvent<File>) => {
  const bitmap = await createImageBitmap(e.data);

  const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
  const ctx = canvas.getContext("2d");
  ctx?.drawImage(bitmap, 0, 0);

  const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = getImagePixels(imageData);
  const palette = buildPalette(pixels, 0);
  const sortedPalette = orderByLuminance(palette);
  const colors = createCSSVars(sortedPalette);
  self.postMessage(colors);
};

function buildPalette(pixels: Pixel[], depth: number): Pixel[] {
  // Final Iteration.
  if (depth === QUANTIZATION_DEPTH || pixels.length === 0) {
    const color = pixels.reduce(
      (prev, curr) => {
        prev.r += curr.r;
        prev.g += curr.g;
        prev.b += curr.b;

        return prev;
      },
      { r: 0, g: 0, b: 0 }
    );

    color.r = Math.round(color.r / pixels.length);
    color.g = Math.round(color.g / pixels.length);
    color.b = Math.round(color.b / pixels.length);

    return [color];
  }

  /**
   *  Recursively do the following:
   *  1. Find the pixel channel (red,green or blue) with biggest difference/range
   *  2. Order by this channel
   *  3. Divide in half the rgb colors list
   *  4. Repeat process again, until desired depth or base case
   */
  const channel = findPrimaryChannel(pixels);
  pixels.sort((p1, p2) => {
    return p1[channel] - p2[channel];
  });

  const mid = pixels.length / 2;
  return [
    ...buildPalette(pixels.slice(0, mid), depth + 1),
    ...buildPalette(pixels.slice(mid + 1), depth + 1),
  ];
}

function getImagePixels(imgData: ImageData | undefined): Pixel[] {
  const rgbValues = [];
  if (imgData) {
    // note that we are loopin every 4!
    // for every Red, Green, Blue and Alpha
    for (let i = 0; i < imgData.data.length; i += 4) {
      const rgb = {
        r: imgData.data[i],
        g: imgData.data[i + 1],
        b: imgData.data[i + 2],
      };

      rgbValues.push(rgb);
    }
  }
  return rgbValues;
}

function findPrimaryChannel(pixels: Pixel[]) {
  let rMin = Number.MAX_VALUE;
  let gMin = Number.MAX_VALUE;
  let bMin = Number.MAX_VALUE;

  let rMax = Number.MIN_VALUE;
  let gMax = Number.MIN_VALUE;
  let bMax = Number.MIN_VALUE;

  pixels.forEach((pixel) => {
    rMin = Math.min(rMin, pixel.r);
    gMin = Math.min(gMin, pixel.g);
    bMin = Math.min(bMin, pixel.b);

    rMax = Math.max(rMax, pixel.r);
    gMax = Math.max(gMax, pixel.g);
    bMax = Math.max(bMax, pixel.b);
  });

  const rRange = rMax - rMin;
  const gRange = gMax - gMin;
  const bRange = bMax - bMin;

  const max = Math.max(rRange, gRange, bRange);
  if (max === rRange) return "r";
  if (max === gRange) return "g";
  return "b";
}

function createCSSVars(pixels: Pixel[]) {
  return pixels.map((pixel) => `rgba(${pixel.r}, ${pixel.g}, ${pixel.b}, 1)`);
}

function orderByLuminance(pixels: Pixel[]) {
  const calculateLuminance = (p: Pixel) => {
    return 0.2126 * p.r + 0.7152 * p.g + 0.0722 * p.b;
  };

  return pixels.sort((p1, p2) => {
    return calculateLuminance(p2) - calculateLuminance(p1);
  });
}

// EXTRAS
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function rgbToHex(pixels: Pixel[]) {
  return pixels.map((pixel) => {
    const rHex = componentToHex(pixel, "r");
    const gHex = componentToHex(pixel, "g");
    const bHex = componentToHex(pixel, "b");
    return `#${rHex}${gHex}${bHex}`;
  });
}

function componentToHex(pixel: Pixel, component: "r" | "g" | "b") {
  const hex = pixel[component].toString(16);
  return hex.padStart(2, "0");
}
