import { ColorFormat } from '../types';

export class ColorParser {
  static determineFormat(color: string): ColorFormat {
    if (color.startsWith('#')) return 'hex';
    if (color.startsWith('rgb')) return color.includes('rgba') ? 'rgba' : 'rgb';
    if (color.startsWith('hsl')) return color.includes('hsla') ? 'hsla' : 'hsl';
    throw new Error('Unknown color format');
  }
  static parseColor(color: string, format: ColorFormat): number[] {
    try {
      switch (format) {
        case 'hex':
          return this.hexToRgb(color);
        case 'rgb':
        case 'rgba':
          return this.parseRgb(color, format);
        case 'hsl':
        case 'hsla':
          return this.parseHsl(color, format);
        default:
          throw new Error(`Unsupported color format: ${format}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Failed to parse color '${color}' as format '${format}': ${error.message}`
        );
      } else {
        throw new Error(
          `Failed to parse color '${color}' as format '${format}' due to an unknown error.`
        );
      }
    }
  }

  private static parseRgb(color: string, format: 'rgb' | 'rgba'): number[] {
    const result = color.match(/\d+(\.\d+)?/g);
    if (!result) {
      throw new Error('Failed to parse RGB(A) color');
    }
    const values = result.map(Number);
    if (format === 'rgba' && values.length === 3) {
      values.push(1);
    }
    return values;
  }

  private static parseHsl(color: string, format: 'hsl' | 'hsla'): number[] {
    const result = color.match(/([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%/);
    if (!result || result.length < 4) {
      // result[0] is the full match, [1]-[3] are groups
      throw new Error('Failed to parse HSL(A) color');
    }
    const h = parseFloat(result[1]);
    const s = parseFloat(result[2]) / 100; // Convert percentage to decimal
    const l = parseFloat(result[3]) / 100; // Convert percentage to decimal

    let a = 1; // Default opacity
    if (format === 'hsla' && color.includes('%,')) {
      // Check for alpha presence
      const alphaMatch = color.match(/[\d\.]+(?=\))/);
      if (alphaMatch) {
        a = parseFloat(alphaMatch[0]);
      }
    }

    return [h, s, l, a];
  }

  private static hexToRgb(hex: string): number[] {
    hex = hex.replace(/^#/, ''); // Remove the hash at the start if present.

    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    if (hex.length === 3 || hex.length === 4) {
      hex = hex
        .split('')
        .map((char) => char + char)
        .join('');
    }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // If the hex code includes alpha (8 characters long), parse it.
    if (hex.length === 8) {
      const a = parseInt(hex.substring(6, 8), 16) / 255; // Normalize alpha to 0-1 range
      return [r, g, b, a];
    }

    return [r, g, b]; // Return RGB array if no alpha is present.
  }
  static rgbToHexNative(r: number, g: number, b: number, a?: number): string {
    // Convert RGB to Hexadecimal format
    const hex = `#${r.toString(16).padStart(2, '0')}${g
      .toString(16)
      .padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

    if (a !== undefined && a !== 1) {
      const alphaHex = Math.round(a * 255)
        .toString(16)
        .padStart(2, '0');
      return hex + alphaHex;
    }
    return hex;
  }

  static rgbToHslRaw(r: number, g: number, b: number, a?: number): number[] {
    (r /= 255), (g /= 255), (b /= 255);
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0; // Initialize h to 0
    let s = 0; // Initialize s to 0
    const l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // Achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    h = Math.round(h * 360);

    if (a !== undefined) {
      return [h, s, l, a];
    }
    return [h, s, l];
  }

  static hslToRgbRaw(h: number, s: number, l: number, a?: number): number[] {
    let r, g, b;
    h /= 360;

    if (s === 0) {
      r = g = b = l; // Achromatic scenario, all components are equal
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;

      r = this.hue2rgb(p, q, h + 1 / 3);
      g = this.hue2rgb(p, q, h);
      b = this.hue2rgb(p, q, h - 1 / 3);
    }

    // Convert from 0-1 to 0-255 scale for RGB values
    const rgb = [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];

    // Return RGB or RGBA based on the presence of alpha
    return a !== undefined ? [...rgb, a] : rgb;
  }
  static hue2rgb(p: number, q: number, t: number): number {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  }
  static getRgb(color: string, format: ColorFormat): number[] {
    switch (format) {
      case 'rgb':
      case 'rgba': {
        return this.parseColor(color, format);
      }
      case 'hex': {
        return this.hexToRgb(color);
      }
      case 'hsl':
      case 'hsla': {
        const [h, s, l, a] = this.parseColor(color, format);
        return this.hslToRgbRaw(h, s, l, a);
      }
      default:
        throw new Error(`Unsupported color format: ${format}`);
    }
  }

  static getHslRaw(color: string, format: ColorFormat): number[] {
    console.log(format);
    switch (format) {
      case 'rgb':
      case 'rgba': {
        const rgba = this.parseColor(color, format);
        return this.rgbToHslRaw(rgba[0], rgba[1], rgba[2], rgba[3]);
      }

      case 'hex': {
        const rgbFromHex = this.hexToRgb(color);
        return this.rgbToHslRaw(
          rgbFromHex[0],
          rgbFromHex[1],
          rgbFromHex[2],
          rgbFromHex[3]
        );
      }
      case 'hsl':
      case 'hsla': {
        return this.parseColor(color, format);
      }

      default:
        throw new Error(`Unsupported color format: ${format}`);
    }
  }

  static convertRgbToOriginalFormat(
    r: number,
    g: number,
    b: number,
    a: number,
    format: ColorFormat
  ): string {
    switch (format) {
      case 'hex':
        return this.rgbToHexNative(r, g, b, a);
      case 'rgba':
        return `rgba(${r}, ${g}, ${b}, ${a})`;
      case 'rgb':
        return `rgb(${r}, ${g}, ${b})`;
      case 'hsl':
      case 'hsla': {
        const [h, s, l, alpha] = this.rgbToHslRaw(r, g, b, a);
        return this.hslRawToNative(h, s, l, alpha);
      }
      default:
        throw new Error(`Unsupported color format: ${format}`);
    }
  }
  static convertHslToOriginalFormat(
    h: number,
    s: number,
    l: number,
    a = 1,
    format: ColorFormat
  ): string {
    switch (format) {
      case 'hsl':
      case 'hsla': {
        return this.hslRawToNative(h, s, l, a);
      }
      case 'rgb':
      case 'rgba': {
        const [r, g, b, alpha] = this.hslToRgbRaw(h, s, l, a);
        return this.rgbRawToNative(r, g, b, alpha);
      }
      case 'hex': {
        const [red, green, blue, alpha] = this.hslToRgbRaw(h, s, l, a);
        return this.rgbToHexNative(red, green, blue, alpha);
      }
      default:
        throw new Error(`Unsupported color format: ${format}`);
    }
  }

  static hslRawToNative(h: number, s: number, l: number, a: number): string {
    if (a !== 1 && a !== undefined) {
      return `hsla(${h}, ${Math.round(s * 100)}%, ${Math.round(
        l * 100
      )}%, ${a.toFixed(2)})`;
    } else {
      return `hsl(${h}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
    }
  }
  static rgbRawToNative(r: number, g: number, b: number, a: number): string {
    console.log('a', a);
    if (a !== 1 && a !== undefined) {
      return `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`;
    } else {
      return `rgb(${r}, ${g}, ${b})`;
    }
  }
}
