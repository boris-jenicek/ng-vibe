import { ColorFormat } from '../types';
import { ColorParser } from './color-parser.model';
import { ColorValidator } from './color-validator.model';

export class ColorManager {
  public color: string;
  private format: ColorFormat;

  constructor(color = '#ffffff') {
    ColorValidator.validateColor(color);
    this.format = ColorParser.determineFormat(color);
    this.color = color;
  }
  public setColor(color: string): void {
    ColorValidator.validateColor(color);
    this.format = ColorParser.determineFormat(color);
    this.color = color;
  }
  public toHex(): string {
    const [r, g, b] = ColorParser.getRgb(this.color, this.format);
    return ColorParser.rgbToHexNative(r, g, b);
  }

  public toRgb(): string {
    const [r, g, b, a = 1] = ColorParser.getRgb(this.color, this.format);
    return this.format === 'rgba'
      ? `rgba(${r}, ${g}, ${b}, ${a})`
      : `rgb(${r}, ${g}, ${b})`;
  }

  public toHsl(): string {
    if (this.format.startsWith('hsl')) {
      return this.color;
    }
    const [r, g, b, a] = ColorParser.getHslRaw(this.color, this.format);
    return ColorParser.hslRawToNative(r, g, b, a);
  }

  public lighten(percentage: number): string {
    const [h, s, l, a = 1] = ColorParser.getHslRaw(this.color, this.format);
    const newL = Math.min(1, l + (1 - l) * (percentage / 100));
    return ColorParser.convertHslToOriginalFormat(h, s, newL, a, this.format);
  }

  public darken(percentage: number): string {
    const [h, s, l, a = 1] = ColorParser.getHslRaw(this.color, this.format);
    const newL = Math.max(0, l - l * (percentage / 100));
    return ColorParser.convertHslToOriginalFormat(h, s, newL, a, this.format);
  }

  public transparentize(percentage: number): string {
    let [r, g, b, a = 1] = ColorParser.getRgb(this.color, this.format);
    a *= (100 - percentage) / 100;

    return ColorParser.convertRgbToOriginalFormat(r, g, b, a, this.format);
  }

  public adjustSaturation(percentage: number): string {
    let [h, s, l, a = 1] = ColorParser.getHslRaw(this.color, this.format);
    s += s * (percentage / 100);
    s = Math.max(0, Math.min(100, s));
    return ColorParser.convertHslToOriginalFormat(h, s, l, a, this.format);
  }
}
